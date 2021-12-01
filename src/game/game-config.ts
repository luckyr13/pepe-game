import 'phaser';

declare const window: any;


export const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
    scale: {
        parent: 'content',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1024,
        height: 576
    },
    physics: {
    	default: 'arcade',
    	arcade: {
    		debug: false
    	}
    }
    /*,
    audio: {
        disableWebAudio: true
    }
    */
};
