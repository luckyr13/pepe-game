import 'phaser';

declare const window: any;


export class GameObjects {

    public loadGameObjects_intro(scene: Phaser.Scene) {
        scene.load.bitmapFont(
            'pixelFont',
            'img/assets/font/font.png',
            'img/assets/font/font.xml'     
        );

        scene.load.atlas('flares', 'img/assets/particles/flares.png', 'img/assets/particles/flares.json');
        scene.load.image('fire', 'img/assets/particles/muzzleflash3.png');
        scene.load.image('spark', 'img/assets/particles/blue.png');
        scene.load.image('sparkRed', 'img/assets/particles/red.png');

        scene.load.image('backgroundIntro', 'img/assets/scenes/intro/bgIntro.jpg');
        scene.load.image('mainText', 'img/assets/scenes/intro/mainText.png');
        scene.load.image('frogIntro', 'img/assets/scenes/intro/frogJumping.png');
        scene.load.image('closeButton', 'img/assets/scenes/intro/close.png');

        scene.load.audio('startSound', 'img/assets/audio/start.ogg');
        scene.load.audio('alrightSound', 'img/assets/audio/alright.wav');
        scene.load.audio('wohooSound', 'img/assets/audio/wohoo.mp3');
        scene.load.audio('ohboySound', 'img/assets/audio/ohboy.mp3');
        // Audio
        scene.load.audio('powerupIntro', [
            'img/assets/audio/PowerupIntro.mp3'
        ]);
        scene.load.audio('endingSong', [
            'img/assets/audio/Fused.mp3'
        ]);


    }

    

    public loadGameObjects_powerups(scene: Phaser.Scene) {
        scene.load.image('powerup_fruits_grape', 'img/assets/powerups/fruit_grape.png');
        scene.load.image('powerup_fruits_banana', 'img/assets/powerups/fruit_banana.png');
        scene.load.image('powerup_fruits_watermelon', 'img/assets/powerups/fruit_watermelon.png');
        scene.load.image('powerup_fruits_strawberry', 'img/assets/powerups/fruit_strawberry.png');
        scene.load.image('powerup_fruits_pineapple', 'img/assets/powerups/fruit_pineapple.png');

        scene.load.image('powerup_pastry_cookie01', 'img/assets/powerups/pastry_cookie01.png');
        scene.load.image('powerup_pastry_cookie02', 'img/assets/powerups/pastry_cookie02.png');
        scene.load.image('powerup_pastry_croissant', 'img/assets/powerups/pastry_croissant.png');
        scene.load.image('powerup_pastry_cupcake', 'img/assets/powerups/pastry_cupcake.png');
        scene.load.image('powerup_pastry_donut', 'img/assets/powerups/pastry_donut.png');
        scene.load.image('powerup_pastry_macaroon', 'img/assets/powerups/pastry_macaroon.png');
        scene.load.image('powerup_pastry_poptart01', 'img/assets/powerups/pastry_poptart01.png');
        scene.load.image('powerup_pastry_poptart02', 'img/assets/powerups/pastry_poptart02.png');
        scene.load.image('powerup_pastry_starcookie', 'img/assets/powerups/pastry_starcookie.png');

        // LIVES
        scene.load.image('powerup_live_amlove', 'img/assets/powerups/amlove.png');

        // WEAPONS
        scene.load.image('powerup_weapon_trump', 'img/assets/powerups/powerTrump.png');
        scene.load.image('powerup_weapon_trump_TRUMPTRAIN', 'img/assets/scenes/trumpTrain.png');

        scene.load.audio('trumpTrainSound', 'img/assets/audio/trumpTrain.mp3');
        scene.load.audio('fanfareSound', 'img/assets/audio/fanfare.wav');
        scene.load.audio('coinPickupSound', 'img/assets/audio/coin-pickup.wav');
        scene.load.audio('livePowerUpSound', 'img/assets/audio/8-bit-powerup.wav');
        scene.load.audio('foodSound', 'img/assets/audio/powerup2.wav');
    }

    public loadGameObjects_introLevel01(scene: Phaser.Scene) {
        // Audio
        scene.load.audio('bgMusicIntroLevel01', [
            'img/assets/audio/Manchester_Dream.mp3'
        ]);
        scene.load.image('bigQ', 'img/assets/scenes/bigQ.png');
        scene.load.image('pepeThinking', 'img/assets/scenes/pepeThinking.png');
        scene.load.image('donaldTrump', 'img/assets/scenes/donaldTrump.png');

        scene.load.image('maskedEvil', 'img/assets/scenes/maskedEvil.png');
        

    }

