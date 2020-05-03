class Play extends Phaser.Scene {
    constructor() {
        super("playScene");

        this.increasedDifficulty1 = false;
        this.increasedDifficulty2 = false;
        this.increasedDifficulty3 = false;
    }

    preload() {
        //load images/tile sprite
        this.load.image('player', './assets/NOSinGame.png');
        this.load.image('playerTurnLeft', './assets/NOSinGameLeftTurn.png');
        this.load.image('playerTurnRight', './assets/NOSinGameRightTurn.png');
        this.load.image('redCar', './assets/NOScarRed.png');
        this.load.image('blueCar', './assets/NOScarBlue.png');
        this.load.image('yellowCar', './assets/NOScarYellow.png');
        this.load.image('bgLeftSide', './assets/NOSbackgroundLeftSideFlipped.png');
        this.load.image('bgMiddle', './assets/NOSbackgroundRoad.png');
        this.load.image('bgRightSide', './assets/NOSbackgroundRightSide.png');
        this.load.audio('bgMusic', './assets/ToccataTechno.wav');
        this.load.audio('explosion', './assets/explosion.mp3');
        this.load.atlas('barrelAtlas', './assets/barrel_roll.png', './assets/barrel_roll_atlas.json');
        this.load.atlas('vanAtlas', './assets/van.png', './assets/van_atlas.json');
        this.load.atlas('explosionAtlas', './assets/explosion.png', './assets/explosion_atlas.json');
    }

    create() {
        console.log("Current Highscore: " + localStorage.getItem("highScore"));

        //Place road
        this.backgroundRoad = this.add.tileSprite(game.config.width / 2, game.config.height / 2, 242, game.config.height, "bgMiddle");
        this.backgroundRoad.scaleX = 2;

        //Place tiling left side
        this.backgroundLeft = this.add.tileSprite(0, 0, game.config.width / 2 - 242, game.config.height, "bgLeftSide").setOrigin(0, 0);
        this.backgroundLeft.setFlipX(true);

        //Place tiling right side
        this.backgroundRight = this.add.tileSprite(game.config.width / 2 + 242, 0, game.config.width / 2 - 242, game.config.height, "bgRightSide").setOrigin(0, 0);


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

        if (!bgMusic) {
            bgMusic = this.sound.add('bgMusic', { volume: 0.3 });
            bgMusic.play({
                loop: true,
            });
        }


        this.p1 = new Player(this, roadCenter[roadPosition], 600);
        //Define keyboard keys

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        scoreConfig.fixedWidth = 0;
        this.clockDisplay = this.add.text(game.config.width / 2, 42, "Time: " + this.game.settings.gameTimer, scoreConfig);
        this.highestScore = this.add.text(game.config.width / 2, 42 + 64, "Current Highscore: " + localStorage.getItem("highScore"), scoreConfig).setOrigin(0.5);
        //game over flag
        this.gameOver = false;

        //play clock
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
                this.spawnCar();
            },
            loop: true,
        });

        //TimerEvent in charge of spawning enemies after a set spawnDelay, loops indefinitely
        let firstSpawn = this.time.delayedCall(10000, () => {
            this.enemySpawner = this.time.addEvent({
                delay: game.settings.enemySpawnDelay,
                callback: () => {
                    this.enemy = new Enemy(this, this.position, 0, 'vanAtlas', 'barrelvan1.png');
                    this.enemy.play('dropBarrel');
                    this.enemyGroup.add(this.enemy, true);
                },
                loop: true,
            });
        }, null, this)

        this.anims.create({
            key: 'barrelRoll',
            frameRate: 10,
            frames: this.anims.generateFrameNames('barrelAtlas', {
                prefix: 'barrel',
                start: 1,
                end: 3,
                zeropad: 1,
            }),
            repeat: -1,
        });

        this.anims.create({
            key: 'dropBarrel',
            frameRate: 0.65,
            frames: this.anims.generateFrameNames('vanAtlas', {
                prefix: 'barrelvan',
                start: 1,
                end: 3,
                zeropad: 1,
            }),
        });

        this.anims.create({
            key: 'explode',
            frameRate: 6,
            frames: this.anims.generateFrameNames('explosionAtlas', {
                prefix: 'explosion',
                start: 1,
                end: 3,
                zeropad: 1,
            }),
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
            if (parseInt(this.clockDisplay.text) > highScore) {
                highScore = this.clockDisplay.text;
                console.log("New Highscore: " + highScore);
                localStorage.setItem("highScore", highScore);
            }
            this.add.text(game.config.width / 2, game.config.height / 2, "GAME OVER", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, "Space to Restart or ← for Menu", scoreConfig).setOrigin(0.5);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.resetSettings();
                this.scene.restart(this.p1Score);
            } else if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                bgMusic.destroy();
                bgMusic = null;
                this.resetSettings();
                this.scene.start("menuScene");
            }
        }
        //Scroll background
        this.backgroundRoad.tilePositionY -= game.settings.backgroundScrollSpeed;
        this.backgroundLeft.tilePositionY -= game.settings.backgroundScrollSpeed;
        this.backgroundRight.tilePositionY -= game.settings.backgroundScrollSpeed;

        if (!this.gameOver) {
            //update sprites here if you want them to pause on game over
            this.p1.update();

            if (parseInt(this.clockDisplay.text) > highScore) {
                highScore = this.clockDisplay.text;
                console.log("New Highscore: " + highScore);
                localStorage.setItem("highScore", highScore);
                this.highestScore.setText("Current Highscore: " + localStorage.getItem("highScore"));
            }

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
                    this.barrel = new Barrel(this, this.enemyGroup.getChildren()[i].x, this.enemyGroup.getChildren()[i].y + this.enemyGroup.getChildren()[i].height - 13, "barrelAtlas", 'barrel1.png'); //Spawn new barrel from enemy
                    this.barrel.play('barrelRoll');
                    this.physics.add.existing(this.barrel);
                    this.barrel.body.setVelocityY(game.settings.carSpeed + 75);
                    this.barrelGroup.add(this.barrel, true); //Add barrel to barrelArray
                }, null, this);
            } else if (this.enemyGroup.getChildren()[i].despawn) {
                //Enemy is ready to despawn, destroy it
                this.enemyGroup.remove(this.enemyGroup.getChildren()[i], true, true);
            }
        }

        //Despawn cars going off screen
        for (let j = 0; j < this.carGroup.getLength(); j++) {
            if (this.carGroup.getChildren()[j].y > game.config.height + this.carGroup.getChildren()[j].height) {
                this.carGroup.remove(this.carGroup.getChildren()[j], true, true);
            }
        }

        //Despawn barrels going off screen
        for (let k = 0; k < this.barrelGroup.getLength(); k++) {
            if (this.barrelGroup.getChildren()[k].y > game.config.height + this.barrelGroup.getChildren()[k].height) {
                this.barrelGroup.remove(this.barrelGroup.getChildren()[k], true, true);
            }
        }

        //Increase difficulty after set time 1
        if (this.clockDisplay.text == game.settings.difficultyIncreaseTime1 && !(this.increasedDifficulty1)) {
            console.log("Difficulty Increase 1");
            this.increasedDifficulty1 = true;
            game.settings.carSpawnDelay = 900;
            this.carSpawner.reset({
                delay: game.settings.carSpawnDelay,
                callback: () => {
                    this.spawnCar();
                },
                loop: true,
            });
        }

        //Increase difficulty after set time 2
        if (this.clockDisplay.text == game.settings.difficultyIncreaseTime2 && !(this.increasedDifficulty2)) {
            console.log("Difficulty Increase 2");
            this.increasedDifficulty2 = true;
            game.settings.carSpeed = 800;
            game.settings.backgroundScrollSpeed = 15;
        }

        //Increase difficulty after set time 3
        if (this.clockDisplay.text == game.settings.difficultyIncreaseTime3 && !(this.increasedDifficulty3)) {
            console.log("Difficulty Increase 3");
            this.increasedDifficulty3 = true;
            game.settings.enemySpawnDelay = 3000;
            this.enemySpawner.reset({
                delay: game.settings.enemySpawnDelay,
                callback: () => {
                    this.enemy = new Enemy(this, this.position, 0, 'vanAtlas', 'barrelvan1.png');
                    this.enemy.play('dropBarrel');
                    this.enemyGroup.add(this.enemy, true);
                },
                loop: true,
            });
        }

    }

    playerEnemyCollision(player, object) {
        let explosionSFX = this.sound.add('explosion', { volume: 0.25 });
        explosionSFX.play();
        this.explosion = new Explosion(this, player.x, player.y, 'explosionAtlas', 'explosion1.png');
        this.explosion.body.setVelocityY(game.settings.carSpeed);
        this.explosion.play('explode');
        this.explosionDespawnDelay = this.time.delayedCall(500, () => {
            this.explosion.destroy();
        }, null, this);
        player.destroy();
        object.destroy();
        this.gameOver = true;
    }

    EnemyEnemyCollision(enemy1, enemy2) {
        let explosionSFX = this.sound.add('explosion', { volume: 0.25 });
        explosionSFX.play();
        this.explosion = new Explosion(this, enemy1.x, enemy1.y, 'explosionAtlas', 'explosion1.png');
        this.explosion.body.setVelocityY(game.settings.carSpeed);
        this.explosion.play('explode');
        this.explosionDespawnDelay = this.time.delayedCall(500, () => {
            this.explosion.destroy();
        }, null, this);
        enemy1.destroy();
        enemy2.destroy();
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
    }

    spawnCar() {
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
    }

    resetSettings() {
        this.increasedDifficulty1 = false;
        this.increasedDifficulty2 = false;
        this.increasedDifficulty3 = false;
        game.settings.backgroundScrollSpeed = 10;
        game.settings.carSpeed = 400;
        game.settings.carSpawnDelay = 1000;
        game.settings.enemySpawnDelay = 5000;
        roadPosition = 2;
    }
}
