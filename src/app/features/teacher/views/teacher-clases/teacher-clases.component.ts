import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AulaService } from 'src/app/features/admin/commons/services/aula.service';
import { ClaseService } from 'src/app/features/admin/commons/services/clase.service';
import { CourseTeacherService } from 'src/app/features/admin/commons/services/course-teacher.service';
import { CourseService } from 'src/app/features/admin/commons/services/course.service';
import { PaginationService } from 'src/app/features/admin/commons/services/pagination.service';
import { PeriodService } from 'src/app/features/admin/commons/services/period.service';
import { IAula } from 'src/app/features/admin/interfaces/aula';
import { IClase } from 'src/app/features/admin/interfaces/clase';
import { ICourse } from 'src/app/features/admin/interfaces/course';
import { ICourseTeacher } from 'src/app/features/admin/interfaces/course-teacher';
import { IPeriod } from 'src/app/features/admin/interfaces/period';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { TableClaseComponent } from '../../commons/components/tables-data/table-clase/table-clase.component';
import { IAnioLectivo } from 'src/app/features/admin/interfaces/anio-lectivo';
import { AnioLectivoService } from 'src/app/features/admin/commons/services/anio-lectivo.service';
import { ModalResponseComponent } from 'src/app/shared/components/modals/modal-response/modal-response.component';

@Component({
  selector: 'app-teacher-clases',
  templateUrl: './teacher-clases.component.html',
  styleUrls: ['./teacher-clases.component.scss']
})
export class TeacherClasesComponent implements OnInit {

  anios: IAnioLectivo[] = [];
  periods: IPeriod[] = [];
  aulas: IAula[] = [];
  courses: ICourse[] = [];
  asignaciones: ICourseTeacher[] = [];
  clases: IClase[] = [];

  route = "Clases";

  periodo!: IPeriod;
  courseTeacher!: ICourseTeacher;

  @ViewChild('anioSelect') anioSelect!: ElementRef;
  selectedAnioId: string = '';

  @ViewChild('periodSelect') periodSelect!: ElementRef;
  selectedPeriodId: string = '';

  @ViewChild('aulaSelect') aulaSelect!: ElementRef;
  selectedAulaId: string = '';

  @ViewChild('courseSelect') courseSelect!: ElementRef;
  selectedCourseId: string = '';

  tableName: string = 'Clases';

  title!: string;
  teacher = '';
  busqueda = '';

  paginationData: string = 'clase';

  msjResponse: string = '';
  successful!: boolean;

  page = this.pagination.getPage(this.paginationData);
  size = this.pagination.getSize(this.paginationData);


  @ViewChild('modalOk') modalOk!: ModalResponseComponent;

  constructor(private pagination: PaginationService,
    private periodoService: PeriodService,
    private anioService: AnioLectivoService,
    private aulaService: AulaService,
    private claseService: ClaseService,
    private tokenService: TokenService,
    private courseService: CourseService,
    private courseTeacherService: CourseTeacherService) { }

  ngOnInit(): void {

    this.teacher = this.tokenService.getUserId();

    this.selectedAnioId = localStorage.getItem('selectedAnio') || '',
    this.selectedPeriodId = localStorage.getItem('selectedPeriodo') || '';
    this.selectedCourseId = localStorage.getItem('selectedCurso') || '';
    this.selectedAulaId = localStorage.getItem('selectedAula') || '';

    this.anioService.getAll('', 0, 10).subscribe(response => {
      this.anios = response.data.list;
    });

    if (this.selectedAnioId != '') {
      this.periodoService.getAll(this.selectedAnioId, 0, 10).subscribe(response => {
        this.periods = response.data.list;
      })

      this.getAllAulasCursos();
    }

    if (this.selectedPeriodId != '') {
      this.obtenerPeriodo();
    }

    if (this.selectedCourseId != '') {
      this.obtenerCourseTeacher();
    }

    this.claseService.getAllPeriodoAulaCurso('', this.page, this.size, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId).subscribe(response => {
      this.clases = response.data.list;
    })
  }

  async getAllAulasCursos() {
    try {
      const response = await this.courseTeacherService.getAllDocenteAnio('', this.teacher, this.selectedAnioId, 0, 10).toPromise();
      if(response && response.data && response.data.list){
        this.asignaciones = response.data.list;
      }
  
      this.aulas = this.asignaciones.reduce((result: IAula[], asignacion: ICourseTeacher) => {
        const aula = asignacion.aulaDTO;
        if (!result.some((aulaUnica: IAula) => aulaUnica.gradoDTO.id === aula.gradoDTO.id && aulaUnica.seccionDTO.id === aula.seccionDTO.id)) {
          result.push(aula);
        }
        return result;
      }, []);
    } catch (error) {
      // Handle any errors that might occur during the API call
      console.error('Error:', error);
    }
  
    if (this.selectedAulaId != '') {
      this.courses = [];

      this.courses = this.getCursosUnicosPorAula(this.selectedAulaId);
    }
    
  }

