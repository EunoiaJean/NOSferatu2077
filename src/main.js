//Communicate how to play w/ clear instructions (5)
//animated character use a texture atlas
//sound effects
//delayed event for time
//

let config = 
{
    type: Phaser.CANVAS,
    // width: 870,
    width: window.innerWidth,
    // height: 900,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Instructions, Play],
};

let game = new Phaser.Game(config);

//define game settings
game.settings = {
    gameTimer: 99999999999, //Time until timer runs out, probably need to set really high so it never ends
    backgroundScrollSpeed: 6, //Speed background goes by
    carSpawnDelay: 1000, //Car spawn delay in ms
    enemySpawnDelay: 5000, //Delay between spawning enemies
    carSpeed: 400,
    difficultyIncreaseTime1: 15,
    difficultyIncreaseTime2: 30,
    difficultyIncreaseTime3: 60,
}

let highScore = 0;
let highestScore;
// localStorage.clear();
if(localStorage.getItem("highScore")){
    highScore = localStorage.getItem("highScore");
}

//Reserve some keyboard variables
let keySPACE, keyLEFT, keyRIGHT, keyDOWN, keyUP, keyW, keyA, keyD, keyS;
let roadPosition = 2;
let roadRight = 4;
let roadLeft = 1;
let roadCenter = [0, 121, 322, 556, 759]
let bgMusic;
//score display
let scoreConfig = {
    fontFamily: "Courier",
    fontSize: "28px",
    backgroundColor: "#7476ad",
    color: "#843605",
    align: "right",
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 100
}