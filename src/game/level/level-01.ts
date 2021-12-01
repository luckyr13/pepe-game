import 'phaser';
import { config } from '../game-config';
import { 
	GAME_PROPERTIES, GAME_POWERUPS_FOOD,
	GAME_POWERUPS_LIVE, GAME_POWERUPS_WEAPONS 
} from '../game-properties';
import { Plugins, AppState } from '@capacitor/core';

const { App } = Plugins;
declare const window: any;

export class Level01 extends Phaser.Scene {
	redCar: Phaser.GameObjects.Image;
	blackCar: Phaser.GameObjects.Image;
	policeCar: Phaser.GameObjects.Image;
	purpleCar: Phaser.GameObjects.Image;
	yellowCar: Phaser.GameObjects.Image;
	whiteCar: Phaser.GameObjects.Image;
	whiteCarSecond: Phaser.GameObjects.Image;
	greenCar: Phaser.GameObjects.Image;
	blmBus: Phaser.GameObjects.Image;
	blm2Bus: Phaser.GameObjects.Image;
	blm3Bus: Phaser.GameObjects.Image;
	frog: Phaser.Physics.Arcade.Sprite;
	killary: Phaser.Physics.Arcade.Sprite;
	billg: Phaser.Physics.Arcade.Sprite;
	billc: Phaser.Physics.Arcade.Sprite;
	enemies: Phaser.Physics.Arcade.Group;
	
	background: Phaser.GameObjects.Image;
	backgroundWater: Phaser.Physics.Arcade.Image;
	closeButton: Phaser.GameObjects.Image;

	livesText: Phaser.GameObjects.Text;
	scoreboardText: Phaser.GameObjects.Text;
	timerText: Phaser.GameObjects.Text;
	sublevelText: Phaser.GameObjects.Text;

	// Water objects
	water_safeObjects_row01: Phaser.Physics.Arcade.Group;
	water_safeObjects_row02: Phaser.Physics.Arcade.Group;
	water_safeObjects_row03: Phaser.Physics.Arcade.Group;
	water_safeObjects_row04: Phaser.Physics.Arcade.Group;

	// Balsas de escape
	water_ships: Phaser.Physics.Arcade.Group;

	bgMusic: Phaser.Sound.BaseSound;
	bgMusic2: Phaser.Sound.BaseSound;
	bgMusic3: Phaser.Sound.BaseSound;
	frogJumpSound: Phaser.Sound.BaseSound;
	frogSplatSound: Phaser.Sound.BaseSound;
	frogSplashSound: Phaser.Sound.BaseSound;
	alrightSound: Phaser.Sound.BaseSound;
	coinPickupSound: Phaser.Sound.BaseSound;
	livePowerUpSound: Phaser.Sound.BaseSound;
	fanfareSound: Phaser.Sound.BaseSound;

	// Mutex
	frogIsDead: boolean;

	jump_distance: number = 41.5;
	jump_time: number = 200;
	jump_sound_config: any = {
		volume: 0.16
	};

	roadPositions: number[] = [
		272, 330, 383, 436
	];
	waterPositions: number[] = [
		216, 174, 132, 90
	]

	scoreboardPosition: number = 518;
	sublevel: number = 1;
	max_sublevels: number = 3;
	frogs_rescued_goal: number = 4;
	frogs_rescued: number = 0;

	timer: any;
	time_initial: number = 180;
	time_left: number = 180;

	global_velocity_step: number = 0;
	
	powerups: Phaser.Physics.Arcade.Group = null;
	powerupsCollider: Phaser.Physics.Arcade.Collider = null;
	powerupsFruits: Phaser.Physics.Arcade.Group = null;
	powerupsFruitsCollider: Phaser.Physics.Arcade.Collider = null;
	powerupsLives: Phaser.Physics.Arcade.Group = null;
	powerupsLivesCollider: Phaser.Physics.Arcade.Collider = null;

	constructor() {
		super('level01');
	}

	init() {
		this.initLevelConditions(1);
		this.initGlobalConditions();
	}


	preload()
	{
		

	}

	initLevelConditions(level: number) {
		this.frogIsDead = false;
		this.sublevel = level;
		this.frogs_rescued = 0;
		this.time_left = this.time_initial;
		this.global_velocity_step = 0.2 * level;
	}

	initGlobalConditions() {
		GAME_PROPERTIES.lives = GAME_PROPERTIES.initial_lives;
		GAME_PROPERTIES.score = 0;
		GAME_PROPERTIES.total_frogs_rescued = 0;
		// GAME_PROPERTIES.total_children_rescued = 0;
	}

