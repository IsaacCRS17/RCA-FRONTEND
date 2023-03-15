import { Injectable } from '@angular/core';
import { IPaginationStorage } from 'src/app/core/interfaces/paginationStorage';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() {
  }

  pagination:IPaginationStorage[]=[
    {title:'parent',page:0,size:5},
    {title:'teacher',page:0,size:5},
    {title:'course',page:0,size:5},
    {title:'student',page:0,size:5},
    {title:'grade',page:0,size:5},
    {title:'period',page:0,size:5},
    {title:'noticias',page:0,size:5},
    {title:'role',page:0,size:5}
  ]
  
  getPage(paginationData:string){
    let responsePage:number;
    let pagination:IPaginationStorage[] = JSON.parse(localStorage.getItem('pagination')||JSON.stringify(this.pagination));
    let objectPagination = pagination.filter(pages => pages.title==paginationData);
    responsePage = objectPagination[0].page;
    return responsePage;
  }
  
  setPage(paginationData:string, page:number){
     let pagination:IPaginationStorage[] = JSON.parse(localStorage.getItem('pagination')||JSON.stringify(this.pagination));
     let objectPagination = pagination.filter(pages => pages.title==paginationData);
     objectPagination[0].page = page;
     localStorage.setItem('pagination',JSON.stringify(pagination))
  }
  getSize(paginationData:string){
    let responseSize:number;
    let pagination:IPaginationStorage[] = JSON.parse(localStorage.getItem('pagination')||JSON.stringify(this.pagination));
    let objectPagination = pagination.filter(pages => pages.title==paginationData);
    responseSize = objectPagination[0].size;
    return responseSize;
  }
  setSize(paginationData:string, size:number){
    let pagination:IPaginationStorage[] = JSON.parse(localStorage.getItem('pagination')||JSON.stringify(this.pagination));
    let objectPagination = pagination.filter(pages => pages.title==paginationData);
    objectPagination[0].size = size;
    localStorage.setItem('pagination',JSON.stringify(pagination));
 }
}
