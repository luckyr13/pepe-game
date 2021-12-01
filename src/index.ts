import 'phaser';
import { config } from './game/game-config';
import { Preloader } from './game/preloader';
import { Intro } from './game/intro';
import { GameOver } from './game/game-over';
import { IntroLevel01 } from './game/level/intro-level-01';
import { Level01 } from './game/level/level-01';
import { IntroLevel02 } from './game/level/intro-level-02';
import { Level02 } from './game/level/level-02';
import { Ending } from './game/ending';


config.scene = [
	Preloader, Intro, GameOver,
	IntroLevel01, Level01,
	IntroLevel02, Level02,
	Ending
];

const game = new Phaser.Game(config);
