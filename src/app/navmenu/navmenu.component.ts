import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {
  
  menu:any=[{id:0,name:"Home"},{id:0,name:"Blog"},
  {id:1,name:"About"},{id:2,name:"Affilate"},{id:3,name:"Contact"}];
  profileMenu:any=[{id:0,name:"Dashboard"},{id:1,name:"My Bets"},
  {id:2,name:"Profile Setting",},{id:3,name:"Change Password"},{id:4,name:"2FA Security"},
  {id:5,name:"Deposit History"},{id:6,name:"Withdrawal"},{id:7,name:"Transcations"},
  {id:8,name:"Referral"},{id:9,name:"Logout"}
];
mobileWidth:boolean=false;
menuBarClick:boolean=false;
@Output() menuItemStatus = new EventEmitter<string>();
profileView:any;
userMenuClick:boolean=false;

  constructor(public router:Router) { }

  ngOnInit(): void {
    if(window.innerWidth <=600){
    this.mobileWidth=true;
    this.menu.push({id:4,name:"User Menu"})
    }
    else{
    this.mobileWidth=false;
    this.menu.filter((res:any)=>res.id!=4);
    }
    
  }
  home(){
    this.router.navigateByUrl("/home")
      }
      menuChange(){
        this.menuBarClick=!this.menuBarClick
      }
      changeView(data:any){
       if(data.includes('Profile')){
       this.profileView="true";
       this.menuItemStatus.emit('profile');
       }
       else if(data.includes('Logout')){
       localStorage.clear();
       this.router.navigateByUrl("/home");
       }
       else{
        this.menuItemStatus.emit('dashboard');
       }
      }
      menuRoute(data:any){
      if(data.includes('User Menu')){
      this.userMenuClick=!this.userMenuClick;
      }
      else{
        if(data.includes('Profile')){
          this.menuItemStatus.emit('profile');
          this.menuBarClick=false;       
        }
        else if(data.includes('Logout')){
          localStorage.clear();
          this.router.navigateByUrl("/home");
          }
        else{
          this.menuItemStatus.emit('dashboard');
          this.menuBarClick=false;       
         }
      }

      }
}
