import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [],
  exports:[
    ComponentsModule
  ],
  imports: [
    CommonModule
  ]
})
export class TeacherCommonsModule { }