let Player = function(world) {
    this.world = world;
    this.tool = Player.TOOL_HAND;
    this.depth = 9999;

    this.world.add(this);

    return this;
}

Player.TOOL_HAND = 0;
Player.TOOL_CAGE_FILL = 0;
Player.TOOL_CAGE_WALL = 0;

Player.prototype.update = function() {
    if ( this.world.input.mouse.y ) {
        this.depth = this.world.input.mouse.y;
    }
    else {
        this.depth = 9999;
    }
}

Player.prototype.draw = function(ctx) {
    switch ( this.tool ) {
        case Player.TOOL_HAND:
            let hand = this.world.atlas["hand"];
            if ( !hand )
                break;
            if ( this.world.input.mouse.clicked ) {
                ctx.drawImage(
                    hand,
                    0, 32, 32, 32, 
                    this.world.input.mouse.x - 32,
                    this.world.input.mouse.y - 32,
                    64, 64
                    );
            }
            else {
                ctx.drawImage(
                    hand,
                    0, 0, 32, 32, 
                    this.world.input.mouse.x - 32,
                    this.world.input.mouse.y - 32,
                    64, 64
                    );
            }
            break;
    }
}