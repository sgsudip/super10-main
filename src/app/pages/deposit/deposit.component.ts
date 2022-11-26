import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css','./main.css']
})
export class DepositComponent implements OnInit {

  constructor(public router: Router) { }

  gatewayList: any = [
    { id: 1, name: 'Coinbase', amt: 0, icon: 'fa-wallet', componentpath: 'coinbase' },
  ];

  ngOnInit(): void {

  }

  goToPayment(item: any){
    this.router.navigateByUrl("/payments/"+item.componentpath)
  }

}
