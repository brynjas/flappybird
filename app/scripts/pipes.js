window.Pipes = (function() {
    'use strict';

    var SPEED = 20;
    var GAP = 15;

    
     var PipeEl = function(pipe, x, y) {
        this.pipe = pipe;
        this.pos = {
            x: x,
            y: y
        };
    };

    var Pipes = function(el, game) {
        this.el = el;
        this.game = game;
        
        this.pipeObj1 = {top: new PipeEl(this.el.find('.top1'), 0, 0),
    					 bottom: new PipeEl(this.el.find('.bottom1'), 0, 0)};

    };

	/**
	 * Resets the state of the player for a new game.
	 */
	Pipes.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};



	Pipes.prototype.onFrame = function(delta) {
		
        this.pipeObj1.top.pos.x -= delta * SPEED;
        this.pipeObj1.bottom.pos.x -= delta * SPEED;  
        var pipeGap = getRandomInt(7.5, 35);
       // var worldHeight = this.game.WORLD_HEIGHT;

 			this.pipeObj1.top.pipe.css('transform', 'translateZ(0) translateX(' + this.pipeObj1.top.pos.x + 'em)');
            this.pipeObj1.bottom.pipe.css('transform', 'translateZ(0) translateX(' + this.pipeObj1.bottom.pos.x + 'em)');

           
            if (this.pipeObj1.top.pos.x < -this.game.WORLD_WIDTH) {
                this.pipeObj1.top.pos.x = 40;
                this.pipeObj1.bottom.pos.x = 40;


                this.pipeObj1.top.pipe.css('height', pipeGap + 'em');
                this.pipeObj1.bottom.pipe.css('height', (this.game.WORLD_HEIGHT - (pipeGap + GAP)) + 'em');
            }
             
        }
   
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }	

	return Pipes;

})();


  


	   
