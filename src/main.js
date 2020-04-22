
let config = 
{
    type: Phaser.CANVAS,
    width: 870,
    height: 900,
    scene: [ Menu, Play],
};

let game = new Phaser.Game(config);

//define game settings
game.settings = {
    gameTimer: 100000,
    backgroundScrollSpeed: 6,
    carSpawnDelay: 1000, //Car spawn delay in ms
    enemySpawnDelay: 3000
}

let highScore = 0;

//Reserve some keyboard variables
let keySPACE, keyLEFT, keyRIGHT, keyDOWN, keyW, keyA, keyD;