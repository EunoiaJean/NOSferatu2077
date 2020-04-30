class Music extends Phaser.Scene {
    constructor() {
        super("musicScene");
    }
    preload() {
        this.load.audio('bgMusic', './assets/ToccataTechno.mp3');
    }
    create() {
        let bgMusic = this.sound.add('bgMusic');
        bgMusic.play({
            loop: true,
        });
        this.scene.start("menuScene");
    }
}