import { Component, OnInit, ViewChild } from '@angular/core';
import { ISeccion } from '../../interfaces/seccion';
import { SeccionService } from '../../commons/services/seccion.service';
import { ModalResponseComponent } from 'src/app/shared/components/modals/modal-response/modal-response.component';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.scss']
})
export class AdminSectionComponent implements OnInit {

  sections: ISeccion[] = [];
  tableName: string = 'Secciones';
  paginationData:string = 'grade';
  msjResponse: string = '';
  successful!: boolean;
  filterSearch = "";
  page = 0;
  size = 10;

  @ViewChild('modalOk') modalOk!: ModalResponseComponent;

  constructor(private sectionService: SeccionService) { }

  ngOnInit(): void {
    this.getSections();
  }

  //BUSCAR
  search(filter: string) {
    this.filterSearch = filter;
    this.getSections();
  }

  // AGREGAR - ACTUALIZAR
  save(section: ISeccion) {
    console.log(section)
    if (section.id == null) {
      this.sectionService.add(section).subscribe(data => {
        console.log(data.message)
        if (data.successful === true) {
          this.getSections();
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        } else {
          this.msjResponse = data.message;
          this.successful = false;
        }
      });
    } else {
      this.sectionService.update(section).subscribe(data => {
        if (data.successful === true) {
          this.getSections();
          this.msjResponse = 'Cambios actualizados con éxito';
          this.successful = true;
        } else {
          this.msjResponse = data.message;
          this.successful = false;
        }
      })
    }
    this.modalOk.showModal();
    this.msjResponse = "";
  }

  //ELIMINAR
  delete(id: string) {
    this.sectionService.delete(id).subscribe(data => {
      if (data.successful) {
        this.getSections();
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
      } else {
        this.msjResponse = data.message;
        this.successful = false;
      }
    });
    this.modalOk.showModal();
    this.msjResponse = "";
  }

  refresh(): void { window.location.reload(); }

  getSections(){
    this.sectionService.getAll(this.filterSearch, this.page, this.size)
      .subscribe(response => {
        if(response.successful){
          this.sections = response.data.list;
        } else {
          this.sections = []
        }
      });
  }

  getPage(event:any){
    this.page = event;
    this.getSections();
  }

  getSize(event:any){
    this.size = event;
    this.getSections();
  }

}