	create()
	{
		// Disable right click menu
		this.input.mouse.disableContextMenu();

		// Add game's background image
		this.background = this.add.image(0, 0, 'background');
		this.background.setOrigin(0, 0);

		var marginTop = -44;

		// Add lives text
		this.livesText = this.add.text(
			80, 
			+config.scale.height + marginTop,
			'Lives:' + GAME_PROPERTIES.lives, {
			// fontFamily: 'Courier', 
			fontSize: 28, color: '#FFFFFF',
			fill: '#FFF',
			shadow: {
		        offsetX: 0,
		        offsetY: 0,
		        color: '#000',
		        blur: 0,
		        stroke: false,
		        fill: false
		    }
		});

		// Add timer text
		this.timerText = this.add.text(
			(+config.scale.width / 2) - 200, 
			+config.scale.height + marginTop, '00:00', {
			// fontFamily: 'Courier', 
			fontSize: 28, color: '#FFFFFF', fill: '#FFF',
			shadow: {
		        offsetX: 0,
		        offsetY: 0,
		        color: '#000',
		        blur: 0,
		        stroke: false,
		        fill: false
		    }
		});

		// Add game scoreboard
		this.scoreboardText = this.add.text(
			(+config.scale.width / 2) + 54, 
			+config.scale.height + marginTop, 'Score:' + GAME_PROPERTIES.score, {
			// fontFamily: 'Courier', 
			fontSize: 28, color: '#FFFFFF', fill: '#FFF',
			shadow: {
		        offsetX: 0,
		        offsetY: 0,
		        color: '#000',
		        blur: 0,
		        stroke: false,
		        fill: false
		    }
		});

		// Add sublevel text
		this.sublevelText = this.add.text(
			+config.scale.width  - 130, 
			+config.scale.height + marginTop, 'L:1-' + this.sublevel, {
			// fontFamily: 'Courier', 
			fontSize: 28, color: '#FFFFFF', fill: '#FFF',
			shadow: {
		        offsetX: 0,
		        offsetY: 0,
		        color: '#000',
		        blur: 0,
		        stroke: false,
		        fill: false
		    }
		});

		// Add water surface
		this.backgroundWater = this.physics.add.image(0, 12, 'background_water');
		this.backgroundWater.setOrigin(0, 0);

		// Add close button
		this.closeButton = this.add.image(+config.scale.width - 60, 0, 'closeButton').setInteractive();
		this.closeButton.setOrigin(0, 0);
		this.closeButton.on('pointerdown', function (pointer: any) {
	        App.exitApp();

	    }, this);

		// Add jump sound
		this.frogJumpSound = this.sound.add('frogJumpSound');
		// Add frog splat sound
		this.frogSplatSound = this.sound.add('frogSplatSound');
		// Add frog splash sound
		this.frogSplashSound = this.sound.add('frogSplashSound');
		// Add alright sound 
		this.alrightSound = this.sound.add('alrightSound');

		

		// Create enemies Group
		this.enemies = this.physics.add.group();
		// Create water group/row 1
		this.water_safeObjects_row01 = this.physics.add.group();
		// Create water group/row 2
		this.water_safeObjects_row02 = this.physics.add.group();
		// Create water group/row 3
		this.water_safeObjects_row03 = this.physics.add.group();
		// Create water group/row 4
		this.water_safeObjects_row04 = this.physics.add.group();
		// Create water escape ships
		this.water_ships = this.physics.add.group();
		this.water_ships.setOrigin(0, 0);

		// Add escape ships
		this.water_ships.create((+config.scale.width / 4) - 100, 36, 'balsa');
		this.water_ships.create((+config.scale.width / 4) + 100, 36, 'balsa');
		this.water_ships.create(
			(+config.scale.width / 2) + (+config.scale.width / 4) - 100, 36, 'balsa'
		);
		this.water_ships.create(
			(+config.scale.width / 2) + (+config.scale.width / 4) + 100, 36, 'balsa'
		);


		// Water zone Row 1
		var water_margin_distance = 100;

		this.water_safeObjects_row01.create((+config.scale.width / 4) - water_margin_distance, this.waterPositions[0], 'tree');
		this.water_safeObjects_row01.create((+config.scale.width / 4) * 2 - water_margin_distance, this.waterPositions[0], 'tree');
		this.water_safeObjects_row01.create((+config.scale.width / 4) * 3 - water_margin_distance, this.waterPositions[0], 'tree');
		this.water_safeObjects_row01.create(+config.scale.width - water_margin_distance, this.waterPositions[0], 'tree');

		// Water zone Row 2
		this.water_safeObjects_row02.create((+config.scale.width / 4) - water_margin_distance, this.waterPositions[1], 'lilypad_yellow_triple');
		this.water_safeObjects_row02.create((+config.scale.width / 4) * 2 - water_margin_distance, this.waterPositions[1], 'lilypad_orange_triple');
		this.water_safeObjects_row02.create((+config.scale.width / 4) * 3 - water_margin_distance, this.waterPositions[1], 'lilypad_yellow_triple');
		this.water_safeObjects_row02.create(+config.scale.width - water_margin_distance, this.waterPositions[1], 'lilypad_green_triple');

		// Water zone Row 3
		this.water_safeObjects_row03.create((+config.scale.width / 5) - water_margin_distance, this.waterPositions[2], 'lilypad_orange_double');
		this.water_safeObjects_row03.create((+config.scale.width / 5) * 2 - water_margin_distance, this.waterPositions[2], 'lilypad_green_double');
		this.water_safeObjects_row03.create((+config.scale.width / 5) * 3 - water_margin_distance, this.waterPositions[2], 'lilypad_yellow_double');
		this.water_safeObjects_row03.create((+config.scale.width / 5) * 4 - water_margin_distance, this.waterPositions[2], 'lilypad_orange_double');
		this.water_safeObjects_row03.create(+config.scale.width - water_margin_distance, this.waterPositions[2], 'lilypad_green_double');

		// Water zone Row 4
		this.water_safeObjects_row04.create((+config.scale.width / 4) - water_margin_distance, this.waterPositions[3], 'tree');
		this.water_safeObjects_row04.create((+config.scale.width / 4) * 2 - water_margin_distance, this.waterPositions[3], 'tree');
		this.water_safeObjects_row04.create((+config.scale.width / 4) * 3 - water_margin_distance, this.waterPositions[3], 'tree');
		this.water_safeObjects_row04.create(+config.scale.width - water_margin_distance, this.waterPositions[3], 'tree');


		// First lane: Left to right
		this.blm3Bus = this.add.image(0, this.roadPositions[0], 'blmBus');
		this.blm3Bus.setOrigin(0, 0);

		this.enemies.add(this.blm3Bus);



		this.blmBus = this.add.image(0, this.roadPositions[0], 'blmBus');
		this.blmBus.setOrigin(0, 0);

		this.enemies.add(this.blmBus);

		this.blm2Bus = this.add.image(0, this.roadPositions[0], 'blmBus');
		this.blm2Bus.setOrigin(0, 0);

		this.enemies.add(this.blm2Bus);

		// Second lane: Left to right
		this.yellowCar = this.add.image(0, this.roadPositions[1], 'yellowCar');
		this.yellowCar.setOrigin(0, 0);

		this.enemies.add(this.yellowCar);

		this.policeCar = this.add.image(0, this.roadPositions[1], 'policeCar');
		this.policeCar.setOrigin(0, 0);

		this.enemies.add(this.policeCar);

		this.greenCar = this.add.image(0, this.roadPositions[1], 'greenCar');
		this.greenCar.setOrigin(0, 0);

		this.enemies.add(this.greenCar);

		// Third lane: Right to left		
		this.blackCar = this.add.image(+config.scale.width, this.roadPositions[2], 'blackCar');
		this.blackCar.setOrigin(0, 0);
		this.enemies.add(this.blackCar);

		this.redCar = this.add.image(+config.scale.width, this.roadPositions[2], 'redCar');
		this.redCar.setOrigin(0, 0);
		this.enemies.add(this.redCar);

		this.whiteCarSecond = this.add.image(+config.scale.width, this.roadPositions[2], 'whiteCarSecond');
		this.whiteCarSecond.setOrigin(0, 0);
		this.enemies.add(this.whiteCarSecond);


		// Fourth lane: Right to left
		this.purpleCar = this.add.image(+config.scale.width, this.roadPositions[3], 'purpleCar');
		this.purpleCar.setOrigin(0, 0);
		this.enemies.add(this.purpleCar);

		this.whiteCar = this.add.image(+config.scale.width, this.roadPositions[3], 'whiteCar');
		this.whiteCar.setOrigin(0, 0);
		this.enemies.add(this.whiteCar);

		this.initCarsPositions();

		// Frog
		this.anims.create({
	        key: 'frog_jump',
	        frames: [
	            { key: 'frog1', frame: null },
	            { key: 'frog2', frame: null },
	            { key: 'frog3', frame: null },
	            { key: 'frog4', frame: null },
	            { key: 'frog5', frame: null },
	            { key: 'frog6', frame: null },
	            { key: 'frog7', frame: null }
	        ],
	        frameRate: 20,
	        repeat: 0
	    });
	    this.anims.create({
	        key: 'frog_dead',
	        frames: [
	            { key: 'frog1dead', frame: null },
	            { key: 'frog2dead', frame: null },
	            { key: 'frog3dead', frame: null },
	            { key: 'frog4dead', frame: null },
	            { key: 'frog5dead', frame: null },
	            { key: 'frog6dead', frame: null },
	            { key: 'frog7dead', frame: null },

	        ],
	        frameRate: 24,
	        repeat: 0,
	        delay: 0
	    });
	    this.anims.create({
	        key: 'frog_dead_water',
	        frames: [
	            { key: 'frog1dead_water', frame: null },
	            { key: 'frog2dead_water', frame: null },
	            { key: 'frog3dead_water', frame: null },
	            { key: 'frog4dead_water', frame: null },
	            { key: 'frog5dead_water', frame: null },
	            { key: 'frog6dead_water', frame: null },
	            { key: 'frog7dead_water', frame: null },

	        ],
	        frameRate: 24,
	        repeat: 0,
	        delay: 0
	    });

	    this.anims.create({
	        key: 'hide_frog',
	        frames: [
	            { key: 'frog7dead', frame: null },

	        ],
	        frameRate: 24,
	        repeat: 0,
	        delay: 0
	    });

	
	    this.frog = this.physics.add.sprite(
	    	+config.scale.width / 2,
	    	+config.scale.height - 70,
	    	'frog1'
	    );

	    // Killary
		this.anims.create({
	        key: 'killary_walk',
	        frames: [
	            { key: 'killary1', frame: null },
	            { key: 'killary2', frame: null },
	            { key: 'killary3', frame: null },
	            { key: 'killary4', frame: null },
	            { key: 'killary5', frame: null },
	            { key: 'killary6', frame: null },
	            { key: 'killary7', frame: null },
	            { key: 'killary8', frame: null },
	            { key: 'killary9', frame: null },
	            { key: 'killary10', frame: null }
	        ],
	        frameRate: 8,
	        repeat: -1
	    });
	    this.anims.create({
	        key: 'enemy_dead',
	        frames: [
	            { key: 'enemy_dead1', frame: null },
	            { key: 'enemy_dead2', frame: null },
	            { key: 'enemy_dead3', frame: null },
	            { key: 'enemy_dead4', frame: null },
	            { key: 'enemy_dead5', frame: null },
	            { key: 'enemy_dead6', frame: null },
	        ],
	        frameRate: 16
	    });
	    // DR Bill G
		this.anims.create({
	        key: 'billg_standing',
	        frames: [
	            { key: 'billg1', frame: null },
	            { key: 'billg2', frame: null },
	            { key: 'billg3', frame: null },
	        ],
	        frameRate: 8,
	        repeat: -1,
	        yoyo: true
	    });

	    this.createKillary();

	    // FROG PHYSICS
	    // The frog bounce against world bounds 
	    this.frog.setBounce(1).setCollideWorldBounds(true);

	    // Catch overlap event where frog collides with an enemy
	    this.physics.add.overlap(
	    	this.frog, this.enemies, this.frogEnemies_overlap, null, this
	    );

	    // Catch overlap where frog jumps into the water 
	    this.physics.add.overlap(
	    	this.frog, this.backgroundWater, this.frogJumpsIntoWater_overlap, null, this
    	);

    	// Add mouse pointer events 
	    this.frogMovementsMouse();

	    // Catch when frog escapes on a ship 
	    this.physics.add.overlap(
	    	this.frog, this.water_ships, this.frogJumpsIntoShip_overlap, null, this

    	);

    	

	    // Add background music
		this.bgMusic = this.sound.add('bgMusic');
		this.bgMusic2 = this.sound.add('bgMusic2');
		this.bgMusic3 = this.sound.add('bgMusic3');
		// Play bg music
	    const musicConfig = { 
	    	mute: false, volume: 1, rate: 1,
	    	detune: 0, seek: 0, loop: true, delay: 0 
	    };
	    this.bgMusic.play(musicConfig);

	    // Create timer 
    	this.timer = this.time.addEvent({
    		callback: this.updateTimerSetTime, callbackScope: this,
    		delay: 1000, loop: true 
    	});

    	// Add powerups sounds
    	this.coinPickupSound = this.sound.add('coinPickupSound');
    	this.fanfareSound = this.sound.add('fanfareSound');
    	this.livePowerUpSound = this.sound.add('livePowerUpSound');
    	
    	// Add powerups
    	this.initPowerupsGroup_fruits();

		//this.scene.start('cityScene');
	}

