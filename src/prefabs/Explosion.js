//Explosion prefab because for some reason it's atlas won't work without a prefab
class Explosion extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        this.x = x + 90;
        this.y = y - 60;
        this.setScale(6);
        // this.body.setVelocityY(game.settings.carSpeed);
        scene.physics.add.existing(this);
        scene.add.existing(this); //Add object to the existing scene,displayList, updateList
    }

    update(){
    }
}