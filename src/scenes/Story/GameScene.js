import Phaser from "phaser";
import data from "phaser/src/data";
import { Tween } from "phaser/src/tweens";

//BG
let foreGround;
let middleGround;
let backGround;
let skybox;
let lowbox;

//Character
let ermine;
let snowball;
let snowman;
let ermineATK;
let heart;
let playerHeart;
let heartGroup;

//Animation
let ermineAniATK;
let HeartAni;
let snowballAni;
let snowballAniDestroy;
let ermineAni;
let snowmanAni;
let snowmanAniDestroy;


//Event
let snowballEvent;
let snowGroup;
let snowManEvent;
let snowManGroup;
let changeScene;
let fadeChange;

//Controller
let keyW;
let keyA;
let keyS;
let keyD;
let keyAtk;


//Any 
let countDestroy = 0;
let fade = 0;
let speedforchange = 0;
let cutScene = 0;

//cooldown
let DELAY = 1000;
let timeSinceLastAttack = 0;
let scratch = 0;

//sound
let bgMusic;
let hitSnowball;
let hitSnowman;
let ermineSound;


class GameScene extends Phaser.Scene {
    constructor(fadeChange) {
        super({
            key: "GameScene",
        });
    }
    init(data) {
        playerHeart = 5;
        countDestroy=0;
        fade=0;
        speedforchange=0;
        timeSinceLastAttack=0;
        scratch=0;

    }

    preload() {
        //Back ground
        this.load.image("foreGround", "src/image/background/FG ermine.png");
        this.load.image("middleGround", "src/image/background/MG ermine.png");
        this.load.image("backGround", "src/image/background/BG ermine.png");
        this.load.image("skyblock", "src/image/background/SkyBlock.png");

        //Animation
        this.load.spritesheet("ermine", "src/image/Character/ermine/ermineAll.png", { frameWidth: 500, frameHeight: 300, });
        this.load.spritesheet("snowball", "src/image/Character/Snowball w_destroyed Sheet.png", { frameWidth: 300, frameHeight: 300, });
        this.load.spritesheet("snowman", "src/image/Character/SnowmanFall64.png", { frameWidth: 670, frameHeight: 670, });
        this.load.spritesheet("heart", "src/image/object/heart.png", { frameWidth: 64, frameHeight: 66, });

        this.load.audio('battle','src/sound/bgSceneSounds/Boss/dungeon_theme_2.mp3');
        this.load.audio('hitsnowball','src/sound/Effect/player-overlap.mp3');
        this.load.audio('hitsnowman','src/sound/Effect/snowball-hits.mp3');
        this.load.audio('scrath','src/sound/Effect/scrath1.mp3');

    }

