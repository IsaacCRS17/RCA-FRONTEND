import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { NgModule } from '@angular/core';
import { TeacherNotasComponent } from './views/teacher-notas/teacher-notas.component';
import { TeacherClasesComponent } from './views/teacher-clases/teacher-clases.component';
import { TeacherAsignacionesComponent } from './views/teacher-asignaciones/teacher-asignaciones.component';
import { TeacherDatosComponent } from './views/teacher-datos/teacher-datos.component';
import { TeacherAsistenciaComponent } from './views/teacher-asistencia/teacher-asistencia.component';
import { TeacherStudentComponent } from './views/teacher-student/teacher-student.component';

const routes: Routes = [
    {
        path: '', component: TeacherComponent,
        children:[
            { path: 'asignaciones', component: TeacherAsignacionesComponent },
            { path: 'estudiantes', component: TeacherStudentComponent},
            { path: 'notas', component: TeacherNotasComponent },
            { path: 'clases', component: TeacherClasesComponent },
            { path: 'datos', component: TeacherDatosComponent},
            { path: 'asistencias', component: TeacherAsistenciaComponent}
        ]
    },
    { path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TeacherRoutingModule { }
