var gameMain = function(game){   
    var osc, rev, luminosity, frequency, frequency_check;
    var note, last_frequency, factor, form, scale, reverb, glissando, tempo, timer;

	video_playing = false;
	    
    pb_time = 440;
    score = 0;
    bestScore = 0;
    
    glissandos = [1, 18, 65, 120, 450];
    reverbs = [0, 0.3, 0.5, 0.7, 1];
    labelsAmount = ['0%', '25%', '50%', '75%', '100%'];
    waves = ['sin', 'square', 'tri', 'saw'];
    scales = ['No Scale', 'Chromatic', 'Major', 'Minor', 'Blues', 'Pentatonic', 'Hijaz'];
    tempos = ['n/a', 60, 120, 180, 240];
    
    formsArray = [];

    musicPlayed = false;
    
    notes = [ 
        'C0','C#0','D0','D#0','E0','F0','F#0','G0','G#0','A0','A#0','B0', 'C1','C#1','D1','D#1','E1','F1','F#1','G1','G#1','A1','A#1','B1',
        'C2','C#2','D2','D#2','E2','F2','F#2','G2','G#2','A2','A#2','B2', 'C3','C#3','D3','D#3','E3','F3','F#3','G3','G#3','A3','A#3','B3',
        'C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4', 'C5','C#5','D5','D#5','E5','F5','F#5','G5','G#5','A5','A#5','B5',
        'C6','C#6','D6','D#6','E6','F6','F#6','G6','G#6','A6','A#6','B6', 'C7','C#7','D7','D#7','E7','F7','F#7','G7','G#7','A7','A#7','B7',
        'C8','C#8','D8','D#8','E8','F8','F#8','G8','G#8','A8','A#8','B8', 'C9','C#9','D9','D#9','E9','F9','F#9','G9','G#9','A9','A#9','B9',
        'C10','C#10','D10','D#10','E10','F10','F#10','G10','G#10','A10','A#10','B10'
    ];
    
    notes_blues = [
        'C0','Eb0','F0','Gb0','G0','Bb0',
        'C1','Eb1','F1','Gb1','G1','Bb1',
        'C2','Eb2','F2','Gb2','G2','Bb2',
        'C3','Eb3','F3','Gb3','G3','Bb3',
        'C4','Eb4','F4','Gb4','G4','Bb4',
        'C5','Eb5','F5','Gb5','G5','Bb5',
        'C6','Eb6','F6','Gb6','G6','Bb6',
        'C7','Eb7','F7','Gb7','G7','Bb7',
        'C8','Eb8','F8','Gb8','G8','Bb8',
        'C9','Eb9','F9','Gb9','G9','Bb9',
        'C10','Eb10','F10','Gb10','G10','Bb10'
    ];
    
    notes_major = [
        'C0','D0','E0','F0','G0','A0','B0', 'C1','D1','E1','F1','G1','A1','B1', 'C2','D2','E2','F2','G2','A2','B2', 'C3','D3','E3','F3','G3','A3','B3',
        'C4','D4','E4','F4','G4','A4','B4', 'C5','D5','E5','F5','G5','A5','B5', 'C6','D6','E6','F6','G6','A6','B6', 'C7','D7','E7','F7','G7','A7','B7',
        'C8','D8','E8','F8','G8','A8','B8', 'C9','D9','E9','F9','G9','A9','B9', 'C10','D10','E10','F10','G10','A10','B10'
    ];
    
    notes_minor = [
        'C0','D0','Eb0','F0','G0','Ab0','Bb0',
        'C1','D1','Eb1','F1','G1','Ab1','Bb1',
        'C2','D2','Eb2','F2','G2','Ab2','Bb2',
        'C3','D3','Eb3','F3','G3','Ab3','Bb3',
        'C4','D4','Eb4','F4','G4','Ab4','Bb4',
        'C5','D5','Eb5','F5','G5','Ab5','Bb5',
        'C6','D6','Eb6','F6','G6','Ab6','Bb6',
        'C7','D7','Eb7','F7','G7','Ab7','Bb7',
        'C8','D8','Eb8','F8','G8','Ab8','Bb8',
        'C9','D9','Eb9','F9','G9','Ab9','Bb9',
        'C10','D10','Eb10','F10','G10','Ab10','Bb10'
    ];
    
    notes_penta = [
        'C0','D0','F0','G0','A0', 'C1','D1','F1','G1','A1', 'C2','D2','F2','G2','A2', 'C3','D3','F3','G3','A3', 'C4','D4','F4','G4','A4', 'C5','D5','F5','G5','A5',
        'C6','D6','F6','G6','A6', 'C7','D7','F7','G7','A7', 'C8','D8','F8','G8','A8', 'C9','D9','F9','G9','A9', 'C10','D10','F10','G10','A10'
    ];
    
    notes_hijaz = [
        'C0','Db0','E0','F0','G0','Ab0','B0',
        'C1','Db1','E1','F1','G1','Ab1','B1',
        'C2','Db2','E2','F2','G2','Ab2','B2',
        'C3','Db3','E3','F3','G3','Ab3','B3',
        'C4','Db4','E4','F4','G4','Ab4','B4',
        'C5','Db5','E5','F5','G5','Ab5','B5',
        'C6','Db6','E6','F6','G6','Ab6','B6',
        'C7','Db7','E7','F7','G7','Ab7','B7',
        'C8','Db8','E8','F8','G8','Ab8','B8',
        'C9','Db9','E9','F9','G9','Ab9','B9',
        'C10','Db10','E10','F10','G10','Ab10','B10'
    ];
};

