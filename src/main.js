//Communicate how to play w/ clear instructions (5)
//animated character use a texture atlas
//sound effects


//delayed event for time of the spawning
//MAKE SURE TO FIX LOOPING IN MUSIC MAKE NEW SCENE IN BEGINNING FOR IT
//instructions functionality
//local storage for Best Time: during play.


//animation playing during turning.




let config = 
{
    type: Phaser.CANVAS,
    width: 870,
    height: 900,
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
    scene: [Music, Menu, Play],
};

let game = new Phaser.Game(config);

//define game settings
game.settings = {
    gameTimer: 100000, //Time until timer runs out, probably need to set really high so it never ends
    backgroundScrollSpeed: 6, //Speed background goes by
    carSpawnDelay: 1000, //Car spawn delay in ms
    enemySpawnDelay: 3000, //Delay between spawning enemies
    carSpeed: 400,
}

let highScore = 0;

//Reserve some keyboard variables
let keySPACE, keyLEFT, keyRIGHT, keyDOWN, keyW, keyA, keyD, keyS;
let roadPosition = 1;
let roadRight = 4;
let roadLeft = 1;
let roadCenter = [0, 121, 322, 556, 759]

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