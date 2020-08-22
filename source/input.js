let Input = function(element) {
    let self = this;
    this.mouse = {
        x: undefined,
        y: undefined,
        clicked: false,
        fresh: false
    };

    element.addEventListener('mousedown', function(ev) {
        if ( ev.button == 0 ) {
            self.mouse.clicked = true;
            self.mouse.fresh = true;
        }
    });
    element.addEventListener('mouseup', function(ev) {
        if ( ev.button == 0 ) {
            self.mouse.clicked = false;
            self.mouse.fresh = true;
        }
    });
    element.addEventListener('mouseenter', function(ev) {
        self.mouse.x = ev.offsetX;
        self.mouse.y = ev.offsetY;
    });
    element.addEventListener('mouseleave', function(ev) {
        self.mouse.x = undefined;
        self.mouse.y = undefined;
        self.mouse.clicked = false;
        self.mouse.fresh = true;
    });
    element.addEventListener('mousemove', function(ev) {
        self.mouse.x = ev.offsetX;
        self.mouse.y = ev.offsetY;
    });
    element.addEventListener('contextmenu', function(ev) {
        ev.preventDefault();
    });

    return this;
}
Input.prototype.update = function() {
    this.mouse.fresh = false;
}