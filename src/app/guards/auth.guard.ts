import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _cookieService : CookieService) { }

  canActivate() {
    if (localStorage.getItem('currentUser') && this._cookieService.get("token")) {
        return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/welcome']);
    return false;
  }
  
}
