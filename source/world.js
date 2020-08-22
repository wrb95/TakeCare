let World = function(canvas_id) {
    let self = this;

    this.canvas = document.getElementById(canvas_id);
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = Math.floor(this.canvas.offsetWidth);
    this.canvas.height = Math.floor(this.canvas.offsetHeight);
    this.ctx.imageSmoothingEnabled = false;

    this.atlas = {};

    this.camera = {x: -0.5, y: -0.5, w: 1, h: 1};

    this._objects = {};
    this._current_index = 0;

    return this;
}

World.prototype.load = function(name, src) {
    let self = this;
    let new_image = new Image();
    new_image.onload = function() {
        self.atlas[name] = new_image;
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
}
World.prototype.draw = function() {
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

        self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
        self.draw();
    };
    window.requestAnimationFrame(mainfn);
}