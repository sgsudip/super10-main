import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposithistory',
  templateUrl: './deposithistory.component.html',
  styleUrls: ['./deposithistory.component.css','./main.css']
})
export class DeposithistoryComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  goToDeposit(){
    this.router.navigateByUrl("deposit");
  }

}
