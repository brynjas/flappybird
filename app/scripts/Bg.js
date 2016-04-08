
window.Bg = (function() {
    'use strict';


    var Bg = function(el, game, x, y) {
        this.el = el;
        this.game = game;
        this.pos = {
            x: x,
            y: y
        };
    }

    Bg.prototype.onFrame = function(delta) {
            this.pos.x -= 0.1;
            if (this.pos.x < -300 ) {
                this.pos.x = 10;
            }    
        // Update UI
        this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };

    return Bg;

})();