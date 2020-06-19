var info = function(game){};

info.prototype = {
    create: function(){  
        game.add.text(35, 35,
	        "- Locate the light sensor on your device.\n\n" +
	        "- Direct a lamp/flashlight to the light sensor, and\n" +
	        "use your hand to cover and reveal the sensor.\n You can also use a lamp dimmer.\n\n" +
	        "- Open the settings and try playing around with the\nreverb, portamento, scales and waveforms.\n\n" + 
	        "- Calibrate to a higher frequency in a darker environment,\nand lower frequency in a lit environment.\n\n" +
	        "- You can add backing music - \nit syncs to the right scale and always runs at 120 BPM.\n\n" +
	        "- Be considerate of dogs in highly lit environments.\n\n" +
	        "- You can get more information in the store listing." +
	        '\nMail me for questions and suggestions - johnnytal9@gmail.com' +
	        "\n\nCreated by Johnny Tal 2016. Please rate if you like!\nBacking tracks courtesy of NCTracks.\n\n", 
        {font: '29px ' + font, fill: 'white', align: 'left'});
        
        return_btn = game.add.sprite(0, 930, 'home_btn');
    	return_btn.x = game.world.centerX - return_btn.width / 2;
        return_btn.inputEnabled = true;
        return_btn.events.onInputDown.add(function(){
	        var rnd = game.rnd.integerInRange(0, 3);
        	if(rnd == 1 && AdMob) AdMob.showInterstitial();
            game.state.start("Game");
        }, this);
    }
};