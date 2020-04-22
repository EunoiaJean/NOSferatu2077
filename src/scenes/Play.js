class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/tile sprite
        // this.load.image('player', './assets/rocket.png');
        this.load.image('car', './assets/tempCar.png');
        this.load.image('enemy', './assets/bigTruck.png');
        // this.load.image('enemy2', './assets/starfield.png');
        this.load.image('background', './assets/tempRoad.png');
        this.load.audio('bgMusic', './assets/ToccataTechno.mp3');
        // this.load.image('spear', './assets/starfield.png');
        // this.load.image('barrel', './assets/starfield.png');
        // this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        //Place background
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background").setOrigin(0, 0);

        //Array to keep track of cars
        this.carsArray = new Array();
        this.enemyArray = new Array();

        let bgMusic = this.sound.add('bgMusic');
        bgMusic.play({
            loop: true,
        });

        //Define keyboard keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

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

        scoreConfig.fixedWidth = 0;
        this.clockDisplay = this.add.text(game.config.width / 2, 42, "Time: " + this.game.settings.gameTimer, scoreConfig);

        //game over flag
        this.gameOver = false;

        //60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, "GAME OVER", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, "Space to Restart or ← for Menu", scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        //TimerEvent in charge of spawning cars after a set spawnDelay, loops indefinitely
        this.carSpawner = this.time.addEvent({
            delay: game.settings.carSpawnDelay,
            callback: () => {
                // console.log("Timer went off");

                this.lane = Math.floor(Math.random() * (4 - 1 + 1) + 1);
                // console.log("Lane " + this.lane);

                //Switch deciding which what x position to put the car at
                switch (this.lane) {
                    case 1:
                        this.position = 121;
                        break;
                    case 2:
                        this.position = 322;
                        break;
                    case 3:
                        this.position = 556;
                        break;
                    case 4:
                        this.position = 759;
                        break;
                    default:
                        console.log("Lane is out of bounds");
                        break;

                }

                // console.log((this.position/4) * game.config.width);

                this.car = new Car(this, this.position, 0, "car", 0);
                this.car.setScale(.8, .8);

                this.carsArray.push(this.car);

                //Example of how to reset clock with a new delay
                // game.settings.carSpawnDelay = 1;
                // this.carSpawner.reset({
                //     delay: game.settings.carSpawnDelay,
                //     callback: () => {
                //         console.log("Timer went off faster");
                //     },
                //     loop: true,
                // });
            },
            loop: true,
        });

        //TimerEvent in charge of spawning enemies after a set spawnDelay, loops indefinitely
        this.enemySpawner = this.time.addEvent({
            delay: game.settings.enemySpawnDelay,
            callback: () => {
                // console.log("Timer went off");

                this.lane = Math.floor(Math.random() * (4 - 1 + 1) + 1);
                // console.log("Lane " + this.lane);

                //Switch deciding which what x position to put the car at
                switch (this.lane) {
                    case 1:
                        this.position = 121;
                        break;
                    case 2:
                        this.position = 322;
                        break;
                    case 3:
                        this.position = 556;
                        break;
                    case 4:
                        this.position = 759;
                        break;
                    default:
                        console.log("Lane is out of bounds");
                        break;

                }

                // console.log((this.position/4) * game.config.width);

                this.enemy = new Enemy(this, this.position, 0, "enemy", 0);
                this.enemy.setScale(1.5, 1.5);

                this.enemyArray.push(this.enemy);

                //Example of how to reset clock with a new delay
                // game.settings.carSpawnDelay = 1;
                // this.carSpawner.reset({
                //     delay: game.settings.carSpawnDelay,
                //     callback: () => {
                //         console.log("Timer went off faster");
                //     },
                //     loop: true,
                // });
            },
            loop: true,
        });

    }

    update() {

        //Loops through array of cars and update each one
        for (let i = 0; i < this.carsArray.length; i++) {
            this.carsArray[i].update();
        }

        //Loops through array of enemies and update each one
        for (let j = 0; j < this.enemyArray.length; j++) {
            this.enemyArray[j].update();
        }

        //check key input for restart
        if (this.gameOver) {
            //Check if they beat high score
            if (this.clockDisplay.text > highScore) {
                highScore = this.clockDisplay.text;
                console.log("New Highscore: " + highScore);
            }
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.scene.restart(this.p1Score);
            } else if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.scene.start("menuScene");
            }
        }

        //Scroll background
        this.background.tilePositionY -= game.settings.backgroundScrollSpeed;

        if (!this.gameOver) {
            //update sprites

            //Loops through array of cars and update each one
            // for (let i = 0; i < this.carsArray.length; i++) {
            //     this.carsArray[i].update();
            // }

            //Update timer text
            this.clockDisplay.setText(Math.floor(this.clock.getElapsedSeconds()));
        }

        //Check P1 collisions
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03, this.p1Rocket);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02, this.p1Rocket);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01, this.p1Rocket);
        }

        if (!this.singlePlayer) {
            //Check P2 collisions
            if (this.checkCollision(this.p2Rocket, this.ship03)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship03, this.p2Rocket);
            }
            if (this.checkCollision(this.p2Rocket, this.ship02)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship02, this.p2Rocket);
            }
            if (this.checkCollision(this.p2Rocket, this.ship01)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship01, this.p2Rocket);
            }
        }

        //Despawn any cars going off screen
        for (let i = 0; i < this.carsArray.length; i++) {
            if (this.carsArray[i].y >= game.config.height + this.carsArray[i].height) {
                this.carsArray[i].destroy(); //Destroy the car
                // console.log("Destroyed Car");
                this.carsArray.splice(i, 1); //Remove car from array of cars
            }
        }

        //Despawn any enemies going off screen
        for (let i = 0; i < this.enemyArray.length; i++) {
            // console.log("In enemy despawn for loop");
            //Once enemy has stopped, call the timer once for the enemy to pause it
            if (!(this.enemyArray[i].goingDown) && !(this.enemyArray[i].calledTimer)) {
                this.enemyArray[i].calledTimer = true;
                this.pauseTimer = this.time.delayedCall(this.enemyArray[i].truckPauseTime, () => {
                    this.enemyArray[i].goingUp = true;
                }, null, this);
            } else if (this.enemyArray[i].despawn) {
                //Enemy is ready to despawn, destroy it
                this.enemyArray[i].destroy(); //Destroy the enemy
                console.log("Destroyed Enemy");
                this.enemyArray.splice(i, 1); //Remove enemy from array of enemies
            }
        }

    }

    checkCollision(rocket, ship) {
        //Simple AABB checking
        // if (rocket.x < ship.x + ship.width &&
        //     rocket.x + rocket.width > ship.x &&
        //     rocket.y < ship.y + ship.height &&
        //     rocket.height + rocket.y > ship.y) {
        //     return true;
        // } else {
        //     return false;
        // }
    }

    shipExplode(ship, rocket) {
        ship.alpha = 0;
        //create explosion spire at ship's position
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0, 0);
        boom.anims.play("explode");
        boom.on("animationcomplete", () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        if (rocket.playerNumber == 1) {
            //score increment and repaint
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
        } else {
            //score increment and repaint
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score;
        }


        // this.sound.play('sfx_explosion');
    }

}