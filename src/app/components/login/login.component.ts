import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppConfig } from "../../utilities/app-config";
import { AuthenticationService } from "../../services/authentication.service";
import { HeaderComponent } from "../Includes/header/header.component";
import { ApiRequestService } from "../../services/api-request.service";
import { CookieService } from "ngx-cookie";
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform = new FormGroup({email:new FormControl(),password: new FormControl()});
  currentUser: any = {};
  responseStatus: any = {};
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private authservice: AuthService, 
    private _cookieService: CookieService, 
    private apirequest: ApiRequestService, 
    private router: Router) {}

  ngOnInit(): void {
    this.CreateLoginForm();
    let access_token = this._cookieService.get('token');
    if (access_token) {
      // console.log(access_token);
      console.log(this.authservice.isAuthenticated());
      if (this.authservice.isAuthenticated()) {
        console.log("logout out, redirecting to login");
        this.authenticationService.logout();
        this.router.navigate(['/welcome']);
      }
      else {
        console.log("redirecting");
        this.router.navigate(['/user/dashboard']);

      }

    }
  }

  CreateLoginForm() {
    this.loginform = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(AppConfig.emailPattern)])],
      'password': ['', Validators.required]
    });
  }
  verify(email:any, password:any) {

    this.loading = true;
    this.responseStatus = {};
    console.log(email, password);

    this.authenticationService.login(email, password)
      .subscribe(
        result => {
          console.log(result);
          if (result === true) {
            //login successful
            this.apirequest.getUserDetails().subscribe(data => {
              this.currentUser = data;
              console.log(this.currentUser);
              this.loading = false;
              if (this.currentUser.status == 1) {
                // $('#Loginmodal').modal('close');
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                HeaderComponent.updateCurrentUser.next(true);
                this.router.navigate(['/user/dashboard']);
              }
              else if(this.currentUser.status == 0){
                this.authenticationService.logout();

              }

            });
          } else {
            this.loading = false;
            // this.msg_view("Invalid Credential")
          }
        }, error => {
          this.loading = false;
          this.responseStatus = error;
          console.log(this.responseStatus.error);
        });
  }

}
