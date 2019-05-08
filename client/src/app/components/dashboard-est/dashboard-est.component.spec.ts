import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEstComponent } from './dashboard-est.component';

describe('DashboardEstComponent', () => {
  let component: DashboardEstComponent;
  let fixture: ComponentFixture<DashboardEstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardEstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
