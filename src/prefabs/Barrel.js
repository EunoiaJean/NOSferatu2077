//Barrel prefab
class Barrel extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        this.setScale(2);
        scene.physics.add.existing(this);
        scene.add.existing(this); //Add object to the existing scene,displayList, updateList
    }

    update(){
    }
}