gameMain.prototype = {
    create: function(){
    	debug_label = game.add.text(100, 50, "No light sensor activity.\nIt may be too dark.", 
		{font: '36px ' + font, fill: 'white', fontWeight: 'bold', align: 'center'});
    	debug_label.x = game.world.centerX - debug_label.width / 2;

    	frequency = 440;
        note = 53; 
        last_frequency = 0;
        factor = 6;

        form = 2;
        scale = 2;
        reverb = 2;
        glissando = 1;
        tempo = 3;

        bg = game.add.image(0, 0, 'bg');
        bg.alpha = 0.25;
        
        bg2 = game.add.image(0, 140, 'xtraBg');
        bg2.alpha = 0.3;
        
        initSpaceGame();
        loadSounds();
    	buttons_labels();

        osc = T("cosc", {wave:waves[form], beats:7, mul:0.40});
        rev = T("reverb", {room:0.8, damp:0.3, mix:reverbs[reverb]}, osc).play();
		
		setTimeout(function(){
	        try{
	            window.plugins.insomnia.keepAwake();
	        } catch(e){}
	        try{
	            StatusBar.hide;
	        } catch(e){}
        }, 1000); 

        watchReading();
        initAd();
    }, 
    update: function(){
    	if (video_playing){
        	game.physics.arcade.overlap(scooter, asteroids, collisionScooter, null, this);
        }
    }
};

function watchReading(){
    window.plugin.lightsensor.watchReadings(
		function success(reading){
	        readLight(reading);
	    }, 
	    function error(message){
	    	debug_label.text = 'error ' + message;
	    }
    );
}

function watchReadingGame(){
    window.plugin.lightsensor.watchReadings(function success(reading){
        luminosity = parseInt(reading.intensity);
        
        pb_time = luminosity / 3;
        hubble.autoScroll(0, pb_time);    
    });      
}

function getReading(){
    timer = setInterval(function(){
        window.plugin.lightsensor.getReading(function success(reading){
            readLight(reading);
        });
    }, 60000 / tempos[tempo]);
}

