import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from "../../../services/api-request.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Globallist } from 'src/app/utilities/globallist';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  email : string = '';
  verify_status:any ;
  glist: Globallist = new Globallist();

  constructor( private apirequest: ApiRequestService, private route:ActivatedRoute , private router: Router) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.params['emailId'];
    this.glist.printInfo(this.email);    
  }

  update(){
    let data = { userId: this.email};
    this.glist.printInfo(data);
    
    this.apirequest.postAPI('users/verify',data).subscribe(res => {
      console.log(res);
      this.verify_status = res;
    });
  }

}
