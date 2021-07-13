import { Component, OnInit } from '@angular/core';
import { Globallist } from 'src/app/utilities/globallist';
import { ApiRequestService } from "../../../services/api-request.service";

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  userEmail : string = "";
  email_data: any;
  glist: Globallist = new Globallist();

  constructor(private apirequest: ApiRequestService) { }

  ngOnInit(): void {
  }

  sendEmail(email:any){
    this.glist.printInfo(email);
    let data = { email: email };
    this.apirequest.postAPI('users/sendEmail',data).subscribe(res => {
      this.glist.printInfo(res);
      this.email_data = res;
    });
    
  }

}