function readLight(reading){
    luminosity = parseInt(reading.intensity);

    frequency_check = luminosity * factor;
    frequency_text = "";
    
    if (Math.abs(frequency_check - last_frequency) > Math.round(25 + (glissandos[glissando] / 6))){
        if (scale != 0){
            if (frequency_check < last_frequency){ // semitone down
                note--; 
            }
            else if (frequency_check > last_frequency){ // semitone up
                note++;
            }
            
            if (scale == 1){
                frequency = teoria.note(notes[note]).fq();
                frequency_text = notes[note];
            } 
            else if (scale == 2){
                frequency = teoria.note(notes_major[note]).fq();
                frequency_text = notes_major[note];
            } 
            else if (scale == 3){
                frequency = teoria.note(notes_minor[note]).fq();
                frequency_text = notes_minor[note];
            } 
            else if (scale == 4){
                frequency = teoria.note(notes_blues[note]).fq();
                frequency_text = notes_blues[note];
            } 
            else if (scale == 5){
                frequency = teoria.note(notes_penta[note]).fq();
                frequency_text = notes_penta[note];
            } 
            else if (scale == 6){
                frequency = teoria.note(notes_hijaz[note]).fq();
                frequency_text = notes_hijaz[note];
            }
        }
        else{
            frequency = frequency_check; 
            frequency_text = Math.round(frequency) + " Hz"; 
        }

        var frequency_text_correct = frequency_text.replace("#", "♯");
        
        var addedText = '';

        if (frequency == 0){
           addedText = "(It's too dark here!)"; 
        }
        
        debug_label.text = luminosity + ' lux * ' + Math.round(factor * 100) / 100 + ' = ' + frequency_text_correct + '\n' + addedText;
        debug_label.x = game.world.centerX - debug_label.width / 2;
        
        var glide = T("param", {value: last_frequency});
        osc.set({freq: glide});
        glide.linTo(frequency, glissandos[glissando]);

        last_frequency = frequency;
    }
}

function change_waveform(_btn){ 
	form = _btn.frame;
	
	for (x=0; x<formsArray.length; x++){
		formsArray[x].alpha = 0.55;
	}
	
	_btn.alpha = 1;
	_btn.scale.set(0.92, 0.92);

    osc.pause();
    rev.pause();
    
    if (waves[form] != 'square'){
        osc = T("cosc", {wave:waves[form], freq:frequency, beats:7, mul:0.40});  
    }
    else{
        osc = T("square", {freq:frequency, mul:0.20}).play();
    }
    
    rev = T("reverb", {room:0.8, damp:0.3, mix:reverbs[reverb]}, osc).play();
}

