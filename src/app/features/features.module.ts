import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../shared/components/components.module';
import { TeacherComponent } from './teacher/teacher.component';
import { TutorComponent } from './tutor/tutor.component';



@NgModule({
  declarations: [
  
    TeacherComponent,
       TutorComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule
  ]
})
export class FeaturesModule { }
