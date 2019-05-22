import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworksEstComponent } from './homeworks-est.component';

describe('HomeworksEstComponent', () => {
  let component: HomeworksEstComponent;
  let fixture: ComponentFixture<HomeworksEstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeworksEstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeworksEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