function buttons_labels(){
    plus_btn_rev = game.add.sprite(15, 630, 'plus' + reverb);
    plus_btn_rev.inputEnabled = true;
    plus_btn_rev.tint = '0x6cbfd2';
    plus_btn_rev.events.onInputDown.add(function(){
        if (reverb < 4) reverb++;
        else if (reverb == 4) reverb = 0;
        Label_reverb.text = labelsAmount[reverb];
       
        plus_btn_rev.key = 'plus' + reverb; 
        plus_btn_rev.loadTexture('plus' + reverb, 0);
        
        change_waveform();
    }, this);

    plus_btn_gliss = game.add.sprite(307, 630, 'plus' + glissando);
    plus_btn_gliss.inputEnabled = true;
    plus_btn_gliss.tint = '0x6cbfd2';
    plus_btn_gliss.events.onInputDown.add(function(){
        if (glissando < 4) glissando++;
        else if (glissando == 4) glissando = 0;
        Label_gliss.text = labelsAmount[glissando];

        plus_btn_gliss.key = 'plus' + glissando; 
        plus_btn_gliss.loadTexture('plus' + glissando, 0);
        
    }, this);

    plus_btn_tempo = game.add.sprite(599, 630, 'plus' + tempo);
    plus_btn_tempo.inputEnabled = true;
    plus_btn_tempo.tint = '0x6cbfd2';
    plus_btn_tempo.events.onInputDown.add(function(){
        if (tempo < 4){
            tempo++;
            Label_tempo.text = tempos[tempo] + "\nbpm";  
        } 
        else if (tempo == 4){
            tempo = 0;
            Label_tempo.text = tempos[tempo] + "\nbpm";   
        } 
        
        plus_btn_tempo.key = 'plus' + tempo; 
        plus_btn_tempo.loadTexture('plus' + tempo, 0);
        
        changeTempo(); 
    }, this);
    
    knob1 = game.add.text(0, plus_btn_gliss.y - 45, 'Reverb', {
        font: '28px ' + font, fill: 'lightyellow', align: 'center', stroke:'grey', strokeThickness: 1
    });
    knob1.x = 15 + (plus_btn_rev.width/2) - knob1.width / 2;
    
    knob2 = game.add.text(0, plus_btn_gliss.y - 45, 'Portamento', {
        font: '28px ' + font, fill: 'lightyellow', align: 'center', stroke:'grey', strokeThickness: 1
    });
    knob2.x = 307 + (plus_btn_rev.width/2) - knob2.width / 2;
    
    knob3 = game.add.text(0, plus_btn_gliss.y - 45, 'Tempo', {
        font: '28px ' + font, fill: 'lightyellow', align: 'center', stroke:'grey', strokeThickness: 1
	});
	knob3.x = 599 + (plus_btn_rev.width/2) - knob3.width / 2;

    
    Label_reverb = game.add.text(0, 0, labelsAmount[reverb], {
        font: '45px ' + font, fill: '#101c20', align: 'center', stroke:'black', strokeThickness: 1
    });
    Label_reverb.anchor.set(0.5, 0.5);
    
    Label_reverb.x = plus_btn_rev.x + plus_btn_rev.width/2;
    Label_reverb.y = plus_btn_rev.y + plus_btn_rev.height/2 + 20;

    Label_gliss= game.add.text(0, 0, labelsAmount[glissando], {
        font: '45px ' + font, fill: '#101c20', align: 'center', stroke:'black', strokeThickness: 1
    });
    Label_gliss.anchor.set(0.5, 0.5);
    
    Label_gliss.x = plus_btn_gliss.x + plus_btn_gliss.width/2;
    Label_gliss.y = plus_btn_gliss.y + plus_btn_gliss.height/2 + 20;
    
    Label_tempo = game.add.text(0, 0, tempos[tempo] + '\nbpm', {
        font: '36px ' + font, fill: '#101c20', align: 'center', stroke:'black', strokeThickness: 1
    });
    Label_tempo.anchor.set(0.5, 0.5);
    
    Label_tempo.x = plus_btn_tempo.x + plus_btn_tempo.width/2;
    Label_tempo.y = plus_btn_tempo.y + plus_btn_tempo.height/2 + 20;
    
    calibrate_btn_440 = game.add.sprite(0, 950, 'calibrate');
    calibrate_btn_440.inputEnabled = true;
    calibrate_btn_440.events.onInputDown.add(function(){
        calibrate(440);
    }, this);
    calibrate_btn_440.x = game.world.centerX;

    Label_440 = game.add.text(0, 0, 'HIGH', {font: '26px ' + font, fill: 'lightyellow', align: 'center'});
    
    Label_440.x = calibrate_btn_440.x + 5;
    Label_440.y = calibrate_btn_440.y + 5;
    
    calibrate_btn_880 = game.add.sprite(0, 950, 'calibrate');
    calibrate_btn_880.inputEnabled = true;
    calibrate_btn_880.events.onInputDown.add(function(){
        calibrate(880);
    }, this);
    calibrate_btn_880.x = game.world.centerX - calibrate_btn_880.width * 1.25;
	calibrate_btn_880.alpha = 0.8;

    Label_880 = game.add.text(0, 0, 'MED', {font: '26px ' + font, fill: 'lightyellow', align: 'center'});

    Label_880.x = calibrate_btn_880.x + 5;
    Label_880.y = calibrate_btn_880.y + 5;
    
    calibrate_btn_1320 = game.add.sprite(0, 950, 'calibrate');
    calibrate_btn_1320.inputEnabled = true;
    calibrate_btn_1320.events.onInputDown.add(function(){
        calibrate(1320);
    }, this); 
    calibrate_btn_1320.x = game.world.centerX - calibrate_btn_1320.width * 2.5;
	calibrate_btn_1320.alpha = 0.6;
	
    Label_1320 = game.add.text(0, 0, 'LOW', {font: '26px ' + font, fill: 'lightyellow', align: 'center'});
    Label_1320.x = calibrate_btn_1320.x + 5;
    Label_1320.y = calibrate_btn_1320.y + 5;

    Label_calibrate = game.add.text(Label_1320.x, Label_1320.y - Label_1320.height * 1.5, 'Calibrate to light level:', {
        font: '28px ' + font, fill: 'white', align: 'center', stroke:'grey', strokeThickness: 1
    });
    
	form1 = game.add.button(0, 250, 'blank');
	form1.x = plus_btn_rev.x + 25;
	form1.alpha = 0.55;
	form1.tint = 0xf0a523;

	form2 = game.add.button(0, form1.y, 'blank');
	form2.x = plus_btn_rev.x + form2.width * 1.25 + 25;
	form2.alpha = 0.55;

	form3 = game.add.button(0, 0, 'blank');
	form3.x = plus_btn_rev.x + 25;
	form3.y = form2.y + form2.height * 1.25;
	form3.alpha = 1;
	form3.scale.set(0.92, 0.92);

	form4 = game.add.button(0, 0, 'blank');
	form4.x = plus_btn_rev.x + form2.width * 1.25 + 25;
	form4.y = form2.y + form2.height * 1.25;
	form4.alpha = 0.55;

    formsArray = [form1, form2, form3, form4];
    
    for (x = 0; x < formsArray.length; x++){
    	formsArray[x].frame = x;
		formsArray[x].inputEnabled = true;
    	formsArray[x].events.onInputDown.add(change_waveform);
    }

    next_btn_scale = game.add.sprite(0, 0, 'next');
    next_btn_scale.inputEnabled = true;
    next_btn_scale.events.onInputDown.add(function(){
        scale++;
        if (scale > 6) scale = 0;
        Label_scale.text = scales[scale];
        stopMusic();
    }, this);
    
    next_btn_scale.x = plus_btn_gliss.x + form2.width / 1.5 + 30;
    next_btn_scale.y = form3.y;
    
    Label_scale = game.add.text(next_btn_scale.x, next_btn_scale.y, scales[scale], {
        font: '36px ' + font, fill: 'white', align: 'center', stroke:'black', strokeThickness: 1
    });
    
    Label_scale.x = next_btn_scale.x + next_btn_scale.width / 2 - Label_scale.width * 1.25;
    Label_scale.y = next_btn_scale.y + next_btn_scale.height / 2 - Label_scale.height / 2;

    band_btn = game.add.sprite(next_btn_scale.x, form2.y, 'band_btn');
    band_btn.inputEnabled = true;
    band_btn.events.onInputDown.add(playMusic);

    info_btn = game.add.sprite(700, 50, 'info_btn');
    info_btn.inputEnabled = true;
    info_btn.events.onInputDown.add(function(){
    	window.plugin.lightsensor.stop();
    	killOsc();
		game.state.start("Info");
    }, this);

    sound_btn = game.add.sprite(info_btn.x, calibrate_btn_1320.y, 'sound_btn');
    sound_btn.inputEnabled = true;
    sound_btn.tint = 0xfaffaf;
    sound_btn.events.onInputDown.add(function(){
        rev.pause();
        sound_btn.tint = 0xf000ff;
    }, this);
    sound_btn.events.onInputUp.add(function(){
        rev.play();
        sound_btn.tint = 0xfaffaf;
    }, this);
 
	space_btn = game.add.sprite(525, 815, 'space_btn');
    space_btn.inputEnabled = true;
    space_btn.events.onInputDown.add(function(){
		show_video();
    }, this);

    reset_btn = game.add.sprite(form1.x, info_btn.y, 'reset');
    reset_btn.inputEnabled = true;
    reset_btn.events.onInputDown.add(function(){
        killOsc();
        var rnd = game.rnd.integerInRange(0, 3);
        if(rnd == 1 && AdMob) AdMob.showInterstitial();
        game.state.start("Game");  
    }, this);
    reset_btn.tint = 0xffafff;    
}

