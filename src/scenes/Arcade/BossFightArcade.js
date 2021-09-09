import Phaser from "phaser";

//BG
let foreGround;
let middleGround;
let backGround;
let skybox;
let skybox2;

//Character
let golem;
let ermine;
let ermineThrow;

//Event
let golemEvent;
let golemATKEvent;
let snowballEvent;
let bulletEvent;

//Controller
let keyW;
let keyA;
let keyS;
let keyD;
let keyAtk;

//Animation
let golemAni;
let golemATK;
let snowballAni;
let ermineAni;
let ermineAniATKGame;
let HeartAni;
let snowballAniDestroyBoss;

//Object
let snowball;
let heart;

//Group
let snowballgroup;
let heartGroup;
let bulletGroup;
let bulletShowGroup;

//Any
let countATKGolem = 0;
let playerHeart;
let open = 0;
let rand=5;
let countBullet;
let score;
let fade=0;
let Reload=0;

//bullet
let bullet;
let bulletShow;
let delayBullet = 350;
let timeSinceLastAttackBullet = 0;
let heavyATK=0;
let atk = 10;

//Boss
let golemHp = 1;
let maxHp = 100;
let healthBar;
let backgroundBar;
let healthLabel;
let finish = 0;
let hpOpen = 0;

//cooldown
let DELAY = 1000;
let timeSinceLastAttack= 0;

//score
let scoreOverLabel;

