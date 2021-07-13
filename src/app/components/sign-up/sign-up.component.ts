import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppConfig } from "../../utilities/app-config";
import { AuthenticationService } from "../../services/authentication.service";
import { CookieService } from "ngx-cookie";
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { Globallist } from 'src/app/utilities/globallist';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm = new FormGroup({email:new FormControl(),password: new FormControl(),username: new FormControl()});
  loading: boolean = false;
  currentUser: any = {};
  glist: Globallist = new Globallist();

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private _cookieService: CookieService,
    private router: Router,
    private authservice: AuthService, 
    ) 
  {}

  ngOnInit(): void {
    this.CreateRegisterForm();
    let access_token = this._cookieService.get('token');
    if (access_token) {
      // console.log(access_token);
      this.glist.printInfo(this.authservice.isAuthenticated());
      if (this.authservice.isAuthenticated()) {
        this.glist.printInfo("logout out, redirecting to login");
        this.authenticationService.logout();
        this.router.navigate(['/welcome']);
      }
      else {
        this.glist.printInfo("redirecting");
        this.router.navigate(['/user/dashboard']);
      }

    }
  }

  CreateRegisterForm() {
    this.registerForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(AppConfig.emailPattern)])],
      'password': ['', Validators.required],
      'username': ['', Validators.required]
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
    this.glist.printInfo(formValue);
    this.loading = true;
    this.authenticationService.registerUser(formValue).subscribe((res) => {

      this.glist.printInfo(res);
      this.loading = false;
      if (res.status == true) {
        this.currentUser = res;
        //this.verify(formValue.email, formValue.password);
        // this.msg_view(res.msg);
        this.CreateRegisterForm();
        // this.router.navigate(['/welcome']);
      }
      else if (res.status == false) {
        this.currentUser = res;
        // this.msg_view(res.msg);
      }

    });

  }

}