function playMusic(){
	if (!musicPlayed){
		band_btn.tint = 0xf0f543;
		musicPlayed = true;
		if (scales[scale] == 'No Scale'){			
			allMusic[game.rnd.integerInRange(0, 3)].play();
		}
		else if (scales[scale] == 'Chromatic'){
			allMusic[game.rnd.integerInRange(0, 3)].play();
		}
		else if (scales[scale] == 'Major'){
			sfxAcoustic.play();
		}
		else if (scales[scale] == 'Minor'){
			sfxClean.play();
		}
		else if (scales[scale] == 'Blues'){
			sfxBlues.play();
		}
		else if (scales[scale] == 'Pentatonic'){
			sfxFunky.play();
		}
		else if (scales[scale] == 'Hijaz'){
			sfxClean.play();
		}
	}
	else{
		stopMusic();
	}
}

function stopMusic(){
	band_btn.tint = 0xffffff;
	musicPlayed = false;
		
	for (m=0; m<4; m++){
		if (allMusic[m].isPlaying){
			allMusic[m].stop();
		}
	}	
}

function changeTempo(){
    if (tempo != 0){         
        try{
            clearInterval(timer);
        }catch(e){}
        
        window.plugin.lightsensor.stop();

        getReading();
    }
    
    else{
        Label_tempo.text = tempos[tempo];
        watchReading();
    }
}

