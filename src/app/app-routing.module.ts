import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/Dashboarding/dashboard/dashboard.component';
import { ProfileComponent } from './components/Dashboarding/profile/profile.component';
import { AboutComponent } from './components/Landing/about/about.component';
import { HomeComponent } from './components/Landing/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerificationComponent } from './components/Security/verification/verification.component';
import { SendEmailComponent } from './components/Security/send-email/send-email.component';
import { ResetPasswordComponent } from './components/Security/reset-password/reset-password.component';
import { CourseDetailComponent } from './components/Landing/course-detail/course-detail.component';
import { CoursesComponent } from './components/Landing/courses/courses.component';
import { CoursesDataComponent } from './components/Dashboarding/courses-data/courses-data.component';
import { InstructorDataComponent } from './components/Dashboarding/instructor-data/instructor-data.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path:'welcome', children :[
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'course/:courseId', component:CourseDetailComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'verify/email/:emailId', component: VerificationComponent},
  { path: 'forgetpassword/sendemail', component: SendEmailComponent},
  { path: 'forgetpassword/resetpassword/:emailId', component: ResetPasswordComponent },
  { path: 'signup', component: SignUpComponent },
  { path:'user', canActivate: [AuthGuard], children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'courses', component: CoursesDataComponent },
    { path: 'instructors', component: InstructorDataComponent }
  ] },
  { path: '', redirectTo: '/user/dashboard', pathMatch: 'full'},
  { path: '**', redirectTo: '/user/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
