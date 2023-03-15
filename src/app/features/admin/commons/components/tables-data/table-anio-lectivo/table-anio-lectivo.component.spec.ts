import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAnioLectivoComponent } from './table-anio-lectivo.component';

describe('TableAnioLectivoComponent', () => {
  let component: TableAnioLectivoComponent;
  let fixture: ComponentFixture<TableAnioLectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableAnioLectivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAnioLectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
