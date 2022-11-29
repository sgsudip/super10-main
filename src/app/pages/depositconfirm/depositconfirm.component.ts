import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaymentService } from 'src/app/services/payment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-depositconfirm',
  templateUrl: './depositconfirm.component.html',
  styleUrls: ['./depositconfirm.component.css'],
})
export class DepositconfirmComponent implements OnInit {
  //   transaction id
  public tID: any = '';
  public BASE_URL: any = '';
  private token: any;
  depositForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    public payService: PaymentService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.token = localStorage.getItem("token");
    this.token = JSON.parse(this.token).token;

    this.depositForm = new FormGroup({
      // ValidationCheck.passwordValidator
      email: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.BASE_URL = environment.base_url;

    this.tID = this.route.snapshot.queryParamMap.get('transactionid');

    const depositinfo = this.http.post(`${this.BASE_URL}/user/deposit/getone`,{transactionid: this.tID},{
        headers: {
            'Authorization': "Bearer "+this.token
        }
      });
    
    depositinfo.subscribe((res)=>{
        console.log(res);
    },(e: any)=>{
        console.log(e);
    })

    // console.log(depositinfo);
    console.log(this.tID);
  }

  confirmDeposit(): void {
    this.spinner.show();
    // call the authservice controller
    // let formVal = this.depositForm.value;
    // formVal = { ...formVal, method_code: this.tID };
    this.payService.confirmDeposit(this.tID).subscribe(
      (res: any) => {
        console.log("HI");
        console.log(res);
        if(res.data.gateway_data.redirect){
            this.snackBar.open("Successfully confirmed deposit, Please pay on coinbase page",'',{
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
            });

            // this.router.navigateByUrl(res.data.gateway_data.redirect_url);
          window.open(res.data.gateway_data.redirect_url,"_blank");
        }else{
            this.snackBar.open("Deposit confirmation unsuccessfull, please try after sometime.",'',{
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
            })
            this.router.navigate(['/dashboard']);
        }
        
        // console.log(res);
        //    this.router.navigate(['/dashboard']);
      },
      (err: any) => {
        this.spinner.hide();
        this.modalService.dismissAll();
        console.log(err);
      }
    );
  }
}
