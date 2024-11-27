/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates face tracking on live video through ml5.faceMesh.
 */

let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };

// particle system
let particles = [];

function preload() {
    // Load the faceMesh model
    faceMesh = ml5.faceMesh(options);
}

function setup() {
    createCanvas(640, 480);

    // Create the video and hide it
    pixelDensity(1);
    capture = createCapture({
        video: {
            mandatory: {
                minWidth: 640,
                minHeight: 480,
                maxWidth: 640,
                maxHeight: 480
            }
        },
        audio: false
    });
    capture.hide();

    // Start detecting faces from the webcam video
    faceMesh.detectStart(capture, gotFaces);
}

function draw() {
    // Draw the webcam video
    image(capture, 0, 0, width, height);

    // do we see the user's face?
    if (faces.length > 0) {
        let mouthTopKeypoint = faces[0].keypoints[13];
        let mouthBottomKeypoint = faces[0].keypoints[14];
        let mouthOpeningDistance = dist(mouthTopKeypoint.x, mouthTopKeypoint.y, mouthBottomKeypoint.x, mouthBottomKeypoint.y);

        if (mouthOpeningDistance > 10) {
            // generate some new particle on top of the mouth
            for (let i = 0; i < 10; i++) {
                particles.push(new Particle(faces[0].lips.centerX, faces[0].lips.centerY));
            }
        }
    }

    // draw all particles
    for (let i = 0; i < particles.length; i++) {
        let gone = particles[i].moveAndDisplay();
        if (gone) {
            particles.splice(i, 1);
            i--;
        }
    }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
    // Save the output to the faces variable
    faces = results;
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.red = random(255);
        this.green = random(255);
        this.blue = random(255);
        this.ySpeed = 1;
        this.xSpeed = random(-3, 3);
        this.size = random(5,15);
    }
    moveAndDisplay() {
        noStroke();
        fill(this.red, this.green, this.blue, this.transparency);
        ellipse(this.x, this.y, this.size, this.size);
        this.size -= 0.1;
        this.y += this.ySpeed;
        this.ySpeed += 0.1;
        this.x += this.xSpeed;
        if (this.size <= 0) {
            return true;
        }
        return false;
    }
}
