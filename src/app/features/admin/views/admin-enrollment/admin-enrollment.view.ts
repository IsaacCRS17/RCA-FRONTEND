import { Component, OnInit, ViewChild } from '@angular/core';
import { EnrollmentService } from '../../commons/services/enrollment.service';
import { ReportsService } from '../../commons/services/reports.service';
import { StudentService } from '../../commons/services/student.service';
import { IEnrollment } from '../../interfaces/enrollment';
import { IStudent } from '../../interfaces/student';
import { IAula } from '../../interfaces/aula';
import { AulaService } from '../../commons/services/aula.service';
import { IAnioLectivo } from '../../interfaces/anio-lectivo';
import { AnioLectivoService } from '../../commons/services/anio-lectivo.service';
import { ModalResponseComponent } from 'src/app/shared/components/modals/modal-response/modal-response.component';
import { PaginationService } from '../../commons/services/pagination.service';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
@Component({
  selector: 'app-admin-enrollment',
  templateUrl: './admin-enrollment.view.html',
  styleUrls: ['./admin-enrollment.view.scss']
})
export class AdminEnrollmentView implements OnInit {

  tableName: string = 'Matricula';
  msjResponse: string = '';
  successful!: boolean;

  identiStudent: string = '';
  studentSave!: IStudent;
  enrollmentSave!:IEnrollment;
  aniosL:IAnioLectivo[]=[]
  aulas:IAula[]=[];
  students:IStudent[]=[];
  paginationData = 'enrollment'
  page = this.pagination.getPage(this.paginationData);
  size = this.pagination.getSize(this.paginationData);
  filterSearch = "";
 
  enrollmentList:IEnrollment[]=[]
  @ViewChild('modalOk') modalOk!:ModalComponent;

  constructor(
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
    private aulaService: AulaService,
    private anioService: AnioLectivoService,
    private reportService: ReportsService,
    private pagination: PaginationService,
  ) { }

  ngOnInit(): void {
    this.getEnrollment();
    this.searchStudent();
    this.aulaService.getAll("", 0, 100).subscribe(response => {
      this.aulas = response.data.list;
    })

    this.anioService.getAll("", 0, 5).subscribe(response => {
      this.aniosL = response.data.list;
    })

  }
  searchStudent(nom?: string) {
    this.studentService.getAll(nom ? nom : '', 0, 6).subscribe(response => {
      this.students = response.data.list;
    })
  }
  searchAula(nom?: string) {
    this.studentService.getAll(nom ? nom : '', 0, 6).subscribe(response => {
      this.students = response.data.list;
    })
  }
  //Reporte matriculados por grado
  // matGradoReport(iden:string){
  //   this.reportService.matGrado(iden,0,5,false).subscribe(data =>{
  //     this.matGrado = data.content
  //   })
  // }
  matGradoResponseXSL(iden: string) {
    const fileName = 'Reporte-alumnos-matriculados.xlsx'
    this.reportService.matGradoExcel(iden, 0, 5, true).subscribe(data => {
      this.managerExcelFile(data, fileName);
    })
  }
  // AGREGAR - ACTUALIZAR
  save(enrollment: IEnrollment) {
    if (enrollment.id == null) {
      this.enrollmentService.add(enrollment).subscribe(data => {
        if (data.successful) {
          this.getEnrollment();
          this.msjResponse = 'Matricula registrada correctamente'
          this.successful = true;
        } else {
          this.msjResponse = data.message;
          this.successful = false;
        }
      });
    } else {
      this.enrollmentService.update(enrollment).subscribe(data => {
        if (data.successful) {
          this.getEnrollment();
          this.msjResponse = 'Matricula actualizada con éxito';
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
  // getIdentiParent(identiParent:string){
  //   this.identiParent = identiParent;
  // }
  getStudentSave(student: IStudent) {
    this.studentSave = student;
  }
  


  //ELIMINAR
  delete(id: string) {
    this.enrollmentService.delete(id).subscribe(data => {
      if (data.successful) {
        this.getEnrollment();
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
      } else {
        this.msjResponse = data.message;
        this.successful = true;
      }
    });
    this.modalOk.showModal();
    this.msjResponse = "";
  }
  getEnrollment() {
    this.enrollmentService.getAll(this.filterSearch, this.page, this.size)
      .subscribe(response => {
        if (response.successful) {
          this.enrollmentList = response.data.list;
        } else {
          this.enrollmentList = []
        }
      })
  }
  //Reportes
  managerExcelFile(response: any, fileName: string): void {
    const dataType = response.type;
    const binaryData = [];
    binaryData.push(response);

    const fPath = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
    const downloadLink = document.createElement('a');
    downloadLink.href = fPath;
    downloadLink.setAttribute('download', fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  getPage(event: any) {
    this.page = event;
    this.getEnrollment();
  }

  getSize(event: any) {
    this.size = event;
    this.getEnrollment();
  }
}
