import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class NavmenuComponent implements OnInit {
  loginBool: boolean = false;
  menu: any = [
    { id: 0, name: 'Home', componentpath: '/home' },
    { id: 0, name: 'Blog', componentpath: '/blog' },
    { id: 1, name: 'About', componentpath: '/about' },
    { id: 2, name: 'Affilate', componentpath: '/affiliate' },
    { id: 3, name: 'Contact', componentpath: '/contact' },
  ];
  profileMenu: any = [
    { id: 0, name: 'Dashboard', componentpath: '/dashboard' },
    { id: 1, name: 'My Bets', componentpath: '/mybets' },
    { id: 2, name: 'Profile Setting', componentpath: '/profilesetting' },
    { id: 3, name: 'Change Password', componentpath: '/changepassword' },
    { id: 4, name: '2FA Security', componentpath: '/twofactor' },
    { id: 5, name: 'Deposit History', componentpath: 'deposit/history'},
    { id: 6, name: 'Withdrawal', component: "withdraw/history" },
    { id: 7, name: 'Transactions', componentpath: 'transactions' },
    { id: 8, name: 'Referral', componentpath: 'referral/commisions' },
    { id: 9, name: 'Logout' },
  ];
  mobileWidth: boolean = false;
  menuBarClick: boolean = false;
  @Output() menuItemStatus = new EventEmitter<string>();
  profileView: any;
//   renders the profile menu
  userMenuClick: boolean = false;

  constructor(config: NgbModalConfig,
    private modalService: NgbModal,public router: Router) {}

  ngOnInit(): void {
    this.loginBool=this.isLoggedIn();
    if (window.innerWidth <= 600) {
      this.mobileWidth = true;
      this.menu.push({ id: 4, name: 'User Menu' });
    } else {
      this.mobileWidth = false;
      this.menu.filter((res: any) => res.id != 4);
    }
  }

  isLoggedIn(){
    if(localStorage.getItem("token")){
        return true;
    }else{
        return false;
    }
  }
  open(page: any) {
    this.modalService.open(page);
  }

  home() {
    this.router.navigateByUrl('/home');
  }

  menuChange() {
    this.menuBarClick = !this.menuBarClick;
  }

 
  openpage(item: any){
   if(item.name.includes('Logout')){
        localStorage.clear();
        this.router.navigateByUrl('/home');
    }else{
        this.router.navigateByUrl(item.componentpath);
    }
  }


  menuRoute(item: any) {
    if (item.name.includes('User Menu')) {
      this.userMenuClick = !this.userMenuClick;
    } else {
      if (item.name.includes('Profile')) {
        this.menuItemStatus.emit('profile');
        this.menuBarClick = false;
      } else if (item.name.includes('Logout')){
        localStorage.clear();
        this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl
      }
    }
  }
}
