import 'phaser';
import { config } from './game-config';
import { Plugins, AppState } from '@capacitor/core';
import { GAME_PROPERTIES } from './game-properties';
import { GAME_TRANSLATIONS } from './game-translations';

const { App } = Plugins;

declare const window: any;

export class Ending extends Phaser.Scene{
	introTimeline: Phaser.Tweens.Timeline;
	introTimelineImages: Phaser.Tweens.Timeline;
	bgMusic: Phaser.Sound.BaseSound;
	bigQ: Phaser.GameObjects.Image;

	constructor() {
		super('ending');
	}

	preload() {
		
	}

	create() {
		var _this = this;
		
		
		var theEnd = this.add.dynamicBitmapText(
			+config.scale.width / 2,
			100,
			'pixelFont',
			GAME_TRANSLATIONS[GAME_PROPERTIES.default_language]['ENDING']['TXT_MAIN'],
			62
		);
		theEnd.x -= theEnd.width / 2;
		theEnd.y -= theEnd.height / 2;



		// Init timeline and Play intro 
	    this.playOutro();

	    var frog = this.add.image(
			+config.scale.width / 2,
			+config.scale.height / 2,
			'frogIntro'
		);
		frog.setScale(0.5, 0.5);
	}

	createFireworks() {
		var p0 = new Phaser.Math.Vector2(200, 500);
	    var p1 = new Phaser.Math.Vector2(200, 200);
	    var p2 = new Phaser.Math.Vector2(+config.scale.width - 200, 200);
	    var p3 = new Phaser.Math.Vector2(+config.scale.width - 200, 500);

	    var curve = new Phaser.Curves.CubicBezier(p0, p1, p2, p3);

	    var max = 28;
	    var points = [];
	    var tangents = [];

	    for (var c = 0; c <= max; c++)
	    {
	        var t = curve.getUtoTmapping(c / max, 0);

	        points.push(curve.getPoint(t));
	        tangents.push(curve.getTangent(t));
	    }

	    var tempVec = new Phaser.Math.Vector2();

	    var spark0 = this.add.particles('spark');
	    var spark1 = this.add.particles('sparkRed');

	    for (var i = 0; i < points.length; i++)
	    {
	        var p = points[i];

	        tempVec.copy(tangents[i]).normalizeRightHand().scale(-32).add(p);

	        var angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(p, tempVec));

	        var particles = (i % 2 === 0) ? spark0 : spark1;

	        particles.createEmitter({
	            x: tempVec.x,
	            y: tempVec.y,
	            angle: angle,
	            speed: { min: -100, max: 500 },
	            gravityY: 200,
	            scale: { start: 0.4, end: 0.1 },
	            lifespan: 800,
	            blendMode: 'SCREEN'
	        });
	    }

	}

	update() {
		
	}

	playOutro() {
		// Add background music
		this.bgMusic = this.sound.add('endingSong');

		// Play bg music
	    const musicConfig = { 
	    	mute: false, volume: 1, rate: 1,
	    	detune: 0, seek: 0, loop: true, delay: 0 
	    };
	    this.bgMusic.play(musicConfig);

		this.introTimeline = this.tweens.timeline();
		this.introTimelineImages = this.tweens.timeline();


		this.addTextToTimeline(
			GAME_TRANSLATIONS[GAME_PROPERTIES.default_language]['ENDING']['TXT1']
		);
		this.addTextToTimeline(
			GAME_TRANSLATIONS[GAME_PROPERTIES.default_language]['ENDING']['TXT2']
		);
		this.addTextToTimeline(
			GAME_TRANSLATIONS[GAME_PROPERTIES.default_language]['ENDING']['TXT3']
		);
		this.addTextToTimeline(
			GAME_TRANSLATIONS[GAME_PROPERTIES.default_language]['ENDING']['TXT4']
		);
		this.addTextToTimeline(
			GAME_TRANSLATIONS[GAME_PROPERTIES.default_language]['ENDING']['TXT5']
		);
		this.addTextToTimeline(
			GAME_TRANSLATIONS[GAME_PROPERTIES.default_language]['ENDING']['TXT6']
		);
		this.addTextToTimeline(
			GAME_TRANSLATIONS[GAME_PROPERTIES.default_language]['ENDING']['TXT7']
		);
		this.addTextToTimeline(
			GAME_TRANSLATIONS[GAME_PROPERTIES.default_language]['ENDING']['TXT8']
		);
		this.addTextToTimeline(
			GAME_TRANSLATIONS[GAME_PROPERTIES.default_language]['ENDING']['TXT9']
		);

		var _this = this;
		this.addTextToTimeline(
			GAME_TRANSLATIONS[GAME_PROPERTIES.default_language]['ENDING']['TXT_END'],
			function() {
	        _this.gameStart();
		});

		// Play timeline 
		this.introTimeline.play();
		this.introTimelineImages.play();

		this.createFireworks();
		
		
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
	        alphaTopLeft: { value: 1, duration: 4200, ease: 'Power1' },
	        alphaBottomRight: { value: 1, duration: 4200, ease: 'Power1' },
	        alphaBottomLeft: { value: 1, duration: 4200, ease: 'Power1' },
	        alphaTopRight: { value: 1, duration: 4200, ease: 'Power1' },
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

        this.scene.start('intro');
	    
	    
	}

}