    public loadGameObjects_level01(scene: Phaser.Scene) {
        scene.load.image('background', 'img/assets/scenes/bg01_large.jpg');
        scene.load.image('background_water', 'img/assets/scenes/bg01_large_water.jpg');
        scene.load.image('tree', 'img/assets/scenes/tree.png');
        scene.load.image('lilypad_green', 'img/assets/scenes/lilypad_green.png');
        scene.load.image('lilypad_green_double', 'img/assets/scenes/lilypad_green_double.png');
        scene.load.image('lilypad_green_triple', 'img/assets/scenes/lilypad_green_triple.png');
        scene.load.image('lilypad_orange',  'img/assets/scenes/lilypad_orange.png');
        scene.load.image('lilypad_orange_double', 'img/assets/scenes/lilypad_orange_double.png');
        scene.load.image('lilypad_orange_triple', 'img/assets/scenes/lilypad_orange_triple.png');
        scene.load.image('lilypad_yellow', 'img/assets/scenes/lilypad_yellow.png');
        scene.load.image('lilypad_yellow_double', 'img/assets/scenes/lilypad_yellow_double.png');
        scene.load.image('lilypad_yellow_triple', 'img/assets/scenes/lilypad_yellow_triple.png');

        scene.load.image('balsa', 'img/assets/scenes/balsa.png');
        scene.load.image('balsaConRana', 'img/assets/scenes/balsaConRana.png');


        // Cars
        scene.load.image('blmBus', 'img/assets/cars/blm_bus.png');
        scene.load.image('redCar', 'img/assets/cars/red_car.png');
        scene.load.image('blackCar', 'img/assets/cars/black_car.png');
        scene.load.image('policeCar', 'img/assets/cars/police.png');
        scene.load.image('purpleCar', 'img/assets/cars/purple_car.png');
        scene.load.image('whiteCar', 'img/assets/cars/white_car.png');
        scene.load.image('whiteCarSecond', 'img/assets/cars/white_car.png');
        scene.load.image('greenCar', 'img/assets/cars/green_car.png');
        scene.load.image('yellowCar', 'img/assets/cars/yellow_car.png');
        // Frog
        scene.load.image('frog1', 'img/assets/FrogLilypad_images/animation/frog1.png');
        scene.load.image('frog2', 'img/assets/FrogLilypad_images/animation/frog2.png');
        scene.load.image('frog3', 'img/assets/FrogLilypad_images/animation/frog3.png');
        scene.load.image('frog4', 'img/assets/FrogLilypad_images/animation/frog4.png');
        scene.load.image('frog5', 'img/assets/FrogLilypad_images/animation/frog5.png');
        scene.load.image('frog6', 'img/assets/FrogLilypad_images/animation/frog6.png');
        scene.load.image('frog7', 'img/assets/FrogLilypad_images/animation/frog7.png');
        // Dead frog 
        scene.load.image('frog1dead', 'img/assets/FrogLilypad_images/animation/frog_dead.png');
        scene.load.image('frog2dead', 'img/assets/FrogLilypad_images/animation/frog_dead2.png');
        scene.load.image('frog3dead', 'img/assets/FrogLilypad_images/animation/frog_dead3.png');
        scene.load.image('frog4dead', 'img/assets/FrogLilypad_images/animation/frog_dead4.png');
        scene.load.image('frog5dead', 'img/assets/FrogLilypad_images/animation/frog_dead5.png');
        scene.load.image('frog6dead', 'img/assets/FrogLilypad_images/animation/frog_dead6.png');
        scene.load.image('frog7dead', 'img/assets/FrogLilypad_images/animation/frog_dead7.png');

        // Dead frog by water
        scene.load.image('frog1dead_water', 'img/assets/FrogLilypad_images/animation/frog_dead_water01.png');
        scene.load.image('frog2dead_water', 'img/assets/FrogLilypad_images/animation/frog_dead_water02.png');
        scene.load.image('frog3dead_water', 'img/assets/FrogLilypad_images/animation/frog_dead_water03.png');
        scene.load.image('frog4dead_water', 'img/assets/FrogLilypad_images/animation/frog_dead_water04.png');
        scene.load.image('frog5dead_water', 'img/assets/FrogLilypad_images/animation/frog_dead_water05.png');
        scene.load.image('frog6dead_water', 'img/assets/FrogLilypad_images/animation/frog_dead_water06.png');
        scene.load.image('frog7dead_water', 'img/assets/FrogLilypad_images/animation/frog_dead_water07.png');

        // Killary
        scene.load.image('killary1', 'img/assets/scenes/killary/Walk1.png');
        scene.load.image('killary2', 'img/assets/scenes/killary/Walk2.png');
        scene.load.image('killary3', 'img/assets/scenes/killary/Walk3.png');
        scene.load.image('killary4', 'img/assets/scenes/killary/Walk4.png');
        scene.load.image('killary5', 'img/assets/scenes/killary/Walk5.png');
        scene.load.image('killary6', 'img/assets/scenes/killary/Walk6.png');
        scene.load.image('killary7', 'img/assets/scenes/killary/Walk7.png');
        scene.load.image('killary8', 'img/assets/scenes/killary/Walk8.png');
        scene.load.image('killary9', 'img/assets/scenes/killary/Walk9.png');
        scene.load.image('killary10', 'img/assets/scenes/killary/Walk10.png');

        scene.load.image('enemy_dead1', 'img/assets/scenes/dead1.png');
        scene.load.image('enemy_dead2', 'img/assets/scenes/dead2.png');
        scene.load.image('enemy_dead3', 'img/assets/scenes/dead3.png');
        scene.load.image('enemy_dead4', 'img/assets/scenes/dead4.png');
        scene.load.image('enemy_dead5', 'img/assets/scenes/dead5.png');
        scene.load.image('enemy_dead6', 'img/assets/scenes/dead6.png');

        // DR Bill G
        scene.load.image('billg1', 'img/assets/scenes/billg/billg1.png');
        scene.load.image('billg2', 'img/assets/scenes/billg/billg2.png');
        scene.load.image('billg3', 'img/assets/scenes/billg/billg3.png');

        // Bill C
        scene.load.image('billc', 'img/assets/scenes/billc.png');

        // Audio
        scene.load.audio('bgMusic', [
            'img/assets/audio/Run_Away.mp3'
        ]);
        scene.load.audio('bgMusic2', [
            'img/assets/audio/Dance_Electric.mp3'
        ]);
        scene.load.audio('bgMusic3', [
            'img/assets/audio/Overdrive.mp3'
        ]);
        
        
        scene.load.audio('frogJumpSound', 'img/assets/audio/jump.wav');
        scene.load.audio('frogSplatSound', 'img/assets/audio/splat.wav');
        scene.load.audio('frogSplashSound', 'img/assets/audio/ranazo.wav');
    }

