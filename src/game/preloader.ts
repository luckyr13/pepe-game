import 'phaser';
import { config } from './game-config';
import { GAME_PROPERTIES } from './game-properties';
import { GAME_TRANSLATIONS } from './game-translations';

import { GameObjects } from './game-objects';

declare const window: any;

export class Preloader extends Phaser.Scene {
	graphics: any;
	newGraphics: any;
	loadingText: any;
	progressBarX: number;
	progressBarY: number;
	progressBarFillX: number;
	progressBarFillY: number;

	constructor() {
		super('preloader');
	}

	calculateProgressBarPosition() {
		this.progressBarX = (+config.scale.width / 2) - 170;
		this.progressBarY = (+config.scale.height / 2) - 50;
		this.progressBarFillX = this.progressBarX + 5;
		this.progressBarFillY = this.progressBarY + 5;
		
	}

	findGetParameter(parameterName: string) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
	}

	preload()
	{
		// SET LANGUAGE
		var lang = this.findGetParameter('lang');
		GAME_PROPERTIES.default_language = lang ? lang : window.document.getElementById('language').value;

		this.calculateProgressBarPosition();
		this.graphics = this.add.graphics();
		this.newGraphics = this.add.graphics();
		var progressBar = new Phaser.Geom.Rectangle(this.progressBarX, this.progressBarY, 400, 50);
		var progressBarFill = new Phaser.Geom.Rectangle(this.progressBarFillX, this.progressBarFillY, 290, 40);


		this.graphics.fillStyle(0xffffff, 1);
		this.graphics.fillRectShape(progressBar);

		this.newGraphics.fillStyle(0x3587e2, 1);
		this.newGraphics.fillRectShape(progressBarFill);

		this.loadingText = this.add.text(
			this.progressBarX + 50,
			this.progressBarY + 60,
			GAME_TRANSLATIONS[GAME_PROPERTIES.default_language]['INTRO']['LOADING'], 
			{ fontSize: '32px', fill: '#FFF' }
		);
		var context = this;
		this.load.on('progress', 
			function(percentage: any) {
				context.updateBar(percentage)
			}, 
			this
			//{newGraphics:this.newGraphics, loadingText:this.loadingText}
		);

		this.load.on('complete', this.complete, this);

		var gameo = new GameObjects();
		gameo.loadGameObjects_intro(this);
		gameo.loadGameObjects_powerups(this);
		gameo.loadGameObjects_introLevel01(this);
		gameo.loadGameObjects_level01(this);
		gameo.loadGameObjects_level02(this);


	}

	updateBar(percentage: any) {
		this.calculateProgressBarPosition();

		this.newGraphics.clear();
		this.newGraphics.fillStyle(0x3587e2, 1);
		this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(this.progressBarFillX, this.progressBarFillY, percentage*390, 40));
				
		percentage = percentage * 100;
		this.loadingText.setText(
			GAME_TRANSLATIONS[GAME_PROPERTIES.default_language]['INTRO']['LOADING'] + 
			percentage.toFixed(2) + "%"
		);
		// console.log("P:" + percentage);
	}

	complete() {

		this.scene.start('intro');
	}

}