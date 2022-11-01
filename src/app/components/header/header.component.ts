import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from "ngx-spinner";
import { GameapiService } from 'src/app/services/gameapi.service';
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	providers: [NgbModalConfig, NgbModal]
})
export class HeaderComponent implements OnInit {
	signInForm: FormGroup;
	loginBool: boolean = true;
	registerForm: FormGroup;
	

	constructor(config: NgbModalConfig,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService,
		public router: Router,
		private gameService: GameapiService,
		public auth: AuthService, private snackBar: MatSnackBar) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
		this.signInForm = new FormGroup({
			// ValidationCheck.passwordValidator
			username: new FormControl("", [Validators.required]),

			password: new FormControl('', [Validators.required, Validators.minLength(8)]),

		});
		this.registerForm = new FormGroup({
			// ValidationCheck.passwordValidator
			username: new FormControl("", [Validators.required]),
			phoneNbr: new FormControl("", [Validators.required]),

			password: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required]),

		});
	}

	ngOnInit(): void {
		if (localStorage.getItem('token')) {
			this.loginBool = false;
		}
		// this.gameService.getAllGames().subscribe((res: any) => {
		// 	this.list = res.items;
		// 	this.list = this.list.filter((result: any) => result.name === "Roulette");
		// 	console.log(this.list)
		// })
	}

	open(login: any) {
		this.modalService.open(login);
	}

	regopen(register: any) {
		this.modalService.open(register);
	}
	home() {
		this.router.navigateByUrl("/home")
	}
    // as the name suggests this function is used to execute the login process for the user, this controller is run by the login modal
	loginUser() {
        // show the spinner, when a response is received either, success or failure we havve to close the spinner
		this.spinner.show();
        // call the authservice controller
		this.auth.login(this.signInForm.value).subscribe((res: any) => {
			setTimeout(() => {
				this.spinner.hide();
			}, 2000);
            // check response code and depending on that redirect to a specific page
			if (res.code == 401 || res.code != 200) {
                console.log("Here is the response object \n");
                console.log(res);
                console.log("no success response");
				this.snackBar.open(`Please enter Valid data`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
			}
			else {
                console.log("The response object \n");
                console.log(res);
                // get the accesstoken for the user
				const token = res.data.access_token;
                // close all modals
				this.modalService.dismissAll();
                // set the token in localstorage
				localStorage.setItem("token", JSON.stringify(token));
                // open the box, basically a notification alert type box, shallow men with insecure egos like to call it a snack or a toast or something that humans eat because you dont need to name things sensibly, you can just 
				this.snackBar.open(`Logged In SuccessFully`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
                // navigate to the dashboard object if response is successfull
				this.router.navigateByUrl("/dashboard");
			}
		}, err => {
			this.spinner.hide();
			this.modalService.dismissAll();
			this.snackBar.open(`Please enter Valid data`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
		})
        // login function ended

	}
	registerUser() {
		this.spinner.show();
		let post =
		{
			"mobile_code": "+91",
			"mobile": this.registerForm.get('phoneNbr')?.value,
			"email": this.registerForm.get('email')?.value,
			"password": this.registerForm.get('password')?.value,
			"password_confirmation": this.registerForm.get('password')?.value,
			"username": this.registerForm.get('username')?.value,
			"country_code": "IN",
			"country": "India",
			"agree": 1
		}
		this.auth.register(post).subscribe((res: any) => {
			setTimeout(() => {
				this.spinner.hide();
			}, 2000);
			if (res.code == 401 || res.code != 200) {
				this.snackBar.open(`Please enter Valid data`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
			}
			else {
				if (res.code == 200) {
					if (res.message.error) {
						this.snackBar.open(`Please Enter Valid and Unique Credentials`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
					}
					else {
						this.snackBar.open(`Registered SuccessFully`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
						this.modalService.dismissAll();
					}
				}
			}
		}, err => {
			this.spinner.hide();
			this.modalService.dismissAll();
			this.snackBar.open(`Please enter Valid data`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
		})

	}
	logout() {
		localStorage.clear();
		this.loginBool = true
	}
}