  onAnioChange() {
    const selectedOption = this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioId = selectedOption.value;

    this.aulas = [];

    this.periodoService.getAll(this.selectedAnioId, 0, 10).subscribe(response => {
      this.periods = response.data.list;
    })

    this.courseTeacherService.getAllDocenteAnio('', this.teacher, this.selectedAnioId, 0, 10)
      .subscribe(response => {
        this.asignaciones = response.data.list;

        this.aulas = this.asignaciones.reduce((result: IAula[], asignacion: ICourseTeacher) => {
          const aula = asignacion.aulaDTO;
          if (!result.some((aulaUnica: IAula) => aulaUnica.gradoDTO.id === aula.gradoDTO.id && aulaUnica.seccionDTO.id === aula.seccionDTO.id)) {
            result.push(aula);
          }
          return result;
        }, []);
      });;

    localStorage.setItem('selectedAnio', this.selectedAnioId);
    localStorage.removeItem('selectedPeriodo');
    localStorage.removeItem('selectedAula');
    this.selectedAulaId = '';
    this.selectedPeriodId = '';
    this.clases = [];
  }

  onPeriodoChange() {
    const selectedOption = this.periodSelect.nativeElement.selectedOptions[0];
    this.selectedPeriodId = selectedOption.value;

    this.claseService.getAllPeriodoAulaCurso('', this.page, this.size, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId).subscribe(response => {
      this.clases = response.data.list;
    })

    this.obtenerPeriodo();

    localStorage.setItem('selectedPeriodo', this.selectedPeriodId);
  }

  async obtenerPeriodo() {
    try {
      const response = await this.periodoService.getOne(this.selectedPeriodId).toPromise();
      if (response && response.data) {
        this.periodo = response.data;
      }
    } catch (error) {

    }
  }

  onAulasChange() {
    const selectedOption = this.aulaSelect.nativeElement.selectedOptions[0];
    this.selectedAulaId = selectedOption.value;

    this.courses = [];

    this.courses = this.getCursosUnicosPorAula(this.selectedAulaId);

    this.claseService.getAllPeriodoAulaCurso('', this.page, this.size, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId).subscribe(response => {
      this.clases = response.data.list;
    })

    localStorage.setItem('selectedAula', this.selectedAulaId);

  }

  onCourseChange() {
    const selectedOption = this.courseSelect.nativeElement.selectedOptions[0];
    this.selectedCourseId = selectedOption.value;

    this.claseService.getAllPeriodoAulaCurso('', this.page, this.size, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId).subscribe(response => {
      this.clases = response.data.list;
    })

    this.obtenerCourseTeacher();

    localStorage.setItem('selectedCurso', this.selectedCourseId);

  }

  async obtenerCourseTeacher() {
    try {
      const response = await this.courseTeacherService.getAulaCurso(this.selectedAnioId, this.selectedAulaId, this.selectedCourseId).toPromise();
      console.log(response);
      if (response && response.data) {
        this.courseTeacher = response.data;
      }
    } catch (error) {
      console.log(error)
    }
  }

  getCursosUnicosPorAula(idAulaSeleccionada: string): ICourse[] {
    const asignacionesFiltradas: ICourseTeacher[] = this.asignaciones.filter((asignacion: ICourseTeacher) => {
      return asignacion.aulaDTO.id === idAulaSeleccionada;
    });

    const cursosUnicos: ICourse[] = asignacionesFiltradas.reduce((result: ICourse[], asignacion: ICourseTeacher) => {
      const curso = asignacion.cursoDTO;
      if (!result.some((cursoUnico: ICourse) => cursoUnico.id === curso.id)) {
        result.push(curso);
      }
      return result;
    }, []);

    return cursosUnicos;
  }

  //BUSCAR
  search(nom: string) {
    this.busqueda = nom;
    this.claseService.getAllPeriodoAulaCurso(nom, this.page, this.size, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId).subscribe(response => {
      if(response && response.data && response.data.list){
        this.clases = response.data.list;
      }
    })
  }

  getPage(event: any) {
    this.page = event;
    this.getClases();
  }

  getSize(event: any) {
    this.size = event;
    this.getClases();
  }

  getClases(){
    this.claseService.getAllPeriodoAulaCurso(this.busqueda, this.page, this.size, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId).subscribe(response => {
      if(response && response.data && response.data.list){
        this.clases = response.data.list;
      }
    })
  }

  // AGREGAR - ACTUALIZAR
  save(clase: IClase) {
    console.log(clase);
    if (clase.id == null) {
      this.claseService.add(clase).subscribe(data => {
        console.log(data)
        if (data.successful) {
          this.getClases();
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        } else {
          this.msjResponse = data.message;
          this.successful = false;
        }
      });
    } else {
      this.claseService.update(clase).subscribe(data => {
        if (data.successful) {
          this.getClases();
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
    this.claseService.delete(id).subscribe(data => {
      if (data.successful) {
        this.getClases();
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
      }else {
        this.msjResponse = data.message;
        this.successful = false;
      }
    });
    this.modalOk.showModal();
    this.msjResponse = "";
  }

  refresh(): void { window.location.reload(); }

}
