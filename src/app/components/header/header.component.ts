import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { GameapiService } from 'src/app/services/gameapi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class HeaderComponent implements OnInit {
  loginBool: boolean = false;
  registerForm: FormGroup;
  signInForm: FormGroup;
  forgotPasswordForm: FormGroup;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    public router: Router,
    private gameService: GameapiService,
    public auth: AuthService,
    private snackBar: MatSnackBar
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    this.signInForm = new FormGroup({
      // ValidationCheck.passwordValidator
      username: new FormControl('', [Validators.required]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    this.registerForm = new FormGroup({
      // ValidationCheck.passwordValidator
      username: new FormControl('', [Validators.required]),
      phoneNbr: new FormControl('', [Validators.required]),

      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });
    this.forgotPasswordForm = new FormGroup({
      // ValidationCheck.passwordValidator
      email: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    // if there is no token
    if (localStorage.getItem('token')) {
      this.loginBool = true;
    }
    this.gameService.getAllGames();
    // this.gameService.getAllGames().subscribe((res: any) => {
    // console.log(res);
    // this.list = res.items;
    // this.list = this.list.filter((result: any) => result.name === "Roulette");
    // console.log(this.list);
    // })
  }

  openlogin(page: any) {
    this.modalService.dismissAll();
    this.modalService.open(page);
  }

  openforgotpassword(forgotpassword: any) {
    this.modalService.dismissAll();
    this.modalService.open(forgotpassword);
    // this.router.navigateByUrl("/password/reset")
  }

  openregister(register: any) {
    this.modalService.dismissAll();
    this.modalService.open(register);
  }

  goToDashboard() {
    // console.log('Go to dashboard');
    this.router.navigateByUrl('/dashboard');
  }

  home() {
    this.router.navigateByUrl('/home');
  }

  // as the name suggests this function is used to execute the login process for the user, this controller is run by the login modal
  loginUser() {
    // show the spinner, when a response is received either, success or failure we havve to close the spinner
    this.spinner.show();
    // call the authservice controller
    this.auth.login(this.signInForm.value).subscribe(
      (res: any) => {
        console.log(res);
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
        // check response code and depending on that redirect to a specific page
        if (res.code == 401 || res.code != 200) {
        //   console.log('Here is the response object \n');
          console.log(res);
        //   console.log('no success response');
          this.snackBar.open(`Please enter Valid data`, '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        } else {
        //   console.log('The response object \n');
          console.log(res);
          // get the accesstoken for the user
          localStorage.clear();
          let token = res.data.access_token;
          // set the token in localstorage
          localStorage.setItem('token', JSON.stringify({
            "token": token
          }));
        //   set username
          let uname = res.data.user.username;
          localStorage.setItem('username', uname);
          // close all modals
          this.modalService.dismissAll();

          // open the box, basically a notification alert type box, shallow men with insecure egos like to call it a snack or a toast or something that humans eat because you dont need to name things sensibly, you can just
          this.snackBar.open(`Logged In SuccessFully`, '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          // navigate to the dashboard object if response is successfull
          this.router.navigateByUrl('/dashboard');
        }
      },
      (err) => {
        this.spinner.hide();
        this.modalService.dismissAll();
        // this.snackBar.open(`Please enter Valid data`, '', {
        //   duration: 3000,
        //   verticalPosition: 'top',
        //   horizontalPosition: 'center',
        // });
      }
    );
    // login function ended
  }
  registerUser() {
    this.spinner.show();
    let post = {
      mobile_code: '+91',
      mobile: this.registerForm.get('phoneNbr')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      password_confirmation: this.registerForm.get('password')?.value,
      username: this.registerForm.get('username')?.value,
      country_code: 'IN',
      country: 'India',
      agree: 1,
    };
    this.auth.register(post).subscribe(
      (res: any) => {
        console.log(res);
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
        this.modalService.dismissAll();

        // if the user is created
        if (res.status == 'ok' && res.code == 200) {
        //   console.log('Registration successfull');
          this.snackBar.open(`Registered SuccessFully`, '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.modalService.dismissAll();
          console.log(this.modalService);
          return;
        }

        if (res.code == 401 || res.code != 200) {
            console.log(res.code);
        //   this.snackBar.open(`Please enter Valid data`, '', {
        //     duration: 3000,
        //     verticalPosition: 'top',
        //     horizontalPosition: 'center',
        //   });
        } else {
          if (res.code == 200) {
            // if message contains error
            if (res.message.error) {
                console.log(res.message.error);
            //   this.snackBar.open(
            //     `Please Enter Valid and Unique Credentials`,
            //     '',
            //     {
            //       duration: 3000,
            //       verticalPosition: 'top',
            //       horizontalPosition: 'center',
            //     }
            //   );
            } else {
            //   console.log('Registration successfull');
              this.snackBar.open(`Registered SuccessFully`, '', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });
              this.modalService.dismissAll();
            }
          }
        }
      },
      (err) => {
        this.spinner.hide();
        this.modalService.dismissAll();
        // this.snackBar.open(`Please enter Valid data`, '', {
        //   duration: 3000,
        //   verticalPosition: 'top',
        //   horizontalPosition: 'center',
        // });
      }
    );
  }

  // call reset password from auth
  resetpassword() {
    this.spinner.show();
    let postData = {
      email: this.forgotPasswordForm.get('email')?.value,
    };
    this.auth.sendresetmail(postData).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        // console.log('Email sent');
        this.modalService.dismissAll();
        this.router.navigateByUrl('home');
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
    });
  }
  // logout of the website
  logout() {
    // empty the localstorage
    localStorage.clear();
    // set login bool to true indicating that the user needs to login
    this.loginBool = false;
  }
}