	createKillary() {
		if (this.killary) {
			this.killary.destroy(true);
		}
		this.killary = this.physics.add.sprite(
	    	Phaser.Math.Between(0, +config.scale.width),
	    	+config.scale.height / 2 - 60,
	    	'killary1'
	    );
	    this.killary.setScale(0.5, 0.5);
	    this.killary.play('killary_walk');

	    // Add killary to enemies set
	    this.enemies.add(this.killary);
	}

	createBillG() {
		if (this.billg) {
			this.billg.destroy(true);
		}
		this.billg = this.physics.add.sprite(
	    	+config.scale.width - (+config.scale.width / 4),
	    	+config.scale.height / 2 - 60,
	    	'billg1'
	    );
	    this.billg.setScale(0.46, 0.46);
	    this.billg.play('billg_standing');

	    // Add Bill G to enemies set
	    this.enemies.add(this.billg);
	}

	createBillC() {
		if (this.billc) {
			this.billc.destroy(true);
		}
		this.billc = this.physics.add.sprite(
	    	+config.scale.width / 4,
	    	+config.scale.height / 2 - 60,
	    	'billc'
	    );
	    this.billc.setScale(0.46, 0.46);
	    // Add Bill C to enemies set
	    this.enemies.add(this.billc);
	}

	initCarsPositions() {
		this.blm3Bus.x = -this.blm3Bus.width;
		this.blmBus.x = -450;
		this.blm2Bus.x = -670;
		this.yellowCar.x = -this.yellowCar.width;
		this.policeCar.x = -400;
		this.greenCar.x = -750;

		this.blackCar.x = +config.scale.width + 100;
		this.redCar.x = +config.scale.width + 300;
		this.whiteCarSecond.x = +config.scale.width + 600;
		this.whiteCar.x = +config.scale.width + 500;
		this.purpleCar.x = +config.scale.width + 200;
	}

