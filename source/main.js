window.onload = function () {
    let world = new World('game-canvas');
    world.load("guinea-pig-walking", "resources/guinea-pig-walking.png");
    world.load("guinea-pig-picked-up", "resources/guinea-pig-picked-up.png");

    for ( let i=0;i<100;i++ ) {
        new GuineaPig(world);
    }

    world.run();
}

