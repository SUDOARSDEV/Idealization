import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class VerificationGuard implements CanActivate {
  
  constructor(private router: Router, private _cookieService : CookieService) { }
  
  canActivate() {
    if (localStorage.getItem('currentUser') && this._cookieService.get("token")) {
        let data:any = localStorage.getItem('currentUser');
        let currentUser = JSON.parse(data);
        if(currentUser.status == "0"){
          return true;
        }
    }
    // not logged in so redirect to login page
    this.router.navigate(['/user/dashboard']);
    return false;
  } 
}
