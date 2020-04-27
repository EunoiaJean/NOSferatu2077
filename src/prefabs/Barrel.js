//Barrel prefab
class Barrel extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'barrel');
        this.setScale(.7, .7);
        scene.add.existing(this); //Add object to the existing scene,displayList, updateList
    }

    update(){
    }
}