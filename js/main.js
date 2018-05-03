var game = new Phaser.Game(800, 600);
var GameState = {

    init: function(){

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.catDirection = 'stop';
        this.game.world.setBounds(0, 0, 800, 600);
        this.speed = 100;

    },

    preload: function(){
        this.load.audio('music', 'assets/music.mp3');
        this.load.audio('music2', 'assets/sad.mp3')
        this.load.image('wave', 'assets/images/wave.jpg');
        this.load.image('fuji', 'assets/images/fuji.jpg');
        this.load.image('sunset', 'assets/images/sunset.jpg');
        this.load.spritesheet('cat', 'assets/images/06-cat_31x32x12.png', 31, 32, 12);
        this.load.image('upArrow', 'assets/images/arrowUp.png');
        this.load.image('downArrow', 'assets/images/arrowDown.png');
        this.load.image('rightArrow', 'assets/images/arrowRight.png');
        this.load.image('leftArrow', 'assets/images/arrowLeft.png');
        this.load.image('doorWave', 'assets/images/door3t1.png');
        this.load.image('doorMt', 'assets/images/door2.png');

    },

    create: function(){
        
        this.sunset = this.add.image(0, 0, 'sunset');
        this.music = this.add.audio('music');
        this.music.play();

        this.music2 = this.add.audio('music2');

        this.doorWave = this.add.sprite(604, 302, 'doorWave');
        this.doorWave.scale.setTo(0.8);
        this.game.physics.arcade.enable(this.doorWave);
        this.doorWave.body.immovable = true;
        

        this.doorMt = this.add.sprite(84, 284, 'doorMt');
        this.doorMt.scale.setTo(0.8);
        this.game.physics.arcade.enable(this.doorMt);
        this.doorMt.body.immovable = true;
        
        this.cat = this.add.sprite(491, 195, 'cat');
        this.cat.scale.setTo(2);
        this.cat.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.cat);
        this.cat.animations.add('walkLeft', [3, 4, 5], 6, true);
        this.cat.animations.add('walkRight', [6, 7, 8], 6, true);
        this.cat.animations.add('walkDown', [0, 1, 2], 6, true);
        this.cat.animations.add('walkUp', [9, 10, 11], 6, true);

        this.cat.body.collideWorldBounds = true;

        this.upArrow = this.add.button(495, 352, 'upArrow');
        this.downArrow = this.add.button(495, 480, 'downArrow');
        this.rightArrow = this.add.button(590, 410, 'rightArrow');
        this.leftArrow = this.add.button(400, 410, 'leftArrow');
    },

    update: function(){

        this.game.physics.arcade.collide(this.cat, this.doorMt, function(){
            console.log('Ive been hit!!');
            this.fuji = this.add.image(0, 0, 'fuji');
            this.music.stop();
            this.music2.play();
        }, null, this);

        this.game.physics.arcade.collide(this.cat, this.doorWave, function(){
            console.log('Door Wave has been touched');
            this.wave = this.add.image(0, 0, 'wave');
        }, null, this);
        // this.cat.animations.play('walkLeft');
        // this.cat.animations.play('walkRight');
        // this.cat.animations.play('walkDown');
        this.upArrow.events.onInputDown.add(function(){
            this.catDirection =  "up";
        }, this);

        this.upArrow.events.onInputUp.add(function(){
            this.catDirection = "stop";
        }, this);

        this.leftArrow.events.onInputDown.add(function(){
            this.catDirection = "left";
        }, this);

        this.leftArrow.events.onInputUp.add(function(){
            this.catDirection = "stop";
        }, this);

        this.rightArrow.events.onInputDown.add(function(){
            this.catDirection = "right";
        }, this);

        this.rightArrow.events.onInputUp.add(function(){
            this.catDirection = "stop";
        }, this);

        this.downArrow.events.onInputDown.add(function(){
            this.catDirection = "down";
        }, this);

        this.downArrow.events.onInputUp.add(function(){
            this.catDirection = "stop";
        }, this);

        if(this.catDirection == "up"){
            this.cat.body.velocity.y = -this.speed;
            this.cat.animations.play('walkUp');

        }

        else if(this.catDirection == "down"){
            this.cat.body.velocity.y = this.speed;
            this.cat.animations.play('walkDown');
        }

        else if(this.catDirection == "right"){
            this.cat.body.velocity.x = this.speed;
            this.cat.animations.play('walkRight');
        }

        else if(this.catDirection == "left"){
            this.cat.body.velocity.x = -this.speed;
            this.cat.animations.play('walkLeft');
        }

        else{
            this.cat.body.velocity.x = 0;
            this.cat.body.velocity.y = 0;
            this.cat.frame = 1;
        }

    }
}

game.state.add('GameState', GameState);
game.state.start('GameState');