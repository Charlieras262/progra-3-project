import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardProfComponent } from './components/dashboard-prof/dashboard-prof.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardEstComponent } from './components/dashboard-est/dashboard-est.component';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { FormsModule } from '@angular/forms';
//Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardSuComponent } from './components/dashboard-su/dashboard-su.component';
import { InstitutionsComponent } from './components/institutions/institutions.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { ReportsComponent } from './components/reports/reports.component';
import { CoursesEstComponent } from './components/courses-est/courses-est.component';
import { CoursesProfComponent } from './components/courses-prof/courses-prof.component';
import { HomeworksEstComponent } from './components/homeworks-est/homeworks-est.component';
import { HomeworksProfComponent } from './components/homeworks-prof/homeworks-prof.component';
import { GradesEstComponent } from './components/grades-est/grades-est.component';
import { GradesProfComponent } from './components/grades-prof/grades-prof.component';
import { AdminsComponent } from './components/admins/admins.component';
import { StatsComponent } from './components/stats/stats.component';
import { CourseDetailsComponent } from './components/course-details-prof/course-details.component';
import { CourseDetailsEstComponent } from './components/course-details-est/course-details-est.component';
import { VarDirective } from './directives/var.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DashboardProfComponent,
    DashboardAdminComponent,
    DashboardEstComponent,
    LoginComponent,
    SingupComponent,
    NotFoundComponent,
    DashboardSuComponent,
    InstitutionsComponent,
    StudentsComponent,
    TeachersComponent,
    CoursesComponent,
    AssignmentsComponent,
    ReportsComponent,
    CoursesEstComponent,
    CoursesProfComponent,
    HomeworksEstComponent,
    HomeworksProfComponent,
    GradesEstComponent,
    GradesProfComponent,
    AdminsComponent,
    StatsComponent,
    CourseDetailsComponent,
    CourseDetailsEstComponent,
    VarDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
