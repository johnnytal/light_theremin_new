var info = function(game){};

info.prototype = {
    create: function(){  
        game.add.text(35, 75,
	        "1. Locate the light sensor on your device.\n\n" +
	        "2. Direct a lamp/flashlight closer and further from the light sensor.\n" +
	        "Working with lamp dimmer is highly recommended.\n\n" +
	        "3. Calibrate to a higher frequency in a darker environment,\nand lower frequency in a lit environment.\n\n" +
	        "4. Be considerate of dogs in highly lit environments.\n\n" +
	        "5. You can get more information in the store listing." +
	        '\nMail me questions or suggestions at - johnnytal9@gmail.com' +
	        "\n\nCreated by Johnny Tal - iLyichArts 2016.\nBacking tracks courtesy of NCTracks.\n\n" + 
	        "Thank you for downloading! Please rate if you like!", 
        {font: '29px ' + font, fill: 'white', align: 'left'});
        
        return_btn = game.add.sprite(300, 930, 'home_btn');
        return_btn.inputEnabled = true;
        return_btn.events.onInputDown.add(function(){
            if(AdMob) AdMob.showInterstitial();
            game.state.start("Game");
        }, this);
        
        game.add.text(110, 840, '(An ad will be displayed before return to main screen)', {
            font: '22px ' + font, fill: 'white', fontWeight: 'normal', align: 'center'
        });
    }
};