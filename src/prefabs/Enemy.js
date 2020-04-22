//Enemy prefab
class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); //Add object to the existing scene,displayList, updateList

        this.despawn = false;
        this.truckPauseTime = 1000;
        this.goingDown = true;
        this.goingUp = false;
        this.calledTimer = false;
    }

    update() {
        if (this.y < 100 && this.goingDown) {
            //Move Enemy down until y < 100, going to the last else statement
            this.y += game.settings.backgroundScrollSpeed + 3;
        } else if(this.y < 0){
            //Once enemy moved back up, set desawn to true so Play knows to delete this enemy
            this.despawn = true;
        } else if ( this.y >= 0 && this.goingUp) {
            //Play scene called the timer and waited, not move enemy back up
            console.log("Fps: " + game.loop.actualFps);
            this.y -= (game.settings.backgroundScrollSpeed + 3);
        } else {
            //Come here from first if, set goingDown to false so the Play scene knows to start
            //the timer and continue.
            this.goingDown = false;
        }
    }
}