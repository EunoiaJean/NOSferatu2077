class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x ,y ,texture, frame){
        super (scene, x , y, texture, frame);
        scene.add.existing(this); //add object to existing scene, displayList, updateList
    }


    update() {

        if (cursors.left.JustDown)
        {
            roadPosition--;
            if (roadPosition < roadLeft)
            {
                roadPosition = roadLeft;
            }
            player.X=roadCenter[roadPosition];
        }
        else if (cursors.right.JustDown)
        {
            roadPosition++;
            if (roadPosition > roadRight)
            {
                roadPosition =  roadRight;
            }
            player.X=roadCenter[roadPosition];
        }
        
        if (cursors.up.isDown)
        {
            player.y -= 10;
        }
        else if (cursors.down.isDown)
        {
            player.y += 10;
        }
    }
}
