/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates hand tracking on live video through ml5.handPose.
 */

let handPose;
let capture;
let hands = [];

function preload() {
    // Load the handPose model
    handPose = ml5.handPose();
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

    // start detecting hands from the webcam video
    handPose.detectStart(capture, gotHands);
}

function draw() {
    // Draw the webcam video
    image(capture, 0, 0, width, height);

    // Draw all the tracked hand points
    for (let i = 0; i < hands.length; i++) {
        let hand = hands[i];
        for (let j = 0; j < hand.keypoints.length; j++) {
            let keypoint = hand.keypoints[j];
            fill(0, 255, 0);
            noStroke();
            circle(keypoint.x, keypoint.y, 10);
        }
    }
}

// Callback function for when handPose outputs data
function gotHands(results) {
    // save the output to the hands variable
    hands = results;
}
