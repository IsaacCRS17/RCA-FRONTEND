import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { IImage } from '../../interfaces/image';


@Injectable({
    providedIn: 'root'
  })

export class ImageService{
    constructor(private http: HttpClient) { }
//Listar 
getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/imagen?page=${page}&size=${size}`);
}

  //Agregar 
add(image:IImage):Observable<IResponse>{
    console.log(image)
    return this.http.post<IResponse>(`${environment.api}/imagen`,image)
}

  //Modificar 
update(image:IImage):Observable<IResponse>{
    return this.http.put<IResponse>(`${environment.api}/imagen`,image);
}

  //Eliminar 
delete(id:string):Observable<IResponse>{
    return this.http.delete<IResponse>(`${environment.api}/grado`+id);
}
}