import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { RouteComponent } from './route/route.component';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';
import { TableCourseComponent } from './tables-data/table-course/table-course.component';
import { TableTeacherComponent } from './tables-data/table-teacher/table-teacher.component';
import { FormAddComponent } from './form/form-add/form-add.component';
import { TableStudentComponent } from './tables-data/table-student/table-student.component';
import { CardMenuComponent } from './card-menu/card-menu.component';
import { AsideComponent } from './aside/aside.component';
import { TableParentComponent } from './tables-data/table-parent/table-parent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableGradeComponent } from './tables-data/table-grade/table-grade.component';
import { TablePeriodComponent } from './tables-data/table-period/table-period.component';
import { TableEnrollmentComponent } from './tables-data/table-enrollment/table-enrollment.component';
import { TableGradePeriodComponent } from './tables-data/table-grade-period/table-grade-period.component';
import { TableNewsComponent } from './tables-data/table-news/table-news.component';
import { TableImageComponent } from './tables-data/table-image/table-image.component';
import { TableAnioLectivoComponent } from './tables-data/table-anio-lectivo/table-anio-lectivo.component';



@NgModule({
  declarations: [
    TableComponent,
    RouteComponent,
    TableCourseComponent,
    TableTeacherComponent,
    FormAddComponent,
    TableStudentComponent,
    CardMenuComponent,
    AsideComponent,
    TableParentComponent,
    TableGradeComponent,
    TablePeriodComponent,
    TableEnrollmentComponent,
    TableGradePeriodComponent,
    TableNewsComponent,
    TableImageComponent,
    TableAnioLectivoComponent
    
  ],
  exports:[
    TableComponent,
    RouteComponent,
    TableCourseComponent,
    TableTeacherComponent,
    TableStudentComponent,
    CardMenuComponent,
    AsideComponent,
    TableParentComponent,
    TableGradeComponent,
    TablePeriodComponent,
    TableEnrollmentComponent,
    TableGradePeriodComponent,
    TableNewsComponent,
    TableImageComponent,
    TableAnioLectivoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    FormsModule
  ]
})
export class ComponentsModule { }
