import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRoleComponent } from './table-role.component';

describe('TableRoleComponent', () => {
  let component: TableRoleComponent;
  let fixture: ComponentFixture<TableRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
