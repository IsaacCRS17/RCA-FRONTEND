import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { CourseService } from '../../commons/services/course.service';
import { GradeService } from '../../commons/services/grade.service';
import { PaginationService } from '../../commons/services/pagination.service';
import { ICourse } from '../../interfaces/course';
import { IGrade } from '../../interfaces/grade';

@Component({
  selector: 'app-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrls: ['./admin-course.component.scss']
})
export class AdminCourseComponent implements OnInit {

  courses:ICourse[]=[];
  grades:IGrade[]=[];
  tableName: string = 'Cursos';
  paginationData = 'course'
  msjResponse:string='';
  successful: boolean=false;
  
  @ViewChild('modalOk') modalOk!:ModalComponent;

  constructor(
    private courseService: CourseService, 
    private pagination:PaginationService,
    private gradeService:GradeService) { }

  ngOnInit(): void {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.courseService.getAll('', page,size)
    .subscribe(response =>{
      this.courses = response.data.list;
      
    });

    this.gradeService.getAll('',0,10).subscribe(response =>{
      this.grades = response.data.list;
    })
  }

  //BUSCAR
  search(nom:string){
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.courseService.getAll(nom,page,size).subscribe(response =>{
      this.courses = response.data.list;
      console.log(response.data.list)
    })
  }

  // AGREGAR - ACTUALIZAR
  save(course:ICourse){
    if(course.code==null){
      this.courseService.add(course).subscribe(data =>{
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
      this.courseService.update(course).subscribe(data =>{
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
    this.courseService.delete(id).subscribe(data =>{
      if(data.msj==='OK'){
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
      }
    });
    this.modalOk.showModal();
  }

 refresh(): void { window.location.reload(); }
}