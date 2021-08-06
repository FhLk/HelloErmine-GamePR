import Phaser from "phaser";

//BG
let foreGround;
let middleGround;
let backGround;
let skybox;

//Character
let ermine;
let snowball;
let snowman;
let Golem;
let ermineATK;
let heart;
let playerHeart = 3;
let heartGroup;

//Event
let snowEvent;
let snowGroup;
let snowManEvent;
let snowManGroup;

//Controller  
let keyW;
let keyA;
let keyS;
let keyD;
let keyAtk;


class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {

        //Back ground
        this.load.image('foreGround', 'src/image/FG ermine.png');
        this.load.image('middleGround', 'src/image/MG ermine.png');
        this.load.image('backGround', 'src/image/BG ermine.png');
        this.load.image('skyblock', 'src/image/SkyBlock.png');

        //Animation
        this.load.spritesheet('ermine', 'src/image/ermine.png',
            { frameWidth: 500, frameHeight: 300 });
        this.load.spritesheet('snowball', 'src/image/snowball.png',
            { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('snowman', 'src/image/Snowman.png',
            { frameWidth: 1000, frameHeight: 1000 });
        this.load.spritesheet('ermineATK','src/image/scratch sprite.png',
            {frameWidth: 500, frameHeight: 300});
        this.load.spritesheet('heart', 'src/image/heart.png',
            { frameWidth: 64, frameHeight: 66 }); 
    }

    create() {
        //Show X Y
        this.label = this.add.text(0, 0, '(x, y)', { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;

        //Create Image
        foreGround = this.add.tileSprite(0, 0, 1600, 720, 'foreGround')
            .setOrigin(0, 0)
            .setDepth(3000);
        middleGround = this.add.tileSprite(0, -300, 1280, 720, 'middleGround')
            .setOrigin(0, 0)
            .setDepth(1)
            .setScale(1, 1.5);
        backGround = this.add.tileSprite(0, -150, 1280, 720, 'backGround')
            .setOrigin(0, 0)
            .setDepth(3);
        skybox = this.physics.add.image(0, 0, 'skyblock')
            .setScale(5, 0.8)
            .setVisible()
            .setImmovable();
        ermine = this.physics.add.sprite(190, 360, 'ermine').setScale(0.5)
            .setSize(250, 80)
            .setOffset(200, 150);
        ermineATK=this.physics.add.sprite(190,360,'ermineATK').setScale(0.5)
            .setSize(250,80)
            .setOffset(200,150)
            .setVisible(true);
        ermine.immortal = false;

        //collider
        this.physics.add.collider(ermine, skybox);
        this.physics.add.collider(ermine,backGround);
        this.physics.add.collider(ermineATK,skybox);
        this.physics.add.collider(ermineATK,backGround);

        ermine.immortal = false;

        //Heart Group
        heartGroup = this.physics.add.group();

        //heart Animation
        let HeartAni=this.anims.create({
            key: 'heartAni',
            frames: this.anims.generateFrameNumbers('heart', {
                start: 0,
                end: 7
            }),
            duration: 450,
            framerate: 60,
            repeat: -1
        })

        //Heart
        for (let i = 0; i < playerHeart; i++) {
            heart = this.physics.add.sprite(30 + (i * 45), 250, 'heart')
                .setDepth(100000)
                .setScale(0.75);
            heartGroup.add(heart);
            heart.anims.play('heartAni', true);
        }

        //ermine Animation
        let ermineAni = this.anims.create({
            key: 'ermineAni',
            frames: this.anims.generateFrameNumbers('ermine', {
                start: 0,
                end: 2
            }),
            duration: 450,
            framerate: 1,
            repeat: -1
        })
        ermine.anims.play('ermineAni', true);
        ermine.setCollideWorldBounds(true);

        //ermineATK
        let ermineAniATK=this.anims.create({
            key: 'ermineAniATK',
            frames: this.anims.generateFrameNumbers('ermineATK',{
                start:0,
                end:4
            }),
            duration:450,
            framerate:1,
            repeat:-1
        });
        ermineATK.setCollideWorldBounds(true);

        //Snow Ball Animation
        let snowballAni=this.anims.create({
            key: 'snowballAni',
            frames: this.anims.generateFrameNumbers('snowball', {
                start: 0,
                end: 2
            }),
            duration: 750,
            framerate: 1,
            repeat: -1
        })

        //create snow group for destroy
        snowGroup = this.physics.add.group();

        //Snow Event
        snowEvent = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 3000),
            callback: function () {
                snowball = this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), 'snowball')
                    .setScale(0.65)
                    .setSize(230, 60)
                    .setOffset(30, 220);
                snowGroup.add(snowball);
                snowball.setVelocityX(Phaser.Math.Between(-200, -500));
                snowball.anims.play('snowballAni', true);
                this.physics.add.overlap(ermine, snowball, () => {
                    if (ermine.immortal == false) {
                        playerHeart--;
                        if (playerHeart <= 0) {
                            this.scene.start('GameOver');
                            snowballAni.destroy();
                            snowmanAni.destroy();
                            ermineAni.destroy();
                            ermineAniATK.destroy();
                            HeartAni.destroy();
                            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.W);
                            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.A);
                            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.S);
                            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.D);
                            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
                            playerHeart = 3
                        }
                        for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                            if (playerHeart < i + 1) {
                                heartGroup.getChildren()[i].setVisible(false);
                            }
                            else {
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
                            repeat: 15
                        });
                    }
                });
                snowball.depth = snowball.y;
            },
            callbackScope: this,
            loop: true,
            paused: false
        })

        //Snowman Ball Animation
        let snowmanAni=this.anims.create({
            key: 'snowmanAni',
            frames: this.anims.generateFrameNumbers('snowman', {
                start: 0,
                end: 7
            }),
            duration: 750,
            framerate: 1,
            repeat: -1
        })

        //create snowman group for destroy
        snowManGroup = this.physics.add.group();

        //Snowman Event
        snowManEvent = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 3000),
            callback: function () {
                snowman = this.physics.add.sprite(1380, Phaser.Math.Between(150, 550), 'snowman')
                    .setScale(0.3)
                    .setSize(340, 145)
                    .setOffset(350, 765);
                snowman.flipX = !snowman.flipX;
                snowManGroup.add(snowman);
                snowman.setVelocityX(Phaser.Math.Between(-300, -800));
                snowman.anims.play('snowmanAni', true);
                // this.physics.add.overlap(ermineATK,snowman,()=>{
                //     snowman.destroy();
                // })
                this.physics.add.overlap(ermine, snowman, () => {
                    if (ermine.immortal == false) {
                        snowman.destroy();
                        playerHeart--;
                        if (playerHeart <= 0) {
                            this.scene.start('GameOver');
                            snowmanAni.destroy();
                            snowballAni.destroy();
                            ermineAni.destroy();
                            ermineAniATK.destroy();
                            HeartAni.destroy();
                            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.W);
                            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.A);
                            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.S);
                            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.D);
                            this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
                            playerHeart = 3
                        }
                        for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                            if (playerHeart < i + 1) {
                                heartGroup.getChildren()[i].setVisible(false);
                            }
                            else {
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
                            repeat: 15
                        });
                    }
                });
                snowman.depth = snowman.y;
            },
            callbackScope: this,
            loop: true,
            paused: false
        })

        //Player Control
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyAtk = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        
    }
    

    update(delta, time) {
        //Show X Y
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')' + playerHeart);



        //set Depth ermine
        ermine.depth = ermine.y - (ermine.height - 254);
        ermineATK.depth=ermineATK.y -(ermineATK.height -254);

        //BG Tile Sprite
        foreGround.tilePositionX += 10;
        middleGround.tilePositionX += 6;
        backGround.tilePositionX += 3;

        //Input from keyboard
        if (keyW.isDown) {
            ermine.setVelocityY(-200);
            ermineATK.setVelocityY(-200);
        } else if (keyS.isDown) {
            ermine.setVelocityY(200);
            ermineATK.setVelocityY(200);
        } else {
            ermine.setVelocityY(0);
            ermineATK.setVelocityY(0);
        }
        if (keyA.isDown) {
            ermine.setVelocityX(-300);
            ermineATK.setVelocityX(-300);
        } else if (keyD.isDown) {
            ermine.setVelocityX(300);
            ermineATK.setVelocityX(300);
        } else {
            ermine.setVelocityX(0);
            ermineATK.setVelocityX(0);
        }
        if(keyAtk.isDown){
            ermineATK.anims.play('ermineAniATK', true);
            ermineATK.setVisible(true);
            ermine.setVisible(false);
            ermine.setActive(true);
        }
        else{
            ermineATK.anims.play('ermineAniATK', false);
            ermine.setVisible(true);
            ermineATK.setVisible(false);

            
        }

        //destroy snowGroup when x = -150
        for (let i = 0; i < snowGroup.getChildren().length; i++) {
            if (snowGroup.getChildren()[i].x < -150) {
                snowGroup.getChildren()[i].destroy();
            }
        }

        //destroy snowManGroup when x = -150
        for (let i = 0; i < snowManGroup.getChildren().length; i++) {
            if (snowManGroup.getChildren()[i].x < -150) {
                snowManGroup.getChildren()[i].destroy();
            }
        }


    }
}

export default GameScene;
