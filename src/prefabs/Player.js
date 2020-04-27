class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x ,y){
        super (scene, x , y, 'player');
        scene.add.existing(this); //add object to existing scene, displayList, updateList
        scene.physics.add.existing(this);
        this.setScale(.05);
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
