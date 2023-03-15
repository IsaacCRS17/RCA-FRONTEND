import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAniolectivoComponent } from './admin-aniolectivo.component';

describe('AdminAniolectivoComponent', () => {
  let component: AdminAniolectivoComponent;
  let fixture: ComponentFixture<AdminAniolectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAniolectivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAniolectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
