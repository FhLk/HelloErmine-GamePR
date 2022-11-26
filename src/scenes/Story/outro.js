import Phaser from "phaser";
let outro1;
let outro2;
let changeStory1;
let outro3;
let changeStory2;
let outro4;
let changeStory3;
let outro5;
let changeStory4;
let outro6;
let changeStory5;
let outro7;
let changeStory6;
let outro8;
let changeStory7;
let end;
let sound;
let bgMusic;

class outro extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'outro',
        });
    }

    preload() {
        this.load.image('outro1','src/image/videoStory/Outro09.jpg');
        this.load.image('outro2','src/image/videoStory/Outro10.jpg');
        this.load.image('outro3','src/image/videoStory/Outro11.jpg');
        this.load.image('outro4','src/image/videoStory/Outro12.jpg');
        this.load.image('outro5','src/image/videoStory/Outro13.jpg');
        this.load.image('outro6','src/image/videoStory/Outro14.jpg');
        this.load.image('outro7','src/image/videoStory/Outro15.jpg');
        this.load.image('outro8','src/image/videoStory/Outro16.jpg');

        this.load.audio('storySound2','src/sound/bgSceneSounds/Boss/cutscene.mp3');
        this.load.audio('storySound1','src/sound/bgSceneSounds/GameScene/a-snow-lullaby-short.mp3');
    }
    
    create() {
        sound=this.sound.add('storySound2',{
            volume: 0.2,
            loop:true,
        });
        sound.play();
        bgMusic=this.sound.add('storySound1',{
            volume: 0.2,
            loop:true,
        });
        outro1=this.add.image(
            this.cameras.main.worldView.x + this.cameras.main.width / 2
            ,this.cameras.main.worldView.y + this.cameras.main.height / 2,
            'outro1').setScale(0.895);
        outro1.alpha=0;
        this.tweens.add({
            targets: outro1,
            duration: 5000,
            alpha: 1
        });

        outro2=this.add.image(
            this.cameras.main.worldView.x + this.cameras.main.width / 2,
            this.cameras.main.worldView.y + this.cameras.main.height / 2,
            'outro2').setScale(0.895).setVisible(true);
        outro2.alpha=0;
        changeStory1=this.time.addEvent({
            delay:1000,
            callback: function(){
                this.tweens.add({
                    targets: outro2,
                    duration: 5000,
                    alpha: 1
                });
            },
            callbackScope:this,
            paused:true
        });
        
        outro3= this.add.image(
            this.cameras.main.worldView.x + this.cameras.main.width / 2,
            this.cameras.main.worldView.y + this.cameras.main.height / 2,
            'outro3').setScale(0.895).setVisible(true);
        outro3.alpha=0;
        changeStory2=this.time.addEvent({
            delay:1000,
            callback: function(){
                sound.stop();
                bgMusic.play();
                this.tweens.add({
                    targets: outro3,
                    duration: 5000,
                    alpha: 1
                });
            },
            callbackScope:this,
            paused:true
        });

        outro4= this.add.image(
            this.cameras.main.worldView.x + this.cameras.main.width / 2,
            this.cameras.main.worldView.y + this.cameras.main.height / 2,
            'outro4').setScale(0.895).setVisible(true);
        outro4.alpha=0;
        changeStory3=this.time.addEvent({
            delay:1000,
            callback: function(){
                this.tweens.add({
                    targets: outro4,
                    duration: 5000,
                    alpha: 1
                });
            },
            callbackScope:this,
            paused:true
        });
        
        outro5= this.add.image(
            this.cameras.main.worldView.x + this.cameras.main.width / 2,
            this.cameras.main.worldView.y + this.cameras.main.height / 2,
            'outro5').setScale(0.895).setVisible(true);
        outro5.alpha=0;
        changeStory4=this.time.addEvent({
            delay:1000,
            callback: function(){
                this.tweens.add({
                    targets: outro5,
                    duration: 5000,
                    alpha: 1
                });
            },
            callbackScope:this,
            paused:true
        });

        outro6= this.add.image(
            this.cameras.main.worldView.x + this.cameras.main.width / 2,
            this.cameras.main.worldView.y + this.cameras.main.height / 2,
            'outro6').setScale(0.895).setVisible(true);
        outro6.alpha=0;
        changeStory5=this.time.addEvent({
            delay:1000,
            callback: function(){
                this.tweens.add({
                    targets: outro6,
                    duration: 5000,
                    alpha: 1
                });
            },
            callbackScope:this,
            paused:true
        });

        outro7= this.add.image(
            this.cameras.main.worldView.x + this.cameras.main.width / 2,
            this.cameras.main.worldView.y + this.cameras.main.height / 2,
            'outro7').setScale(0.895).setVisible(true);
        outro7.alpha=0;
        changeStory6=this.time.addEvent({
            delay:1000,
            callback: function(){
                this.tweens.add({
                    targets: outro7,
                    duration: 5000,
                    alpha: 1
                });
            },
            callbackScope:this,
            paused:true
        });

        outro8= this.add.image(
            this.cameras.main.worldView.x + this.cameras.main.width / 2,
            this.cameras.main.worldView.y + this.cameras.main.height / 2,
            'outro8').setScale(0.895).setVisible(true);
        outro8.alpha=0;
        changeStory7=this.time.addEvent({
            delay:1000,
            callback: function(){
                this.tweens.add({
                    targets: outro8,
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
                bgMusic.stop();
                this.scene.start("WinScene");
            },
            callbackScope:this,
            paused:true
        })
    }

    update() {
        if(outro1.alpha==1){
            this.tweens.add({
                targets: outro1,
                duration: 1000,
                alpha: 0
            });
            changeStory1.paused=false;
        }
        if(outro2.alpha==1){
            this.tweens.add({
                targets: outro2,
                duration: 1000,
                alpha: 0
            });
            changeStory2.paused=false;
        }
        if(outro3.alpha==1){
            this.tweens.add({
                targets: outro3,
                duration: 1000,
                alpha: 0
            });
            changeStory3.paused=false;
        }
        if(outro4.alpha==1){
            this.tweens.add({
                targets: outro4,
                duration: 1000,
                alpha: 0
            });
            changeStory4.paused=false;
        }
        if(outro5.alpha==1){
            this.tweens.add({
                targets: outro5,
                duration: 1000,
                alpha: 0
            });
            changeStory5.paused=false;
        }
        if(outro6.alpha==1){
            this.tweens.add({
                targets: outro6,
                duration: 1000,
                alpha: 0
            });
            changeStory6.paused=false;
        }
        if(outro7.alpha==1){
            this.tweens.add({
                targets: outro7,
                duration: 1000,
                alpha: 0
            });
            changeStory7.paused=false;
        }
        if(outro8.alpha==1){
            end.paused=false;
        }

    }
}

export default outro;
