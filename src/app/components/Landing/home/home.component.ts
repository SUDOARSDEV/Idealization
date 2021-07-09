import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/services/api-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  CourseList:any;

  constructor(private apirequest: ApiRequestService) { }

  ngOnInit(): void {
    this.getCoursesList();
  }

  getCoursesList(){ 
    this.apirequest.getAPI('courses').subscribe(res => {
        console.log(res);
        this.CourseList = res;
        console.log(this.CourseList.courses);
        
    }, error => {
     console.log(error);
     this.CourseList = 'error';
    }); 
  }

}
