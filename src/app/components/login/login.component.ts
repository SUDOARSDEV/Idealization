import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppConfig } from "../../utilities/app-config";
import { AuthenticationService } from "../../services/authentication.service";
import { HeaderComponent } from "../Includes/header/header.component";
import { ApiRequestService } from "../../services/api-request.service";
import { CookieService } from "ngx-cookie";
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { Globallist } from '../../utilities/globallist';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform = new FormGroup({email:new FormControl(),password: new FormControl()});
  currentUser: any = {};
  loading: boolean = false;
  glist:Globallist = new Globallist();

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

  CreateLoginForm() {
    this.loginform = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(AppConfig.emailPattern)])],
      'password': ['', Validators.required]
    });
  }
  
  verify(email:any, password:any) {

    this.loading = true;
    this.glist.printInfo(email+password);

    this.authenticationService.login(email, password)
      .subscribe(
        result => {
          this.glist.printInfo(result);
          if (result === true) {
            //login successful
            this.apirequest.getAPI('users/info').subscribe(data => {
              this.currentUser = data;
              this.glist.printInfo(this.currentUser);
              this.loading = false;
              if (this.currentUser.status == true) {
                this.glist.setlocalstorage(JSON.stringify(this.currentUser),'currentUser');
                HeaderComponent.updateCurrentUser.next(true);
                this.router.navigate(['/user/dashboard']);
              }
              else if(this.currentUser.status == false){
                this.authenticationService.logout();
              }

            });
          } else {
            this.loading = false;
            // this.msg_view("Invalid Credential")
          }
        }, error => {
          this.loading = false;
          this.currentUser = error.error;
          this.glist.printInfo(this.currentUser);
        });
  }

}
