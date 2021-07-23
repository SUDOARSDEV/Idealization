import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { Globallist } from 'src/app/utilities/globallist';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

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
