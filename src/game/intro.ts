import 'phaser';
import { config } from './game-config';
import { Plugins, AppState } from '@capacitor/core';
import { GAME_PROPERTIES } from './game-properties';
import { GAME_TRANSLATIONS } from './game-translations';

const { App } = Plugins;

declare const window: any;

export class Intro extends Phaser.Scene {
	backgroundIntro: Phaser.GameObjects.Image;
	mainText: Phaser.GameObjects.Image;
	startText: Phaser.GameObjects.DynamicBitmapText;
	frogIntro: Phaser.GameObjects.Image;
	closeButton: Phaser.GameObjects.Image;
	startSound: Phaser.Sound.BaseSound;
	confirmationSound: Phaser.Sound.BaseSound;
	stepStartText: number = 0.05;
	bgMusic: Phaser.Sound.BaseSound;

	constructor() {
		super('intro');
	}

	preload()
	{
		

	}

	create()
	{
		// Add game's background image
		this.backgroundIntro = this.add.image(0, 0, 'backgroundIntro').setInteractive();
		this.backgroundIntro.setOrigin(0, 0);

		// Add background music
		this.bgMusic = this.sound.add('powerupIntro');
		// Play bg music
	    const musicConfig = { 
	    	mute: false, volume: 1, rate: 1,
	    	detune: 0, seek: 0, loop: true, delay: 0 
	    };
	    this.bgMusic.play(musicConfig);


		// Add main text
		this.mainText = this.add.image(30, 30, 'mainText');
		this.mainText.setOrigin(0, 0);

		// Add start text
		this.startText = this.add.dynamicBitmapText(
			(+config.scale.width / 2),
			+config.scale.height - 50,
			'pixelFont',
			GAME_TRANSLATIONS[GAME_PROPERTIES.default_language]['INTRO']['START'],
			16
		);
		this.startText.setAlpha(0, 0, 0, 0);
		this.startText.x -= this.startText.width / 2;

		this.add.tween({
			targets: this.startText,
			yoyo: true,
			loop: -1,
			alphaTopLeft: { value: 1, duration: 800, ease: 'Power1' },
	        alphaBottomRight: { value: 1, duration: 800, ease: 'Power1' },
	        alphaBottomLeft: { value: 1, duration: 800, ease: 'Power1' },
	        alphaTopRight: { value: 1, duration: 800, ease: 'Power1' }
		});

		// Add frog
		this.frogIntro = this.add.image(
			(+config.scale.width / 2) + 142, 
			(+config.scale.height / 2) - 120,
			'frogIntro'
		);
		this.frogIntro.setOrigin(0, 0);
		this.frogIntro.setScale(0.5, 0.5);

		// Add close button
		this.closeButton = this.add.image(+config.scale.width - 60, 0, 'closeButton').setInteractive();
		this.closeButton.setOrigin(0, 0);


		// Add start sound
		this.startSound = this.sound.add('startSound');
		this.confirmationSound = this.sound.add('wohooSound');

		var _this = this;
		this.backgroundIntro.on('pointerdown', function (pointer: any) {
			_this.gameStart();

	    }, this);

	    this.closeButton.on('pointerdown', function (pointer: any) {
	        App.exitApp();

	    }, this);


	    var particles = this.add.particles('fire');
	    var textures = this.textures;
	    var origin = this.mainText.getTopLeft();
	    var mainText = this.mainText;

	    var logoSource = {
	        getRandomPoint: function (vec: any)
	        {
	            do
	            {
	                var x = Phaser.Math.Between(0, mainText.width - 1);
	                var y = Phaser.Math.Between(0, mainText.height - 1);
	                var pixel = textures.getPixel(x, y, 'mainText');
	            } while (pixel.alpha < 255);

	            return vec.setTo(x + origin.x, y + origin.y);
	        }
	    };

	    particles.createEmitter({
	        alpha: { start: 1, end: 0 },
	        scale: { start: 0.5, end: 2.5 },
	        //tint: { start: 0xff945e, end: 0xff945e },
	        speed: 20,
	        accelerationY: -300,
	        angle: { min: -85, max: -95 },
	        rotate: { min: -180, max: 180 },
	        lifespan: { min: 1000, max: 1100 },
	        blendMode: 'ADD',
	        frequency: 50,
	        x: 0,
	        y: 0,
	        emitZone: { type: 'random', source: logoSource }
	    });

	    


	}

	gameStart() {
		this.bgMusic.stop();
        this.startSound.play();
    	this.confirmationSound.play();
    	// Run next scene
        this.scene.start('introLevel01');
	}

	
	update()
	{
		const enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

		// Left
	    if (this.input.keyboard.checkDown(enterKey, 1000))
	    {
	    	// Run next scene
	        this.gameStart();
	    }
		
	}

}