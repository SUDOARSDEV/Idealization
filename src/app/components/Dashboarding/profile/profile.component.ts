import { Component, OnInit } from '@angular/core';
import { Globallist } from '../../../utilities/globallist';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiRequestService } from '../../../services/api-request.service';

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

  constructor( private fb: FormBuilder, private apirequest: ApiRequestService) { }

  ngOnInit(): void {
    this.userinfo = this.glist.getUserinfo();
    this.glist.printInfo(this.userinfo);
    this.UpdateForm.controls['username'].setValue(this.userinfo?.username);
    this.UpdateForm.controls['email'].setValue(this.userinfo?.email);
  }

  Message(){
    Toastify({
      text: "This is a toast",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      backgroundColor: "#323232",
      stopOnFocus: true, // Prevents dismissing of toast on hover
      onClick: function(){} // Callback after click
    }).showToast();    
  }

  Update(formValue: any){
    this.glist.printInfo(formValue);
  }

}
