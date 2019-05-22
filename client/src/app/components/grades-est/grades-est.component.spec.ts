import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesEstComponent } from './grades-est.component';

describe('GradesEstComponent', () => {
  let component: GradesEstComponent;
  let fixture: ComponentFixture<GradesEstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradesEstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
