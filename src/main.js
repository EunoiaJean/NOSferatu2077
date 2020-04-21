
let config = 
{
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play],
};

let game = new Phaser.Game(config);

//define game settings
game.settings = {
    
}

let highScore = 0;

//Reserve some keyboard variables
let keySPACE, keyLEFT, keyRIGHT, keyDOWN, keyW, keyA, keyD;