class BossFightArcade extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BossFightArcade'
        });
    }
    init(data){
        playerHeart=data.playerHeart;
        score=data.score;
        golemHp=1;
        finish=0;
        hpOpen=0;
        timeSinceLastAttackBullet = 0;
        heavyATK=0;
        timeSinceLastAttack= 0;
        countATKGolem = 0;
        open = 0;
        countBullet=10;
        fade=0;
        Reload=0;
        if(atk>0 && atk==10){
            atk=10;
        }
        else if(atk==0){
            atk=1;
        }
    }

    preload() {
        //Background
        this.load.image("foreGround", "src/image/background/FG ermine.png");
        this.load.image("middleGround", "src/image/background/MG ermine.png");
        this.load.image("backGround", "src/image/background/BG ermine.png");
        this.load.image("skyblock", "src/image/background/SkyBlock.png");

        //Character
        this.load.spritesheet('golem', 'src/image/Character/golem/Golem2_sprite.png', { frameWidth: 890, frameHeight: 890 });
        this.load.spritesheet("ermine", "src/image/Character/ermine/ErmineAll.png", { frameWidth: 500, frameHeight: 300, });
        this.load.spritesheet("ermineThrow", "src/image/Character/ermine/ermine_throw.png", { frameWidth: 500, frameHeight: 300, });
        this.load.spritesheet("heart", "src/image/object/heart.png", { frameWidth: 64, frameHeight: 66, });
        this.load.spritesheet("snowball", "src/image/Character/Snowball w_destroyed Sheet.png", { frameWidth: 300, frameHeight: 300, });

        //Snow shoot
        this.load.image("bullet", "src/image/object/snowShoot.png");

        //HP Bar
        this.load.image('greenBar', 'src/image/object/health-green.png');
        this.load.image('redBar', 'src/image/object/health-red.png');

        //font
        this.load.bitmapFont('ZFT', 'src/image/object/ZFT_0.png', 'src/fonts/ZFT_3/ZFT.fnt');
    }

    create() {
        console.log(score);
        //Show X Y
        this.label = this.add.text(0, 0, "(x, y)", { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;

        this.cameras.main.fadeIn(3000);
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

        skybox = this.physics.add.image(0, 0, "skyblock")
            .setScale(5, 0.8)
            .setVisible()
            .setImmovable();
        skybox2 = this.physics.add.image(925, 215, "skyblock")
            .setOrigin(0, 0)
            .setScale(0.65, 0.93)
            .setImmovable()
            .setVisible(0)
            .setOffset(290, 280);

        //Object
        //Snow-Ball
        //SnowBall Animation
        snowballAni = this.anims.create({
            key: "snowballAni",
            frames: this.anims.generateFrameNumbers("snowball", {
                start: 0,
                end: 2,
            }),
            duration: 750,
            framerate: 1,
            repeat: -1,
            callbackScope:this
        });

        snowballAniDestroyBoss=this.anims.create({
            key: "snowballAniDestroyBoss",
            frames:this.anims.generateFrameNumbers("snowball",{
                start: 3,
                end: 7,
            }),
            duration:750,
            framerate:1,
            callbackScope:this
        });

        //Group
        snowballgroup = this.physics.add.group();

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
        });

        //Heart
        for (let i = 0; i < playerHeart; i++) {
            heart = this.physics.add.sprite(30 + i * 45, 250, "heart")
                .setDepth(100000)
                .setScale(0.75);
            heartGroup.add(heart);
            heart.anims.play("heartAni", true);
        }

        bulletShowGroup=this.add.group();
        for(let i=0;i<countBullet;i++){
            bulletShow=this.add.image(30+i * 45,200,"bullet")
            .setDepth(100000)
            .setScale(0.35);
            bulletShowGroup.add(bulletShow);
        }

        //Character
        //ermine
        ermine = this.physics.add.sprite(-100, 360, "ermine")
            .setScale(0.4)
            .setSize(250, 80)
            .setOffset(200, 150);
        this.physics.add.collider(ermine, skybox);
        this.physics.add.collider(ermine, skybox2);
        this.physics.add.collider(ermine, backGround);
        //ermine Aanimation
        ermineAni = this.anims.create({
            key: "ermineAni",
            frames: this.anims.generateFrameNumbers("ermine", {
                start: 0,
                end: 3
            }),
            duration: 750,
            framerate: 1,
            repeat: -1,
        });
        ermine.anims.play("ermineAni", true);
        ermine.setCollideWorldBounds(false);
        ermine.immortal = true;

        ermineAniATKGame=this.anims.create({
            key:"ermineAniATKGame",
            frames: this.anims.generateFrameNumbers("ermineThrow", {
                start: 6,
                end: 9,
            }),
            duration: 650,
            framerate: 1,
            repeat: 10,
            callbackScope:this,
        })

        //Golem
        golem = this.physics.add.sprite(this.game.renderer.width / 2 + 400, this.game.renderer.height / 2 - 100, "golem")
            .setScale(0.4)
            .setSize(650, 415)
            .setOffset(125, 350)
            .setVelocityY(-100)
            .setImmovable(1);

        healthLabel = this.add.text((this.game.renderer.width / 2) - 70, 60 + 50, 'Boss Health', { fontSize: '20px', fill: '#ffffff' }).setDepth(6);
        healthLabel.fixedToCamera = true;

        backgroundBar = this.add.image(this.game.renderer.width / 2, 70 + 50, 'redBar')
            .setDepth(5)
            .setScale(2.5, 1.5);
        backgroundBar.fixedToCamera = true;

        healthBar = this.add.image((backgroundBar.x / 2) + 70, 60 + 45, 'greenBar')
            .setDepth(5)
            .setOrigin(0, 0)
            .setScale(2.5, 1.5);

        //Bullet
        bulletGroup = this.add.group();

        this.physics.add.collider(golem, skybox, () => {
            golem.setVelocityY(100);
        });
        this.physics.add.overlap(ermine, golem, () => {
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

        }); //------------------------------------------------------

        //Set Walk Way
        golem.setCollideWorldBounds(true);
        golem.body.onWorldBounds = true;
        golem.body.world.on('worldbounds', function (body) {
            if (body.gameObject === this) {
                golem.setVelocityY(-100);
            }
        }, golem);

        //golem Animation
        //Walk
        golemAni = this.anims.create({
            key: "golemAni",
            frames: this.anims.generateFrameNumbers("golem", {
                start: 0,
                end: 3
            }),
            duration: 750,
            framerate: 1,
            repeat: -1,
            callbackScope:this
        });
        golem.anims.play("golemAni", true);

        //ATK
        golemATK = this.anims.create({
            key: "golemATK",
            frames: this.anims.generateFrameNumbers("golem", {
                start: 4,
                end: 8
            }),
            duration: 1000,
            framerate: 10,
            repeat: -1,
            callbackScope:this
        });
        // Golem Event
        golemATKEvent = this.time.addEvent({
            delay: Phaser.Math.RND.pick([1000, 2000, 3000, 4000, 5000]),
            callback: function () {
                countATKGolem = golemATKEvent.delay / 1000;
                golemATKEvent.delay = Phaser.Math.RND.pick([1000, 2000, 3000, 4000, 5000]);
                if (golem.anims.currentAnim.key === 'golemAni') {
                    golem.anims.play("golemATK", true);
                    golem.setVelocityY(0);
                    //snowball
                    switch (countATKGolem) {
                        case 1:
                            snowballEvent = this.time.addEvent({
                                delay: 1000,
                                callback: function () {
                                    snowball = this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), "snowball")
                                        .setScale(0.65)
                                        .setSize(230, 60)
                                        .setOffset(30, 220);
                                    snowballgroup.add(snowball);
                                    snowball.setVelocityX(Phaser.Math.Between(-700, -1000));
                                    snowball.anims.play("snowballAni", true);
                                    snowball.depth = snowball.y;
                                    this.physics.add.overlap(ermine, snowball,snowballDestroy,() => {
                                        if(snowball.anims.currentAnim.key == 'snowballAniDestroyBoss'){
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
                                },
                                callbackScope: this,
                                loop: false,
                                paused: false,
                                repeat: 2
                            });
                            break;
                        case 2:
                            snowballEvent = this.time.addEvent({
                                delay: 1000,
                                callback: function () {
                                    snowball = this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), "snowball")
                                        .setScale(0.65)
                                        .setSize(230, 60)
                                        .setOffset(30, 220);
                                    snowballgroup.add(snowball);
                                    snowball.setVelocityX(Phaser.Math.Between(-700, -1000));
                                    snowball.anims.play("snowballAni", true);
                                    snowball.depth = snowball.y;
                                    this.physics.add.overlap(ermine, snowball,snowballDestroy,() => {
                                        if(snowball.anims.currentAnim.key == 'snowballAniDestroyBoss'){
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
                                },
                                callbackScope: this,
                                loop: false,
                                paused: false,
                                repeat: 3
                            });
                            break;
                        case 3:
                            snowballEvent = this.time.addEvent({
                                delay: 1000,
                                callback: function () {
                                    snowball = this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), "snowball")
                                        .setScale(0.65)
                                        .setSize(230, 60)
                                        .setOffset(30, 220);
                                    snowballgroup.add(snowball);
                                    snowball.setVelocityX(Phaser.Math.Between(-700, -1000));
                                    snowball.anims.play("snowballAni", true);
                                    snowball.depth = snowball.y;
                                    this.physics.add.overlap(ermine, snowball,snowballDestroy,() => {
                                        if(snowball.anims.currentAnim.key == 'snowballAniDestroyBoss'){
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
                                },
                                callbackScope: this,
                                loop: false,
                                paused: false,
                                repeat: 5
                            });
                            break;
                        case 4:
                            snowballEvent = this.time.addEvent({
                                delay: 1000,
                                callback: function () {
                                    snowball = this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), "snowball")
                                        .setScale(0.65)
                                        .setSize(230, 60)
                                        .setOffset(30, 220);
                                    snowballgroup.add(snowball);
                                    snowball.setVelocityX(Phaser.Math.Between(-700, -1000));
                                    snowball.anims.play("snowballAni", true);
                                    snowball.depth = snowball.y;
                                    this.physics.add.overlap(ermine, snowball,snowballDestroy,() => {
                                        if(snowball.anims.currentAnim.key == 'snowballAniDestroyBoss'){
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
                                },
                                callbackScope: this,
                                loop: false,
                                paused: false,
                                repeat: 7
                            });
                            break;
                        case 5:
                            snowballEvent = this.time.addEvent({
                                delay: 1000,
                                callback: function () {
                                    snowball = this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), "snowball")
                                        .setScale(0.65)
                                        .setSize(230, 60)
                                        .setOffset(30, 220);
                                    snowballgroup.add(snowball);
                                    snowball.setVelocityX(Phaser.Math.Between(-700, -1000));
                                    snowball.anims.play("snowballAni", true);
                                    snowball.depth = snowball.y;
                                    this.physics.add.overlap(ermine, snowball,snowballDestroy, () => {
                                        if(snowball.anims.currentAnim.key == 'snowballAniDestroyBoss'){
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
                                },
                                callbackScope: this,
                                loop: false,
                                paused: false,
                                repeat: 9
                            });
                            break;
                    }
                }
                else {
                    golem.anims.play("golemAni", true);
                    if (golem.setVelocityY < 0) {
                        golem.setVelocityY(100);
                    }
                    else if (golem.setVelocityY > 0) {
                        golem.setVelocityY(-100);
                    }
                    else {

                        if (golem.y < this.game.renderer.height / 2) {
                            golem.setVelocityY(100);
                        }
                        if (golem.y > this.game.renderer.height / 2) {
                            golem.setVelocityY(-100);
                        }
                    }

                }
            },
            callbackScope: this,
            loop: true,
            paused: false
        });

        //Player Control
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyAtk = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        function snowballDestroy(ermine,snowball){
            snowball.anims.play("snowballAniDestroyBoss",true);
        }

        scoreOverLabel = this.add.dynamicBitmapText(this.game.renderer.width - 250, 50, 'ZFT', 'Score : 0', 25)
            .setDepth(1000)
            .setTint(0x61390A);
    }

    update(delta, time) {
        console.log(atk);
        //Show X Y
        this.label.setText("(" + this.pointer.x + ", " + this.pointer.y + ")" + " | " + golem.y + " | " + countATKGolem + " | " + golemHp);

        scoreOverLabel.setText('Score : ' + score );

        ermine.depth = ermine.y - (ermine.height - 254);
        golem.depth = golem.y + 75;

        healthBar.setScale(golemHp / 40, 1.5);

        for (let i = 0; i < snowballgroup.getChildren().length; i++) {
            if (snowballgroup.getChildren()[i].x < -100) {
                snowballgroup.getChildren()[i].destroy();
            }
        }

        if (playerHeart <= 0) {
            ermine.setVelocityX(-100);
        }

        if (open == 1) {
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
                if(keyAtk.isDown && delta >= (timeSinceLastAttack + DELAY)){
                    if(countBullet<=10 && countBullet>0){
                    ermine.anims.play("ermineAniATKGame", true);
                    this.time.addEvent({
                        delay: 650,
                        callback: function () {
                            ermine.anims.play("ermineAni", true);
                        },
                        callbackScope: this,
                        loop: false
                    });
    
                    timeSinceLastAttack = delta;
                }
                    else if(countBullet==0){
                        ermine.anims.play("ermineAni", true);
                    }
                }
                if (keyAtk.isDown && delta > (timeSinceLastAttackBullet + delayBullet)) {
                    if(countBullet<=10 && countBullet>0){
                        countBullet--;
                        bullet = this.physics.add.image(ermine.x + 65, ermine.y + 10, 'bullet')
                            .setScale(0.35);
                        bullet.depth= bullet.y-100;
                        bulletGroup.add(bullet);
                        bullet.setVelocityX(800);
                        this.physics.add.overlap(bullet,golem,hitGolem,()=>{
                        heavyATK++;
                        if(heavyATK>=rand){
                            golemHp-=Phaser.Math.Between(5,9);
                            heavyATK=0;
                            rand=Phaser.Math.Between(3,6);
                        }
                    });
                    this.physics.add.overlap(bullet, snowball, hitSnowball);
                    timeSinceLastAttackBullet = delta;
                    }
                }
                if(countBullet==0){
                    Reload++;
                    console.log(Reload);
                    if(Reload>=500){
                        countBullet=10;
                        Reload=0;
                    }
                }

            }
            if (playerHeart <= 0) {
                ermine.immortal = true;
                snowballEvent.paused = true;
                if(fade==0){
                    this.cameras.main.fadeOut(2000);
                }
                this.time.addEvent({
                    delay: 2000,
                    callback: GameOverScene ,
                    callbackScope: this,
                    loop: false,
                    paused: false,
                });
            }
            for (let i = bulletShowGroup.getChildren().length-1 ; i >= 0; i--) {
                if (countBullet < i + 1) {
                    bulletShowGroup.getChildren()[i].setVisible(false);
                } else {
                    bulletShowGroup.getChildren()[i].setVisible(true);
                }
            }

            //open ermine walk
        } else if (open == 0) {
            if (ermine.x < 100 && playerHeart > 0) {
                ermine.setVelocityX(200);
            }
            else if (ermine.x >= 200 && playerHeart > 0) {
                ermine.setVelocityX(0);
                ermine.setCollideWorldBounds(true);
                open = 1;
            }
        }

        if (golemHp <= 0 && finish == 0) {
            finish++;
            score+=50;
            snowballEvent.paused = true;
            golem.setVelocityY(0);
            this.cameras.main.fadeOut(2000);
            this.time.addEvent({
                delay: 2000,
                callback: Win ,
                callbackScope: this,
                loop: false,
                paused: false,
            });

        }

        if (hpOpen == 0 && golemHp <=maxHp) {
            golemHp++;
            if(golemHp >= maxHp){
                hpOpen = 1;
            }
            
        }

        //Destroy snow shoot
        for (let i = 0; i < bulletGroup.getChildren().length; i++) {
            if (bulletGroup.getChildren()[i].x > 1300) {
                bulletGroup.getChildren()[i].destroy();
            }
        }
        
        function hitGolem(bullet, golem) {
            bullet.destroy();
            if (golemHp > 0) {
                golemHp-=atk;
            }
            if(golemHp<=0){
                golemHp=0;
                healthBar.setScale(-1,1.5);
            }
        }
        function hitSnowball(bullet, golem) {
            bullet.destroy();
        }
        function GameOverScene(){
            this.scene.start("GameOverArcade",{score:score});
            snowballAni.destroy();
            golemAni.destroy();
            ermineAni.destroy();
            ermineAniATKGame.destroy();
            HeartAni.destroy();
            snowballAniDestroyBoss.destroy();
            golemATK.destroy();
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.W);
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.A);
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.S);
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.D);
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.SPACE);        
        }

        function Win(){
            atk-=1;
            this.scene.start("Arcade",{score:score});
            snowballAni.destroy();
            golemAni.destroy();
            ermineAni.destroy();
            ermineAniATKGame.destroy();
            HeartAni.destroy();
            snowballAniDestroyBoss.destroy();
            golemATK.destroy();
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.W);
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.A);
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.S);
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.D);
            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.SPACE);   
        }
    }
}

export default BossFightArcade;