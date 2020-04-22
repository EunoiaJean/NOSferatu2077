class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio

    }

    create() {

        //menu display
        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            // backgroundColor: "#F3B141",
            color: "#ffffff",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //Display menu text
        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer, 'NOS-Feratu', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 2 * textSpacer, 'Press Spacebar to Start', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("playScene");
        }
    }

}