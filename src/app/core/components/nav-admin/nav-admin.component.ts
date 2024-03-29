import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.scss']
})
export class NavAdminComponent implements OnInit {

  constructor(private router:Router, private renderer2:Renderer2) { }
  
  @ViewChild('inicio') inicio!: ElementRef;
  @ViewChild('mantenimiento') mant!: ElementRef;
  @ViewChild('operaciones') operaciones!: ElementRef;
  @ViewChild('reportes') reportes!: ElementRef;

  showSubmenuMant:boolean=false;
  showSubmenuOper:boolean=false;
  showSubmenuRepor:boolean = false;

  menuVisible = true;
  
  ngOnInit(): void {
  }

  Optinicio(){
    this.showSubmenuMant = false;
    this.renderer2.setStyle( this.inicio.nativeElement, 'background-color', 'rgb(32, 36, 59)');
    this.renderer2.setStyle(this.operaciones.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.mant.nativeElement, 'background-color', 'rgb(11, 13, 24)');
  }

  submenuOper(){
    this.showSubmenuMant = false;
    this.showSubmenuRepor = false;
    this.showSubmenuOper = !this.showSubmenuOper;
    this.renderer2.setStyle( this.operaciones.nativeElement, 'background-color', 'rgb(32, 36, 59)');
    this.renderer2.setStyle(this.inicio.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.mant.nativeElement, 'background-color', 'rgb(11, 13, 24)');
  
  }

  submenuMant(){
    this.showSubmenuOper = false;
    this.showSubmenuRepor = false;
    this.showSubmenuMant = !this.showSubmenuMant;
    this.renderer2.setStyle( this.mant.nativeElement, 'background-color', 'rgb(32, 36, 59)');
    this.renderer2.setStyle(this.inicio.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.operaciones.nativeElement, 'background-color', 'rgb(11, 13, 24)');
  }

  submenuRepor(){
    this.showSubmenuOper = false;
    this.showSubmenuMant = false;
    this.showSubmenuRepor = !this.showSubmenuRepor;
    this.renderer2.setStyle( this.mant.nativeElement, 'background-color', 'rgb(32, 36, 59)');
    this.renderer2.setStyle(this.inicio.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.operaciones.nativeElement, 'background-color', 'rgb(11, 13, 24)');
  }

  redirectTo(index:string):void{
    this.router.navigateByUrl('admin/'+ index);
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
}
