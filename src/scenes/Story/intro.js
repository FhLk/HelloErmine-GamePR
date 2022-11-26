import Phaser from "phaser";
let scene1;
let scene2;
let changeStory1;
let scene3;
let changeStory2;
let scene4;
let changeStory3;
let scene5;
let changeStory4;
let scene6;
let changeStory5;
let scene7;
let changeStory6;
let scene8;
let changeStory7;
let end;
let bgMusic;
let thief;

class intro extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'intro',
        });
    }

    preload() {
        this.load.image('scene1','src/image/videoStory/scene01.jpg');
        this.load.image('scene2','src/image/videoStory/scene02.jpg');
        this.load.image('scene3','src/image/videoStory/scene03.jpg');
        this.load.image('scene4','src/image/videoStory/scene04.jpg');
        this.load.image('scene5','src/image/videoStory/scene05.jpg');
        this.load.image('scene6','src/image/videoStory/scene06.jpg');
        this.load.image('scene7','src/image/videoStory/scene07.jpg');
        this.load.image('scene8','src/image/videoStory/scene08.jpg');

        this.load.audio('storySuond1','src/sound/bgSceneSounds/GameScene/a-snow-lullaby-short.mp3');
        this.load.audio('thief','src/sound/bgSceneSounds/Boss/dungeon_theme_2.mp3');
    }

    create() {
        bgMusic=this.sound.add('storySuond1',{
            volume: 0.3,
            loop:true,
        });
        bgMusic.play();
        thief=this.sound.add('thief',{
            volume: 1,
            loop:true,
        });
        scene1=this.add.image(
            this.cameras.main.worldView.x + this.cameras.main.width / 2,
            this.cameras.main.worldView.y + this.cameras.main.height / 2,
            'scene1').setScale(0.895);
        scene1.alpha=0;
        this.tweens.add({
            targets: scene1,
            duration: 5000,
            alpha: 1
        });

        scene2=this.add.image(
            this.cameras.main.worldView.x + this.cameras.main.width / 2,
            this.cameras.main.worldView.y + this.cameras.main.height / 2,
            'scene2').setScale(0.895).setVisible(true);
        scene2.alpha=0;
        changeStory1=this.time.addEvent({
            delay:1000,
            callback: function(){
                this.tweens.add({
                    targets: scene2,
                    duration: 5000,
                    alpha: 1
                });
            },
            callbackScope:this,
            paused:true
        });
        
        scene3= this.add.image(
            this.cameras.main.worldView.x + this.cameras.main.width / 2,
            this.cameras.main.worldView.y + this.cameras.main.height / 2,
            'scene3').setScale(0.895).setVisible(true);
        scene3.alpha=0;
        changeStory2=this.time.addEvent({
            delay:1000,
            callback: function(){
                this.tweens.add({
                    targets: scene3,
                    duration: 5000,
                    alpha: 1
                });
            },
            callbackScope:this,
            paused:true
        });

        scene4= this.add.image(
            this.cameras.main.worldView.x + this.cameras.main.width / 2,
            this.cameras.main.worldView.y + this.cameras.main.height / 2,
            'scene4').setScale(0.895).setVisible(true);
        scene4.alpha=0;
        changeStory3=this.time.addEvent({
            delay:1000,
            callback: function(){
                this.tweens.add({
                    targets: scene4,
                    duration: 5000,
                    alpha: 1
                });
            },
            callbackScope:this,
            paused:true
        });
        
        scene5= this.add.image(
            this.cameras.main.worldView.x + this.cameras.main.width / 2,
            this.cameras.main.worldView.y + this.cameras.main.height / 2,
            'scene5').setScale(0.895).setVisible(true);
        scene5.alpha=0;
        changeStory4=this.time.addEvent({
            delay:1000,
            callback: function(){
                this.tweens.add({
                    targets: scene5,
                    duration: 5000,
                    alpha: 1
                });
            },
            callbackScope:this,
            paused:true
        });

        scene6= this.add.image(
            this.cameras.main.worldView.x + this.cameras.main.width / 2,
            this.cameras.main.worldView.y + this.cameras.main.height / 2,
            'scene6').setScale(0.895).setVisible(true);
        scene6.alpha=0;
        changeStory5=this.time.addEvent({
            delay:1000,
            callback: function(){
                this.tweens.add({
                    targets: scene6,
                    duration: 5000,
                    alpha: 1
                });
            },
            callbackScope:this,
            paused:true
        });

        scene7= this.add.image(
            this.cameras.main.worldView.x + this.cameras.main.width / 2,
            this.cameras.main.worldView.y + this.cameras.main.height / 2,
            'scene7').setScale(0.895).setVisible(true);
        scene7.alpha=0;
        changeStory6=this.time.addEvent({
            delay:1000,
            callback: function(){
                bgMusic.stop();
                thief.play();
                this.tweens.add({
                    targets: scene7,
                    duration: 5000,
                    alpha: 1
                });
            },
            callbackScope:this,
            paused:true
        });

        scene8= this.add.image(
            this.cameras.main.worldView.x + this.cameras.main.width / 2,
            this.cameras.main.worldView.y + this.cameras.main.height / 2,
            'scene8').setScale(0.895).setVisible(true);
        scene8.alpha=0;
        changeStory7=this.time.addEvent({
            delay:1000,
            callback: function(){
                this.tweens.add({
                    targets: scene8,
                    duration: 5000,
                    alpha: 1
                });
            },
            callbackScope:this,
            paused:true
        });

        end=this.time.addEvent({
            delay:1000,
            callback: function(){
                thief.stop();
                this.scene.start('GameScene');
            },
            callbackScope:this,
            paused:true
        })
    }

    update() {
        if(scene1.alpha==1){
            this.tweens.add({
                targets: scene1,
                duration: 1000,
                alpha: 0
            });
            changeStory1.paused=false;
        }
        if(scene2.alpha==1){
            this.tweens.add({
                targets: scene2,
                duration: 1000,
                alpha: 0
            });
            changeStory2.paused=false;
        }
        if(scene3.alpha==1){
            this.tweens.add({
                targets: scene3,
                duration: 1000,
                alpha: 0
            });
            changeStory3.paused=false;
        }
        if(scene4.alpha==1){
            this.tweens.add({
                targets: scene4,
                duration: 1000,
                alpha: 0
            });
            changeStory4.paused=false;
        }
        if(scene5.alpha==1){
            this.tweens.add({
                targets: scene5,
                duration: 1000,
                alpha: 0
            });
            changeStory5.paused=false;
        }
        if(scene6.alpha==1){
            this.tweens.add({
                targets: scene6,
                duration: 1000,
                alpha: 0
            });
            changeStory6.paused=false;
        }
        if(scene7.alpha==1){
            this.tweens.add({
                targets: scene7,
                duration: 1000,
                alpha: 0
            });
            changeStory7.paused=false;
        }
        if(scene8.alpha==1){
            end.paused=false;
        }

    }
}

export default intro;
