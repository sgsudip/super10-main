import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { UserModuleService } from 'src/app/services/user-module.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router:Router,private spinner: NgxSpinnerService,private userService:UserModuleService,
    private snackBar:MatSnackBar) { }
  cardList:any=[
    {id:1,name:"Balance",amt:0,icon:"fa-wallet"},
    {id:1,name:"Transactions",amt:0,icon:"fa-arrow-right-arrow-left"},
    {id:1,name:"Support Tickets",amt:0,icon:"fa-ticket"},
    {id:1,name:"Total Bets",amt:0,icon:"fa-cubes-stacked"},
    {id:1,name:"Pending Bets",amt:0,icon:"fa-spinner"},
    {id:1,name:"Won Bets",amt:0,icon:"fa-trophy"},
    {id:1,name:"Lose Bets",amt:0,icon:"fa-face-frown"},
    {id:1,name:"Refund Bets",amt:0,icon:"fa-hand-holding-dollar"},
  ]
currentMenu:any;
currentHeader:any="Dashboard";
dashData:any;
userData:any;
userDataForm:any;

  ngOnInit(): void {
    this.userDataForm = new FormGroup({
			// ValidationCheck.passwordValidator
			firstName: new FormControl("", [Validators.required]),
			lastName: new FormControl("", [Validators.required]),
			phoneNbr: new FormControl("", [Validators.required]),
			country_code: new FormControl("", [Validators.required]),
			email: new FormControl('', [Validators.required]),
			city: new FormControl('', [Validators.required]),
			zip: new FormControl('', [Validators.required]),
			address: new FormControl('', [Validators.required]),
			state: new FormControl('', [Validators.required]),
			
		  });

    this.spinner.show();
    this.userService.getDashBoard().subscribe(res=>{
    this.dashData=res;
    
    setTimeout(() => {
      this.spinner.hide(); 
    }, 2000);
    },
    err=>{
      this.spinner.hide();
      if(err.status==401){
        this.snackBar.open(`Session Expired`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
        localStorage.clear();
        this.router.navigateByUrl("/home");
      }
      else{
      this.snackBar.open(`Server Error`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
      }
    })
  }
  home(){
    this.router.navigateByUrl("/home")
      }
      menuStatus(ev:any){
         this.currentMenu=ev;
         if(this.currentMenu.includes('profile')){
         this.currentHeader="Profile Setting";
         this.getUser();
         }
         else{
         this.currentHeader="Dashboard";
         }
      }

  getUser(){
    this.spinner.show();
    this.userService.getUser().subscribe((res:any)=>{
      this.userData=res;
      this.userDataForm.get('firstName').setValue(this.userData.firstname);
      this.userDataForm.get('lastName').setValue(this.userData.lastname);
      this.userDataForm.get('phoneNbr').setValue(this.userData.mobile);
      this.userDataForm.get('country_code').setValue(this.userData.country_code);
      this.userDataForm.get('email').setValue(this.userData.email);
      setTimeout(() => {
        this.spinner.hide(); 
      }, 2000);
    },err=>{
      console.log(err)
      this.spinner.hide();
      if(err.status==401){
        this.snackBar.open(`Session Expired`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
        this.router.navigateByUrl("/home");
      }else{
      this.snackBar.open(`Server Error`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
      }
    })
  }
  updateProfile(){
    this.spinner.show();
    let post={
      
    "firstname":this.userDataForm.get('firstName').value,
    "lastname":this.userDataForm.get('lastName').value,
    "address":this.userDataForm.get('address').value,
    "state":this.userDataForm.get('state').value,
    "zip":this.userDataForm.get('zip').value,
    "city":this.userDataForm.get('city').value
    }
    this.userService.updateProfile(post).subscribe(res=>{
      setTimeout(() => {
        this.spinner.hide(); 
      }, 2000);
      this.snackBar.open(`Profile Updated SuccessFully`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
    },err=>{
      this.spinner.hide();
      this.snackBar.open(`Server Error`, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
    })
  }

}
