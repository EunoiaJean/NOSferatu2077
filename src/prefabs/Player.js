class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x ,y ,texture, frame){
        super (scene, x , y, texture, frame);
        scene.add.existing(this); //add object to existing scene, displayList, updateList
    }


    update() {

        if (Phaser.Input.Keyboard.JustDown(keyA))
        {
            roadPosition--;
            if (roadPosition < roadLeft)
            {
                roadPosition = roadLeft;
            }
            this.x=roadCenter[roadPosition];
        }
        else if (Phaser.Input.Keyboard.JustDown(keyD))
        {
            roadPosition++;
            if (roadPosition > roadRight)
            {
                roadPosition =  roadRight;
            }
            this.x=roadCenter[roadPosition];
        }
        
        if (keyW.isDown && this.y>=50)
        {
            this.y -= 10;
        }
        else if (keyS.isDown && this.y<=850)
        {
            this.y += 10;
        }
    }
}
