window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;


	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };

	};
	Player.prototype.getPos = function() {
		return this.pos;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function(delta) {
	
		if (Controls.keys.space && Controls.didJump()) {
			this.pos.y -= 6;
		} else {
			this.pos.y += delta * SPEED * (0.7);
		}
	
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};




	return Player;

})();
