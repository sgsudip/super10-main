import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
var sha1 = require('sha-1');
var crypto1 = require('crypto-js');
var crypto = require('crypto-browserify');
var httpBuildQuery = require('http-build-query');
var uniqid = require('locutus/php/misc/uniqid'); 
var MD5 = require('locutus/php/strings/md5');
var mt_rand=require('locutus/php/math/mt_rand');

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private gameHeaders: any
  private BASE_URL = environment.base_url;
  productSelectionSaved: boolean = true;

  constructor(private http: HttpClient) {
  }

//   these functions will be called from the header.component.ts file
  login(data: any) {
    console.log("Login Service");
    console.log(this.BASE_URL);
    let res = this.http.post(`${this.BASE_URL}/login?username=` + data.username + '&password=' + data.password, { headers: this.headers });

    // let uname = res.data.user.username;

    // localStorage.setItem("username",uname);

    return res; 
  }

  register(data: any) {
    return this.http.post(`${this.BASE_URL}/register`,data, { headers: this.headers });
  }

  sendresetmail(data: any){
    data.type = "email";
    data.value = data.email;
    return this.http.post(`${this.BASE_URL}/password/email`,data,{headers: this.headers});
  }

  resetpassword(data:any,token: any){
    data.token = token;
    return this.http.post(`${this.BASE_URL}/password/reset`,data,{headers:this.headers})
  }
}
