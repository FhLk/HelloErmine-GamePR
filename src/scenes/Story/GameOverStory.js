import Phaser from "phaser";

let end;
let tryAgain;
let backOver;
let backEvent;
let treePoster;
let cursors;
let textOver;
let snowbig;
let snowsmall;
let transEvent;
let playerHeart;

let bgMusic;
let click;

class GameOverStory extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameOverStory'
        });
    }

    preload() {
        //button
        this.load.image('end', 'src/image/button/end.png');
        this.load.image('tryAgain', 'src/image/button/again.png');
        this.load.image('snowbig', 'src/image/button/snowbig.png');
        this.load.image('snowsmall', 'src/image/button/snowsmall.png');
        //backGround
        this.load.image("backOver", "src/image/background/fullBG.png");
        //poster
        this.load.image("treePoster", "src/image/gameOver/treeposter.png");
        //text
        this.load.image("TextOver", "src/image/gameOver/TextOver.png");

        this.load.audio('click','src/sound/Effect/click.mp3');
        this.load.audio('sound','src/sound/bgSceneSounds/Menu/GameOver.mp3');
    }

    create() {
        bgMusic=this.sound.add('sound',{
            volume:0.5,
            loop:true,
        });
        bgMusic.play();
        click=this.sound.add('click',{
            volume:1,
        })
        this.cameras.main.fadeIn(2000);

        backOver = this.physics.add.image(0, 0, 'backOver')
            .setOrigin(0, 0)
            .setScale(1.5)
            .setVelocityX(-200);

        treePoster = this.physics.add.image(this.game.renderer.width + 350, 360, 'treePoster')
            .setScale(1)
            .setVelocityX(-450);



        textOver = this.physics.add.image((this.game.renderer.width / 2), (this.game.renderer.height + 1100), 'TextOver')
            .setScale(1)
            .setVelocityY(-450);

        snowbig = this.physics.add.image((this.game.renderer.width / 2), (this.game.renderer.height + 1300), 'snowbig')
            .setScale(0.7)
            .setDepth(1)
            .setVelocityY(-450);
        tryAgain = this.physics.add.image((this.game.renderer.width / 2), (this.game.renderer.height + 1300), 'tryAgain')
            .setScale(0.7)
            .setVelocityY(-450);
        tryAgain.setInteractive();

        tryAgain.on('pointerout', () => {
            snowbig.setScale(0.7)
        })
        tryAgain.on('pointerover', () => {
            snowbig.setScale(0.8)
        })
        tryAgain.on('pointerup', () => {
            bgMusic.stop();
            click.play();
            this.cameras.main.fadeOut(1000);
            transEvent = this.time.addEvent({
                delay: 1000,
                callback: function () {
                    this.scene.start('GameScene', playerHeart);
                },
                callbackScope: this,
                loop: false,
            })


        })

        snowsmall = this.physics.add.image(this.game.renderer.width - 102, this.game.renderer.height - 38, 'snowsmall')
            .setScale(0.5)
            .setDepth(1);
        snowsmall.alpha = 0;

        end = this.physics.add.image(this.game.renderer.width - 100, this.game.renderer.height - 40, 'end')
            .setScale(0.5);
        end.alpha = 0;

        end.setInteractive();
        end.on('pointerout', () => {
            snowsmall.setScale(0.5)
        })
        end.on('pointerover', () => {
            snowsmall.setScale(0.6)
        })
        end.on('pointerup', () => {
            click.play();
            this.cameras.main.fadeOut(1000);
            transEvent = this.time.addEvent({
                delay: 1000,
                callback: function () {
                    location.reload();
                },
                callbackScope: this,
                loop: false,
            })

        })

    }



    update(delta, time) {
        if (treePoster.x < this.game.renderer.width / 2) {
            backOver.setVelocityX(0);
            treePoster.setVelocityX(0);
        }

        if (textOver.y < 480) {
            textOver.setVelocityY(0);
        }
        if (tryAgain.y < 580) {
            tryAgain.setVelocityY(0);
            snowbig.setVelocityY(0);
            this.tweens.add({
                targets: snowsmall,
                duration: 250,
                alpha: 1
            });
            this.tweens.add({
                targets: end,
                duration: 250,
                alpha: 1
            });
        }
    }
}

export default GameOverStory;
