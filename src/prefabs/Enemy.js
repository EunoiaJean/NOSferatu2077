//Enemy prefab
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.physics.add.existing(this);
        scene.add.existing(this); //Add object to the existing scene,displayList, updateList

        this.despawn = false;
        this.truckPauseTime = 1500; //time in ms the enemy pauses before spawning barrel and going back up
        this.goingDown = true;
        this.goingUp = false;
        this.calledTimer = false;
        this.setScale(2);

        this.lane = Math.floor(Math.random() * (4 - 1 + 1) + 1);

        //Switch deciding which what x position to put the enemy at
        switch (this.lane) {
            case 1:
                this.position = roadCenter[1];
                break;
            case 2:
                this.position = roadCenter[2];
                break;
            case 3:
                this.position = roadCenter[3];
                break;
            case 4:
                this.position = roadCenter[4];
                break;
            default:
                console.log("Lane is out of bounds");
                break;
        }

        this.x = this.position;
        console.log("Enemy Position is " + this.x);
    }

    update() {
        if (this.y < 100 && this.goingDown) {
            //Move Enemy down until y < 100, going to the last else statement
            this.y += game.settings.backgroundScrollSpeed + 3;
        } else if (this.y < 0) {
            //Once enemy moved back up, set desawn to true so Play knows to delete this enemy
            this.despawn = true;
        } else if (this.y >= 0 && this.goingUp) {
            //Play scene called the timer and waited, not move enemy back up
            // console.log("Fps: " + game.loop.actualFps); //Possible problem with enemy moving fast because of fps
            this.y -= (game.settings.backgroundScrollSpeed + 3);
        } else {
            //Come here from first if, set goingDown to false so the Play scene knows to start
            //the timer and continue.
            this.goingDown = false;
        }
    }
}