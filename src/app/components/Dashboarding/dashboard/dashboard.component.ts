import { Component, OnInit } from '@angular/core';
import { Globallist } from '../../../utilities/globallist';
import { ApiRequestService } from "../../../services/api-request.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  glist: Globallist = new Globallist();
  UserLog : any;

  constructor( private apirequest: ApiRequestService) { }

  ngOnInit(): void {
    this.glist.printInfo(this.glist.getUserinfo());
    this.UserLog = this.glist.getUserinfo();
    this.glist.printInfo(this.UserLog.status);
  }


}