	// FRUITS
	initPowerupsGroup_fruits() {
		if (this.powerupsFruits) {
			this.powerupsFruitsCollider.destroy();
			this.powerupsFruits.destroy(true);
		}
    	// Init powerups 
    	// Overlap with items and powerups
    	this.powerupsFruits = this.physics.add.group();
		this.powerupsFruitsCollider = this.physics.add.overlap(
			this.frog,
			this.powerupsFruits,
			this.frogTouchesPowerupFruit,
			null,
			this
		);
    	

		var n = Phaser.Math.Between(3, 10);
		this.addPowerups_fruits(n);

	}

	addPowerups_fruits(n: number) {
		var powerups_list = GAME_POWERUPS_FOOD;
		var num_powerups = powerups_list.length;

		for (var i = 0; i <	n; i++) {
			var random_x = Phaser.Math.Between(0, +config.scale.width - 50);
			var random_y = Phaser.Math.Between(this.waterPositions[3], this.scoreboardPosition - 50);
			var random_element = Phaser.Math.Between(0, num_powerups - 1);
			this.powerupsFruits.create(random_x, random_y, powerups_list[random_element]);
		}
	}

	frogTouchesPowerupFruit(
		_frog: Phaser.Physics.Arcade.Sprite, 
		_powerup: Phaser.GameObjects.Image
	) {
		this.coinPickupSound.play();
		this.updateScoreboard(GAME_PROPERTIES.points_item);
		_powerup.destroy(true);

	}

	// LIVES
	initPowerupsGroup_lives() {
		if (this.powerupsLives) {
			this.powerupsLivesCollider.destroy();
			this.powerupsLives.destroy(true);
		}
    	// Init powerups 
    	// Overlap with items and powerups
    	this.powerupsLives = this.physics.add.group();
		this.powerupsLivesCollider = this.physics.add.overlap(
			this.frog,
			this.powerupsLives,
			this.frogTouchesPowerupLive,
			null,
			this
		);
    	

		var n = Phaser.Math.Between(1, 3);
		this.addPowerups_lives(n);

	}

