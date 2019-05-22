import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworksProfComponent } from './homeworks-prof.component';

describe('HomeworksProfComponent', () => {
  let component: HomeworksProfComponent;
  let fixture: ComponentFixture<HomeworksProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeworksProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeworksProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
