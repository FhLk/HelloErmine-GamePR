import Phaser from "phaser";
import { Zone } from "phaser/src/gameobjects";


//BG
let bgView;
let bgSky;

//camp
let campFire;
let campFireAni;

let typewriter;

let bitMapText;
let nameScale = 0.5;

let def = 12500;
let plus = 350;

//rainbow
const rainbowColor = [0xFF5757, 0xE8A241, 0x97FF7F, 0x52BFFF, 0x995DE8];
let rainbowColorIdx = 0;
let rainbowColorOffset = 0;
let delay = 0;
let rainbowText;

//Button
let ending;

//sound
let bgMusic;
let click;

class WinScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'WinScene'
        });
    }

    preload() {
        //Background
        this.load.image("bgView", "src/image/winScene/bgCampFire.jpg");
        this.load.image("bgSky", "src/image/winScene/skyCampFire.jpg");

        //Camp fire
        this.load.spritesheet('campFire', 'src/image/winScene/camp fire.png',
            { frameWidth: 800, frameHeight: 600 });

        //button
        this.load.image("endWin", "src/image/button/end.png");

        //font
        this.load.bitmapFont('fontZFT', 'src/image/object/ZFT_0.png', 'src/fonts/ZFT_3/ZFT.fnt');

        //name
        this.load.image("pos1", "src/image/winScene/textPositions01.png");
        this.load.image("pos2", "src/image/winScene/textPositions02.png");
        this.load.image("pos3", "src/image/winScene/textPositions03.png");
        this.load.image("pos4", "src/image/winScene/textPositions04.png");
        this.load.image("pos5", "src/image/winScene/textPositions05.png");
        this.load.image("pos6", "src/image/winScene/textPositions06.png");
        this.load.image("pos7", "src/image/winScene/textPositions07.png");
        this.load.image("pos8", "src/image/winScene/textPositions08.png");
        this.load.image("pos9", "src/image/winScene/textPositions09.png");

        //button
        this.load.image('ending', 'src/image/button/end.png');

        this.load.audio('endSound','src/sound/bgSceneSounds/GameScene/winter-wonderland-short.mp3');
        this.load.audio('click','src/sound/Effect/click.mp3');

    }

    create() {
        bgMusic=this.sound.add('endSound',{
            volume: 0.3,
            loop: true,
        });
        bgMusic.play();
        click=this.sound.add('click',{
            volume:1,
        });
        //fade
        this.cameras.main.fadeIn(2000);

        bgSky = this.add.image(0, 0, 'bgSky')
            .setOrigin(0);

        bgView = this.add.image(0, 0, 'bgView')
            .setOrigin(0);

        campFire = this.physics.add.sprite(this.game.renderer.width / 2, (this.game.renderer.height / 2) + 110, 'campFire')
            .setScale(0.18);

        campFireAni = this.anims.create({
            key: 'campFireAni',
            frames: this.anims.generateFrameNumbers('campFire', {
                start: 0,
                end: 2
            }),
            duration: 750,
            loop: true,
            repeat: -1
        })
        campFire.anims.play('campFireAni', true);

        //Congratulations
        this.time.addEvent({
            delay: 1000,
            callback: function () {
                rainbowText = this.add.dynamicBitmapText((this.game.renderer.width / 2) - 300, 210, 'fontZFT', `Congratulations\nThx for playing`, 100)
                    .setDepth(10);
                rainbowText.setDisplayCallback(this.rainbowCallback);
                rainbowText.alpha = 0;

                this.time.addEvent({
                    callback: function () {
                        this.tweens.add({
                            targets: rainbowText,
                            duration: 250,
                            alpha: 1
                        });
                    },
                    callbackScope: this,
                    loop: false,
                });
                this.time.addEvent({
                    delay: 5500,
                    callback: function () {
                        this.tweens.add({
                            targets: rainbowText,
                            duration: 6500,
                            y: this.game.renderer.height + 100
                        });
                    },
                    callbackScope: this,
                    loop: false,
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Development Team
        this.time.addEvent({
            delay: 11000,
            callback: function () {
                this.bitMapText = this.add.dynamicBitmapText((this.game.renderer.width / 2) - (510 / 2), 50, 'fontZFT', '', 70)
                    .setDepth(10);
                this.typewriteBitmapText(`Development Team`);
            },
            callbackScope: this,
            loop: false,
        });

        //Position 1
        this.time.addEvent({
            delay: def + (plus * 0),
            callback: function () {
                let pos1 = this.physics.add.image(222, 200, 'pos1')
                    .setScale(1.5);
                pos1.alpha = 0;

                this.tweens.add({
                    targets: pos1,
                    duration: 250,
                    alpha: 1,
                    scaleX: nameScale,
                    scaleY: nameScale
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Position 2
        this.time.addEvent({
            delay: def + (plus * 1),
            callback: function () {
                let pos2 = this.physics.add.image((this.game.renderer.width / 2), 200, 'pos2')
                    .setScale(1.5);
                pos2.alpha = 0;

                this.tweens.add({
                    targets: pos2,
                    duration: 250,
                    alpha: 1,
                    scaleX: nameScale,
                    scaleY: nameScale
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Position 3
        this.time.addEvent({
            delay: def + (plus * 2),
            callback: function () {
                let pos3 = this.physics.add.image(1044, 200, 'pos3')
                    .setScale(1.5);
                pos3.alpha = 0;

                this.tweens.add({
                    targets: pos3,
                    duration: 250,
                    alpha: 1,
                    scaleX: nameScale,
                    scaleY: nameScale
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Position 4
        this.time.addEvent({
            delay: def + (plus * 3),
            callback: function () {
                let pos4 = this.physics.add.image(222, 290, 'pos4')
                    .setScale(1.5)
                    .setOrigin(0.5, 0);
                pos4.alpha = 0;

                this.tweens.add({
                    targets: pos4,
                    duration: 250,
                    alpha: 1,
                    scaleX: nameScale,
                    scaleY: nameScale
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Position 5
        this.time.addEvent({
            delay: def + (plus * 4),
            callback: function () {
                let pos5 = this.physics.add.image((this.game.renderer.width / 2), 290, 'pos5')
                    .setScale(1.5)
                    .setOrigin(0.5, 0);
                pos5.alpha = 0;

                this.tweens.add({
                    targets: pos5,
                    duration: 250,
                    alpha: 1,
                    scaleX: nameScale,
                    scaleY: nameScale
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Position 6
        this.time.addEvent({
            delay: def + (plus * 5),
            callback: function () {
                let pos6 = this.physics.add.image(1044, 290, 'pos6')
                    .setScale(1.5)
                    .setOrigin(0.5, 0);
                pos6.alpha = 0;

                this.tweens.add({
                    targets: pos6,
                    duration: 250,
                    alpha: 1,
                    scaleX: nameScale,
                    scaleY: nameScale
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Position 7
        this.time.addEvent({
            delay: def + (plus * 6),
            callback: function () {
                let pos7 = this.physics.add.image(222, 450, 'pos7')
                    .setScale(1.5)
                    .setOrigin(0.5, 0);
                pos7.alpha = 0;

                this.tweens.add({
                    targets: pos7,
                    duration: 250,
                    alpha: 1,
                    scaleX: nameScale,
                    scaleY: nameScale
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Position 8
        this.time.addEvent({
            delay: def + (plus * 7),
            callback: function () {
                let pos8 = this.physics.add.image((this.game.renderer.width / 2), 450, 'pos8')
                    .setScale(1.5)
                    .setOrigin(0.5, 0);
                pos8.alpha = 0;

                this.tweens.add({
                    targets: pos8,
                    duration: 250,
                    alpha: 1,
                    scaleX: nameScale,
                    scaleY: nameScale
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Position 9
        this.time.addEvent({
            delay: def + (plus * 8),
            callback: function () {
                let pos9 = this.physics.add.image(1044, 450, 'pos9')
                    .setScale(1.5)
                    .setOrigin(0.5, 0);
                pos9.alpha = 0;

                this.tweens.add({
                    targets: pos9,
                    duration: 250,
                    alpha: 1,
                    scaleX: nameScale,
                    scaleY: nameScale
                });
            },
            callbackScope: this,
            loop: false,
        });

        //Button
        this.time.addEvent({
            delay: def + (plus * 9),
            callback: function () {
                ending = this.physics.add.image(this.game.renderer.width / 2, 675, 'ending')
                    .setScale(1)
                    .setDepth(100)
                    .setInteractive();
                ending.alpha = 0;

                this.tweens.add({
                    targets: ending,
                    duration: 250,
                    alpha: 0.5,
                    scaleX: 0.35,
                    scaleY: 0.35
                });

                ending.on('pointerover', () => {
                    ending.setScale(0.4);
                    ending.alpha = 1;
                })
                ending.on('pointerout', () => {
                    ending.setScale(0.35);
                    ending.alpha = 0.5;
                })

                ending.on('pointerup', () => {
                    click.play();
                    this.cameras.main.fadeOut(500)
                    let buttonEvent = this.time.addEvent({
                        delay: 500,
                        callback: function () {
                            location.reload();
                        },
                        callbackScope: this,
                        loop: false,
                    });
                });
            },
            callbackScope: this,
            loop: false,
        });
    }

    update(delta, time) {
        rainbowColorIdx = 0;

        if (delay++ === 6) {
            rainbowColorOffset = (rainbowColorOffset + 1) % (rainbowColor.length);
            delay = 0;
        }

        this.time.addEvent({
            delay: 2500,
            callback: function () {

                if (bgView.y < 25) {
                    bgView.y++;
                    campFire.y++;
                } else if (bgView.y < 1000) {
                    bgView.y += 1.5;
                    campFire.y += 1.5;
                }
            },
            callbackScope: this,
            loop: false,
        });

        if (bgView.y > 1000) {
            campFire.destroy();
            bgView.destroy();
        }


    }

    typewriteBitmapText(text) {
        this.bitMapText.setText(text)

        const bounds = this.bitMapText.getTextBounds(false)
        const wrappedText = bounds['wrappedText'] || text

        this.bitMapText.setText('')

        const length = wrappedText.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.bitMapText.text += wrappedText[i]
                ++i
            },
            repeat: length - 1,
            delay: 50
        })
    }

    rainbowCallback(data) {
        data.color = rainbowColor[(rainbowColorOffset + rainbowColorIdx) % rainbowColor.length];
        rainbowColorIdx = (rainbowColorIdx + 1) % (rainbowColor.length);
        return data;
    }


}

export default WinScene;