import { Component, OnInit } from '@angular/core';
import { Globallist } from '../../../utilities/globallist';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiRequestService } from '../../../services/api-request.service';
import { AuthenticationService } from '../../../services/authentication.service';

declare var Toastify:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  glist: Globallist = new Globallist();
  userinfo:any;
  UpdateForm = new FormGroup({email:new FormControl(),username: new FormControl()});

  constructor( 
     private apirequest: ApiRequestService,
     private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.userinfo = this.glist.getUserinfo();
    this.glist.printInfo(this.userinfo);
    this.UpdateForm.controls['username'].setValue(this.userinfo?.username);
    this.UpdateForm.controls['email'].setValue(this.userinfo?.email);
  }

  Message(data:any){
    Toastify({
      text: data,
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      // backgroundColor: "#323232",
      stopOnFocus: true, // Prevents dismissing of toast on hover
      onClick: function(){} // Callback after click
    }).showToast();    
  }

  Update(formValue: any){
    let data = [
      {"propName":"username","value":  formValue.username},
      {"propName":"email","value":  formValue.email}
    ]
    this.glist.printInfo(data);
    this.apirequest.patchAPI('users/'+this.userinfo._id,data).subscribe(res => {
      this.glist.printInfo(res);
      let response : any = res;
      if(response.status == true){
        this.Message("Update Information");
        this.apirequest.getAPI('users/info').subscribe(data => {
          let datacall: any = data;
          if (datacall.status == true) {
            this.glist.setlocalstorage(JSON.stringify(datacall),'currentUser');
            this.ngOnInit();
          }
          else if(datacall.status == false){
            this.Message(datacall.message);
          }

        });
      }
    });
  }

  Delete(){
    this.apirequest.DeleteAPI('users',this.userinfo._id).subscribe(res => {
      this.glist.printInfo(res);
      let response: any = res;
      if(response.status == true){
        this.Message(response.message);
        this.authenticationService.logout();
        location.reload();
      } else {
        this.Message(response.message);
      }
    });
  }

}
