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

GuineaPig.prototype.update = function() {
    switch ( this._state ) {
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

    }
    else {
        let image = this.world.atlas["guinea-pig-walking"];
        if ( !image || !image.complete )
            return;
            
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(-this.direction*2, 2);
        ctx.drawImage(image, -16, -16);
        ctx.restore();
    }
}