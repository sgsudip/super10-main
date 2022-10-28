import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GameapiService } from 'src/app/services/gameapi.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	tabindex: number = -1;
	url: any;
	constructor(public router: Router, private auth: AuthService, private game: GameapiService,
		private sanitize: DomSanitizer) { }

	ngOnInit(): void {
		console.log('hai')
		this.url = this.sanitize.bypassSecurityTrustUrl("https://web.telegram.org/z/");
		// this.auth.get().subscribe(res=>{

		// });
	}


	slides = [
		{ img: "https://staging.slotegrator.com/api/index.php/image/get?hash=e88a563aed2cc6ddbfc263587def1d6d0e0eb145.png" },
		{ img: "https://www.betgames.tv/api/uploads/Bet_Games_Andar_Bahar_Lobby_f1df358bee.jpg" },
		{ img: "https://evoplay.games/wp-content/uploads/2021/03/HEADS-TAILS.jpg" },
		{ img: "https://www.livecasinocomparer.com/wp-content/uploads/2022/03/Evolution-Peek-Baccarat.jpg" }
	];

	gameSlides = [
		{ img: "https://staging.slotegrator.com/api/index.php/image/get?hash=e88a563aed2cc6ddbfc263587def1d6d0e0eb145.png","uuid":"e88a563aed2cc6ddbfc263587def1d6d0e0eb145" },
		{ img: "https://www.betgames.tv/api/uploads/Bet_Games_Andar_Bahar_Lobby_f1df358bee.jpg","uuid":"7a9f06116d98ba9e70337326bcba66879f59c4b9" },
		{ img: "https://evoplay.games/wp-content/uploads/2021/03/HEADS-TAILS.jpg","uuid":"6dd92e63d70c4ad3ad54dd6ddd0fcabd" },
		{ img: "https://www.livecasinocomparer.com/wp-content/uploads/2022/03/Evolution-Peek-Baccarat.jpg","uuid":"5d4a7c0db3433f2384c95af6af7f1feac663c9a3" },
		{ img: "https://www.casinowow.com/media/uploads/Super-Sic-Bo-464x302-5d8e6c5f06577.jpg","uuid":"c7d19abeb8414ff8a0b941bdd9a073cb" },
		{ img: "https://www.esball-onlinebet.com/upload_files/live-dragon-tiger-tips/live-dealer-dragon-tiger-variations-01.jpg","uuid":"5d50a9a7abd64457bdc1b2ea599622c5" },
		{ img: "https://resources.slotbeats.com/slotbeats/2022/03/Screenshot-2022-03-07-at-11.57.23-scaled.jpeg","uuid":"637970099a718a6c55d51c0c05cf3c6ca4113541" },
		{ img: "https://db.sterlingcdn.com/wp-content/uploads/sites/5/2020/11/Hippodrome.jpg","uuid":"e88a563aed2cc6ddbfc263587def1d6d0e0eb145" }
	];
	slideConfig = {
		"slidesToShow": 1,
		"slidesToScroll": 1,
		"centerMode": true,
		"centerPadding": '80px',
		"variableWidth": true,
		'responsive': [
			{
				'breakpoint': 1024,
				'settings': {
					'slidesToShow': 2
				}
			},
			{
				'breakpoint': 600,
				'settings': {
					'slidesToShow': 2,
					"centerMode": false,

				}
			},
			{
				'breakpoint': 480,
				'settings': {
					'slidesToShow': 1,
					"centerMode": false,

				}
			}
		]
	};

	slideGamesConfig = {
		"slidesToShow": 6,
		"slidesToScroll": 1,
		"centerMode": false,
		'responsive': [
			{
				'breakpoint': 1024,
				'settings': {
					'slidesToShow': 3
				}
			},
			{
				'breakpoint': 600,
				'settings': {
					'slidesToShow': 2
				}
			},
			{
				'breakpoint': 480,
				'settings': {
					'slidesToShow': 1
				}
			}
		]
	};

	addSlide() {
		this.slides.push({ img: "http://placehold.it/350x150/777777" })
	}

	removeSlide() {
		this.slides.length = this.slides.length - 1;
	}

	slickInit() {
		console.log('slick initialized');
	}

	breakpoint() {
		console.log('breakpoint');
	}

	afterChange() {
		console.log('afterChange');
	}

	beforeChange() {
		console.log('beforeChange');
	}
	viewall() {
		this.router.navigateByUrl("/viewall")
	}
	viewallpro() {
		this.router.navigateByUrl("/promotion")
	}
	gameDetail() {
		this.router.navigateByUrl("gamedetail");
	}
	async gameInit(i:any) {
		await this.game.fetchGameUrl(i.uuid);
	}

}
