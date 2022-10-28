import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-gamedetail',
	templateUrl: './gamedetail.component.html',
	styleUrls: ['./gamedetail.component.css']
})
export class GamedetailComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	gameSlides = [
		{ img: "https://db.sterlingcdn.com/wp-content/uploads/sites/5/2022/01/zeusthumb.png"},
		{ img: "https://db.sterlingcdn.com/wp-content/uploads/sites/5/2020/04/TopCard-Thumb.jpg" },
		{ img: "https://db.sterlingcdn.com/wp-content/uploads/sites/5/2020/11/DragonPearls.jpg" },
		{ img: "https://db.sterlingcdn.com/wp-content/uploads/sites/5/2022/05/BookdelSolThumb.jpg" },
		{ img: "https://db.sterlingcdn.com/wp-content/uploads/sites/5/2022/05/WaterBloxGigabloxThumb.jpg" },
		{ img: "https://db.sterlingcdn.com/wp-content/uploads/sites/5/2022/04/Lucky-Pot.jpg" },
		{ img: "https://db.sterlingcdn.com/wp-content/uploads/sites/5/2021/11/LightningBJ-Live-Thumb.jpg" },
		{ img: "https://db.sterlingcdn.com/wp-content/uploads/sites/5/2020/11/Hippodrome.jpg" }
	];
	slideConfig = {
		"slidesToShow": 1,
		"slidesToScroll": 1,
		"centerMode": true,
		"centerPadding": '80px'
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
	}

	removeSlide() {
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

}
