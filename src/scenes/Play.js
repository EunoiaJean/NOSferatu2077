class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/tile sprite
        this.load.image('player', './assets/NOSinGame.png');
        this.load.image('redCar', './assets/NOScarRed.png');
        this.load.image('blueCar', './assets/NOScarBlue.png');
        this.load.image('yellowCar', './assets/NOScarYellow.png');
        this.load.image('enemy', './assets/barrelVan1.png');
        // this.load.image('enemy2', './assets/starfield.png');
        this.load.image('background', './assets/tempRoad.png');
        this.load.audio('bgMusic', './assets/ToccataTechno.mp3');
        // this.load.image('spear', './assets/starfield.png');
        this.load.image('barrel', './assets/barrel.png');
        // this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {


        //Place background
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background").setOrigin(0, 0);

        //Groups to keep track of things and update them
        this.carGroup = this.add.group({
            runChildUpdate: true
        });

        this.enemyGroup = this.add.group({
            runChildUpdate: true
        });

        this.barrelGroup = this.add.group({
            runChildUpdate: true
        });

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
                    this.car = new Car(this, this.position, 0, "redCar");
                    this.physics.add.existing(this.car);
                    this.car.body.setVelocityY(game.settings.carSpeed);
                    this.carGroup.add(this.car, true);
                }
                if (color == 2) {
                    this.car = new Car(this, this.position, 0, "blueCar");
                    this.physics.add.existing(this.car);
                    this.car.body.setVelocityY(game.settings.carSpeed);
                    this.carGroup.add(this.car, true);
                }
                if (color == 3) {
                    this.car = new Car(this, this.position, 0, "yellowCar");
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

        this.physics.add.overlap(this.p1, this.carGroup, this.playerEnemyCollision, null, this);
        this.physics.add.overlap(this.p1, this.enemyGroup, this.playerEnemyCollision, null, this);
        this.physics.add.overlap(this.p1, this.barrelGroup, this.playerEnemyCollision, null, this);
        this.physics.add.overlap(this.carGroup, this.barrelGroup, this.EnemyEnemyCollision, null, this);
    }

    update() {

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

        //Despawn cars going off screen
        for(let j = 0; j < this.carGroup.getLength(); j++){
            if(this.carGroup.getChildren()[j].y > game.config.height + this.carGroup.getChildren()[j].height){
                this.carGroup.remove(this.carGroup.getChildren()[j], true, true);
            }
        }

        //Despawn barrels going off screen
        for(let k = 0; k < this.barrelGroup.getLength(); k++){
            if(this.barrelGroup.getChildren()[k].y > game.config.height + this.barrelGroup.getChildren()[k].height){
                this.barrelGroup.remove(this.barrelGroup.getChildren()[k], true, true);
            }
        }

    }

    playerEnemyCollision(player, object) {
        player.destroy();
        object.destroy();
        this.gameOver = true;
        //play explosion animation
    }

    EnemyEnemyCollision(enemy1, enemy2) {
        enemy1.destroy();
        enemy2.destroy();
        //play explosion animation
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
