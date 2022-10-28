import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserModuleService {
  private headers:any;
  private gameHeaders: any
  private BASE_URL = environment.base_url;
  token:any;
  constructor(private http: HttpClient) {
    this.token=localStorage.getItem("token");
    if(this.token){
     this.token= JSON.parse(this.token)
    }
   }
  getDashBoard() {

    this.headers=new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`});
    return this.http.get(`${this.BASE_URL}/user/dashboard`, { headers: this.headers });
  }

  getUser(){
    this.headers=new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`});
    return this.http.get(`${this.BASE_URL}/user/getUser`, { headers: this.headers });
  }
  updateProfile(data:any){
    this.headers=new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`});
    return this.http.post(`${this.BASE_URL}/user/profile-setting`,data, { headers: this.headers });
  }
}
