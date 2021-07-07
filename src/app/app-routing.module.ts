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
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path:'welcome', children :[
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'verify/email/:emailId', component: VerificationComponent},
  { path: 'forgetpassword/sendemail', component: SendEmailComponent},
  { path: 'forgetpassword/resetpassword/:emailId', component: ResetPasswordComponent },
  { path: 'signup', component: SignUpComponent },
  { path:'user', component: DashboardComponent, canActivate: [AuthGuard], children: [
    { path: 'dashboard', component: ProfileComponent },
    { path: 'Testing', component: ProfileComponent },
  ] },
  { path: '', redirectTo: '/user/dashboard', pathMatch: 'full'},
  { path: '**', redirectTo: '/user/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
