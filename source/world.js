let World = function(canvas_id) {
    let self = this;

    this.canvas = document.getElementById(canvas_id);
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = Math.floor(this.canvas.offsetWidth);
    this.canvas.height = Math.floor(this.canvas.offsetHeight);
    this.ctx.imageSmoothingEnabled = false;

    this.atlas = {};

    this.camera = {x: -0.5, y: -0.5, w: 1, h: 1};
    this.input = new Input(this.canvas);

    this._objects = {};
    this._current_index = 0;

    return this;
}

World.prototype.load = function(name, src) {
    let self = this;
    let new_image = new Image();
    new_image.onload = function() {
        self.atlas[name] = this;
    }
    new_image.src = src;
}

World.prototype.add = function(instance) {
    let result = NaN;
    if ( instance &&
         instance.update && typeof instance.update == 'function' &&
         instance.draw && typeof instance.draw == 'function' ) {
        result = this._current_index;
        this._objects[this._current_index] = instance;
        ++ this._current_index;
    }
    else {
        console.error("Object is not a valid type to add to World list");
    }
    return result;
}
World.prototype.update = function() {
    for (const key in this._objects) {
        this._objects[key].update();
    }
    this.input.update();
}
World.prototype._draw_grid = function() {
    let color1 = '#343434';
    let color2 = '#606070';
    let gradient;
    if ( this.input.mouse.x && this.input.mouse.y ) {
        gradient = this.ctx.createRadialGradient(
            this.input.mouse.x,
            this.input.mouse.y,
            128,
            this.input.mouse.x,
            this.input.mouse.y,
            192
            );
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
    }
    else {
        gradient = color2;
    }
    this.ctx.save();
    this.ctx.strokeStyle = gradient;
    this.ctx.beginPath();
    // Draw grid
    for ( let i=0;i<=this.canvas.height;i+=64) {
        this.ctx.moveTo(0, i);
        this.ctx.lineTo(2 * (this.canvas.height - i), this.canvas.height);
        this.ctx.moveTo(0, i);
        this.ctx.lineTo(2 * i, 0);
    }
    for ( let i=128;i<=this.canvas.width;i+=128) {
        this.ctx.moveTo(i, 0);
        this.ctx.lineTo(this.canvas.width, (this.canvas.width - i) / 2);
        this.ctx.moveTo(i, this.canvas.height);
        this.ctx.lineTo(this.canvas.width, this.canvas.height - (this.canvas.width - i) / 2);
    }

    this.ctx.stroke();
    this.ctx.restore();
}
World.prototype.draw = function() {
    this._draw_grid();
    
    let list = [];
    for (const key in this._objects) {
        list.push(this._objects[key]);
    }
    list.sort(function(a, b) {
        return  (a.depth < b.depth) ? -1 : (a.depth > b.depth) ? 1 : 0;
    });
    for ( let i=0;i<list.length;i++ ) {
        list[i].draw(this.ctx);
    }
}

World.prototype.run = function() {
    let self = this;
    let mainfn = function() {
        window.requestAnimationFrame(mainfn);

        self.update();

        self.ctx.save();
        self.ctx.fillStyle = '#787882';
        self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);
        self.ctx.restore();

        self.draw();
    };
    window.requestAnimationFrame(mainfn);
}