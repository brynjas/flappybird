window.Controls = (function() {
    'use strict';

    var Pipe_lower;
    var Pipe_higher;
    var SPEED;



    var Pipe = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };

	};




	Pipe.prototype.onFrame = function(delta) {
		/*if (Controls.keys.right) {
			this.pos.x += delta * SPEED;
		}
		if (Controls.keys.left) {
			this.pos.x -= delta * SPEED;
		}*/

		if (game.isPlaying ) {
	
			this.pos.x += 3;
		}
		//this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};


});