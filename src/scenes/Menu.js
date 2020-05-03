class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");

    }

    preload() {
        // this.load.image('NOS', './assets/NOS.png');
        // this.load.image('bike', './assets/NOSbike.png');
        this.load.image('bg', './assets/NOStitle.png');
        this.load.audio('mainMenuBGMusic', './assets/mainMenuMusic.mp3');
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

        this.background = this.add.image(game.config.width / 2, game.config.height / 2, 'bg');
        this.background.setScale(game.config.width / this.background.width);

        this.add.text(centerX, centerY + 2 * textSpacer, 'Press Spacebar to Start', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + .5 * textSpacer, 'Press Left or A to see instructions', menuConfig).setOrigin(0.5);



        if (!mainMenuBGMusic) {
            mainMenuBGMusic = this.sound.add('mainMenuBGMusic');
            mainMenuBGMusic.play({
                loop: true,
            });
        }

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
            mainMenuBGMusic.destroy();
            mainMenuBGMusic = null;
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyA)) {
            this.scene.start("instructionScene");
        }
    }

}