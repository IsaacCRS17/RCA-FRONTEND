import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { PaginationService } from '../../commons/services/pagination.service';
import { RoleService } from '../../commons/services/role.service';
import { IRole } from '../../interfaces/role';

@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.scss']
})
export class AdminRoleComponent implements OnInit {
  
  roles:IRole[]=[];
  tableName: string = 'Roles';
  paginationData = 'role'
  msjResponse:string ='';
  successful: boolean=false;

  @ViewChild('modalOk') modalOk!:ModalComponent;

  constructor(private roleService:RoleService, private pagination:PaginationService) { }

  ngOnInit(): void {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.roleService.getAll('', page,size)
    .subscribe(response =>{
      this.roles = response.data.list;
    
    });
  }

    //BUSCAR
    search(nom:string){
      let page = this.pagination.getPage(this.paginationData);
      let size = this.pagination.getSize(this.paginationData);
      this.roleService.getAll(nom,page,size).subscribe(response =>{
        this.roles = response.data.list;
      })
    }
  
    // AGREGAR - ACTUALIZAR
    save(role:IRole){
  
      if(role.code==null){
        this.roleService.add(role).subscribe(data =>{
          console.log(data.msj)
          if(data.msj==='OK'){
            this.msjResponse = 'Agregado correctamente';
            this.successful=true;
          }else{
            this.msjResponse = 'Ha ocurrido un error :(';
            this.successful=false;
          }
        });
      }else{
        this.roleService.update(role).subscribe(data =>{
          if(data.msj === 'OK'){
            this.msjResponse = 'Cambios actualizados con éxito';
            this.successful=true;
          }else{
            this.msjResponse = 'Ha ocurrido un error :(';
            this.successful=false;
          }
        })
      }
      this.modalOk.showModal();
    }
  
    //ELIMINAR 
    delete(id:string){
      this.roleService.delete(id).subscribe(data =>{
        if(data.msj==='OK'){
          this.msjResponse = 'Eliminado correctamente';
          this.successful=true;
        }
      });
      this.modalOk.showModal();
    }
  
   refresh(): void { window.location.reload(); }

}
