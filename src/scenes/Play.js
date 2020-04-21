class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/tile sprite
        
    }

    create() {

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
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        scoreConfig.fixedWidth = 0;
        this.clockDisplay = this.add.text(300, 42, "Time: " + this.game.settings.gameTimer, scoreConfig);

        //game over flag
        this.gameOver = false;

        //60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, "GAME OVER", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, "Space to Restart or ← for Menu", scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }

    update() {
        //Speed increase after 30 seconds
        if(Math.floor(this.clock.getElapsedSeconds() > 30)){
            game.settings.spaceshipSpeed = 4;
        }

        //check key input for restart\
        this.topScore;
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if (this.p1Score > this.p2Score) {
                this.topScore = this.p1Score;
            } else {
                this.topScore = this.p2Score;
            }
            console.log("Top Score: " + this.topScore);
            if (this.topScore > highScore) {
                highScore = this.topScore;
            }
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            if (this.p1Score > this.p2Score) {
                this.topScore = this.p1Score;
            } else {
                this.topScore = this.p2Score;
            }
            console.log("Top Score: " + this.topScore);
            if (this.topScore > highScore) {
                highScore = this.topScore;
            }
            this.scene.start("menuScene");
        }

        //Scroll starfield
        

        if (!this.gameOver) {
            //update sprites
            
            this.clockDisplay.setText((game.settings.gameTimer/1000) - Math.floor(this.clock.getElapsedSeconds()));
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

    }

    checkCollision(rocket, ship) {
        //Simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
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


        this.sound.play('sfx_explosion');
    }

}