import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesEstComponent } from './courses-est.component';

describe('CoursesEstComponent', () => {
  let component: CoursesEstComponent;
  let fixture: ComponentFixture<CoursesEstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesEstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
