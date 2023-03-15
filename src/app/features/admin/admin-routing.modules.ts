import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminAniolectivoComponent } from './views/admin-aniolectivo/admin-aniolectivo.component';
import { AdminCourseComponent } from './views/admin-course/admin-course.component';
import { AdminEnrollmentView } from './views/admin-enrollment/admin-enrollment.view';
import { AdminGradeComponent } from './views/admin-grade/admin-grade.component';
import { AdminImageComponent } from './views/admin-image/admin-image.component';
import { AdminNewsView } from './views/admin-news/admin-news.view';
import { AdminParentView } from './views/admin-parent/admin-parent.view';
import { AdminPeriodComponent } from './views/admin-period/admin-period.component';
import { AdminSchoolYearView } from './views/admin-school-year/admin-school-year.view';
import { AdminStudentView } from './views/admin-student/admin-student.view';
import { AdminTeacherView } from './views/admin-teacher/admin-teacher.view';
import { DashboardView } from './views/dashboard/dashboard.view';


const routes: Routes = [
    { 
        path: '', component: AdminComponent, 
        children:[
            { path:'inicio',component:DashboardView},
            { path:'alumno',component:AdminStudentView},
            { path:'docente',component:AdminTeacherView},
            { path:'curso',component:AdminCourseComponent},
            { path:'grado',component:AdminGradeComponent},
            { path:'periodo',component:AdminPeriodComponent},
            { path:'apoderado',component:AdminParentView},
            { path:'matricula',component:AdminEnrollmentView},
            { path:'añoLectivo',component:AdminSchoolYearView},
            { path:'noticias',component:AdminNewsView},
            { path:'imagenes',component:AdminImageComponent},
            { path:'anioLectivo',component:AdminAniolectivoComponent},
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }