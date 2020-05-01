class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('NOS', './assets/NOS.png');
        this.load.image('bike', './assets/NOSbike.png');
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
        this.add.text(centerX, centerY + .5 * textSpacer, 'Press Left or A to see instructions', menuConfig).setOrigin(0.5);

        //Show NOS and his bike
        this.NOS = this.add.image(game.config.width/4, game.config.height/1.5, 'NOS');
        this.NOS.setScale(4);

        this.NOS = this.add.image(game.config.width/1.3, game.config.height/1.2, 'bike');
        this.NOS.setScale(4);


        //Show NOS and his bike
        this.NOS = this.add.image(game.config.width/4, game.config.height/1.5, 'NOS');
        this.NOS.setScale(4);

        this.NOS = this.add.image(game.config.width/1.3, game.config.height/1.2, 'bike');
        this.NOS.setScale(4);


        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyA)) {
            this.scene.start("instructionScene");
        }
    }

}