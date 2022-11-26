import Phaser from "phaser";

//button
let play;
let tutorial;
let logo;
let arcade;
let story;
let snowbig;
let snowsmall;
let back;
//BG
let backGround;
let middleGround;
let foreGround;
//Logo
let gameLogo;
//Character
let ermineMenu;
let ermineMenuFlip;
let snowmanMenu1;
let snowmanMenu2;
let snowmanMenu3;
let golemMenu;
//Character Group
let firstGroup;
let secoundGroup;
let thirdGroup;
let fourthGroup;
//Event
let firstEvent;
let secoundEvent;
let thirdEvent;
let fourthEvent;
let transEvent;

//music
let main;
let click;

class MainMenu extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'MainMenu'
        });
    }

    preload() {
        //Back Ground
        this.load.image('backGround', 'src/image/background/BG ermine.png');
        this.load.image('midGround', 'src/image/background/MG ermine.png');
        this.load.image('foreGround', 'src/image/background/FG ermine.png');
        //Logo
        this.load.image('logo', 'src/image/logo/logo.png');
        this.load.image('game', 'src/image/logo/on top logo.png');
        //Button
        this.load.image('arcade', 'src/image/button/Arcade.png');
        this.load.image('howtoplay', 'src/image/button/Tutorial.png');
        this.load.image('story', 'src/image/button/Story.png');
        this.load.image('play', 'src/image/button/Play.png');
        this.load.image('snowbig', 'src/image/button/snowbig.png');
        this.load.image('snowsmall', 'src/image/button/snowsmall.png');
        this.load.image('snowsmall', 'src/image/button/back.png');
        this.load.image('back', 'src/image/button/back.png');
        //Character
        this.load.spritesheet('ermineMenu', 'src/image/Character/ermine/ermineAll.png',
            { frameWidth: 500, frameHeight: 300 });
        this.load.spritesheet('snowmanMenu', 'src/image/Character/Snowman.png',
            { frameWidth: 1000, frameHeight: 1000 });
        this.load.spritesheet('golemMenu', 'src/image/Character/golem/Golem2_sprite.png',
            { frameWidth: 890, frameHeight: 890 });

        this.load.audio('main','src/sound/bgSceneSounds/Menu/Main.mp3');
        this.load.audio('click','src/sound/Effect/click.mp3');
    }

    create() {
        main=this.sound.add('main',{
            volume: 0.2,
            loop:true,
        });
        main.play();
        click=this.sound.add('click',{
            volume:1,
        })

        //fade
        this.cameras.main.fadeIn(2000);

        //create BG
        middleGround = this.add.tileSprite(0, -300, 1280, 720, 'midGround')
            .setOrigin(0, 0)
            .setScale(1, 1.5);
        foreGround = this.add.tileSprite(0, 0, 1600, 720, 'foreGround')
            .setOrigin(0, 0)
            .setDepth(99);
        backGround = this.add.tileSprite(0, -50, 1280, 720, 'backGround')
            .setOrigin(0, 0)

        //Logo
        logo = this.add.image(this.game.renderer.width / 2, 150, 'logo')
            .setScale(0.4);
        logo.alpha=0;
        gameLogo = this.add.image(this.game.renderer.width / 2 + 300, 250, 'game')
            .setScale(0.08);
        gameLogo.rotation = -0.3;
        gameLogo.alpha=0;

        this.tweens.add({
            targets: logo,
            alpha:1,
            ease: 'Linear',
            duration: 3000,
        });

        this.tweens.add({
            targets: gameLogo,
            alpha:1,
            ease: 'Linear',
            duration: 3000,
        });

        //Ermine Animation
        let ermineAni = this.anims.create({
            key: 'ermineMenuAni',
            frames: this.anims.generateFrameNumbers('ermineMenu', {
                start: 0,
                end: 3
            }),
            duration: 450,
            framerate: 10,
            repeat: -1
        })

        //Ermine Animation
        let ermineAtkAni = this.anims.create({
            key: 'ermineAtkAni',
            frames: this.anims.generateFrameNumbers('ermineMenu', {
                start: 0,
                end: 9
            }),
            duration: 900,
            framerate: 10,
            repeat: -1
        })

        //Snowman Animation
        let snowmanAni = this.anims.create({
            key: 'snowmanMenuAni',
            frames: this.anims.generateFrameNumbers('snowmanMenu', {
                start: 0,
                end: 7
            }),
            duration: 750,
            framerate: 1,
            repeat: -1
        });

        //Golem Animation
        let golemAni = this.anims.create({
            key: 'golemMenuAni',
            frames: this.anims.generateFrameNumbers('golemMenu', {
                start: 0,
                end: 8
            }),
            duration: 1200,
            framerate: 1,
            repeat: -1
        });

        //First Round
        firstGroup = this.physics.add.group();
        firstEvent = this.time.addEvent({
            delay: 28000,
            callback: function () {
                //Character
                ermineMenu = this.physics.add.sprite(-300, 450, 'ermineMenu')
                    .setScale(0.4)
                    .setSize(250, 80)
                    .setOffset(200, 150);
                snowmanMenu1 = this.physics.add.sprite(-100, 410, 'snowmanMenu')
                    .setScale(0.2)
                    .setSize(340, 145)
                    .setOffset(350, 765);
                //Anims
                ermineMenu.anims.play('ermineMenuAni', true);
                snowmanMenu1.anims.play('snowmanMenuAni', true);
                //Group
                firstGroup.add(ermineMenu);
                firstGroup.add(snowmanMenu1);
                //Speed
                firstGroup.setVelocityX(300);
            },
            callbackScope: this,
            loop: true,
            paused: false,
            startAt: 27000,
        });
        firstEvent.getProgress();

        //Secound Round
        secoundGroup = this.physics.add.group();
        secoundEvent = this.time.addEvent({
            delay: 28000,
            callback: function () {
                //Character
                ermineMenu = this.physics.add.sprite(1280 + 100, 450, 'ermineMenu')
                    .setScale(0.4)
                    .setSize(250, 80)
                    .setOffset(200, 150)
                    .setFlipX(true);
                snowmanMenu1 = this.physics.add.sprite(1280 + 300, 400, 'snowmanMenu')
                    .setScale(0.2)
                    .setSize(340, 145)
                    .setOffset(350, 765)
                    .setFlipX(true);
                snowmanMenu2 = this.physics.add.sprite(1280 + 400, 350, 'snowmanMenu')
                    .setScale(0.2)
                    .setSize(340, 145)
                    .setOffset(350, 765)
                    .setFlipX(true);
                snowmanMenu3 = this.physics.add.sprite(1280 + 400, 450, 'snowmanMenu')
                    .setScale(0.2)
                    .setSize(340, 145)
                    .setOffset(350, 765)
                    .setFlipX(true);
                //Anims
                ermineMenu.anims.play('ermineMenuAni', true);
                snowmanMenu1.anims.play('snowmanMenuAni', true);
                snowmanMenu2.anims.play('snowmanMenuAni', true);
                snowmanMenu3.anims.play('snowmanMenuAni', true);
                //Group
                secoundGroup.add(ermineMenu);
                secoundGroup.add(snowmanMenu1);
                secoundGroup.add(snowmanMenu2);
                secoundGroup.add(snowmanMenu3);
                //Speed
                secoundGroup.setVelocityX(-300);
            },
            callbackScope: this,
            loop: true,
            paused: false,
            startAt: 20000,
        });
        firstEvent.getProgress();


        //Third Round
        thirdGroup = this.physics.add.group();
        thirdEvent = this.time.addEvent({
            delay: 28000,
            callback: function () {
                //Character
                ermineMenu = this.physics.add.sprite(-400, 450, 'ermineMenu')
                    .setScale(0.4)
                    .setSize(250, 80)
                    .setOffset(200, 150);
                snowmanMenu1 = this.physics.add.sprite(-200, 350, 'snowmanMenu')
                    .setScale(0.2)
                    .setSize(340, 145)
                    .setOffset(350, 765);
                snowmanMenu2 = this.physics.add.sprite(-200, 450, 'snowmanMenu')
                    .setScale(0.2)
                    .setSize(340, 145)
                    .setOffset(350, 765);
                snowmanMenu3 = this.physics.add.sprite(-100, 400, 'snowmanMenu')
                    .setScale(0.2)
                    .setSize(340, 145)
                    .setOffset(350, 765);
                //Anims
                ermineMenu.anims.play('ermineAtkAni', true);
                snowmanMenu1.anims.play('snowmanMenuAni', true);
                snowmanMenu2.anims.play('snowmanMenuAni', true);
                snowmanMenu3.anims.play('snowmanMenuAni', true);
                //Group
                thirdGroup.add(ermineMenu);
                thirdGroup.add(snowmanMenu1);
                thirdGroup.add(snowmanMenu2);
                thirdGroup.add(snowmanMenu3);
                //Speed
                thirdGroup.setVelocityX(300);
            },
            callbackScope: this,
            loop: true,
            paused: false,
            startAt: 13000,
        });
        firstEvent.getProgress();

        //Fourth Round
        fourthGroup = this.physics.add.group();
        fourthEvent = this.time.addEvent({
            delay: 28000,
            callback: function () {
                //Character
                ermineMenu = this.physics.add.sprite(1280 + 100, 450, 'ermineMenu')
                    .setScale(0.4)
                    .setSize(250, 80)
                    .setOffset(200, 150)
                    .setFlipX(true);
                golemMenu = this.physics.add.sprite(1280 + 350, 350, 'golemMenu')
                    .setScale(0.45)
                    .setSize(340, 145)
                    .setOffset(350, 765)
                snowmanMenu1 = this.physics.add.sprite(1280 + 680, 400, 'snowmanMenu')
                    .setScale(0.2)
                    .setSize(340, 145)
                    .setOffset(350, 765)
                    .setFlipX(true);
                snowmanMenu2 = this.physics.add.sprite(1280 + 580, 350, 'snowmanMenu')
                    .setScale(0.2)
                    .setSize(340, 145)
                    .setOffset(350, 765)
                    .setFlipX(true);
                snowmanMenu3 = this.physics.add.sprite(1280 + 580, 450, 'snowmanMenu')
                    .setScale(0.2)
                    .setSize(340, 145)
                    .setOffset(350, 765)
                    .setFlipX(true);
                //Anims
                ermineMenu.anims.play('ermineMenuAni', true);
                golemMenu.anims.play('golemMenuAni', true);
                snowmanMenu1.anims.play('snowmanMenuAni', true);
                snowmanMenu2.anims.play('snowmanMenuAni', true);
                snowmanMenu3.anims.play('snowmanMenuAni', true);
                //Group
                fourthGroup.add(ermineMenu);
                fourthGroup.add(golemMenu);
                fourthGroup.add(snowmanMenu1);
                fourthGroup.add(snowmanMenu2);
                fourthGroup.add(snowmanMenu3);
                //Speed
                fourthGroup.setVelocityX(-300);
            },
            callbackScope: this,
            loop: true,
            paused: false,
            startAt: 6500,
        });
        firstEvent.getProgress();

        //Play Button
        play = this.physics.add.image(this.game.renderer.width / 2, 400, 'play')
            .setDepth(100)
            .setInteractive();
        snowsmall = this.physics.add.image((this.game.renderer.width / 2) - 3, 400, 'snowsmall')
            .setDepth(101);
        play.on('pointerover', () => {
            snowsmall.setScale(1.1);
        })
        play.on('pointerout', () => {
            snowsmall.setScale(1);
        })
        play.on('pointerup', () => {
            click.play();
            tutorial.destroy();
            snowbig.destroy();
            play.destroy();
            snowsmall.destroy();
            //Story Button
            story = this.physics.add.image(this.game.renderer.width / 2 - 200, 400, 'story')
                .setDepth(100)
                .setInteractive();
            let snowsmall1 = this.physics.add.image(this.game.renderer.width / 2 - 200, 400, 'snowsmall')
                .setDepth(101);
            story.on('pointerover', () => {
                snowsmall1.setScale(1.1);
            })
            story.on('pointerout', () => {
                snowsmall1.setScale(1);
            })
            story.on('pointerup', () => {
                click.play();
                main.stop();
                this.cameras.main.fadeOut(500);
                transEvent = this.time.addEvent({
                    delay: 500,
                    callback: function () {
                        this.scene.start('intro');
                        ermineAtkAni.destroy();
                        golemAni.destroy();
                        this.scene.destroy();
                        ermineAni.destroy();
                        snowmanAni.destroy();
                    },
                    callbackScope: this,
                    loop: false,
                })

            })
            //Arcade Buttlon
            arcade = this.physics.add.image(this.game.renderer.width / 2 + 200, 400, 'arcade')
                .setDepth(100)
                .setInteractive();
            let snowsmall2 = this.physics.add.image(this.game.renderer.width / 2 + 200, 400, 'snowsmall')
                .setDepth(101)
            arcade.on('pointerover', () => {
                snowsmall2.setScale(1.1);
            })
            arcade.on('pointerout', () => {
                snowsmall2.setScale(1);
            })
            arcade.on('pointerdown', () => {
                click.play();
                main.stop();
                this.cameras.main.fadeOut(500);
                transEvent = this.time.addEvent({
                    delay: 500,
                    callback: function () {
                        this.scene.start('Arcade');
                        this.scene.destroy();
                        ermineAtkAni.destroy();
                        golemAni.destroy();
                        ermineAni.destroy();
                        snowmanAni.destroy();
                    },
                    callbackScope: this,
                    loop: false,
                })
            })

            back = this.physics.add.image(this.game.renderer.width / 2, 540, 'back')
                .setScale(0.5)
                .setDepth(100)
                .setInteractive();
            back.on('pointerover', () => {
                back.setScale(0.55);
            })
            back.on('pointerout', () => {
                back.setScale(0.5);
            })

            back.on('pointerup', () => {
                click.play();
                this.cameras.main.fadeOut(500)
                this.time.addEvent({
                    delay: 500,
                    callback: function () {
                        location.reload();
                    },
                    callbackScope: this,
                    loop: false,
                });
            });

        })
        //How to play Button
        tutorial = this.physics.add.image(this.game.renderer.width / 2, 540, 'howtoplay')
            .setScale(0.8)
            .setDepth(100)
            .setInteractive();
        snowbig = this.physics.add.image(this.game.renderer.width / 2, 540, 'snowbig')
            .setScale(0.8)
            .setDepth(101)
        tutorial.on('pointerover', () => {
            snowbig.setScale(0.9);
        })
        tutorial.on('pointerout', () => {
            snowbig.setScale(0.8);
        })

        tutorial.on('pointerup', () => {
            click.play();
            main.stop();
            this.cameras.main.fadeOut(500)
            transEvent = this.time.addEvent({
                delay: 500,
                callback: function () {
                    this.scene.start('TutorialScene');
                    ermineAtkAni.destroy();
                    golemAni.destroy();
                    ermineAni.destroy();
                    snowmanAni.destroy();
                },
                callbackScope: this,
                loop: false,
            });
        });
    }

    update(delta, time) {
        //First Round
        for (let i = 0; i < firstGroup.getChildren().length; i++) {
            if (firstGroup.getChildren()[i].x > 1400) {
                firstGroup.getChildren()[i].destroy();
            }
        }

        //Secound Round
        for (let i = 0; i < secoundGroup.getChildren().length; i++) {
            if (secoundGroup.getChildren()[i].x < -100) {
                secoundGroup.getChildren()[i].destroy();
            }
        }

        //Third Round
        for (let i = 0; i < thirdGroup.getChildren().length; i++) {
            if (thirdGroup.getChildren()[i].x > 1400) {
                thirdGroup.getChildren()[i].destroy();
            }
        }

        //Fourth Round
        for (let i = 0; i < fourthGroup.getChildren().length; i++) {
            if (fourthGroup.getChildren()[i].x < -100) {
                fourthGroup.getChildren()[i].destroy();
            }
        }
    }
}

export default MainMenu;