	addPowerups_lives(n: number) {
		var powerups_list = GAME_POWERUPS_LIVE;
		var num_powerups = powerups_list.length;

		for (var i = 0; i <	n; i++) {
			var random_x = Phaser.Math.Between(0, +config.scale.width - 50);
			var random_y = Phaser.Math.Between(this.waterPositions[3], this.scoreboardPosition - 50);
			var random_element = Phaser.Math.Between(0, num_powerups - 1);
			var live = this.powerupsLives.create(random_x, -200, powerups_list[random_element]);
			this.add.tween({
				targets: live,
				y: random_y,
				duration: 6000,
				delay: 1000
			});
		}
	}

	frogTouchesPowerupLive(
		_frog: Phaser.Physics.Arcade.Sprite, 
		_powerup: Phaser.GameObjects.Image
	) {
		this.livePowerUpSound.play();
		this.updateScoreboardLives(1);
		_powerup.destroy(true);

	}

	// WEAPONS 
	initPowerupsGroup_weapons() {
		if (this.powerups) {
			this.powerupsCollider.destroy();
			this.powerups.destroy(true);
		}
    	// Init powerups 
    	// Overlap with items and powerups
    	this.powerups = this.physics.add.group();
		this.powerupsCollider = this.physics.add.overlap(
			this.frog,
			this.powerups,
			this.frogTouchesPowerupWeapons,
			null,
			this
		);
    	

		var n = Phaser.Math.Between(1, 1);
		this.addPowerups_weapons(n);

	}

	addPowerups_weapons(n: number) {
		var powerups_list = GAME_POWERUPS_WEAPONS;
		var num_powerups = powerups_list.length;

		for (var i = 0; i <	n; i++) {
			var random_x = Phaser.Math.Between(0, +config.scale.width - 50);
			var random_y = Phaser.Math.Between(this.waterPositions[3], this.scoreboardPosition - 50);
			var random_element = Phaser.Math.Between(0, num_powerups - 1);
			var weapon = this.powerups.create(random_x, -200, powerups_list[random_element]);
			this.add.tween({
				targets: weapon,
				y: random_y,
				duration: 6000,
				delay: 3000
			});
		}
	}

	frogTouchesPowerupWeapons(
		_frog: Phaser.Physics.Arcade.Sprite, 
		_powerup: Phaser.GameObjects.Image
	) {

		var powerUpKey = _powerup.texture.key;
		_powerup.destroy(true);

		if (powerUpKey == 'powerup_weapon_trump') {
			var trumpTrainSound = this.sound.add('trumpTrainSound');
			trumpTrainSound.play();
			this.weapons_trumpTrain();
		}
		
	}

	weapons_trumpTrain() {
		var trumpTrain = this.physics.add.image(+config.scale.width + 100,
			+config.scale.height / 2 - 20,
			'powerup_weapon_trump_TRUMPTRAIN');

		trumpTrain.setOrigin(0, 0);
		trumpTrain.y -= trumpTrain.height;

		this.physics.add.overlap(
			trumpTrain, this.enemies,
			this.weapons_trumpTrain_overlapEnemies,
			null,
			this
		);

		this.add.tween({
			delay: 4500,
			targets: trumpTrain,
			x: -trumpTrain.width,
			duration: 7500
		});

		

	}

	weapons_trumpTrain_overlapEnemies(
		_trump: Phaser.GameObjects.Image, _enemy: Phaser.GameObjects.Sprite
	) {

		var key = _enemy.texture.key + '';
		var x = _enemy.x;
		var y = _enemy.y;
		var flipX = _enemy.flipX;

		_enemy.destroy(true);
		this.frogSplatSound.play();
		
		this.updateScoreboard(GAME_PROPERTIES.boss_defeated);

		// Create temporary animation
		var tmp_enemy = this.physics.add.sprite(x, y, 'enemy_dead1');
    	tmp_enemy.setScale(0.5, 0.5);
    	tmp_enemy.flipX = flipX;
		tmp_enemy.play('enemy_dead');
		var _this = this;
		window.setTimeout(function() {
			tmp_enemy.destroy(true);
		}, 10000);
		
		
	}

	/*
		Overlap function where Frog hits an enemy
	*/
	frogEnemies_overlap(_frog: Phaser.Physics.Arcade.Sprite, _enemy: Phaser.GameObjects.Image) {
		// Frog dies here
		if (!this.frogIsDead) {
			_frog.setTexture('frog1dead');
			this.frogIsDead = true;
			_frog.play('frog_dead');
			this.frogSplatSound.play();
			// Decrement lives counter 
			GAME_PROPERTIES.lives -= 1;
			this.livesText.text = 'Lives:' + GAME_PROPERTIES.lives;

	    	// Give some time before resurrection
			window.setTimeout(() => {
				this.frogResetPosition(_frog);
			}, 1200);

		}
		
	}

