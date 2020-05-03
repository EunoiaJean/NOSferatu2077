/*
Game Name: NOS-Feratu
Date Finished: 5/3/2020
Collaborators: Jacob Compton, Eugene Shin, Cole Cota

Creative Tilt:
A) We keep local storage for the best time(high score) of the player on the browser!
    Also pretty happy with having an enemy that spawns a seperate object and throws it down!
    Also made the background scale to the screen width so that it fits all screens. That was tricky for sure.

B) All of the art was done by Cole, with a pretty cool aesthetic is I do say so myself. Even found some music to go with the techno vampire theme.
*/

let config = 
{
    type: Phaser.CANVAS,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
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
    backgroundScrollSpeed: 10, //Speed background goes by
    carSpawnDelay: 1000, //Car spawn delay in ms
    enemySpawnDelay: 5000, //Delay between spawning enemies
    carSpeed: 400,
    difficultyIncreaseTime1: 15, //Time in seconds till difficulty increases
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
//Starting position on the road for NOS
let roadPosition = 2;
let roadRight = 4;
let roadLeft = 1;
let roadFarRightPos = game.config.width/2 + 184;
let roadLaneDiff = 122;
//Positions for each lane, ignoring the 0
let roadCenter = [0, roadFarRightPos - 3 * roadLaneDiff, roadFarRightPos - 2 * roadLaneDiff, roadFarRightPos - roadLaneDiff, roadFarRightPos];
//Global music variables so we can play music through scenes
let bgMusic;
let mainMenuBGMusic;
let destroyedMenuMusic = false;
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