import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PasswordValidation } from "../../../utilities/PasswordValidation";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiRequestService } from "../../../services/api-request.service";
import { Globallist } from '../../../utilities/globallist';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email : string = '';
  resetPasswordForm = new FormGroup({password:new FormControl(),confirmpassword: new FormControl()});
  reset_pwd_data:any;
  glist: Globallist = new Globallist();

  constructor(private fb: FormBuilder, private route:ActivatedRoute, private router: Router, private apirequest: ApiRequestService) {
    this.resetPasswordForm = fb.group({
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    },
    {
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }


  ngOnInit(): void {
    this.email = this.route.snapshot.params['emailId'];
  }

  resetPassword(value: any){
    let data = {
      email : this.email,
      newpassword : value.password
    }
    this.apirequest.postAPI('users/resetPassword',data).subscribe(res => {
      this.glist.printInfo(res);
      this.reset_pwd_data = res;
    });
  }
}
