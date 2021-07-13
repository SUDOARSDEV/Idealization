import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { Globallist } from 'src/app/utilities/globallist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  CourseList:any;
  glist: Globallist = new Globallist();

  constructor(private apirequest: ApiRequestService) { }

  ngOnInit(): void {
    this.getCoursesList();
  }

  getCoursesList(){ 
    this.apirequest.getAPI('courses').subscribe(res => {
        this.glist.printInfo(res);
        this.CourseList = res;
        this.glist.printInfo(this.CourseList.courses);        
    }, error => {
     this.glist.printInfo(error);
     this.CourseList = 'error';
    }); 
  }

}