    public loadGameObjects_level02(scene: Phaser.Scene) {
        scene.load.image('background2', 'img/assets/scenes/bg02_large.jpg');
        scene.load.image('background2_water', 'img/assets/scenes/bg02_large_water.jpg');
        scene.load.image('alligator', 'img/assets/scenes/alligator.png');
        scene.load.image('turtle', 'img/assets/scenes/turtle.png');
        scene.load.image('devilsIsland', 'img/assets/scenes/devilsIsland.png');



        scene.load.image('airplane', 'img/assets/scenes/airplane.png');
        scene.load.image('airplaneConRana', 'img/assets/scenes/airplaneConRana.png');


        // Cars
        scene.load.image('superBlueCar', 'img/assets/cars/carSuperBlue.png');
        scene.load.image('superYellowCar', 'img/assets/cars/carSuperYellow.png');
        scene.load.image('superWhiteCar3', 'img/assets/cars/white_car_i2.png');
        scene.load.image('blmBusToLeft', 'img/assets/cars/blm_bus_toLeft.png');

        // Jeffrey
        scene.load.image('jeffWalk1', 'img/assets/scenes/jeff/jeffWalk1.png');
        scene.load.image('jeffWalk2', 'img/assets/scenes/jeff/jeffWalk2.png');
        scene.load.image('jeffWalk3', 'img/assets/scenes/jeff/jeffWalk3.png');
        scene.load.image('jeffWalk4', 'img/assets/scenes/jeff/jeffWalk4.png');
        scene.load.image('jeffWalk5', 'img/assets/scenes/jeff/jeffWalk5.png');
        scene.load.image('jeffWalk6', 'img/assets/scenes/jeff/jeffWalk6.png');
        scene.load.image('jeffWalk7', 'img/assets/scenes/jeff/jeffWalk7.png');

        // Barry
        scene.load.image('barry', 'img/assets/scenes/barry.png');

        // Audio
        scene.load.audio('bgMusic2_1', [
            'img/assets/audio/scene02/Purple.mp3'
        ]);
        scene.load.audio('bgMusic2_2', [
            'img/assets/audio/scene02/Ghost_Chase_Thriller.mp3'
        ]);
        scene.load.audio('bgMusic2_3', [
            'img/assets/audio/scene02/Firestarter.mp3'
        ]);
        
    }
}
