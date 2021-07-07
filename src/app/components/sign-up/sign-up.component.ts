import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../Includes/header/header.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PasswordValidation } from "../../utilities/PasswordValidation";
import { AppConfig } from "../../utilities/app-config";
import { AuthenticationService } from "../../services/authentication.service";
import { ApiRequestService } from "../../services/api-request.service";
import { CookieService } from "ngx-cookie";
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm = new FormGroup({email:new FormControl(),password: new FormControl()});
  responseStatus: any = {};
  loading: boolean = false;
  currentUser: any = {};

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private _cookieService: CookieService,
    private apirequest: ApiRequestService,
    private router: Router,
    private authservice: AuthService, 
    ) 
  {}

  ngOnInit(): void {
    this.CreateRegisterForm();
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

  CreateRegisterForm() {
    this.registerForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(AppConfig.emailPattern)])],
      'password': ['', Validators.required]
    },
    // {validator: PasswordValidation.MatchPassword }
    );
  }

  register(formValue: any) {
    // formValue.action = "register";
    // formValue.department_organization = "Unknown";
    // formValue.phone = "Unknown";
    // formValue.company = "Codex";
    // formValue.country = "Pakistan";
    console.log(formValue);
    this.responseStatus = {};
    this.loading = true;
    this.authenticationService.registerUser(formValue).subscribe((res) => {

      console.log(res);
      this.loading = false;
      if (res.status == 'True') {
        this.responseStatus.status = true;
        this.responseStatus.message = "Successfully registered";
        //this.verify(formValue.email, formValue.password);
        // this.msg_view(res.msg);
        this.CreateRegisterForm();
        // this.router.navigate(['/welcome']);
      }
      else if (res.status == 'False') {
        this.responseStatus.status = true;
        this.responseStatus.msg = "Email or username already registered";
        // this.msg_view(res.msg);
      }

    });

  }

  verify(email:any, password:any) {

    this.loading = true;
    this.responseStatus = {};
    console.log(email, password);
    this.authenticationService.login(email, password).subscribe((res) => {
      this.loading = false;
      console.log(res);
      if (res === true) {

        this.apirequest.getUserDetails().subscribe((data) => {
          this.loading = false;
          this.currentUser = data;
          HeaderComponent.updateCurrentUser.next(true);
          //location.reload();
          this.router.navigate(['/user/dashboard']);


        });

      }
    }, (err) => {
      this.loading = false;
      this.responseStatus.status = err.statusText;
      this.responseStatus.msg = "Invalid username or password";
      console.log(err);
    });
  }

}
