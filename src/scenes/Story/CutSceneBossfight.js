import Phaser from "phaser";

//BG
let foreGround;
let middleGround;
let backGround;
let skybox;
let skybox2;

//Character
let golem;
let ermineCutScene;
let snowRoll;

//Event
let golemEvent;
let changeScene;
let fadeChange;
let snowRollEvent;

//Animation
let golemAni;
let ermineAni;
let ermineAniStand;
let golemStandAni;
let golemAtkAni;
let snowRollAni;

//Heart
let playerHeart;
//Any
let fade = 0;
let question1;
let question2;
let question3;
let stand = 0;
let snowRollGroup;

//sound
let bgMusic;
let sound;

class CutSceneBossFight extends Phaser.Scene {
    constructor(test) {
        super({
            key: "CutSceneBossFight",
        });
    }
    init(data) {
        playerHeart = data.playerHeart;
    }

    preload() {
        //Background
        this.load.image("foreGround", "src/image/background/FG ermine.png");
        this.load.image("middleGround", "src/image/background/MG ermine.png");
        this.load.image("backGround", "src/image/background/BG ermine.png");
        this.load.image("skyblock", "src/image/background/SkyBlock.png");

        //Character
        this.load.spritesheet("golem", "src/image/Character/golem/Golem2_sprite.png",
            { frameWidth: 890, frameHeight: 890 });
        this.load.spritesheet("ermineCutScene", "src/image/Character/ermine/ermineWithStand.png",
            { frameWidth: 500, frameHeight: 300 });
        this.load.spritesheet("heart", "src/image/object/heart.png",
            { frameWidth: 64, frameHeight: 66 });
        this.load.spritesheet("snowball", "src/image/Character/snowball.png",
            { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet("snowRoll", "src/image/Character/Snowball w_destroyed Sheet.png",
            { frameWidth: 300, frameHeight: 300, });

        //Obj
        this.load.image("question", "src/image/object/question.png");

        this.load.audio('cutsceneSound','src/sound/bgSceneSounds/Boss/cutscene.mp3');
        this.load.audio('earthquake','src/sound/Effect/earthquake2.mp3');
    }

    create() {
        bgMusic=this.sound.add('cutsceneSound',{
            volume: 0.5,
            loop:true,
        });
        bgMusic.play();
        sound=this.sound.add('earthquake',{
            volume: 0.2,
            loop:true,
        });
        //Show X Y
        this.cameras.main.fadeIn(1500);

        //Create Background
        foreGround = this.add.tileSprite(0, 0, 1600, 720, "foreGround")
            .setOrigin(0, 0)
            .setDepth(3000);
        middleGround = this.add.tileSprite(0, -300, 1280, 720, "middleGround")
            .setOrigin(0, 0)
            .setDepth(1)
            .setScale(1, 1.5);
        backGround = this.add.tileSprite(0, -150, 1280, 720, "backGround")
            .setOrigin(0, 0)
            .setDepth(3);



        //Character
        //ermine
        ermineCutScene = this.physics.add.sprite(-100, this.game.renderer.height / 2 + 50, "ermineCutScene")
            .setScale(0.4)
            .setDepth(5)
            .setVelocityX(250);
        this.physics.add.collider(ermineCutScene, skybox);
        this.physics.add.collider(ermineCutScene, skybox2);
        this.physics.add.collider(ermineCutScene, backGround);

        //ermine Aanimation
        ermineAni = this.anims.create({
            key: "ermineAni",
            frames: this.anims.generateFrameNumbers("ermineCutScene", {
                start: 0,
                end: 3,
            }),
            duration: 750,
            framerate: 1,
            repeat: -1,
            callbackScope:this
        });
        ermineCutScene.anims.play("ermineAni", true);

        ermineAniStand = this.anims.create({
            key: "ermineAniStand",
            frames: this.anims.generateFrameNumbers("ermineCutScene", {
                start: 10,
                end: 10,
            }),
            duration: 750,
            framerate: 1,
            repeat: -1,
            callbackScope:this
        });

        //ermine walk
        this.time.addEvent({
            delay: 1000,
            callback: function () {
                sound.play();
                this.tweens.add({
                    targets: ermineCutScene,
                    duration: 1400,
                    x: 350,
                    y: (this.game.renderer.height / 2) + 50,
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Golem
        golem = this.physics.add.sprite(this.game.renderer.width + 500, this.game.renderer.height / 2 - 50, "golem")
            .setScale(0.4)
            .setSize(650, 415)
            .setOffset(125, 350)
            .setDepth(5);

        //golem Animation
        //Walk
        golemAni = this.anims.create({
            key: "golemAni",
            frames: this.anims.generateFrameNumbers("golem", {
                start: 0,
                end: 3,
            }),
            duration: 750,
            framerate: 1,
            repeat: -1,
            callbackScope: this,
        });
        golem.anims.play("golemAni", true);

        golemAtkAni = this.anims.create({
            key: "golemAtkAni",
            frames: this.anims.generateFrameNumbers("golem", {
                start: 4,
                end: 8,
            }),
            duration: 1000,
            framerate: 1,
            repeat: -1,
            callbackScope: this,
        });

        changeScene = this.time.addEvent({
            delay: 1000,
            callback: function () {
                sound.stop();
                bgMusic.stop();
                this.scene.start("BossFight", { playerHeart: playerHeart });
                ermineAni.destroy();
                ermineAniStand.destroy();
                golemAni.destroy();
                golemAtkAni.destroy();
                snowRollEvent.destroy();
                snowRollAni.destroy();
            },
            callbackScope: this,
            paused: true,
        });

        fadeChange = this.time.addEvent({
            delay: 3000,
            callback: function () {
                if (fade == 0) {
                    this.cameras.main.fadeOut(1000);
                    fade++;
                }
                changeScene.paused = false;
            },
            callbackScope: this,
            paused: true,
        });

        snowRollAni = this.anims.create({
            key: "snowRollAni",
            frames: this.anims.generateFrameNumbers("snowRoll", {
                start: 0,
                end: 2,
            }),
            duration: 750,
            framerate: 1,
            repeat: -1,
            callbackScope: this,
        });

        snowRollGroup = this.physics.add.group();

        let golemATK=this.time.addEvent({
            delay: 8000,
            callback: function () {
                snowRollEvent = this.time.addEvent({
                    delay: Phaser.Math.Between(300, 700),
                    callback: function () {
                        snowRoll = this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), "snowRoll")
                            .setScale(0.65);
                        snowRollGroup.add(snowRoll);
                        snowRoll.setVelocityX(Phaser.Math.Between(-100, -300));
                        snowRoll.anims.play("snowRollAni", true);
                        snowRoll.depth = snowRoll.y;
                    },
                    callbackScope: this,
                    loop: true,
                    paused: false,
                });
            },
            callbackScope: this,
            loop: false,
        });


    }

    update(delta, time) {
        golem.depth = golem.y + 75;

        if (ermineCutScene.x > 350) {
            ermineCutScene.anims.play("ermineAniStand", true);
            ermineCutScene.setVelocityX(0);
            this.time.addEvent({
                delay: 500,
                callback: function () {
                    question1 = this.physics.add.sprite(375, this.game.renderer.height / 2, "question")
                        .setScale(0.06)
                        .setDepth(3);
                    question1.alpha = 1;
                    question1.rotation = -0.5;
                },
                callbackScope: this,
                loop: false,
            });
            this.time.addEvent({
                delay: 850,
                callback: function () {
                    question2 = this.physics.add.sprite(400, this.game.renderer.height / 2 - 5, "question")
                        .setScale(0.09)
                        .setDepth(3);
                    question2.alpha = 1;
                },
                callbackScope: this,
                loop: false,
            });
            this.time.addEvent({
                delay: 1150,
                callback: function () {
                    question3 = this.physics.add.sprite(425, this.game.renderer.height / 2, "question")
                        .setScale(0.06)
                        .setDepth(3);
                    question3.alpha = 1;
                    question3.rotation = 0.5;
                },
                callbackScope: this,
                loop: false,
            });
            this.time.addEvent({
                delay: 1500,
                callback: function () {
                    this.tweens.add({
                        targets: question1,
                        duration: 500,
                        alpha: 0,
                    });
                    this.tweens.add({
                        targets: question2,
                        duration: 500,
                        alpha: 0,
                    });
                    this.tweens.add({
                        targets: question3,
                        duration: 500,
                        alpha: 0,
                    });
                },
                callbackScope: this,
                loop: false,
            });
        }

        if (golem.x > 1000) {
            golem.setVelocityX(-100);
        } else if (golem.x <= 1000) {
            golem.setVelocityX(0);
            golem.anims.play("golemAtkAni", true);
            fadeChange.paused = false;
        }
    }
}

export default CutSceneBossFight;
