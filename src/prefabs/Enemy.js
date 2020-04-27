//Enemy prefab
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');

        scene.physics.add.existing(this);
        scene.add.existing(this); //Add object to the existing scene,displayList, updateList

        this.despawn = false;
        this.truckPauseTime = 1500; //time in ms the enemy pauses before spawning barrel and going back up
        this.goingDown = true;
        this.goingUp = false;
        this.calledTimer = false;
        this.setScale(1, 1);

        this.lane = Math.floor(Math.random() * (4 - 1 + 1) + 1);

        //Switch deciding which what x position to put the enemy at
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

        this.x = this.position;
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