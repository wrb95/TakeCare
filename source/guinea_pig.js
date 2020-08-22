let GuineaPig = function(world) {
    let self = this;

    this.world = world;
    this.index = this.world.add(this);

    this.x = Math.random() * this.world.canvas.width;
    this.y = Math.random() * this.world.canvas.height;
    this.direction = 2 * Math.floor(2 * Math.random()) - 1;
    Object.defineProperty(this, "depth", {
        get() { return self.y; }
    });

    this._state = GuineaPig.SITTING;
    this._move_vector = [0, 0];
}

GuineaPig.SITTING = 0;
GuineaPig.MOVING = 1;
GuineaPig.PICKED_UP = 2;

GuineaPig.prototype.mouseOn = function(mx, my) {
    // Within the guinea pigs bounding box
    return ( Math.abs(mx - this.x) < 16 && Math.abs(my - this.y) < 16 );
}
GuineaPig.prototype.update = function() {
    if ( this.world.input.mouse.fresh && this.world.input.mouse.clicked &&  
        this.mouseOn(this.world.input.mouse.x, this.world.input.mouse.y) ) {
        this._state = GuineaPig.PICKED_UP;
    }
    switch ( this._state ) {
        case GuineaPig.PICKED_UP:
            this.x = this.world.input.mouse.x;
            this.y = this.world.input.mouse.y;
            if ( !this.world.input.mouse.clicked ) {
                this._state = GuineaPig.SITTING;
            }
            break;
        case GuineaPig.SITTING:
            if ( Math.random() < 0.01 ) {
                let dx = Math.random() - 0.5;
                let dy = Math.random() - 0.5;
                let dlen = Math.sqrt(dx*dx + dy*dy);
                if ( dlen == 0 )
                    break;
                this._move_vector[0] = dx / dlen;
                this._move_vector[1] = dy / dlen;
                this.direction = (this._move_vector[0] == 0) ?
                    this._move_vector[1] / Math.abs(this._move_vector[1]) :
                    this._move_vector[0] / Math.abs(this._move_vector[0]);
                this._state = GuineaPig.MOVING;
            }
            break;
        case GuineaPig.MOVING:
            this.x += this._move_vector[0];
            this.y += this._move_vector[1];
            
            if ( this.x < -16 ) {
                this.x = this.world.canvas.width + 16;
            }
            if ( this.x > this.world.canvas.width + 16 ) {
                this.x = -16;
            }
            if ( this.y < -16 ) {
                this.y = this.world.canvas.height + 16;
            }
            if ( this.y > this.world.canvas.height + 16 ) {
                this.y = -16;
            }

            if ( Math.random() < 0.01 ) {
                this._state = GuineaPig.SITTING;
            }
            break;
    }
}
GuineaPig.prototype.draw = function(ctx) {
    if ( this._state == GuineaPig.PICKED_UP ) {
        let image = this.world.atlas["guinea-pig-picked-up"];
        if ( !image )
            return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(image, -16, -16);
        ctx.restore();
    }
    else {
        let image = this.world.atlas["guinea-pig-walking"];
        if ( !image )
            return;
            
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(-this.direction, 1);
        ctx.drawImage(image, -16, -16);
        ctx.restore();
    }
}