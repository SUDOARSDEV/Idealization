import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  BASE_URL = environment['BASE_URL'];

  constructor(private http: HttpClient) { }

  getAPI(RouteName:any) {
    return this.http.get(`${this.BASE_URL}${RouteName}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getAPI_id(RouteName:any,RouteId:any) {
    return this.http.get(`${this.BASE_URL}${RouteName}/${RouteId}`).pipe(
      map(response => {
        return response;
      })
    );
  }

  postAPI(RouteName:any,Data:any) {
    return this.http.post(`${this.BASE_URL}${RouteName}`, Data).pipe(
      map(response => {        
        return response;
      })
    );


  }

}
