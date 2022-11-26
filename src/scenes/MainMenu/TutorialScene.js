import Phaser from "phaser";

let BgToturial;
let board;
let count = 0;
let text;

let info;

let ermineWalk;
let ermineScratch;
let ermineThrow;
let bulletTutorial;
let bulletGrp;

let nextTutorial;
let backTutorial;
let switchScene;
let backScene;

let click;
let bgMusic;

class TutorialScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'TutorialScene'
        });
    }

    preload() {
        //back ground
        this.load.image('BgToturial', 'src/image/tutorialScene/BG.png');
        this.load.image('board', 'src/image/tutorialScene/board.png');

        //font
        this.load.bitmapFont('ZFT', 'src/image/object/ZFT_0.png', 'src/fonts/ZFT_3/ZFT.fnt');

        //object
        this.load.image('info', 'src/image/tutorialScene/Info01.png');
        this.load.image('spb', 'src/image/tutorialScene/SPACE_BAR.png');
        this.load.image('bulletTutorial', 'src/image/object/snowShoot.png');

        //character
        this.load.spritesheet('ermineWalk', 'src/image/Character/ermine/ermine_throw.png',
            { frameWidth: 500, frameHeight: 300 });
        this.load.spritesheet('ermineScratch', 'src/image/Character/ermine/ermineAll.png',
            { frameWidth: 500, frameHeight: 300 });

        //button
        this.load.image('nextTutorial', 'src/image/button/next.png');
        this.load.image('backTutorial', 'src/image/button/back.png');

        this.load.audio('click','src/sound/Effect/click.mp3');
        this.load.audio('tutorial','src/sound/bgSceneSounds/Menu/tutorial.mp3');
    }

    create() {
        bgMusic=this.sound.add('tutorial',{
            volume:0.8,
            loop:true
        });
        bgMusic.play();
        click=this.sound.add('click',{
            volume:1,
        });

        this.cameras.main.fadeIn(500);

        BgToturial = this.add.image(0, 0, 'BgToturial')
            .setOrigin(0, 0)
            .setInteractive();

        board = this.physics.add.image(this.game.renderer.width / 2, this.game.renderer.height + 500, 'board')
            .setVelocityY(-1000);

        info = this.physics.add.image(0, 0 + 12, 'info').setOrigin(0, 0);
        info.alpha = 0;

        // ermine Walk
        ermineWalk = this.physics.add.sprite(260, 410, 'ermineWalk')
            .setScale(0.4);
        ermineWalk.alpha = 0;

        // ermine Scratch
        ermineScratch = this.physics.add.sprite(640, 410, 'ermineScratch')
            .setScale(0.4);
        ermineScratch.alpha = 0;

        // ermine Throw
        ermineThrow = this.physics.add.sprite(945, 410, 'ermineWalk')
            .setScale(0.4)
            .setDepth(3);
        ermineThrow.alpha = 0;

        // ermine Walk    
        let ermineWalkAni = this.anims.create({
            key: 'ermineWalkAni',
            frames: this.anims.generateFrameNumbers('ermineWalk', {
                start: 0,
                end: 3
            }),
            duration: 450,
            framerate: 10,
            repeat: -1
        })
        ermineWalk.anims.play('ermineWalkAni', true);

        // ermine Scratch
        let ermineScratchAni = this.anims.create({
            key: 'ermineScratchAni',
            frames: this.anims.generateFrameNumbers('ermineScratch', {
                start: 4,
                end: 9
            }),
            duration: 450,
            framerate: 10,
            repeat: -1
        })
        ermineScratch.anims.play('ermineScratchAni', true);

        // ermine Throw
        let ermineThrowAni = this.anims.create({
            key: 'ermineThrowAni',
            frames: this.anims.generateFrameNumbers('ermineWalk', {
                start: 4,
                end: 9
            }),
            duration: 650,
            framerate: 10,
            repeat: -1
        })
        ermineThrow.anims.play('ermineThrowAni', true);

        //bullet Tutorial
        bulletGrp = this.add.group();
        this.time.addEvent({
            delay: 650,
            callback: function () {
                bulletTutorial = this.physics.add.image(979, 410, 'bulletTutorial')
                    .setScale(0.35)
                    .setDepth(2);
                bulletTutorial.setVelocityX(200);
                bulletGrp.add(bulletTutorial);
            },
            callbackScope: this,
            loop: true,
            startAt: -500
        });

        nextTutorial = this.physics.add.image(1180, 670, 'nextTutorial')
            .setScale(0.5)
            .setDepth(100)
            .setInteractive();

        nextTutorial.on('pointerover', () => {
            nextTutorial.setScale(0.55);
        })
        nextTutorial.on('pointerout', () => {
            nextTutorial.setScale(0.5);
        })

        nextTutorial.on('pointerup', () => {
            bgMusic.stop();
            click.play();
            this.cameras.main.fadeOut(500)
            switchScene = this.time.addEvent({
                delay: 500,
                callback: function () {
                    this.scene.start('TutorialScene02');
                    ermineWalkAni.destroy();
                    ermineScratchAni.destroy();
                    ermineThrowAni.destroy();
                },
                callbackScope: this,
                loop: false,
            });
        });

        backTutorial = this.physics.add.image(1010, 670, 'backTutorial')
            .setScale(0.5)
            .setDepth(100)
            .setInteractive();

        backTutorial.on('pointerover', () => {
            backTutorial.setScale(0.55);
        })
        backTutorial.on('pointerout', () => {
            backTutorial.setScale(0.5);
        })

        backTutorial.on('pointerup', () => {
            bgMusic.stop();
            click.play();
            this.cameras.main.fadeOut(500)
            backScene = this.time.addEvent({
                delay: 500,
                callback: function () {
                    this.scene.start('MainMenu');
                    ermineWalkAni.destroy();
                    ermineScratchAni.destroy();
                    ermineThrowAni.destroy();
                },
                callbackScope: this,
                loop: false,
            });
        });

    }

    update(delta, time) {
        if (board.y < 380) {
            board.setVelocityY(0);
            if (count == 0)
                count++;
            this.tweens.add({
                targets: info,
                duration: 250,
                alpha: 1
            });
            this.tweens.add({
                targets: ermineWalk,
                duration: 250,
                alpha: 1
            });
            this.tweens.add({
                targets: ermineScratch,
                duration: 250,
                alpha: 1
            });
            this.tweens.add({
                targets: ermineThrow,
                duration: 250,
                alpha: 1
            });

        }
        count = 0;

        for (let i = 0; i < bulletGrp.getChildren().length; i++) {
            if (bulletGrp.getChildren()[i].x > 1150) {
                bulletGrp.getChildren()[i].destroy();
            }
        }
    }
}

export default TutorialScene;
