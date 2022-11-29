import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css'],
})
export class GatewayComponent implements OnInit {
  // payment method code
  private code: any = '';
  //   transaction id
  private tID: any = '';
  depositForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    public payService: PaymentService,
    private snackBar: MatSnackBar
  ) {
    this.depositForm = new FormGroup({
      // ValidationCheck.passwordValidator
      email: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.code = this.route.snapshot.queryParamMap.get('code');
  }

  depositMoney(): void {
    this.spinner.show();
    // call the authservice controller
    let formVal = this.depositForm.value;
    formVal = { ...formVal, method_code: this.code };
    this.payService.initPay(formVal).subscribe(
      (res: any) => {
        console.log(res);
        console.log(res.data.deposit.trx);

        setTimeout(() => {
          this.spinner.hide();
        }, 2000);

        // check success status
        if ((res.code = 202 && res.message.success)) {
          let trx = res.data.deposit.trx;

          this.snackBar.open('Deposit created', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });

          //   navigate to confirm deposit url
          this.router.navigate(['/deposit/confirm'], {
            queryParams: { transactionid: trx },
          });
        }

        // if ((res.status = 200)) {
        //   console.log(res);
        // }
      },
      (err: any) => {
        this.spinner.hide();
        this.modalService.dismissAll();
        console.log(err);
      }
    );
  }
}
