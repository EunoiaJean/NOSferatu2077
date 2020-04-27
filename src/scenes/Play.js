class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/tile sprite
        this.load.image('player', './assets/player.png');
        this.load.image('car', './assets/tempCar.png');
        this.load.image('enemy', './assets/bigTruck.png');
        // this.load.image('enemy2', './assets/starfield.png');
        this.load.image('background', './assets/tempRoad.png');
        this.load.audio('bgMusic', './assets/ToccataTechno.mp3');
        // this.load.image('spear', './assets/starfield.png');
        this.load.image('barrel', './assets/metalBarrel.png');
        // this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {


        //Place background
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background").setOrigin(0, 0);

        //Groups to keep track of things and update them
        this.carGroup = this.add.group();
        // this.carsArray = new Array();
        this.enemyGroup = this.add.group();
        //this.enemyArray = new Array();
        this.barrelGroup = this.add.group();
        //this.barrelArray = new Array();
        let bgMusic = this.sound.add('bgMusic');
        bgMusic.play({
            loop: true,
        });

        this.p1 = new Player(this, 322, 600);
        //Define keyboard keys

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);


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
                var color = Math.floor(Math.random() * (3 - 1 + 1) + 1);
                if (color == 1) {
                    this.car = new Car(this, this.position, 0, "car");
                    this.physics.add.existing(this.car);
                    this.car.body.setVelocityY(game.settings.carSpeed);
                    this.carGroup.add(this.car, true);
                }
                if (color == 2) {
                    this.car = new Car(this, this.position, 0, "car");
                    this.physics.add.existing(this.car);
                    this.car.body.setVelocityY(game.settings.carSpeed);
                    this.carGroup.add(this.car, true);
                }
                if (color == 3) {
                    this.car = new Car(this, this.position, 0, "car");
                    this.physics.add.existing(this.car);
                    this.car.body.setVelocityY(game.settings.carSpeed);
                    this.carGroup.add(this.car, true);
                }

                //Example of how to reset this spawner with a new delay
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
                this.enemy = new Enemy(this, this.position, 0, "enemy");
                this.enemyGroup.add(this.enemy, true);
            },
            loop: true,
        });

        //ADD COLLISION
        this.physics.add.collider(
            this.p1,
            this.carGroup,
            function playerCarDelete(player, car) {
                player.destroy();
                console.log("poop");
                car.destroy();
                //gameOver = true;
                //play explosion animation
            });
        this.physics.add.collider(
            this.p1,
            this.enemyGroup,
            function playerEnemyDelete(player, enemy) {
                player.destroy();
                console.log("poop2");
                enemy.destroy();
                //gameOver = true;
                //play explosion animation
            }
        );
        this.physics.add.collider(this.p1,
            this.barrelGroup,
            function playerBarrelDelete(player, barrel) {
                player.destroy();
                console.log("poop3");
                barrel.destroy();
                //gameOver = true;
                //play explosion animation
            }
        );
        this.physics.add.collider(this.barrelGroup,
            this.carGroup,
            function barrelCarDelete(barrel, car) {
                barrel.destroy();
                car.destroy();
                //play explosion animation
            });
    }

    update() {

        //Loops through array of cars and update each one
        for (let i = 0; i < this.carGroup.getLength(); i++) {
            this.carGroup.getChildren()[i].update();
        }

        //Loops through array of enemies and update each one
        for (let j = 0; j < this.enemyGroup.getLength(); j++) {
            this.enemyGroup.getChildren()[j].update();
        }

        //Loops through array of barrels and update each one
        for (let k = 0; k < this.barrelGroup.getLength(); k++) {
            this.barrelGroup.getChildren()[k].update();
        }

        //check key input for restart
        if (this.gameOver) {
            //Check if they beat high score
            console.log("what");
            if (this.clockDisplay.text > highScore) {
                highScore = this.clockDisplay.text;
                console.log("New Highscore: " + highScore);
            }
            this.add.text(game.config.width / 2, game.config.height / 2, "GAME OVER", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, "Space to Restart or ← for Menu", scoreConfig).setOrigin(0.5);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.scene.restart(this.p1Score);
            } else if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.scene.start("menuScene");
            }
        }
        //Scroll background
        this.background.tilePositionY -= game.settings.backgroundScrollSpeed;

        if (!this.gameOver) {
            //update sprites here if you want them to pause on game over
            this.p1.update();

            //Update timer text
            this.clockDisplay.setText(Math.floor(this.clock.getElapsedSeconds()));
        }


        //collision checking

        //not sure if I should delete from array because game should end at this point.

        //car
        //     for (let i = 0; i < this.carsArray.length; i++)
        //     {
        //         if (this.playerCarCollision(this.p1, this.carsArray[i])) {
        //             this.p1.destroy()
        //             this.carsArray[i].destroy()
        //             this.gameOver = true;
        //         }
        //     }

        //     //enemy
        //     for (let j = 0; j < this.enemyArray.length; j++)
        //     {
        //         if (this.playerEnemyCollision(this.p1, this.enemyArray[j])) {
        //             this.p1.destroy()
        //             this.enemyArray[j].destroy()
        //             this.gameOver = true;
        //         }
        //     }

        //     //barrel
        //     for (let k = 0; k < this.barrelArray.length; k++)
        //     {
        //         if (this.playerBarrelCollision(this.p1, this.barrelArray[k])) {
        //             this.p1.destroy()
        //             this.barrelArray[k].destroy()
        //             this.gameOver = true;
        //         }
        //     }

        //     //barrel hitting cars
        //     for (let t = 0; t < this.barrelArray.length; t++)
        //     {
        //         for(let p = 0; p < this.carsArray.length; p ++)
        //         {
        //             if (this.barrelCarCollision(this.carsArray[p], this.barrelArray[t])) {
        //                 this.carsArray[p].destroy()
        //                 this.barrelArray[t].destroy()
        //             }
        //         }
        //     }

        //     //Despawn any cars going off screen
        //     for (let i = 0; i < this.carsArray.length; i++) {
        //         if (this.carsArray[i].y >= game.config.height + this.carsArray[i].height) {
        //             this.carsArray[i].destroy(); //Destroy the car
        //             this.carsArray.splice(i, 1); //Remove car from array of cars
        //         }
        //     }

        //Despawn any enemies going off screen
        for (let i = 0; i < this.enemyGroup.getLength(); i++) {
            //Once enemy has stopped, call the timer once for the enemy to pause it
            if (!(this.enemyGroup.getChildren()[i].goingDown) && !(this.enemyGroup.getChildren()[i].calledTimer)) {
                this.enemyGroup.getChildren()[i].calledTimer = true;
                this.pauseTimer = this.time.delayedCall(this.enemyGroup.getChildren()[i].truckPauseTime, () => {
                    this.enemyGroup.getChildren()[i].goingUp = true; //Set goingUp to true so enemy knows it can go up now
                    this.barrel = new Barrel(this, this.enemyGroup.getChildren()[i].x, this.enemyGroup.getChildren()[i].y, "barrel"); //Spawn new barrel from enemy
                    this.physics.add.existing(this.barrel);
                    this.barrel.body.setVelocityY(game.settings.carSpeed + 50);
                    this.barrelGroup.add(this.barrel, true); //Add barrel to barrelArray
                }, null, this);
            } else if (this.enemyGroup.getChildren()[i].despawn) {
                //Enemy is ready to despawn, destroy it
                this.enemyGroup.remove(this.enemyGroup.getChildren()[i], true, true);
            }
        }
    }


    bikeExplode(ship, rocket) {
        ship.alpha = 0;
        //create explosion spire at ship's position
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0, 0);
        boom.anims.play("explode");
        boom.on("animationcomplete", () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        // this.sound.play('sfx_explosion');
    }
    carExplode(ship, rocket) {
        ship.alpha = 0;
        //create explosion spire at ship's position
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0, 0);
        boom.anims.play("explode");
        boom.on("animationcomplete", () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        // this.sound.play('sfx_explosion');
    }

}
