
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
		this.gameObjects = [];

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	    this.pipe = new window.Pipes(el, this);
	   // this.pipe = new window.Pipes(this.el.find('.Pipes'), this);
		
		var pipe1 = new window.Pipes(this.el.find('.top1'), this.el.find('.bottom1'), this, 100);
		// Pusing it to the array
		this.gameObjects.push(pipe1);
		var pipe2 = new window.Pipes(this.el.find('.top2'), this.el.find('.bottom2'), this, 110);
		this.gameObjects.push(pipe2);

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

		// Update game entities.
		this.player.onFrame(delta);
		this.pipe.onFrame(delta, this.player.getPos());


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

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();