function calibrate(num){
    if (luminosity > 1){
        factor = num / luminosity;
    }
    else{
        factor = num;
    }
}

function killOsc(){
	stopMusic();
    osc.pause();
    rev.pause();
    osc.remove();
    rev.remove();
    osc = null;
    rev = null;
}

function loadSounds(){
	allMusic = [
		sfxAcoustic = game.add.audio('acoustic', 0.9, true),
		sfxBlues = game.add.audio('blues', 0.9, true),
		sfxClean = game.add.audio('clean', 0.9, true),
		sfxFunky = game.add.audio('funky', 0.9, true)
	];
}

function show_video(){
    if (!video_playing){
    	killOsc();
        watchReadingGame();
	    
        score = 0;
    
        hubble.visible = true;
        scooter.visible = true;
        video_playing = true;
        
        hubble.bringToTop();
        scooter.bringToTop();
        game.world.bringToTop(asteroids);

		home_btn = game.add.sprite(700, 90, 'home_btn');
	    home_btn.inputEnabled = true;
	    home_btn.events.onInputDown.add(function(){
	        video_playing = false;
	        
	        clearInterval(scoreInterval);
	        asteroids.callAll('kill');
	        game.time.events.stop();
	
	        if(AdMob) AdMob.showInterstitial();
			game.state.start("Game");
	    }, this);

        scoreText = game.add.text(30, 30, 'Score: ' + score, {
            font: '40px ' + font, fill: 'white', fontWeight: 'bold', align: 'center'
        });
        
        best_scoreText = game.add.text(30, 90, 'Best: ' + bestScore, {
            font: '40px ' + font, fill: 'white', fontWeight: 'bold', align: 'center'
        });
       
        insttext2 = game.add.text(30, 150, 'Turn on the lights\nto go faster\nand earn more points\n\nUse the arrows to dodge asteroids', {
            font: '40px ' + font, fill: 'white', fontWeight: 'bold', align: 'center'
        });
        
        insttext2.x = game.world.centerX - insttext2.width / 2;
        setTimeout(function(){
        	 game.add.tween(insttext2).to( { alpha: 0}, 4500, Phaser.Easing.Linear.None, true);
        }, 3000);

        scoreInterval = setInterval(function(){
            score += Math.round(pb_time / 10);
            scoreText.text = 'Score: ' + score;
        }, 1000);
 
        rightBtn = game.add.sprite(660, 620, 'next_game');
        rightBtn.alpha = 0.6;
        rightBtn.inputEnabled = true;
        rightBtn.events.onInputDown.add(function(){
            scooter.body.velocity.x = 130;
        }, this);
        rightBtn.events.onInputUp.add(function(){
            scooter.body.velocity.x = 0;
        }, this);
    
        leftBtn = game.add.sprite(0, 620, 'prev_game');
        leftBtn.alpha = 0.6;
        leftBtn.inputEnabled = true;
        leftBtn.events.onInputDown.add(function(){
            scooter.body.velocity.x = -130;
        }, this);
        leftBtn.events.onInputUp.add(function(){
            scooter.body.velocity.x = 0;
        }, this);

        if (pb_time > 1) scooter.frame = 1;
        else{
            scooter.frame = 0;
        }

        createAsteroids();
    }
}

