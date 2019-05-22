import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardEstComponent } from './components/dashboard-est/dashboard-est.component';
import { DashboardProfComponent } from './components/dashboard-prof/dashboard-prof.component';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { UserAdminGuard } from './guards/admin/user-admin.guard';
import { NoLoginGuard } from './guards/no-login/no-login.guard';
import { UserStudentGuard } from './guards/student/user-student.guard';
import { UserTeacherGuard } from './guards/teacher/user-teacher.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardSuComponent } from './components/dashboard-su/dashboard-su.component';
import { SuGuard } from './guards/su/su.guard';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { CoursesComponent } from './components/courses/courses.component';
import { InstitutionsComponent } from './components/institutions/institutions.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { ReportsComponent } from './components/reports/reports.component';
import { CoursesEstComponent } from './components/courses-est/courses-est.component';
import { HomeworksEstComponent } from './components/homeworks-est/homeworks-est.component';
import { GradesEstComponent } from './components/grades-est/grades-est.component';
import { AdminsComponent } from './components/admins/admins.component';
import { CoursesProfComponent } from './components/courses-prof/courses-prof.component';
import { HomeworksProfComponent } from './components/homeworks-prof/homeworks-prof.component';
import { GradesProfComponent } from './components/grades-prof/grades-prof.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', redirectTo: 'dashboard/1000'},                                
  {path: 'dashboard/0001', component: DashboardSuComponent, canActivate: [SuGuard]},                          
  {path: 'dashboard/0010', component: DashboardAdminComponent, canActivate: [UserAdminGuard]},
  {path: 'dashboard/0100', component: DashboardProfComponent, canActivate: [UserTeacherGuard]},
  {path: 'dashboard/1000', component: DashboardEstComponent, canActivate: [UserStudentGuard]},
  {path: 'login', component: LoginComponent, canActivate: [NoLoginGuard]},
  {path: 'singup', component: SingupComponent, canActivate: [NoLoginGuard]},
  {path: 'dashboard/0001/assignments', component: AssignmentsComponent, canActivate: [SuGuard]},
  {path: 'dashboard/0001/admins', component: AdminsComponent, canActivate: [SuGuard]},
  {path: 'dashboard/0001/institutions', component: InstitutionsComponent, canActivate: [SuGuard]},
  {path: 'dashboard/0001/students', component: StudentsComponent, canActivate: [SuGuard]},
  {path: 'dashboard/0001/teachers', component: TeachersComponent, canActivate: [SuGuard]},
  {path: 'dashboard/0001/reports', component: ReportsComponent, canActivate: [SuGuard]},
  {path: 'dashboard/1000/courses', component: CoursesEstComponent, canActivate: [UserStudentGuard]},
  {path: 'dashboard/1000/homeworks', component: HomeworksEstComponent, canActivate: [UserStudentGuard]},
  {path: 'dashboard/1000/ratings', component: GradesEstComponent, canActivate: [UserStudentGuard]},
  {path: 'dashboard/0100/courses', component: CoursesProfComponent, canActivate: [UserTeacherGuard]},
  {path: 'dashboard/0100/homeworks', component: HomeworksProfComponent, canActivate: [UserTeacherGuard]},
  {path: 'dashboard/0100/ratings', component: GradesProfComponent, canActivate: [UserTeacherGuard]},
  {path: '**', redirectTo: 'not-found'},
  {path: 'not-found', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
