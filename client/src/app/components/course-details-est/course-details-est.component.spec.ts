import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsEstComponent } from './course-details-est.component';

describe('CourseDetailsEstComponent', () => {
  let component: CourseDetailsEstComponent;
  let fixture: ComponentFixture<CourseDetailsEstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDetailsEstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailsEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