function createAsteroids(){  
    var time_to_next = game.rnd.integerInRange(400, 2500 - pb_time);
    if (time_to_next < 400) time_to_next = 400;
    
    var start_x = game.rnd.integerInRange(50, WIDTH - 50);
    var start_y = scooter.y - game.rnd.integerInRange(250, 2500);
    var frame =  game.rnd.integerInRange(1, 7);
    
    var vel_y = game.rnd.integerInRange(1, 5) * (pb_time / 10);

    var asteroid_alpha = game.rnd.integerInRange(7, 9);

    asteroid = asteroids.create(start_x ,start_y, 'asteroid');
    asteroid.frame = frame;

    asteroid.body.velocity.y = vel_y;

    asteroid.alpha = 0;
    game.add.tween(asteroid).to( { alpha: parseFloat('0.' + asteroid_alpha) }, 600, Phaser.Easing.Linear.None, true);

    asteroid_timer = game.time.events.add(time_to_next, function(){
        createAsteroids(); 
    }, this, []);
}

function collisionScooter(_player, _asteroid){
    if (_player.tint != 0xff0000){
        _player.tint = 0xff0000;
        asteroids.callAll('kill');
        
        if (save_score()){
            bestScore = localStorage.getItem("theremin-bestScore");
            best_scoreText.text = 'Best: ' + bestScore;
        };
        
        score = 0;
        scoreText.text = 'Score: ' + score;
            
        setTimeout(function(){
            _player.tint = 0xffffff;
        }, 1000);
    }
}

function save_score(){ // if it's the best score ever, save it to local storage
    if (score > bestScore){
        localStorage.setItem( "theremin-bestScore", score );
        return true;
    }
    else{
        return false;
    }
}

function initSpaceGame(){
    pb_time = 440;
  
    bestScore = localStorage.getItem("theremin-bestScore");
    if (bestScore == null) bestScore = 0;
    
    scooter = game.add.sprite(375, 850, 'scooter');
    game.physics.arcade.enable(scooter);
    scooter.visible = false;
    scooter.immovable = true;

    asteroids = game.add.group();
    asteroids.enableBody = true;
    asteroids.physicsBodyType = Phaser.Physics.ARCADE;       
    game.world.setBounds(0, 0, WIDTH, 1275);
     
    hubble = game.add.tileSprite(0, 0, WIDTH, 1275, 'hubble');
    hubble.visible = false;
}

function initAd(){
    admobid = {
        interstitial: 'ca-app-pub-9795366520625065/2870402631',
        banner: 'ca-app-pub-9795366520625065/8959215838'
    };
    
 	if(AdMob) AdMob.createBanner({
  	  	adId: admobid.banner,
  	  	position: AdMob.AD_POSITION.TOP_CENTER,
  	  	autoShow: true
  	});
  	
  	if(AdMob) AdMob.prepareInterstitial({
  		adId: admobid.interstitial, 
  		autoShow: false
  	});
}
