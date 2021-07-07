import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/services/api-request.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private apirequest: ApiRequestService) { }

  ngOnInit(): void {

  //   this.apirequest.getData().subscribe(res => {
  //   console.log("asd");
    
  //     console.log(res);
  // },error => {
  //  console.log(error);
   
  // });
  }

}
