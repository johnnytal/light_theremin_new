var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        progressTxt = this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '0%',{
             font: '25px ' + font, fill: 'white', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);
  
        loadingTxt = this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "Loading...", {
            font: '18px ' + font, fill: 'lightgrey', fontWeight: 'normal', align: 'center'
        });
        
        game.load.image('hubble', 'assets/images/hubble.jpg');
        game.load.image('bg', 'assets/images/bg.jpg');

        game.load.image('calibrate', 'assets/images/calibrate.png');       
        game.load.image('reset', 'assets/images/reset.png');
        game.load.image('sound_btn', 'assets/images/sound_btn.png');
        game.load.image('space_btn', 'assets/images/space.png');
        game.load.image('info_btn', 'assets/images/info.png');
        
        game.load.image('next_game', 'assets/images/next_game.png');
        game.load.image('prev_game', 'assets/images/prev_game.png');

        game.load.image('home_btn', 'assets/images/return.png');

        game.load.spritesheet('blank', 'assets/images/blank.png', 594/4, 120);

        game.load.spritesheet('scooter', 'assets/images/scooter.png', 99, 308/2);
        game.load.spritesheet('asteroid', 'assets/images/asteroid1.png', 1024/8, 107);
        game.load.image('band_btn', 'assets/images/band_btn.png');

        game.load.audio('acoustic', 'assets/audio/acoustic.mp3');
        game.load.audio('blues', 'assets/audio/blues.mp3');
        game.load.audio('clean', 'assets/audio/clean.mp3');
        game.load.audio('funky', 'assets/audio/funky.mp3');       
    },
    
    create: function(){
    	 game.state.start("Game");
    }
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
};