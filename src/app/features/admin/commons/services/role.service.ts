import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { IRole } from '../../interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  //Listar Roles
  getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
    
    return this.http.get<IApiResponse>(`${environment.api}/rol?page=${page}&size=${size}`);
  }
  //Agregar Rol
  add(rol:IRole):Observable<IResponse>{
    console.log(rol)
    return this.http.post<IResponse>(`${environment.api}/rol`,rol)
  }

  //Modificar Rol
  update(rol:IRole):Observable<IResponse>{
    return this.http.put<IResponse>(`${environment.api}/rol`,rol);
  }

  //Eliminar Rol
  delete(id:string):Observable<IResponse>{
    return this.http.delete<IResponse>(`${environment.api}/rol`+id);
  }
}
