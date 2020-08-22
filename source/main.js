window.onload = function () {
    let world = new World('game-canvas');
    world.load("guinea-pig-walking", "resources/guinea-pig-walking.png");
    world.load("guinea-pig-picked-up", "resources/guinea-pig-picked-up.png");
    world.load("cage", "resources/cnc-cage.png");
    world.load("hand", "resources/player-hand.png");

    new Player(world);
    new Cage(world);

    for ( let i=0;i<8;i++ ) {
        new GuineaPig(world);
    }

    world.run();
}

