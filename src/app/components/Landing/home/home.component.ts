import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/services/api-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
