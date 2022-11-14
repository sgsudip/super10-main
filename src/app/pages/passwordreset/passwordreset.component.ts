import { Component, OnInit } from '@angular/core';
import { Form, FormGroup,FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {
//   private router : Router; 
  public token : string | number | null;
  public resetPasswordForm : FormGroup;

  constructor(private route : ActivatedRoute) { 
    this.token = null;
    this.resetPasswordForm = new FormGroup({
        // ValidationCheck.passwordValidator
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        password_confirmation: new FormControl('',[Validators.required])
      });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get("token");
  }

}
