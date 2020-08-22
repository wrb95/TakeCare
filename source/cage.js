let Cage = function(world) {
    this.world = world;
    this.world.add(this);
    this.depth = 9999;
}

Cage.prototype.update = function() {

}

Cage.prototype.draw = function(ctx) {
    
}