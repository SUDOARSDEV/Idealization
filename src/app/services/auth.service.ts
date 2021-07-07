import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private _cookieService : CookieService) { }

  public getToken(): string {
    return this._cookieService.get('token');
  }

  public isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    console.log(helper.isTokenExpired(token));
    return helper.isTokenExpired(token);
  }

}
