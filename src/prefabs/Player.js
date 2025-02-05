class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.physics.add.existing(this);
        scene.add.existing(this); //add object to existing scene, displayList, updateList
        this.setScale(1.5);

        this.movingLeft = false;
        this.movingRight = false;
        roadPosition = 2;
    }


    update() {
        this.moveLeft();
        this.moveRight();
        //Input from WASD
        if (Phaser.Input.Keyboard.JustDown(keyA)) {
            if (!this.movingLeft) {
                if(roadPosition != roadLeft){
                    roadPosition--
                }
            }
            this.movingRight = false;
            this.movingLeft = true;
        }
        else if (Phaser.Input.Keyboard.JustDown(keyD)) {
            if (!this.movingRight) {
                if(roadPosition != roadRight){
                    roadPosition++;
                }
            }
            this.movingLeft = false;
            this.movingRight = true;
        }

        if (keyW.isDown && this.y >= 50) {
            this.y -= 3;
        }
        else if (keyS.isDown && this.y <= 850) {
            this.y += 3;
        }
        
        
        //Input from arrow keys
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            if (!this.movingLeft) {
                if(roadPosition != roadLeft){
                    roadPosition--
                }
            }
            this.movingRight = false;
            this.movingLeft = true;
        }
        else if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            if (!this.movingRight) {
                if(roadPosition != roadRight){
                    roadPosition++;
                }
            }
            this.movingLeft = false;
            this.movingRight = true;
        }

        if (keyUP.isDown && this.y >= 50) {
            this.y -= 3;
        }
        else if (keyDOWN.isDown && this.y <= 850) {
            this.y += 3;
        }
    }

    moveLeft() {
        if (this.movingLeft == true) {
            this.setTexture('playerTurnLeft');
            this.setVelocityX(-500);
            if (this.x <= roadCenter[roadPosition]) {
                this.setVelocityX(0);
                this.movingLeft = false;
                this.setTexture('player');
            }
        }
    }

    moveRight() {
        if (this.movingRight == true) {
            this.setTexture('playerTurnRight');
            this.setVelocityX(500);
            if (this.x >= roadCenter[roadPosition]) {
                this.setVelocityX(0);
                this.movingRight = false;
                this.setTexture('player');
            }
        }
    }
}
