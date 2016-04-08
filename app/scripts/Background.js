
window.Background = (function() {
    'use strict';
                console.log("inní Background ");


    var Background = function(el, game, x, y) {
        this.el = el;
        this.game = game;
        this.pos = {
            x: x,
            y: y
        };
    }

    Background.prototype.onFrame = function(delta) {
            console.log("inní Background onFrame");
            //this.pos.x -= 1000;
            if (this.pos.x < -100 ) {
                this.pos.x = 60;
            }    
        // Update UI
        this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };

    return Ground;

})();