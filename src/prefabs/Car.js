//Car prefab
class Car extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this); //Add object to the existing scene,displayList, updateList
    }

    update(){
        //Move car down
        this.y += game.settings.backgroundScrollSpeed + 3;
    }
}