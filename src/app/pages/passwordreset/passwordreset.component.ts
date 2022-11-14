import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { GameapiService } from 'src/app/services/gameapi.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css'],
})
export class PasswordresetComponent implements OnInit {
  //   private router : Router;
  public token: string | number | null;
  public resetPasswordForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    public router: Router,
    private modalService: NgbModal,
    private gameService: GameapiService,
    public auth: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.token = null;
    this.resetPasswordForm = new FormGroup({
      // ValidationCheck.passwordValidator
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  resetpassword() {
    // this.spinner.show();
    // call the authservice controller
    this.auth.resetpassword(this.resetPasswordForm.value,this.token).subscribe(
      (res: any) => {
        console.log(res);
        // if (res.code == 401 || res.code != 200) {
        //   console.log('Here is the response object \n');
        //   console.log(res);
        //   console.log('no success response');
        //   this.snackBar.open(`Please enter Valid data`, '', {
        //     duration: 3000,
        //     verticalPosition: 'top',
        //     horizontalPosition: 'center',
        //   });
        // } else {
        //   console.log('The response object \n');
        //   console.log(res);
        //   const token = res.data.access_token;
        //   this.modalService.dismissAll();
        //   localStorage.setItem('token', JSON.stringify(token));
        //   this.snackBar.open(`Logged In SuccessFully`, '', {
        //     duration: 3000,
        //     verticalPosition: 'top',
        //     horizontalPosition: 'center',
        //   });
        //   this.router.navigateByUrl('/dashboard');
        // }
      },
      (err) => {
        this.spinner.hide();
        this.modalService.dismissAll();
        this.snackBar.open(`Please enter Valid data`, '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    );
  }
}
