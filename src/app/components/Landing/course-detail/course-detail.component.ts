import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from "../../../services/api-request.service";
import { ActivatedRoute } from "@angular/router";
import { Globallist } from 'src/app/utilities/globallist';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  courseid : string = '';
  glist: Globallist = new Globallist();
  coursedetail:any;

  constructor( private apirequest: ApiRequestService, private route:ActivatedRoute ) { }

  ngOnInit(): void {
    this.courseid = this.route.snapshot.params['courseId'];
    this.glist.printInfo(this.courseid);
    this.CourseDataFetch();  
  }

  CourseDataFetch(){
    this.apirequest.getAPI_id('courses', this.courseid).subscribe(res => {
      this.glist.printInfo(res);
      let courseinfo:any = res;
      if(courseinfo.status == true) {
        this.coursedetail = courseinfo.course;
      } else {
        this.glist.printInfo(courseinfo);
      }

    });
  }

}
