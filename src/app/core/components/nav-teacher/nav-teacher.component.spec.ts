import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTeacherComponent } from './nav-teacher.component';

describe('NavTeacherComponent', () => {
  let component: NavTeacherComponent;
  let fixture: ComponentFixture<NavTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
