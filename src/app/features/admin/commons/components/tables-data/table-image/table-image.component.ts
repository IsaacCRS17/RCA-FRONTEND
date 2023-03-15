import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { ImageService } from '../../../services/imagen.service';
import { IImage } from 'src/app/features/admin/interfaces/image';
import { IUser } from 'src/app/features/admin/interfaces/user';

@Component({
  selector: 'app-table-image',
  templateUrl: './table-image.component.html',
  styleUrls: ['./table-image.component.scss']
})
export class TableImageComponent implements OnInit {

@Input() images:IImage[]=[];
@Input() users:IUser[]=[];
@Input() tableName!: string;
@Input() title!: string;

@Output() imageSave:EventEmitter<IImage>=new EventEmitter();
@Output() imageDelete:EventEmitter<string>=new EventEmitter();
@Output() imageSearch:EventEmitter<string>=new EventEmitter();

@ViewChild('modalAdd') modalAdd!: ModalComponent;
@ViewChild('modalDelete') modalDelete!: ModalComponent;

head=["CODIGO","NOMBRE","RUTA","ACCIONES"]
group!: FormGroup;

msjResponse:string='';
nomSearch:string='';

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form();
  }
  get code(){return this.group.get('code')}
  get nom(){return this.group.get('name')}
  get route(){return this.group.get('route')}

  form(item?:IImage):void{
    this.group = this.formBuilder.group({
      code:[item?item.code:'',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      nom:[item?item.name:'',],
      route:[item?item.route:'',]
  });
}


  //BUSCAR
  search(nom:string){
    this.imageSearch.emit(nom);
  }

   // AGREGAR - ACTUALIZAR
  save(){
    if(this.group.valid){
    this.imageSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();
  }

  // ELIMINAR 
  delete(id:string){
    this.imageDelete.emit(id)
    this.modalDelete.hiddenModal();
  }
}
