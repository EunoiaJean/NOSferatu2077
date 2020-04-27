//Car prefab
class Car extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'car');

        scene.add.existing(this); //Add object to the existing scene,displayList, updateList

        this.lane = Math.floor(Math.random() * (4 - 1 + 1) + 1); //Choose random lane between 1 and 4

        //Decide what x position to put the car at based on lane
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
    }
}