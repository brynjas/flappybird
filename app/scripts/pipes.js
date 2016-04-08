window.Pipes = (function() {
    'use strict';

    var SPEED = 20;
    var GAP = 20;

    
    var PipeEl = function(pipe, x, y) {
        this.pipe = pipe;
        this.pos = {
            x: x,
            y: y
        };
    };

    var originalPipeGap = getRandomInt(10, 30);

    var Pipes = function(el, game) {
        this.el = el;
        this.game = game;
        
        this.pipeObj1 = {top: new PipeEl(this.el.find('.top1'), this.game.WORLD_WIDTH + 15, originalPipeGap),
    					 bottom: new PipeEl(this.el.find('.bottom1'), this.game.WORLD_WIDTH + 15, originalPipeGap + GAP)};
      };
	/**
	 * Resets the state of the player for a new game.
	 */
	Pipes.prototype.reset = function() {

        console.log("er í pipe reset");

        this.pipeObj1.top.pos.x = this.game.WORLD_WIDTH + 15;
        this.pipeObj1.top.pos.y = originalPipeGap;
        this.pipeObj1.bottom.pos.x = this.game.WORLD_WIDTH + 15;
        this.pipeObj1.bottom.pos.y = originalPipeGap + GAP;



        //this.pipeObj1.top.pipe.css('transform', 'translateZ(0) translate(' + 0+ 'em, ' + 0+ "em)");
        //this.pipeObj1.bottom.pipe.css('transform', 'translateZ(0) translate(' + (this.game.WORLD_WIDTH + 15) + "em, " + (originalPipeGap + GAP) + "em)");

		this.pipeObj1.top.pipe.css('transform', 'translateZ(0) translate(' + this.pipeObj1.top.pos.x + 'em, ' + this.pipeObj1.top.pos.y + "em)");
        this.pipeObj1.bottom.pipe.css('transform', 'translateZ(0) translate(' + (this.game.WORLD_WIDTH + 15) + "em, " + (originalPipeGap + GAP) + "em)");

	};



	Pipes.prototype.onFrame = function(delta, position) {
		
        this.pipeObj1.top.pos.x -= delta * SPEED;
        this.pipeObj1.bottom.pos.x -= delta * SPEED;  
        var pipeGap = getRandomInt(7.5, 35);
        // var worldHeight = this.game.WORLD_HEIGHT;

       // console.log("Player-x:" + position.x + " y:" + position.y);
        //console.log("TopPipe-x:" + this.pipeObj1.top.pos.x + " y:" + this.pipeObj1.top.pos.y);

 		this.pipeObj1.top.pipe.css('transform', 'translateZ(0) translate(' + this.pipeObj1.top.pos.x + 'em, ' + (this.pipeObj1.top.pos.y - 69.5) + "em)");
        this.pipeObj1.bottom.pipe.css('transform', 'translateZ(0) translate(' + this.pipeObj1.bottom.pos.x + "em, " + this.pipeObj1.bottom.pos.y + "em)");

           
        if(this.pipeObj1.top.pos.x < -10) {

            this.pipeObj1.top.pos.x = this.game.WORLD_WIDTH + 5;
            this.pipeObj1.bottom.pos.x = this.game.WORLD_WIDTH + 5;

            this.pipeObj1.top.pos.y = pipeGap;
            this.pipeObj1.bottom.pos.y = pipeGap + GAP;

            this.pipeObj1.top.pipe.css('transform', 'translateZ(0) translate(' + this.pipeObj1.top.pos.x + 'em, ' + (this.pipeObj1.top.pos.y - 69.5) + "em)");
            this.pipeObj1.bottom.pipe.css('transform', 'translateZ(0) translate(' + this.pipeObj1.bottom.pos.x + "em, " + this.pipeObj1.bottom.pos.y + "em)");

            //this.pipeObj1.top.pipe.css('transform', 'translateZ(0) translate(' + this.pipeObj1.top.pos.y + 'em)');
            //this.pipeObj1.bottom.pipe.css('transform', 'translateZ(0) translateY(' + this.pipeObj1.bottom.pos.y + 'em)');
            //this.pipeObj1.top.pipe.css('height', this.pipeObj1.top.pos.y + 'em');
            //this.pipeObj1.bottom.pipe.css('height', this.pipeObj1.bottom.pos.y + 'em');
        }

        if(position.x + 2.5 >= (this.pipeObj1.bottom.pos.x - 2.15) &&
                position.x - 2.5 <= (this.pipeObj1.bottom.pos.x + 2.15) &&
                    position.y + 2.5 >= (this.pipeObj1.bottom.pos.y - 2.5)) {
            return this.game.gameover();
        }

        if(position.x + 2.5 >= (this.pipeObj1.top.pos.x - 2.15) &&
                position.x - 2.5 <= (this.pipeObj1.top.pos.x + 2.15) &&
                    position.y - 2.5 <= (this.pipeObj1.top.pos.y + 2.5)) {
            return this.game.gameover();
        }
             
    }
   
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }	

	return Pipes;

})();


  


	   
