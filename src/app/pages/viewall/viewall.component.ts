import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.css']
})
export class ViewallComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  gameDetail(){
    this.router.navigateByUrl("gamedetail");
  }

}
