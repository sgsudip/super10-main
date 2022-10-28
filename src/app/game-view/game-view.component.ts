import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GameapiService } from '../services/gameapi.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit {
  url:any;
  constructor(private sanitizer:DomSanitizer,private gameapi:GameapiService) { }

  ngOnInit(): void {

   this.url= this.sanitizer.bypassSecurityTrustResourceUrl(this.gameapi.gameUrl);

  }

}
