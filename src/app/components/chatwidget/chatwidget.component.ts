import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatwidget',
  templateUrl: './chatwidget.component.html',
  styleUrls: ['./chatwidget.component.css']
})
export class ChatwidgetComponent implements OnInit {

  constructor() { }
  chat:boolean=false;

  ngOnInit(): void {
  }

}
