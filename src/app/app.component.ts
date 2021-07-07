import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Idealation';
  currentUser;

  constructor(private authenticationservice: AuthenticationService, private router: Router, private _cookieService: CookieService) 
  {
    let access_token = this._cookieService.get('token');
    // console.log(access_token);
    if (access_token) {
      let data :any =localStorage.getItem('currentUser');
      this.currentUser = JSON.parse(data);
    } else {
      localStorage.clear();
      this.currentUser = undefined;
    }
    
  }

  public callback() {
    console.log('Time out');
    this.authenticationservice.logout();
    location.reload();
    localStorage.removeItem('currentUser');
    localStorage.clear();
    this.router.navigate(['/login']);
    this.currentUser = undefined;

  }
}
