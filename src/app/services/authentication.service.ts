import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  
  baseUrl: string = environment.BASE_URL;
  requestHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private _cookieService: CookieService) { }

  login(email:any, password:any) {
    return this.http.post<any>(this.baseUrl + 'users/login', {
      email : email,
      password : password
    }, { headers: this.requestHeaders }).pipe(map(response => {
       let data = response;
      if(data){
        if (data.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          //let user = data.user;
          let token = data.token;
          this._cookieService.put("token", token);
          localStorage.setItem('token', token);

          return true;
        }
        else {
          return false;
        }
      }
      else{
        console.log("login error");
      }

      return response;
    }));
  }
  registerUser(data: any) {
    return this.http.post<any>(this.baseUrl + 'users/signup', data, { headers: this.requestHeaders }).pipe(map(response => {
      return response;
    }));
  }
  logout() {
    this._cookieService.removeAll();
    localStorage.removeItem('currentUser');
    localStorage.clear();
  }
}
