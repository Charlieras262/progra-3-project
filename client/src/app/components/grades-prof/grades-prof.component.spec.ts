import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesProfComponent } from './grades-prof.component';

describe('GradesProfComponent', () => {
  let component: GradesProfComponent;
  let fixture: ComponentFixture<GradesProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradesProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
