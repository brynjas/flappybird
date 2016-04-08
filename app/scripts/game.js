
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor

	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.isPlaying = false;
		//this.gameObjects = [];
		//this.bg = new window.Background(this.el.find('.Background'), this, 0, 0);
		this.bg = new window.Bg(this.el.find('.Background'), this, 0, 0);

		// Cache a bound onFrame since we need it each frame.
	    this.pipe = new window.Pipes(el, this);
	   // this.pipe = new window.Pipes(this.el.find('.Pipes'), this);
		
		this.pipe1 = new window.Pipes(this.el.find('.top1'), this.el.find('.bottom1'), this, 100);
		   this.ground = new window.Ground(this.el.find('.Ground'), this, 0, 0);

		this.onFrame = this.onFrame.bind(this);

		var music = document.getElementById("myMusic");
		music.play();
		music.volume = 0.2;


 		var PlaySound = true;
	 


	 $(".Mute").click(function(){
    	console.log("inni mute ");
    	
    	if(PlaySound === true){
    		console.log("inni mute takka ");
    		music.pause();
    	    music.volume = 0.0;
    		PlaySound= false; 
		}
		else{
			PlaySound = true;
		}
	});


	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function(delta) {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;
		this.bg.onFrame(delta);

		// Update game entities.
		this.player.onFrame(delta);
		this.pipe.onFrame(delta, this.player.getPos());
		this.ground.onFrame(delta);

		//this.ground2.onFrame(delta);
 
		// Request next frame.
		window.requestAnimationFrame(this.onFrame);

	};


	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
		//this.pipe1.reset();
		this.pipe.reset();

	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	Game.prototype.TheSound = function() {
   		
      var music = document.getElementById('myMusic');
      console.log("Mute: " , this.mute );

        if (!this.mute) {
             this.mute = false;
            music.play();
            music.volume = 0.0;
        }
        else {
            this.mute = true;
            music.play();
            music.volume = 0.2;
        }
    };

    Game.prototype.MuteSound = function(){

    	this.mute = false;
    	console.log("MuteSound Mute: ", this.mute );

    	this.TheSound();
    };

     Game.prototype.PlaySound = function(){

    	this.mute = true;
    	console.log("PlaySound Mute: ", this.mute );

    	this.TheSound();
    };


	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();


