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
	loginUser() {
		this.spinner.show();
		this.auth.login(this.signInForm.value).subscribe((res: any) => {
			setTimeout(() => {
				this.spinner.hide();
			}, 2000);
			if (res.code == 401 || res.code != 200) {
				this.snackBar.open(`Please enter Valid data`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
			}
			else {
				const token = res.data.access_token;
				this.modalService.dismissAll();
				localStorage.setItem("token", JSON.stringify(token))
				this.snackBar.open(`Logged In SuccessFully`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
				this.router.navigateByUrl("/dashboard")
			}
		}, err => {
			this.spinner.hide();
			this.modalService.dismissAll();
			this.snackBar.open(`Please enter Valid data`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
		})

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
