// variable to hold a reference to our A-Frame world
let world;

// our light objects
let light1;
let light2;

// speed variable for moving our point light around
let lightSpeed = 0.05;

function setup() {
	// no canvas needed
	noCanvas();

	// construct the A-Frame world
	// this function requires a reference to the ID of the 'a-scene' tag in our HTML document
	world = new AFrameP5.World('VRScene');

	// set a background color for our world
	world.setBackground(0, 0, 0);

	// box primitive
	let b = new AFrameP5.Box({
						x:-10, y:1, z:0,
						width:1, height: 1.2, depth: 2,
						red:random(255), green:random(255), blue:random(255)
					});
	world.add(b);

	// sphere primitive
	let s = new AFrameP5.Sphere({
						x:-8, y:5, z:0,
						radius: 1.5,
						red:random(255), green:random(255), blue:random(255),
						clickFunction: function(me) {
							me.setRed(random(255))
							me.setGreen(random(255))
							me.setBlue(random(255))
						}
					});
	world.add(s);

	// plane primitive
	let p = new AFrameP5.Plane({
						x: -6, y:2, z:0,
						width: 2, height:2,
						red:random(255), green:random(255), blue:random(255),
						side:'double'
					});
	world.add(p);

	// dodecahedron primitive
	let d = new AFrameP5.Dodecahedron({
						x: -4, y:1, z:0,
						radius: 0.5,
						red:random(255), green:random(255), blue:random(255),
					});
	world.add(d);

	// Octahedron primitive
	let o = new AFrameP5.Octahedron({
						x: -2, y:2, z:0,
						radius: 0.7,
						red:random(255), green:random(255), blue:random(255),
					});
	world.add(o);

	// Tetrahedron primitive
	let t = new AFrameP5.Tetrahedron({
						x: 0, y:1, z:0,
						radius: 0.6,
						red:random(255), green:random(255), blue:random(255),
					});
	world.add(t);

	// circle primitive
	let c = new AFrameP5.Circle({
						x: 2, y:2, z:0,
						radius: 1,
						red:random(255), green:random(255), blue:random(255),
						side:'double'
					});
	world.add(c);

	// cone primitive
	let co = new AFrameP5.Cone({
						x: 4 , y:1, z:0,
						height:1.5,
						radiusBottom: 1, radiusTop: 0.25,
						red:random(255), green:random(255), blue:random(255),
					});
	world.add(co);

	// cylinder primitive
	let cl = new AFrameP5.Cylinder({
						x: 6 , y:2, z:0,
						height:1.5,
						radius: 0.25,
						red:random(255), green:random(255), blue:random(255),
					});
	world.add(cl);

	// ring primitive
	let r = new AFrameP5.Ring({
						x: 8 , y:1, z:0,
						radiusInner:0.5,
						radiusOuter: 1,
						side: 'double',
						red:random(255), green:random(255), blue:random(255),
					});
	world.add(r);

	// torus primitive
	let to = new AFrameP5.Torus({
						x: 10 , y:2, z:0,
						radius:0.5,
						radiusTubular: 0.05,
						red:random(255), green:random(255), blue:random(255),
					});
	world.add(to);

	// torusKnot primitive
	let tok = new AFrameP5.TorusKnot({
						x: 12 , y:1, z:0,
						radius:0.5,
						radiusTubular: 0.05,
						red:random(255), green:random(255), blue:random(255),
					});
	world.add(tok);



	// create a plane to serve as our "ground"
	let g = new AFrameP5.Plane({x:0, y:0, z:0, width:100, height:100, red:255, green:102, blue:153, rotationX:-90});

	// add the plane to our world
	world.add(g);


	// a point light - this light has a position and will cast dynamic shadows
	light1 = new AFrameP5.Light({
		x: 0, y: 5, z: 2,
		color: '#fff',
		type: 'point',
		intensity: 1.0
	})
	world.add(light1)


	// an ambient light - this light has no position and lights all entities equally
	light2 = new AFrameP5.Light({
		color: '#fff',
		type: 'ambient',
		intensity: 0.1
	})
	world.add(light2)
}

function draw() {
	// move our light around
	light1.nudge(lightSpeed, 0, 0)

	// bounce logic
	if (light1.getX() > 10 || light1.getX() < -10) {
		lightSpeed *= -1
	}
}