	/*
		Overlap function where Frog jumps into the water
	*/
	frogJumpsIntoWater_overlap(
		_frog: Phaser.Physics.Arcade.Sprite,
		_water: Phaser.Physics.Arcade.Image
	) {
		// Check if frog is walking in a water object
		let frogCanWalkOnWaterRow1 = this.physics.world.overlap(_frog, this.water_safeObjects_row01);
		let frogCanWalkOnWaterRow2 = this.physics.world.overlap(_frog, this.water_safeObjects_row02);
		let frogCanWalkOnWaterRow3 = this.physics.world.overlap(_frog, this.water_safeObjects_row03);
		let frogCanWalkOnWaterRow4 = this.physics.world.overlap(_frog, this.water_safeObjects_row04);

		let frogCanWalkOnWaterRowBalsas = this.physics.world.overlap(_frog, this.water_ships);

		// Check if frog is inside water zone
		const frogStateTouching = _water.body.hitTest(
			_frog.x + (_frog.width / 2), _frog.y + (_frog.height / 2)
		);
		// Check if frog is on a water object or a escape ship
		var frogIsOnWaterObject = false;
		var gameObject: Phaser.GameObjects.Image;

		if (frogCanWalkOnWaterRow1) {
			gameObject = this.water_safeObjects_row01.getFirst(true, false);
		} else if (frogCanWalkOnWaterRow2) {
			gameObject = this.water_safeObjects_row02.getFirst(true, false);
		} else if (frogCanWalkOnWaterRow3) {
			gameObject = this.water_safeObjects_row03.getFirst(true, false);
		} else if (frogCanWalkOnWaterRow4) {
			gameObject = this.water_safeObjects_row04.getFirst(true, false);
		} else if (frogCanWalkOnWaterRowBalsas) {
			gameObject = this.water_safeObjects_row04.getFirst(true, false);
		}

		if (gameObject) {
			frogIsOnWaterObject = true;	
		}


		// Frog dies drowned here if conditions are met
		if (!this.frogIsDead && frogStateTouching && !frogIsOnWaterObject) {
			_frog.setTexture('frog1dead');
			this.frogIsDead = true;
			_frog.play('frog_dead_water');
			this.frogSplashSound.play();

			// Decrement lives counter 
			GAME_PROPERTIES.lives -= 1;
			this.livesText.text = 'Lives:' + GAME_PROPERTIES.lives;


	    	// Give some time before resurrection
			window.setTimeout(() => {
				this.frogResetPosition(_frog);
			}, 1200);

		}
	}

	/*
		Set frog initial position
	*/
	frogResetPosition(_frog: Phaser.Physics.Arcade.Sprite) {
		_frog.x = +config.scale.width / 2;
	    _frog.y = +config.scale.height - 70;
	    _frog.angle = 0;

		this.frogIsDead = false;
		_frog.setTexture('frog1');
	}

	frogMovementsMouse_helper(pointer: any): boolean {
		var px = pointer.x;
    	var py = pointer.y;
	    var particles = this.add.particles('spark');
	    var _frog = this.frog;

	    // Pointer must be down to move the frog 
	    if (!pointer.isDown) {
	    	return false;
	    }

	    particles.createEmitter({
	        alpha: { start: 1, end: 0 },
	        scale: { start: 0.5, end: 0 },
	        //tint: { start: 0xff945e, end: 0xff945e },
	        speed: 200,
	        blendMode: 'ADD',
	        maxParticles: 5,
	        lifespan: 250,
	        x: px,
	        y: py
	    });

		// Check if frog is alive
		// If frog is dead, then frog should not move
		if (this.frogIsDead) {
			return false;
		}

    	// Move left
	    if (px < _frog.x - _frog.width )
	    {
	    	this.moveFrogLeft(_frog);
	    } // Right
	    else if (px > _frog.x + _frog.width )
	    {
	    	this.moveFrogRight(_frog);
	    }
	    // Up
	    else if (py < _frog.y)
	    {
	    	this.moveFrogUp(_frog);
	    } // Down
	    else if (py > _frog.y)
	    {
	    	this.moveFrogDown(_frog);
	    }

	    return true;
	}

	frogMovementsMouse() {
		this.input.on('pointerdown', this.frogMovementsMouse_helper, this);
	}


	frogMovements(_frog: Phaser.GameObjects.Sprite) {
		const leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		const rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		const upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		const downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		
		// Check if frog is alive
		// If frog is dead, then frog should not move
		if (this.frogIsDead) {
			return false;
		}

	    // Left
	    if (this.input.keyboard.checkDown(leftKey, this.jump_time))
	    {
	    	this.moveFrogLeft(_frog);
	    } // Right
	    else if (this.input.keyboard.checkDown(rightKey, this.jump_time))
	    {
	    	this.moveFrogRight(_frog);
	    }
	    // Up
	    else if (this.input.keyboard.checkDown(upKey, this.jump_time))
	    {
	    	this.moveFrogUp(_frog);
	    } // Down
	    else if (this.input.keyboard.checkDown(downKey, this.jump_time))
	    {
	    	this.moveFrogDown(_frog);
	    }

	    // this.input.keyboard.addKey('down').isDown
	}

	moveFrogLeft(_frog: Phaser.GameObjects.Sprite) {
		// Check bounds with Left limit
    	if (_frog.x - this.jump_distance > 0) {
        	_frog.x -= this.jump_distance;
    	}

    	_frog.play('frog_jump');
    	_frog.angle = 270;

    	this.frogJumpSound.play(this.jump_sound_config);
	}

	moveFrogRight(_frog: Phaser.GameObjects.Sprite) {
		// Check bounds with Right limit
    	if (_frog.x + this.jump_distance < config.scale.width) {
        	_frog.x += this.jump_distance;
    	}
        
        _frog.play('frog_jump');
    	_frog.angle = 90;
    	this.frogJumpSound.play(this.jump_sound_config);
	}

	moveFrogUp(_frog: Phaser.GameObjects.Sprite) {
		// Check bounds with Upper limit
    	if (_frog.y - this.jump_distance > 0) {
        	_frog.y -= this.jump_distance;
    	}
        
        _frog.play('frog_jump');
    	_frog.angle = 0;
    	this.frogJumpSound.play(this.jump_sound_config);
	}

