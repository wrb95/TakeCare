window.onload = function () {
    let world = new World('game-canvas');
    world.load("guinea-pig", "resources/guinea-pig-test.png");

    for ( let i=0;i<10;i++ ) {
        new GuineaPig(world);
    }

    world.run();
}

