import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposithistory',
  templateUrl: './deposithistory.component.html',
  styleUrls: ['./deposithistory.component.css','./main.css']
})
export class DeposithistoryComponent implements OnInit {

  private deposit : any = "";

  constructor(public router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    
  }

  goToDepositMethods(){
    this.router.navigateByUrl("deposit/methods");
  }

}
