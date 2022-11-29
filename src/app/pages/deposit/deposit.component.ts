import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css','./main.css']
})
export class DepositComponent implements OnInit {

  constructor(public router: Router, public payService: PaymentService) { }

  gatewayList: any = [
    { id: 1, name: 'Coinbase', amt: 0, icon: 'fa-wallet', componentpath: 'coinbase' },
  ];

  ngOnInit(): void {

  }

  goToPayment(item: any){
    if(item.name=="Coinbase"){
        this.router.navigate(['/payments/coinbase'], { queryParams: { code: 506} });
    }
    // if(item.name=="Coinbase"){
    //     this.payService.initCoinbase().subscribe((res: any)=>{
    //         console.log(res);
    //     },(err: any)=>{
    //         console.log(err);
    //     })
    // }
    // this.router.navigateByUrl("/payments/"+item.componentpath);
  }

 

}
