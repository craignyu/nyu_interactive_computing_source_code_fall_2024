// variable to hold a reference to our A-Frame world
let world;

function setup() {
    // no canvas needed
    noCanvas();

    // construct the A-Frame world
    // this function requires a reference to the ID of the 'a-scene' tag in our HTML document
    world = new AFrameP5.World('VRScene');

    // set a background color for the world using RGB values
    world.setBackground(173, 216, 230);

    // decide if you want to allow the user to fly or be stuck on the ground
    // if you disallow flying the user can only move in the X & Z axes
    // the default is to disallow flying - world.setFlying(false)
    world.setFlying(false);

    // you can also disable WASD movement
    world.enableWASD(false);

    // what textures can we choose from?
    let textures = ['iron', 'gold', 'stone'];

    // create lots of boxes
    for (let i = 0; i < 150; i++) {
        // pick a location
        let x = random(-50, 50);
        let z = random(-50, 50);

        // pick a random texture
        let t = random(textures);

        // create a box here
        let b = new AFrameP5.Box({
            x: x,
            y: 0.5,
            z: z,
            asset: t
        });

        // add the box to the world
        world.add(b);
    }

    // create a plane to serve as our "ground"
    let g = new AFrameP5.Plane({
        x: 0, y: 0, z: 0,
        width: 100, height: 100,
        asset: 'stone',
        repeatX: 100,
        repeatY: 100,
        rotationX: -90, metalness: 0.25
    });

    // add the plane to our world
    world.add(g);
}

function draw() {
    // always move the player forward a little bit - their movement vector
    // is determined based on what they are looking at
    //	world.moveUserForward(0.05);

    // note that you can also only trigger movement when the mouse is down or the user
    // is touching the screen
    if (mouseIsPressed) {
        world.moveUserForward(0.05);
    }

    // wrap around logic

    // step 1: get the user's position
    // this is an object with three properties (x, y and z)
    let pos = world.getUserPosition();

    // now evaluate
    if (pos.x > 50) {
        world.setUserPosition(-50, pos.y, pos.z);
    }
    else if (pos.x < -50) {
        world.setUserPosition(50, pos.y, pos.z);
    }
    if (pos.z > 50) {
        world.setUserPosition(pos.x, pos.y, -50);
    }
    else if (pos.z < -50) {
        world.setUserPosition(pos.x, pos.y, 50);
    }
}