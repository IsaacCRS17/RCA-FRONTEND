import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAnioLectivo } from 'src/app/features/admin/interfaces/anio-lectivo';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
@Component({
  selector: 'app-table-anio-lectivo',
  templateUrl: './table-anio-lectivo.component.html',
  styleUrls: ['./table-anio-lectivo.component.scss']
})
export class TableAnioLectivoComponent implements OnInit {
  @Input() anios: IAnioLectivo[]=[];
  @Input() tableName!: string;
  @Input() title!: string;

  @Output() anioSave:EventEmitter<IAnioLectivo> = new EventEmitter();
  @Output() anioDelete:EventEmitter<string> = new EventEmitter();
  @Output() anioSearch:EventEmitter<string> = new EventEmitter();


  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;

  head=["Código","Año","Acciones"]
  group!: FormGroup;

  msjResponse:string='';
  nomSearch:string='';

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form();
  }

  get code(){return this.group.get('code')}
  get name(){return this.group.get('nom')}


  form(item?:IAnioLectivo):void{
    this.group = this.formBuilder.group({
      code:[item?item.code:'',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      name:[item?item.name:'',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      // descripcion:[item?item.descripcion:'',]
  });

}


  //BUSCAR
  search(nom:string){
    this.anioSearch.emit(nom);
  }

   // AGREGAR - ACTUALIZAR
  save(){
    if(this.group.valid){
    this.anioSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();
  }
 // ELIMINAR
 delete(id:string){
  this.anioDelete.emit(id)
  this.modalDelete.hiddenModal();
}

}
