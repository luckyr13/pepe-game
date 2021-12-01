import 'phaser';
import { config } from './game-config';
import { Plugins, AppState } from '@capacitor/core';

const { App } = Plugins;

declare const window: any;

export class GameOver extends Phaser.Scene{
	constructor() {
		super('gameOver');
	}

	preload() {
		
	}

	create() {
		var _this = this;
		var deathFrog = this.add.image(
			+config.scale.width / 2,
			+config.scale.height / 2,
			'frog1dead'
		);
		deathFrog.y += 100;
		deathFrog.setScale(2, 2);
		deathFrog.setRotation(45);
		
		var gameOverText = this.add.dynamicBitmapText(
			+config.scale.width / 2,
			+config.scale.height / 2,
			'pixelFont',
			'GAME OVER',
			32
		);
		gameOverText.x -= gameOverText.width / 2;
		gameOverText.y -= gameOverText.height / 2;

		var ohboySound = this.sound.add('ohboySound');
		ohboySound.play();

		window.setTimeout(function() {
			_this.scene.start('intro');
		}, 3000);
	}

	update() {
		
	}

}