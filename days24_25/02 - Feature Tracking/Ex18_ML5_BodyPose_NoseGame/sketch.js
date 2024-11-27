// example adapted from:  https://learn.ml5js.org/#/

// our video capture object
let capture;

// our ml5 detector
let poseNet;

// an array of poses that get detected (human body features & their locations)
let poses = [];

// objective
let coinX = 250;
let coinY = 250;

function preload() {
    // Load the bodyPose model
    bodyPose = ml5.bodyPose();
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

    // Start detecting poses in the webcam video
    bodyPose.detectStart(capture, gotPoses);

    // Get the skeleton connection information
    connections = bodyPose.getSkeleton();
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
    // Save the output to the poses variable
    poses = results;
}

function draw() {
    background(0);

    // We can call both functions to draw all keypoints and the skeletons
    image(capture, 0, 0, width, height);

    fill(255, 255, 0);
    ellipse(coinX, coinY, 50, 50);

    // figure out where the user's nose is
    if (poses.length > 0 && poses[0].nose) {
        let noseX = poses[0].nose.x;
        let noseY = poses[0].nose.y;

        fill(255, 0, 0)
        ellipse(noseX, noseY, 50, 50);

        if (dist(noseX, noseY, coinX, coinY) < 25) {
            pickRandomCoinLocation();
        }
    }
}

// debug: click the mouse to see all poseNet properties
function mousePressed() {
    // iterate over all pose properties and give us a readout of where these features can be found
    if (poses.length > 0) {
        for (let property in poses[0].pose) {
            if (poses[0].pose[property].x) {
                console.log(`${property} ${poses[0].pose[property].x} ${poses[0].pose[property].y}`)
            }
        }
    }
}

function pickRandomCoinLocation() {
    coinX = random(30, width - 30);
    coinY = random(30, height - 30);
}
