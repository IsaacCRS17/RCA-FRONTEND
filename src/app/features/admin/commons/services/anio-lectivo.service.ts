import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { IAnioLectivo } from '../../interfaces/anio-lectivo';


@Injectable({
  providedIn: 'root'
})
export class AnioLectivoService {

  constructor(private http:HttpClient) { }
//Listar 
getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
  return this.http.get<IApiResponse>(`${environment.api}/aniolectivo?page=${page}&size=${size}`);
}


  //Agregar 
  add(aniolectivo:IAnioLectivo):Observable<IResponse>{
    return this.http.post<IResponse>(`${environment.api}/aniolectivo`,aniolectivo)
  }

  //Modificar 
  update(aniolectivo:IAnioLectivo):Observable<IResponse>{
    return this.http.put<IResponse>(`${environment.api}/aniolectivo`,aniolectivo);
  }

  //Eliminar 
  delete(id:string):Observable<IResponse>{
    return this.http.delete<IResponse>(`${environment.api}/aniolectivo`+id);
  }
}