	moveFrogDown(_frog: Phaser.GameObjects.Sprite) {
		// Check bounds with Scoreboard
    	if (_frog.y + this.jump_distance < this.scoreboardPosition) {
        	_frog.y += this.jump_distance;
    	}
        _frog.play('frog_jump');
    	_frog.angle = 180;
    	this.frogJumpSound.play(this.jump_sound_config);
	}

	update()
	{
		if (this.sublevel <= this.max_sublevels &&
			this.time_left > 0 &&
			GAME_PROPERTIES.lives > 0 &&
			this.frogs_rescued < this.frogs_rescued_goal) {
			// Frog Movements
			this.frogMovements(this.frog);

	    	// Cars 
			this.moveCars(this.sublevel);

			// Boss movements
			this.moveKillary();
			this.moveBillG();
			
			// Water objects
			this.moveWaterSafeObjects();
			this.moveEscapeShips();


		} else if (this.time_left <= 0) {
			// Time over
			this.gameOver();
		} else if (GAME_PROPERTIES.lives <= 0) {
			// Lives over
			this.gameOver();
		} else if (this.frogs_rescued >= this.frogs_rescued_goal) {
			// Next sublevel
			if (this.sublevel + 1 <= this.max_sublevels) {
				this.sublevelUpdate();
			} // Next level
			else {
				this.bgMusic.stop();
				this.bgMusic2.stop();
				this.bgMusic3.stop();
				this.scene.start('introLevel02');
			}
			
		}

	}

	gameOver() {
		this.bgMusic.stop();
		this.bgMusic2.stop();
		this.bgMusic3.stop();

		this.scene.start('gameOver');
	}

	sublevelUpdate() {
		
		this.initLevelConditions(this.sublevel + 1);
		this.sublevelText.text = 'L:1-' + this.sublevel;
		this.initCarsPositions();

		// Init escape ships positions
		window.setTimeout(() => {
			this.water_ships.children.each(function(obj: Phaser.GameObjects.Image) {
				obj.setTexture('balsa');
				obj.y = 36;
			});
			this.frogs_rescued = 0;
		}, 1600);

		// Play bg music
	    const musicConfig = { 
	    	mute: false, volume: 1, rate: 1,
	    	detune: 0, seek: 0, loop: true, delay: 0 
	    };
	    if (this.sublevel == 2) {
	    	this.bgMusic.stop();
	    	this.bgMusic2.play(musicConfig);
	    	

		    this.createBillG();

	    	// Destroy a water object 
		    this.water_safeObjects_row03.remove(this.water_safeObjects_row03.getChildren()[0], true, true);
		    
	    } else if (this.sublevel == 3) {
	    	this.bgMusic.stop();
	    	this.bgMusic2.stop();
	    	this.bgMusic3.play(musicConfig);

	    	this.createBillG();
		    this.createBillC();
		    
	    	
	    	// Destroy a water object 
	    	this.water_safeObjects_row01.remove(this.water_safeObjects_row01.getChildren()[0], true, true);
		    this.water_safeObjects_row02.remove(this.water_safeObjects_row02.getChildren()[0], true, true);
		    this.water_safeObjects_row03.remove(this.water_safeObjects_row03.getChildren()[0], true, true);
		    this.water_safeObjects_row04.remove(this.water_safeObjects_row04.getChildren()[0], true, true);
		    
	    }
	    

	    // Increase water objects speed 
	    this.global_velocity_step += 0.5;

	    // Reset killary position 
	    this.createKillary();

	    // Reset timer 
	    this.time_left = this.time_initial;
	    this.timerText.text = this.timerFormat(this.time_left);

	    // Play a sound 
	    this.fanfareSound.play();

	    // Add new items
	    this.initPowerupsGroup_fruits();
    	this.initPowerupsGroup_lives();
    	this.initPowerupsGroup_weapons();
	}

	private moveCars(level: number) {
		if (level >= 1) {
			// First lane: Left to right
			this.moveCarLeftToRight(this.blmBus, 0.6);

			// Second lane: Left to right
			this.moveCarLeftToRight(this.yellowCar, 5);

			// Third lane: Right to left		
			this.moveCarRightToLeft(this.redCar, 2);

			// Fourth lane: Right to left
			this.moveCarRightToLeft(this.whiteCar, 3);
		}
		if (level >= 2) {
			// First lane: Left to right
			this.moveCarLeftToRight(this.blm3Bus, 0.6);

			// Second lane: Left to right
			this.moveCarLeftToRight(this.policeCar, 5);

			// Third lane: Right to left
			this.moveCarRightToLeft(this.blackCar, 2);


			// Fourth lane: Right to left
			this.moveCarRightToLeft(this.purpleCar, 3);

		}
		if (level >= 3) {
			// First lane: Left to right
			this.moveCarLeftToRight(this.blm2Bus, 0.6);

			// Second lane: Left to right
			this.moveCarLeftToRight(this.greenCar, 5);

			// Third lane: Right to left		
			this.moveCarRightToLeft(this.whiteCarSecond, 2);
		}
		
	}

	// Car movements 
	private moveCarLeftToRight(car: Phaser.GameObjects.Image, speed: number)
	{
		car.x += speed;

		if (car.x >= +config.scale.width) {
			this.resetLeftPosition(car);
		}
	}

	private resetLeftPosition(car: Phaser.GameObjects.Image)
	{
		car.x = -car.width;
	}

	private moveCarRightToLeft(car: Phaser.GameObjects.Image, speed: number)
	{
		car.x -= speed;

		if (car.x <= -car.width) {
			this.resetRightPosition(car);
		}
	}

	private resetRightPosition(car: Phaser.GameObjects.Image)
	{
		car.x = +config.scale.width;
	}