    create() {
        bgMusic=this.sound.add('battle',{
            volume: 1,
            loop:true,
        });
        bgMusic.play();
        hitSnowball=this.sound.add('hitsnowball',{
            volume:1,
        })
        hitSnowman=this.sound.add('hitsnowman',{
            volume:1,
        })
        ermineSound=this.sound.add('scrath',{
            volume:1,
        })
        //Fade IN
        this.cameras.main.fadeIn(3000);
        //Create Image
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

        //top
        skybox = this.physics.add
            .image(0, 0, "skyblock")
            .setScale(5, 0.8)
            .setVisible()
            .setImmovable();
        //low
        lowbox = this.physics.add
            .image(0, 850, "skyblock")
            .setScale(5, 0.8)
            .setVisible()
            .setImmovable()
            .setDepth(10000000000);

        ermine = this.physics.add.sprite(190, 360, "ermine")
            .setScale(0.45)
            .setSize(50, 80)
            .setOffset(300, 150);

        //collider
        this.physics.add.collider(ermine, skybox);
        this.physics.add.collider(ermine, lowbox);
        this.physics.add.collider(ermine, backGround);

        //Heart Group
        heartGroup = this.physics.add.group();

        //heart Animation
        HeartAni = this.anims.create({
            key: "heartAni",
            frames: this.anims.generateFrameNumbers("heart", {
                start: 0,
                end: 7,
            }),
            duration: 450,
            framerate: 60,
            repeat: -1,
            callbackScope:this,
        });

        //Heart
        for (let i = 0; i < playerHeart; i++) {
            heart = this.physics.add.sprite(30 + i * 45, 250, "heart")
                .setDepth(100000)
                .setScale(0.75);
            heartGroup.add(heart);
            heart.anims.play("heartAni", true);
        }

        //ermine Animation
        ermineAni = this.anims.create({
            key: "ermineAni",
            frames: this.anims.generateFrameNumbers("ermine", {
                start: 0,
                end: 3,
            }),
            duration: 450,
            framerate: 10,
            repeat: -1,
            callbackScope:this,
        });

        ermine.anims.play("ermineAni", true);
        ermine.setCollideWorldBounds(true);
        ermine.immortal = false;

        //ermineATK
        ermineAniATK = this.anims.create({
            key: "ermineAniATK",
            frames: this.anims.generateFrameNumbers("ermine", {
                start: 6,
                end: 9,
            }),
            duration: 500,
            framerate: 1,
            repeat: -1,
            callbackScope: this,
        });

        //Snow Ball Animation
        snowballAni = this.anims.create({
            key: "snowballAni",
            frames: this.anims.generateFrameNumbers("snowball", {
                start: 0,
                end: 2,
            }),
            duration: 750,
            framerate: 1,
            repeat: -1,
            callbackScope:this,
        });

        snowballAniDestroy=this.anims.create({
            key: "snowballAniDestroy",
            frames:this.anims.generateFrameNumbers("snowball",{
                start: 3,
                end: 7,
            }),
            duration:750,
            framerate:1,
            callbackScope:this,
        });

        //create snow group for destroy
        snowGroup = this.physics.add.group();

        //Snow ball Event
        snowballEvent = this.time.addEvent({
            delay: Phaser.Math.Between(700, 900),
            callback: function () {
                snowball = this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), "snowball")
                    .setScale(0.65)
                    .setSize(10, 60)
                    .setOffset(30, 220);
                snowGroup.add(snowball);
                snowball.setVelocityX(-1000);
                snowball.anims.play("snowballAni", true);
                this.physics.add.overlap(ermine, snowball,snowballPlay,() => {
                    if(snowball.anims.currentAnim.key == 'snowballAniDestroy'){
                        this.tweens.add({
                            targets: snowball,
                            alpha:0.1,
                            duration: 1000
                        });
                    }
                    if (ermine.immortal == false) {
                        playerHeart--;
                        for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                            if (playerHeart < i + 1) {
                                heartGroup.getChildren()[i].setVisible(false);
                            } else {
                                heartGroup.getChildren()[i].setVisible(true);
                            }
                        }
                        ermine.immortal = true;
                        ermine.flickerTimer = this.time.addEvent({
                            delay: 100,
                            callback: function () {
                                ermine.setVisible(!ermine.visible);
                                if (ermine.flickerTimer.repeatCount == 0) {
                                    ermine.immortal = false;
                                    ermine.setVisible(true);
                                    ermine.flickerTimer.remove();
                                }
                            },
                            repeat: 15,
                        });
                    }
                });
                snowball.depth = snowball.y;
            },
            callbackScope: this,
            loop: true,
            paused: false,
        });

        //Snowman Animation
        snowmanAni = this.anims.create({
            key: "snowmanAni",
            frames: this.anims.generateFrameNumbers("snowman", {
                start: 0,
                end: 7,
            }),
            duration: 750,
            framerate: 1,
            repeat: -1,
            callbackScope:this,
        });

        snowmanAniDestroy=this.anims.create({
            key: "snowmanAniDestroy",
            frames: this.anims.generateFrameNumbers("snowman",{
                start: 8,
                end: 11,
            }),
            duration:500,
            framerate:1,
            callbackScope:this
        });
        //create snowman group for destroy
        snowManGroup = this.physics.add.group();

        //Snowman Event
        snowManEvent = this.time.addEvent({
            delay: Phaser.Math.Between(500, 700),
            callback: function () {
                snowman = this.physics.add.sprite(1380, Phaser.Math.Between(150, 550), "snowman")
                    .setScale(0.45)
                    .setSize(30, 145)
                    .setOffset(235, 440);
                snowman.flipX = !snowman.flipX;
                snowManGroup.add(snowman);
                snowman.setVelocityX(Phaser.Math.Between(-700, -1000));
                snowman.anims.play("snowmanAni", true);
                this.physics.add.overlap(ermine, snowman, snowmanDestroy, () => {
                    if(snowman.anims.currentAnim.key == 'snowmanAniDestroy'){
                        this.tweens.add({
                            targets: snowman,
                            alpha:0,
                            duration: 1000
                        });
                    }
                    if (scratch == 0) {
                        if (ermine.immortal == false) {
                            playerHeart--;
                            for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                                if (playerHeart < i + 1) {
                                    heartGroup.getChildren()[i].setVisible(false);
                                } else {
                                    heartGroup.getChildren()[i].setVisible(true);
                                }
                            }
                            ermine.immortal = true;
                            ermine.flickerTimer = this.time.addEvent({
                                delay: 100,
                                callback: function () {
                                    ermine.setVisible(!ermine.visible);
                                    if (ermine.flickerTimer.repeatCount == 0) {
                                        ermine.immortal = false;
                                        ermine.setVisible(true);
                                        ermine.flickerTimer.remove();
                                    }
                                },
                                repeat: 15,
                            });
                        }
                    }
                    else if (scratch == 1) {
                        if (ermine.anims.currentAnim.key == 'ermineAniATK') {
                            countDestroy++;
                        }
                    }
                });
                snowman.depth = snowman.y;
            },
            callbackScope: this,
            loop: true,
            paused: false,
        });

        function snowmanDestroy(ermine, snowman) {
            hitSnowman.play();
            snowman.flipX=false;
            snowman.anims.play('snowmanAniDestroy',true);
        }

        function snowballPlay(ermine,snowball){
            hitSnowball.play();
            snowball.anims.play("snowballAniDestroy",true);
        }

        //Player Control
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyAtk = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        changeScene = this.time.addEvent({
            delay: 2000,
            callback: ChangeScene ,
            callbackScope: this,
            paused: true,
            loop: true
        });

        fadeChange = this.time.addEvent({
            delay: 60000,
            callback: function () {
                ermine.immortal=true;
                ermine.setCollideWorldBounds(false);
                snowManEvent.paused = true;
                snowballEvent.paused = true;
                if (fade == 0) {
                    this.cameras.main.fadeOut(2000);
                    fade++
                }
                changeScene.paused = false;
            },
            callbackScope: this,
            paused: false
        });
        
        function ChangeScene(){
            bgMusic.stop();
            ermine.setVelocityX(0);
            if (cutScene == 0) {
                this.scene.start("CutSceneBossFight", { playerHeart: playerHeart });
                cutScene++;
            }
            else if (cutScene == 1) {
                this.scene.start("BossFight", { playerHeart: playerHeart });
            }
            snowballAni.destroy();
            snowmanAni.destroy();
            ermineAni.destroy();
            ermineAniATK.destroy();
            HeartAni.destroy();
            snowballAniDestroy.destroy();
            snowmanAniDestroy.destroy();             
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.W);
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.A);
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.S);
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.D);
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        }
    }

    update(delta, time) {
        //set Depth ermine
        ermine.depth = ermine.y - (ermine.height - 254);

        //BG Tile Sprite
        foreGround.tilePositionX += 10;
        middleGround.tilePositionX += 6;
        backGround.tilePositionX += 3;

        //Input from keyboard
        if (playerHeart > 0) {
            if (keyW.isDown) {
                ermine.setVelocityY(-200);
            } else if (keyS.isDown) {
                ermine.setVelocityY(200);
            } else {
                ermine.setVelocityY(0);
            }
            if (keyA.isDown) {
                ermine.setVelocityX(-300);
            } else if (keyD.isDown) {
                ermine.setVelocityX(300);
            } else {
                ermine.setVelocityX(0);
            }
            if (keyAtk.isDown && delta >= (timeSinceLastAttack + DELAY)) {
                ermineSound.play();
                ermine.anims.play("ermineAniATK", true);
                scratch = 1;

                this.time.addEvent({
                    delay: 500,
                    callback: function () {
                        ermine.anims.play("ermineAni", true);
                        scratch = 0;
                    },
                    callbackScope: this,
                    loop: false
                });

                timeSinceLastAttack = delta;
            }
            speedforchange += 1;
            //8600
            if (speedforchange > 8600) {
                ermine.immortal=true;
                ermine.setVelocityX(500);
            }
        }
        if (playerHeart <= 0) {
            ermine.setVelocityY(0);
            ermine.setVelocityX(-100);
                ermine.immortal=true;
                snowManEvent.paused = true;
                snowballEvent.paused = true;
                if(fade==0){
                this.cameras.main.fadeOut(2000);
                if('camerafadeoutprogress'){
                    this.cameras.main.fadeOut(1000);
                }
                fade++;
            }
                this.time.addEvent({
                    delay: 2000,
                    callback: GameOverScene,
                    callbackScope: this,
                });
        }


        //destroy snowGroup when x = -150
        for (let i = 0; i < snowGroup.getChildren().length; i++) {
            if (snowGroup.getChildren()[i].x < -150) {
                snowGroup.getChildren()[i].destroy();
            }
        }
        //destroy snowManGroup when x = -150
        for (let i = 0; i < snowManGroup.getChildren().length; i++) {
            if (snowManGroup.getChildren()[i].x < -10) {
                snowManGroup.getChildren()[i].destroy();
            }
        }
        function GameOverScene(){
            bgMusic.stop();
            this.scene.start("GameOverStory");
            snowballAni.destroy();
            snowmanAni.destroy();
            ermineAni.destroy();
            ermineAniATK.destroy();
            HeartAni.destroy();
            snowballAniDestroy.destroy();
            snowmanAniDestroy.destroy();
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.W);
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.A);
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.S);
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.D);
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.SPACE);             
        }
    }
}

export default GameScene;
