
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
let keySPACE, keyLEFT, keyRIGHT, keyDOWN, keyW, keyA, keyD, keyS;
let roadCenter = [0, 121, 322, 556, 759];
let roadPosition = 1;
let roadRight = 4;
let roadLeft = 1;
