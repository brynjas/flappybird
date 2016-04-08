
window.Ground = (function() {
    'use strict';



    var Ground = function(el, game, x, y) {
        this.el = el;
        this.game = game;
        this.pos = {
            x: x,
            y: y
        };
    };

    Ground.prototype.onFrame = function(delta) {
            this.pos.x -= delta * 20;
            if (this.pos.x < -40.5 ) {
                this.pos.x = 0;
            }

        
        // Update UI
        this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };

    return Ground;

})();