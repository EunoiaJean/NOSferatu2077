
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
    gameTimer: 100000, //Time until timer runs out, probably need to set really high so it never ends
    backgroundScrollSpeed: 6, //Speed background goes by
    carSpawnDelay: 1000, //Car spawn delay in ms
    enemySpawnDelay: 3000, //Delay between spawning enemies
}

let highScore = 0;

//Reserve some keyboard variables
let keySPACE, keyLEFT, keyRIGHT, keyDOWN, keyW, keyA, keyD, keyS;
let roadPosition = 1;
let roadRight = 4;
let roadLeft = 1;
let roadCenter = [0, 121, 322, 556, 759]
