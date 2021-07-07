import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from "../../../services/api-request.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  email : string = '';

  constructor( private apirequest: ApiRequestService, private route:ActivatedRoute , private router: Router) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.params['emailId'];
    console.log(this.email);    
  }

  update(){
    let data = { userId: this.email};
    console.log(data);
    
    this.apirequest.getUserVerify(data).subscribe(data => {
      console.log(data);
    });
  }

}
