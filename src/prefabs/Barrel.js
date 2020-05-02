//Barrel prefab
class Barrel extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        this.setScale(2.5);
        scene.physics.add.existing(this);
        scene.add.existing(this); //Add object to the existing scene,displayList, updateList

        //this.anims.add('rolling', this.anims.generateFrameNames('barrel', 1, 3), 5, true);

    }

    update(){
    }
}