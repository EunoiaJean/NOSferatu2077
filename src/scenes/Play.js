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

        //initialize the physics engine.
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Place background
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background").setOrigin(0, 0);

        //Arrays to keep track of things and update them
        this.carsArray = new Array();
        this.carGroup = this.game.add.group();
        this.enemyArray = new Array();
        this.enemyGroup = this.game.add.group();
        this.barrelArray = new Array();
        this.barrelGroup = this.game.add.group();

        let bgMusic = this.sound.add('bgMusic');
        bgMusic.play({
            loop: true,
        });

        this.p1 = new Player(this, 322, 600, 'player', 0, 0).setScale(0.2, 0.2);

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
                this.car = new Car(this, this.position, 0, "car", 0);
                this.car.setScale(.8, .8);
                this.carsArray.push(this.car);

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
                this.enemy = new Enemy(this, this.position, 0, "enemy", 0);
                this.enemy.setScale(1.5, 1.5);
                this.enemyArray.push(this.enemy);
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

        //Loops through array of barrels and update each one
        for (let k = 0; k < this.barrelArray.length; k++) {
            this.barrelArray[k].update();
        }

        //check key input for restart
        if (this.gameOver) {
            //Check if they beat high score
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
        for (let i = 0; i < this.carsArray.length; i++)
        {
            if (this.playerCarCollision(this.p1, this.carsArray[i])) {
                console.log('car poop\n');
                this.p1.destroy()
                this.carsArray[i].destroy()
                this.gameOver = true;
            }
        }

        //enemy
        for (let j = 0; j < this.enemyArray.length; j++)
        {
            if (this.playerEnemyCollision(this.p1, this.enemyArray[j])) {
                console.log('enemy poop\n');
                this.p1.destroy()
                this.enemyArray[j].destroy()
                this.gameOver = true;
            }
        }

        //barrel
        for (let k = 0; k < this.barrelArray.length; k++)
        {
            if (this.playerBarrelCollision(this.p1, this.barrelArray[k])) {
                console.log('barrel poop\n');
                this.p1.destroy()
                this.barrelArray[k].destroy()
                this.gameOver = true;
            }
        }
        
        //barrel hitting cars
        for (let t = 0; t < this.barrelArray.length; t++)
        {
            for(let p = 0; p < this.carsArray.length; p ++)
            {
                if (this.barrelCarCollision(this.carsArray[p], this.barrelArray[t])) {
                    console.log('barrel car poop\n');
                    this.carsArray[p].destroy()
                    this.barrelArray[t].destroy()
                }
            }
        }

        //Despawn any cars going off screen
        for (let i = 0; i < this.carsArray.length; i++) {
            if (this.carsArray[i].y >= game.config.height + this.carsArray[i].height) {
                this.carsArray[i].destroy(); //Destroy the car
                this.carsArray.splice(i, 1); //Remove car from array of cars
            }
        }

        //Despawn any enemies going off screen
        for (let i = 0; i < this.enemyArray.length; i++) {
            //Once enemy has stopped, call the timer once for the enemy to pause it
            if (!(this.enemyArray[i].goingDown) && !(this.enemyArray[i].calledTimer)) {
                this.enemyArray[i].calledTimer = true;
                this.pauseTimer = this.time.delayedCall(this.enemyArray[i].truckPauseTime, () => {
                    this.enemyArray[i].goingUp = true; //Set goingUp to true so enemy knows it can go up now
                    this.barrel = new Barrel(this, this.enemyArray[i].x, this.enemyArray[i].y, "barrel", 0); //Spawn new barrel from enemy
                    this.barrel.setScale(.7, .7);
                    this.barrelArray.push(this.barrel); //Add barrel to barrelArray
                }, null, this);
            } else if (this.enemyArray[i].despawn) {
                //Enemy is ready to despawn, destroy it
                this.enemyArray[i].destroy(); //Destroy the enemy
                this.enemyArray.splice(i, 1); //Remove enemy from array of enemies
            }
        }

        //Despawn any barrels going off screen
        for (let i = 0; i < this.barrelArray.length; i++) {
            if (this.barrelArray[i].y >= game.config.height + this.barrelArray[i].height) {
                this.barrelArray[i].destroy(); //Destroy the barrel
                this.barrelArray.splice(i, 1); //Remove barrel from array of barrels
            }
        }

    }

    playerCarCollision(player, car) {
        //Simple AABB checking
        if (player.x < car.x + car.width &&
            player.x + player.width > car.x &&
            player.y < car.y + car.height &&
            player.height + player.y > car.y) {
            return true;
        } else {
            return false;
        }
    }
    playerBarrelCollision(player, barrel) {
        //Simple AABB checking
        if (player.x < barrel.x + barrel.width &&
            player.x + player.width > barrel.x &&
            player.y < barrel.y + barrel.height &&
            player.height + player.y > barrel.y) {
            return true;
        } else {
            return false;
        }
    }

    playerEnemyCollision(player, enemy) {
        //Simple AABB checking
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.height + player.y > enemy.y) {
            return true;
        } else {
            return false;
        }
    }

    barrelCarCollision(barrel, car) {
        //Simple AABB checking
        if (barrel.x < car.x + car.width &&
            barrel.x + barrel.width > car.x &&
            barrel.y < car.y + car.height &&
            barrel.height + barrel.y > car.y) {
            return true;
        } else {
            return false;
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