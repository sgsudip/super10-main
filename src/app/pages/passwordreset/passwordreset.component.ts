import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css'],
})
export class PasswordresetComponent implements OnInit {
  token: string | null;
  forgotPasswordForm: FormGroup;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    public auth: AuthService
  ) {
    this.token = this._Activatedroute.snapshot.paramMap.get('token');
    this.forgotPasswordForm = new FormGroup({
      // ValidationCheck.passwordValidator
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {}

  resetpassword() {
    this.spinner.show();
    let postData = {
      email: this.forgotPasswordForm.get('email')?.value,
      password:this.forgotPasswordForm.get('password')?.value,
      password_confirmation:this.forgotPasswordForm.get('password_confirmation'),
      token:this.token,
    };
    this.auth.resetpassword(postData).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        console.log('Email sent');
      }
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
      // if (res.code == 401 || res.code != 200) {
      // 	this.snackBar.open(`Please enter Valid data`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
      // }
      // else {
      // 	if (res.code == 200) {
      // 		if (res.message.error) {
      // 			this.snackBar.open(`Please Enter Valid and Unique Credentials`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
      // 		}
      // 		else {
      // 			this.snackBar.open(`Registered SuccessFully`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
      // 			this.modalService.dismissAll();
      // 		}
      // 	}
      //
    });
  }
}
