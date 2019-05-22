import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesProfComponent } from './courses-prof.component';

describe('CoursesProfComponent', () => {
  let component: CoursesProfComponent;
  let fixture: ComponentFixture<CoursesProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
