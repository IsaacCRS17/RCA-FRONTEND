import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { EnrollmentService } from '../../commons/services/enrollment.service';
import { GradePeriodService } from '../../commons/services/grade-period.service';
import { ParentService } from '../../commons/services/parent.service';
import { ReportsService } from '../../commons/services/reports.service';
import { StudentService } from '../../commons/services/student.service';
import { IEnrollment } from '../../interfaces/enrollment';
import { IGradePeriod } from '../../interfaces/grade-period';
import { IParent } from '../../interfaces/parent';
import { IReportMatGrade } from '../../interfaces/reportMatGrade';
import { IStudent } from '../../interfaces/student';

@Component({
  selector: 'app-admin-enrollment',
  templateUrl: './admin-enrollment.view.html',
  styleUrls: ['./admin-enrollment.view.scss']
})
export class AdminEnrollmentView implements OnInit {

  tableName:string='Matricula'
  msjResponse:string='';
  successful: boolean=false;
  identiAlumno:string='';
  idGradoPeriodo:string='';
  identiParent:string='';
  identiStudent:string='';
  studentSave!: IStudent;
  enrollmentSave!:IEnrollment;
  gradePeriods:IGradePeriod[]=[]
  students:IStudent[]=[];
  matGrado:IReportMatGrade[]=[]
  paginationData = 'student'

  @ViewChild('modalOk') modalOk!:ModalComponent;
  
  constructor(
    private parentService: ParentService,
    private studentService:StudentService,
    private enrollmentService:EnrollmentService,
    private gradoPeriodoService:GradePeriodService,
    private reportService:ReportsService
    
    ){ }

  ngOnInit(): void {
    this.gradoPeriodoService.getAll("",0,5).subscribe(data =>{
      this.gradePeriods = data.content;
      console.log("Matricula "+data.content)
    })
    this.searchStudent();
  }
  searchStudent(nom?:string){
    this.studentService.getAll(nom?nom:'',0,6).subscribe(data =>{
      this.students = data.content;
    })
  }
  //Reporte matriculados por grado
  matGradoReport(iden:string){
    this.reportService.matGrado(iden,0,5,false).subscribe(data =>{
      this.matGrado = data.content
    })
  }
  matGradoResponseXSL(iden:string){
    const fileName = 'Reporte-alumnos-matriculados.xlsx'
    this.reportService.matGradoExcel(iden,0,5,true).subscribe(data =>{
      this.managerExcelFile(data,fileName);
    })
  }
  // AGREGAR - ACTUALIZAR
  save(enrollment:IEnrollment){
    enrollment.idAlumno = this.studentSave.identi;
    if(enrollment.code==null){
      this.enrollmentService.add(enrollment).subscribe(data =>{
          if(data.msj==='OK'){
            this.msjResponse = 'Matricula registrada correctamente'
            this.successful = true;
          }else{
            this.msjResponse = 'Error, el registro de matricula ya existe';
            this.successful = false;
          }
      });
    }else{
      this.enrollmentService.update(enrollment).subscribe(data =>{
        if(data.msj === 'OK'){
          this.msjResponse = 'Matricula actualizada con éxito';
        }else{
          this.msjResponse = 'Ha ocurrido un error :(';
        }
      })
    }
    this.modalOk.showModal();
  }
  getIdentiParent(identiParent:string){
    this.identiParent = identiParent;
  }
  getStudentSave(student:IStudent){
    this.studentSave = student;
  }

 //ELIMINAR 
 delete(id:string){
  this.enrollmentService.delete(id).subscribe(data =>{
    if(data.msj==='OK'){
      this.msjResponse = 'Eliminado correctamente';
      this.successful = true;
    }
  });
  this.modalOk.showModal();
}

//Reportes
managerExcelFile(response:any, fileName:string):void{
  const dataType = response.type;
  const binaryData = [];
  binaryData.push(response);

  const fPath = window.URL.createObjectURL(new Blob(binaryData, {type:dataType}));
  const downloadLink = document.createElement('a');
  downloadLink.href = fPath;
  downloadLink.setAttribute('download',fileName);
  document.body.appendChild(downloadLink);
  downloadLink.click();
}
}
