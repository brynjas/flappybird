window.Pipes = (function() {
    'use strict';

    var Pipe_lower;
    var Pipe_higher;


    var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

     var PipeEl = function(pipe, xCord, yCord) {
        this.pipe = pipe;
        this.pos = {
            x: xCord,
            y: yCord
        };
    };

    var Pipes = function(el, game) {
        this.el = el;
        this.game = game;
        this.pipeArr = [{
            name: 'First',
            top: new PipeEl(this.el.find('.Pipeup1'), 0, 0),
            bottom: new PipeEl(this.el.find('.Pipedown1'), 0, 0)
       }];
    };





	/**
	 * Resets the state of the player for a new game.
	 */
	Pipes.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};



	Pipes.prototype.onFrame = function(delta) {
		
		console.log("í inFrame");
		for (var i = 0; i < this.pipeArr.length; i++) {
            this.pipeArr[i].top.pos.x -= delta * SPEED;
            this.pipeArr[i].bottom.pos.x -= delta * SPEED;

            this.pipeArr[i].top.pipe.css('transform', 'translateZ(0) translateX(' + this.pipeArr[i].top.pos.x + 'em)');
            this.pipeArr[i].bottom.pipe.css('transform', 'translateZ(0) translateX(' + this.pipeArr[i].bottom.pos.x + 'em)');


		}
};

	

	return Pipes;

})();


  


	   
