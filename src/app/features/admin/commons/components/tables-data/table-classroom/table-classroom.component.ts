import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAula } from 'src/app/features/admin/interfaces/aula';
import { IGrade } from 'src/app/features/admin/interfaces/grade';
import { ISeccion } from 'src/app/features/admin/interfaces/seccion';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-table-classroom',
  templateUrl: './table-classroom.component.html',
  styleUrls: ['./table-classroom.component.scss']
})
export class TableClassroomComponent implements OnInit {

  @Input() classrooms: IAula[] = [];
  @Input() grades: IGrade[] = [];
  @Input() sections: ISeccion[] = [];
  @Input() tableName!: string;
  @Input() title!: string;
  @Input() successful!: boolean;
  titulo:string="Registrar Aula"
  item: IAula = {
    id: '',
    code: '',
    gradoDTO: { id: '', code: '', name: '' },
    seccionDTO: { id: '', code: '', name: '' }
  }


  @Output() classroomSave: EventEmitter<IAula> = new EventEmitter();
  @Output() classroomDelete: EventEmitter<string> = new EventEmitter();
  @Output() classroomSearch: EventEmitter<string> = new EventEmitter();

  head = ["Codigo", "Aula", "Acciones"]
  group!: FormGroup;
  close_modal!: boolean;

  msjResponse: string = '';
  nomSearch: string = '';

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;

  constructor(private formBuilder: FormBuilder) { }

  get id() { return this.group.get('id') }
  get gradoDTO() { return this.group.get('gradoDTO') }
  get seccionDTO() { return this.group.get('seccionDTO') }

  ngOnInit(): void {
    this.form();
  }

  form(item?: IAula): void {
    if(item){
      this.item = item;
    }
    this.group = this.formBuilder.group({
      id: [item ? item.id : null],
      code: [item ? item.code : ''],
      gradoDTO: [item ? item.gradoDTO : '', [Validators.required]],
      seccionDTO: [item ? item.seccionDTO : '', [Validators.required]],
    });

  }

  //BUSCAR
  search(filter: string) {
    this.classroomSearch.emit(filter);
  }

  // AGREGAR - ACTUALIZAR
  save() {
    if (this.group.valid) {
      this.classroomSave.emit(this.group.value)
    }
  }

  // ELIMINAR
  delete(id: string) {
    this.classroomDelete.emit(id)
  }

  reset() {
    this.group.reset();
    this.item = {
      id: '',
      code: '',
      gradoDTO: { id: '', code: '', name: '' },
      seccionDTO: { id: '', code: '', name: '' }
    };
  }
  onUpdateButtonClick(item: any) {
    this.titulo = "Actualizar Aula";
    this.form(item); // Call the form() function if needed for your logic
    
  }

  // Function to handle when the "Add" button is clicked
  onAddButtonClick() {
    this.group.reset();
    this.titulo = "Registrar Aula";
    // Any other logic related to the "Add" button can be added here
  
  }
  getCloseModal(){
    this.reset();
  }

   // para poder cerrar y abrirel app-modal automáticamente dependiendo de la rpt de la transacción
   ngOnChanges(changes: SimpleChanges) {
    if(this.successful){
      this.modalAdd.hiddenModal();
    }
  }

}

