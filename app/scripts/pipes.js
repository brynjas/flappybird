window.Pipes = (function() {
    'use strict';

    var SPEED = 20;
    var GAP = 20;
    var gapMin = 4.5;
    var gapMax = 30;
    //var pipeInterval = this.game.WORLD_WIDTH / 3;

    
    var PipeEl = function(pipe, x, y) {
        this.pipe = pipe;
        this.pos = {
            x: x,
            y: y
        };
    };

    var originalPipeGap = [getRandomInt(gapMin, gapMax), getRandomInt(gapMin, gapMax), getRandomInt(gapMin, gapMax)];
    //var originalPipeGap = getRandomInt(7.5,35);

    var Pipes = function(el, game) {
        this.el = el;
        this.game = game;
        
        this.pipeObj1 = {top: new PipeEl(this.el.find('.top1'), this.game.WORLD_WIDTH + 15, originalPipeGap[0]),
    					 bottom: new PipeEl(this.el.find('.bottom1'), this.game.WORLD_WIDTH + 15, originalPipeGap[0] + GAP)};

        this.pipeArr = [
                        {top: new PipeEl(this.el.find('.top1'), this.game.WORLD_WIDTH + 15, originalPipeGap[0]),
                         bottom: new PipeEl(this.el.find('.bottom1'), this.game.WORLD_WIDTH + 15, originalPipeGap[0] + GAP)},

                         {top: new PipeEl(this.el.find('.top2'), this.game.WORLD_WIDTH + 15 + (this.game.WORLD_WIDTH / 2.64), originalPipeGap[1]),
                         bottom: new PipeEl(this.el.find('.bottom2'), this.game.WORLD_WIDTH + 15 + (this.game.WORLD_WIDTH / 2.64), originalPipeGap[1] + GAP )},

                         {top: new PipeEl(this.el.find('.top3'), this.game.WORLD_WIDTH + 15 + 2*(this.game.WORLD_WIDTH / 2.64), originalPipeGap[2]),
                         bottom: new PipeEl(this.el.find('.bottom3'), this.game.WORLD_WIDTH + 15 + 2*(this.game.WORLD_WIDTH / 2.64), originalPipeGap[2] + GAP)}
                         ];

      };
	/**
	 * Resets the state of the player for a new game.
	 */
	Pipes.prototype.reset = function() {
        originalPipeGap = [getRandomInt(gapMin, gapMax), getRandomInt(gapMin, gapMax), getRandomInt(gapMin, gapMax)];

        this.pipeArr[0].top.pos.x = this.game.WORLD_WIDTH + 15;
        this.pipeArr[0].bottom.pos.x = this.game.WORLD_WIDTH + 15;

        this.pipeArr[1].top.pos.x = this.game.WORLD_WIDTH + 15 + (this.game.WORLD_WIDTH / 2.64);
        this.pipeArr[1].bottom.pos.x = this.game.WORLD_WIDTH + 15 + (this.game.WORLD_WIDTH / 2.64);

        this.pipeArr[2].top.pos.x = this.game.WORLD_WIDTH + 15 + 2*(this.game.WORLD_WIDTH / 2.64);
        this.pipeArr[2].bottom.pos.x = this.game.WORLD_WIDTH + 15 + 2*(this.game.WORLD_WIDTH / 2.64);

        for(var i = 0; i < 3; i++) {
            this.pipeArr[i].top.pos.y = originalPipeGap[i];
            this.pipeArr[i].bottom.pos.y = originalPipeGap[i] + GAP;
            this.pipeArr[i].top.pipe.css('transform', 'translateZ(0) translate(' + this.pipeArr[i].top.pos.x + 'em, ' + (this.pipeArr[i].top.pos.y - 69.5) + "em)");
            this.pipeArr[i].bottom.pipe.css('transform', 'translateZ(0) translate(' + this.pipeArr[i].bottom.pos.x + "em, " + this.pipeArr[i].bottom.pos.y + "em)");
        }



		this.pipeObj1.top.pipe.css('transform', 'translateZ(0) translate(' + this.pipeObj1.top.pos.x + 'em, ' + this.pipeObj1.top.pos.y + "em)");
        this.pipeObj1.bottom.pipe.css('transform', 'translateZ(0) translate(' + (this.game.WORLD_WIDTH + 15) + "em, " + (originalPipeGap + GAP) + "em)");

	};



	Pipes.prototype.onFrame = function(delta, position) {
		/*
        this.pipeObj1.top.pos.x -= delta * SPEED;
        this.pipeObj1.bottom.pos.x -= delta * SPEED;
*/      for(var i = 0; i < 3; i++) {
            this.pipeArr[i].top.pos.x -= delta * SPEED;
            this.pipeArr[i].bottom.pos.x -= delta * SPEED;

            this.pipeArr[i].top.pipe.css('transform', 'translateZ(0) translate(' + this.pipeArr[i].top.pos.x + 'em, ' + (this.pipeArr[i].top.pos.y - 69.5) + "em)");
            this.pipeArr[i].bottom.pipe.css('transform', 'translateZ(0) translate(' + this.pipeArr[i].bottom.pos.x + "em, " + this.pipeArr[i].bottom.pos.y + "em)");

            if(this.pipeArr[i].top.pos.x < -10) {
                var pipeGap = getRandomInt(gapMin, gapMax);
                this.pipeArr[i].top.pos.x = this.game.WORLD_WIDTH + 5;
                this.pipeArr[i].bottom.pos.x = this.game.WORLD_WIDTH + 5;

                this.pipeArr[i].top.pos.y = pipeGap;
                this.pipeArr[i].bottom.pos.y = pipeGap + GAP;

                this.pipeArr[i].top.pipe.css('transform', 'translateZ(0) translate(' + this.pipeArr[i].top.pos.x + 'em, ' + (this.pipeArr[i].top.pos.y - 69.5) + "em)");
                this.pipeArr[i].bottom.pipe.css('transform', 'translateZ(0) translate(' + this.pipeArr[i].bottom.pos.x + "em, " + this.pipeArr[i].bottom.pos.y + "em)");
            }

            if(position.x + 2.5 >= (this.pipeArr[i].bottom.pos.x - 2.15) &&
                    position.x - 2.5 <= (this.pipeArr[i].bottom.pos.x + 2.15) &&
                        position.y + 2.5 >= (this.pipeArr[i].bottom.pos.y - 2.5)) {
                return this.game.gameover();
            }

            if(position.x + 2.5 >= (this.pipeArr[i].top.pos.x - 2.15) &&
                    position.x - 2.5 <= (this.pipeArr[i].top.pos.x + 2.15) &&
                        position.y - 2.5 <= (this.pipeArr[i].top.pos.y + 2.5)) {
                return this.game.gameover();
            }
        }
        // var worldHeight = this.game.WORLD_HEIGHT;

        // console.log("Player-x:" + position.x + " y:" + position.y);
        //console.log("TopPipe-x:" + this.pipeObj1.top.pos.x + " y:" + this.pipeObj1.top.pos.y);
/*
 		this.pipeObj1.top.pipe.css('transform', 'translateZ(0) translate(' + this.pipeObj1.top.pos.x + 'em, ' + (this.pipeObj1.top.pos.y - 69.5) + "em)");
        this.pipeObj1.bottom.pipe.css('transform', 'translateZ(0) translate(' + this.pipeObj1.bottom.pos.x + "em, " + this.pipeObj1.bottom.pos.y + "em)");
*/         
        /*if(this.pipeObj1.top.pos.x < -10) {

            this.pipeObj1.top.pos.x = this.game.WORLD_WIDTH + 5;
            this.pipeObj1.bottom.pos.x = this.game.WORLD_WIDTH + 5;

            this.pipeObj1.top.pos.y = pipeGap;
            this.pipeObj1.bottom.pos.y = pipeGap + GAP;

            this.pipeObj1.top.pipe.css('transform', 'translateZ(0) translate(' + this.pipeObj1.top.pos.x + 'em, ' + (this.pipeObj1.top.pos.y - 69.5) + "em)");
            this.pipeObj1.bottom.pipe.css('transform', 'translateZ(0) translate(' + this.pipeObj1.bottom.pos.x + "em, " + this.pipeObj1.bottom.pos.y + "em)");
*/
            //this.pipeObj1.top.pipe.css('transform', 'translateZ(0) translate(' + this.pipeObj1.top.pos.y + 'em)');
            //this.pipeObj1.bottom.pipe.css('transform', 'translateZ(0) translateY(' + this.pipeObj1.bottom.pos.y + 'em)');
            //this.pipeObj1.top.pipe.css('height', this.pipeObj1.top.pos.y + 'em');
            //this.pipeObj1.bottom.pipe.css('height', this.pipeObj1.bottom.pos.y + 'em');
        //}

        /*if(position.x + 2.5 >= (this.pipeObj1.bottom.pos.x - 2.15) &&
                position.x - 2.5 <= (this.pipeObj1.bottom.pos.x + 2.15) &&
                    position.y + 2.5 >= (this.pipeObj1.bottom.pos.y - 2.5)) {
            return this.game.gameover();
        }

        if(position.x + 2.5 >= (this.pipeObj1.top.pos.x - 2.15) &&
                position.x - 2.5 <= (this.pipeObj1.top.pos.x + 2.15) &&
                    position.y - 2.5 <= (this.pipeObj1.top.pos.y + 2.5)) {
            return this.game.gameover();
        }*/
             
    }
   
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }	

	return Pipes;

})();


  


	   
