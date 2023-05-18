import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { environment } from 'src/environments/environment';
import { ICourseTeacher } from '../../interfaces/course-teacher';

@Injectable({
  providedIn: 'root'
})
export class CourseTeacherService {

  constructor(private http: HttpClient) { }

  //Get
  getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/asignatura?page=${page}&size=${size}`);
  }

  //add
  add(courseTeacher?: ICourseTeacher):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${environment.api}/asignatura`, courseTeacher);
  }

  //update
  update(courseTeacher?: ICourseTeacher):Observable<IApiResponse>{
    return this.http.put<IApiResponse>(`${environment.api}/asignatura`, courseTeacher);
  }

  //delete
  delete(id: string):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${environment.api}/asignatura/` + id);
  }
}