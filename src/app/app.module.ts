import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/Landing/home/home.component';
import { AboutComponent } from './components/Landing/about/about.component';
import { HeaderComponent } from './components/Includes/header/header.component';
import { FooterComponent } from './components/Includes/footer/footer.component';
import { DashboardComponent } from './components/Dashboarding/dashboard/dashboard.component';
import { ProfileComponent } from './components/Dashboarding/profile/profile.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient , HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { VerificationGuard } from './guards/verification.guard';
import { AuthenticationService } from './services/authentication.service';
import { AuthService } from './services/auth.service';
import { ApiRequestService } from './services/api-request.service';

import { CookieModule, CookieService, CookieOptionsProvider } from 'ngx-cookie';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerificationComponent } from './components/Security/verification/verification.component';
import { SendEmailComponent } from './components/Security/send-email/send-email.component';
import { ResetPasswordComponent } from './components/Security/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    ProfileComponent,
    LoginComponent,
    SignUpComponent,
    VerificationComponent,
    SendEmailComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    CookieModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticationService,
    AuthService,
    ApiRequestService,
    AuthGuard,
    VerificationGuard,
    CookieService,
    { 
      provide: CookieOptionsProvider,
      useValue: {} 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
