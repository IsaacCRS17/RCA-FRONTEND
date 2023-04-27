import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRole } from 'src/app/features/admin/interfaces/role';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-table-role',
  templateUrl: './table-role.component.html',
  styleUrls: ['./table-role.component.scss']
})
export class TableRoleComponent implements OnInit {

  @Input() roles: IRole[]=[];
  @Input() tableName!: string;
  @Input() title!: string;

  @Output() roleSave:EventEmitter<IRole> = new EventEmitter();
  @Output() roleDelete:EventEmitter<string> = new EventEmitter();
  @Output() roleSearch:EventEmitter<string> = new EventEmitter();

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;

  head=["Codigo","Rol","Acciones"]
  group!: FormGroup;

  msjResponse:string='';
  nomSearch:string='';

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form();

  }
  get id(){return this.group.get('id')}
  get code(){return this.group.get('code')}
  get nom(){return this.group.get('nom')}
  // get descripcion(){return this.group.get('descripcion')}

  form(item?:IRole):void{
    this.group = this.formBuilder.group({
      id:[item?item.id:'',[Validators.required,Validators.minLength(40)]],
      code:[item?item.code:'',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      nom:[item?item.name:'',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      // descripcion:[item?item.descripcion:'',]
    });
  }


  //BUSCAR
  search(nom:string){
    this.roleSearch.emit(nom);
  }

   // AGREGAR - ACTUALIZAR
  save(){
    if(this.group.valid){
    this.roleSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();
  }

  // ELIMINAR
  delete(id:string){
    this.roleDelete.emit(id)
    this.modalDelete.hiddenModal();
  }


}

