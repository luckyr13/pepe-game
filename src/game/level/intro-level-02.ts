import 'phaser';
import { config } from '../game-config';
import { Plugins, AppState } from '@capacitor/core';
import { GAME_PROPERTIES } from '../game-properties';
import { GAME_TRANSLATIONS } from '../game-translations';

const { App } = Plugins;

declare const window: any;

export class IntroLevel02 extends Phaser.Scene {
	introTimeline: Phaser.Tweens.Timeline;
	introTimelineImages: Phaser.Tweens.Timeline;
	bgMusic: Phaser.Sound.BaseSound;
	bigQ: Phaser.GameObjects.Image;

	constructor() {
		super('introLevel02');
	}

	preload()
	{
		

	}

	create()
	{
		// Set listeners for game start
	    // Start Scene 01 on click
	    this.input.on('pointerdown', function (pointer: any) {
	    	this.gameStart();
	    }, this);

	    // Init timeline and Play intro 
	    this.playIntro();

	}

	
	update()
	{
		// this.scene.start('level01');
		const enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

		// Left
	    if (this.input.keyboard.checkDown(enterKey, 1000))
	    {
	    	// Run next scene
	        this.gameStart();
	    }
	}

	playIntro() {
		// Add background music
		this.bgMusic = this.sound.add('bgMusicIntroLevel01');

		// Play bg music
	    const musicConfig = { 
	    	mute: false, volume: 1, rate: 1,
	    	detune: 0, seek: 0, loop: true, delay: 0 
	    };
	    this.bgMusic.play(musicConfig);

		this.introTimeline = this.tweens.timeline();
		this.introTimelineImages = this.tweens.timeline();


		this.addTextToTimeline(
			GAME_TRANSLATIONS[GAME_PROPERTIES.default_language]['SCENE2']['INTRO_TXT1']
		);
		this.addTextToTimeline(
			GAME_TRANSLATIONS[GAME_PROPERTIES.default_language]['SCENE2']['INTRO_TXT2']
		);
		

		var _this = this;
		this.addTextToTimeline(
			GAME_TRANSLATIONS[GAME_PROPERTIES.default_language]['SCENE2']['INTRO_TXTFINAL'],
			function() {
	        _this.gameStart();
		});

		// Play timeline 
		this.introTimeline.play();
		this.introTimelineImages.play();

		// Add big Q 
		this.addBigQ();
		
	}

	addBigQ() {
		this.bigQ = this.add.image(
			+config.scale.width / 2,
			72, 
			'bigQ'
		);
		this.bigQ.setOrigin(0, 0);
		this.bigQ.setAlpha(0, 0, 0, 0);
		this.bigQ.x -= this.bigQ.width / 2;
		
		var particles = this.add.particles('spark');
	    var textures = this.textures;
	    var origin = this.bigQ.getTopLeft();
	    var mainText = this.bigQ;
	    var bigQSource = {
	        getRandomPoint: function (vec: any)
	        {
	            do
	            {
	                var x = Phaser.Math.Between(0, mainText.width - 1);
	                var y = Phaser.Math.Between(0, mainText.height - 1);
	                var pixel = textures.getPixel(x, y, 'bigQ');
	            } while (pixel.alpha < 255);

	            return vec.setTo(x + origin.x, y + origin.y);
	        }
	    };
	    particles.createEmitter({
	        x: 0,
	        y: 0,
	        blendMode: 'SCREEN',
	        scale: { start: 0.2, end: 0 },
	        speed: { min: -100, max: 100 },
	        quantity: 50,
	        emitZone: { type: 'random', source: bigQSource }
	    });

	    
	}

	addTextToTimeline(_text: string, _onComplete: any = null) {
		// Add text 
	    var text_history = this.add.dynamicBitmapText(
	    	+config.scale.width / 2 , 
	    	+config.scale.height / 2 + 120,
	    	'pixelFont',
	    	_text,
	    	16
	    );
	    text_history.setOrigin(0, 0);
	    text_history.x -= text_history.width / 2;
	    text_history.setAlpha(0, 0, 0, 0);
	    text_history.align = 1;

	    this.introTimeline.add({
	        targets: text_history,
	        alphaTopLeft: { value: 1, duration: 3200, ease: 'Power1' },
	        alphaBottomRight: { value: 1, duration: 3200, ease: 'Power1' },
	        alphaBottomLeft: { value: 1, duration: 3200, ease: 'Power1' },
	        alphaTopRight: { value: 1, duration: 3200, ease: 'Power1' },
	        yoyo: true,
	        onComplete: _onComplete
	    });

	}

	addImageToTimeline(
		_imageName: string, _delay: number,
		_x: number, _y: number, _x2: number, _y2: number,
		_yoyo: boolean, _duration: number
	) {
		// Add text 
	    var tmp_image = this.add.image(
	    	_x, 
	    	_y,
	    	_imageName
	    );
	    // tmp_image.setOrigin(0, 0);
	    // tmp_image.x -= tmp_image.width / 2;
	    tmp_image.setAlpha(0, 0, 0, 0);
	    tmp_image.depth = 3;

	    this.introTimelineImages.add({
	        targets: tmp_image,
	        alphaTopLeft: { value: 1, duration: _duration, ease: 'Power1' },
	        alphaBottomRight: { value: 1, duration: _duration, ease: 'Power1' },
	        alphaBottomLeft: { value: 1, duration: _duration, ease: 'Power1' },
	        alphaTopRight: { value: 1, duration: _duration, ease: 'Power1' },
	        yoyo: _yoyo,
	        delay: _delay,
	     	x: _x2,
	     	y: _y2
	        	
	    });

	}

	gameStart() {
		// Add start sound
		var startSound = this.sound.add('startSound');
		this.bgMusic.stop();
        startSound.play();

        this.scene.start('level02');
	    
	    
	}

}