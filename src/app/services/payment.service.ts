import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
var crypto = require('crypto-browserify');
var httpBuildQuery = require('http-build-query');
var uniqid = require('locutus/php/misc/uniqid');
var MD5 = require('locutus/php/strings/md5');
var mt_rand = require('locutus/php/math/mt_rand');
var php_array = require('locutus/php/array');
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
    private BASE_URL = environment.base_url;
    private token : any;
  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem("token");
    this.token = JSON.parse(this.token).token;
   }

   initPay(data: any): any {
   return this.http
      .post(`${this.BASE_URL}/user/deposit/insert`,data,{
        headers: {
            'Authorization': "Bearer "+this.token
        }
      });
  }

  confirmDeposit(transactionID: string | null): any{
    return this.http.post(`${this.BASE_URL}/user/deposit/confirm`,{transaction: transactionID},{
        headers: {
            'Authorization': "Bearer "+this.token
        }
      });
  }
}
