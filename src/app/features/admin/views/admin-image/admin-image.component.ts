import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { ImageService } from '../../commons/services/imagen.service';
import { PaginationService } from '../../commons/services/pagination.service';
import { IImage } from '../../interfaces/image';

import { IUser } from '../../interfaces/user';
@Component({
  selector: 'app-admin-image',
  templateUrl: './admin-image.component.html',
  styleUrls: ['./admin-image.component.scss']
})
export class AdminImageComponent implements OnInit {

  images:IImage[]=[];
  users:IUser[]=[];

  tableName: string = 'Imagenes';
  paginationData = 'image'
  msjResponse:string='';
  successful: boolean=false;
  @ViewChild('modalOk') modalOk!:ModalComponent;
  
  constructor(
  private imageService:ImageService,
  private pagination:PaginationService,
  // private userService:UserService

  ) { }

  ngOnInit(): void {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.imageService.getAll('', page,size)
    .subscribe(response =>{
      this.images = response.data.list;
      
    });
  }

  //BUSCAR
  search(nom:string){
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.imageService.getAll(nom,page,size).subscribe(response =>{
      this.images = response.data.list;
      console.log(response.data.list)
    })
  }

  // AGREGAR - ACTUALIZAR
  save(image:IImage){
    if(image.code==null){
      this.imageService.add(image).subscribe(data =>{
        console.log(data.msj)
        if(data.msj==='OK'){
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        }else{
          this.msjResponse = 'Ha ocurrido un error :(';
          this.successful = false;
        }
      });
    }else{
      this.imageService.update(image).subscribe(data =>{
        if(data.msj === 'OK'){
          this.msjResponse = 'Cambios actualizados con éxito';
          this.successful = true;
        }else{
          this.msjResponse = 'Ha ocurrido un error :(';
          this.successful = false;
        }
      })
    }
    this.modalOk.showModal();
  }

  //ELIMINAR 
  delete(id:string){
    this.imageService.delete(id).subscribe(data =>{
      if(data.msj==='OK'){
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
      }
    });
    this.modalOk.showModal();
  }

refresh(): void { window.location.reload(); }

}