	// Water object movements
	private moveWaterSafeObjects() {
		const velocity = 0.5 + this.global_velocity_step;
		this.water_safeObjects_row01.children.each((obj: Phaser.GameObjects.Image) => {
			this.moveWaterObjectLeftToRight(obj, velocity, this.water_safeObjects_row01);
		});
		this.water_safeObjects_row02.children.each((obj: Phaser.GameObjects.Image) => {
			this.moveWaterObjectRightToLeft(obj, velocity, this.water_safeObjects_row02);
		});
		this.water_safeObjects_row03.children.each((obj: Phaser.GameObjects.Image) => {
			
			this.moveWaterObjectLeftToRight(obj, velocity, this.water_safeObjects_row03);
		});
		this.water_safeObjects_row04.children.each((obj: Phaser.GameObjects.Image) => {
			this.moveWaterObjectRightToLeft(obj, velocity, this.water_safeObjects_row04);
		});
	}


	private moveWaterObjectLeftToRight(
		obj: Phaser.GameObjects.Image, speed: number, objRow: Phaser.Physics.Arcade.Group
		)
	{
		// Reset position if object touches game bounds
		if ( (obj.x + speed) - (obj.width / 2) >= +config.scale.width) {
			this.resetWaterObjectLeftPosition(obj);
		} else {
			// Accelerate object
			obj.x += speed;

			// Check if frog is overlapping
			let moveFrog = this.physics.world.overlap(this.frog, obj);
			
			if (moveFrog ) {
				this.frog.x += speed;
			}
		}
	}

	private resetWaterObjectLeftPosition(obj: Phaser.GameObjects.Image)
	{
		obj.x = -obj.width;
	}

	private moveWaterObjectRightToLeft(
		obj: Phaser.GameObjects.Image, speed: number, objRow: Phaser.Physics.Arcade.Group
		)
	{
		
		// Reset position if object touches game bounds
		if (obj.x - (obj.width / 2) <= -obj.width) {
			this.resetWaterObjectRightPosition(obj);
		} else {
			// Accelerate object
			obj.x -= speed;

			// Check if frog is overlapping
			let moveFrog = this.physics.world.overlap(this.frog, obj);
			
			if (moveFrog) {
				this.frog.x -= speed;
			}
		}
	}

	private resetWaterObjectRightPosition(obj: Phaser.GameObjects.Image)
	{
		obj.x = +config.scale.width + (obj.width / 2);
	}

	/*
		Overlap function where Frog jumps into a escape ship
	*/
	frogJumpsIntoShip_overlap(
		_frog: Phaser.Physics.Arcade.Sprite,
		_ship: Phaser.Physics.Arcade.Image
	) {
		// Frog escapes here if conditions are met
		if (!this.frogIsDead ) {
			this.frogIsDead = true;
			_frog.setTexture('frog7dead');
			_frog.play('hide_frog');

			// Resurrection 
			_ship.setTexture('balsaConRana');
			this.alrightSound.play();

			this.updateScoreboard(GAME_PROPERTIES.points_frog_rescued)
			this.frogs_rescued += 1;
			GAME_PROPERTIES.total_frogs_rescued += 1;
			// Give some time before resurrection
			window.setTimeout(() => {
				this.frogResetPosition(_frog);
			}, 1600);
			
			// TODO
			if (this.frogs_rescued >= this.frogs_rescued_goal) {

			}

			

		}
	}

	updateScoreboard(points: number) {
		// Add points to score
		GAME_PROPERTIES.score += points;
		this.scoreboardText.text = 'Score:' + GAME_PROPERTIES.score;
	}

	updateScoreboardLives(lives: number) {
		// Add points to score
		GAME_PROPERTIES.lives += lives;
		this.livesText.text = 'Lives:' + GAME_PROPERTIES.lives;
	}

	// Water object movements
	private moveEscapeShips() {
		const velocity = 1;
		this.water_ships.children.each((obj: Phaser.GameObjects.Image) => {
			if (obj.texture.key == 'balsaConRana') {
				this.moveEscapeShipNorth(obj, velocity, this.water_ships);
			}
			
		});
		
	}

	private moveEscapeShipNorth(
		obj: Phaser.GameObjects.Image, speed: number, objRow: Phaser.Physics.Arcade.Group
		)
	{
		// Move the ship 
		if ( (obj.y - speed  + obj.height) >= 0 ) {
			// Accelerate object
			obj.y -= speed;
		}
	}

	moveKillary() {
		var velocity = 0.4 + (this.global_velocity_step / 4);
		var separation = 10;

		if (this.killary.x > this.frog.x + separation) {
			this.killary.x -= velocity;
    		this.killary.flipX = true;

		} else if (this.killary.x < this.frog.x) {
			this.killary.x += velocity;
    		this.killary.flipX = false;
		}
	}

	moveBillG() {
		var separation = 10;

		if (this.billg) {
			if (this.billg.x > this.frog.x + separation) {
	    		this.billg.flipX = false;

			} else if (this.billg.x < this.frog.x) {
	    		this.billg.flipX = true;
			}
		}
		


		
	}




	updateTimerSetTime() {
		this.time_left -= 1;
		this.timerText.text = this.timerFormat(this.time_left);
	}

	timerFormat(seconds: number) {
		var minutes = parseInt( (seconds / 60).toString() );
		var remainder = seconds % 60;
		var minutes_str = minutes < 10 ? '0' + minutes : minutes;
		var seconds_str = remainder < 10 ? '0' + remainder : remainder;
		
		var new_time = minutes_str + ':' + seconds_str;
		return new_time;

	}
}