// ml5 variables
let handPose;
let capture;
let hands = [];

// game variables
let coinArtwork;
let coins = [];

function preload() {
    // Load the handPose model
    handPose = ml5.handPose();

    coinArtwork = loadImage("../images/coin.png");
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

    // create a bunch of coins to catch
    for (let i = 0; i < 20; i++) {
        coins.push(new Coin());
    }
}

function draw() {
    // Draw the webcam video
    imageMode(CORNER);
    image(capture, 0, 0, width, height);

    // is there a hand visible?
    let fingertipX = undefined;
    let fingertipY = undefined;

    if (hands.length > 0) {
        // grab the index finger tip location
        fingertipX = hands[0].index_finger_tip.x;
        fingertipY = hands[0].index_finger_tip.y;
        fill(255,0,0);
        ellipse(fingertipX, fingertipY, 30, 30);
    }

    // draw our coins
    for (let coin of coins) {
        coin.moveAndDisplay(fingertipX, fingertipY);
    }

}

// Callback function for when handPose outputs data
function gotHands(results) {
    // save the output to the hands variable
    hands = results;
}



class Coin {

    constructor() {
        this.reset();
    }
    reset() {
        this.x = random(10, width-10);
        this.y = random(-500, 0);
        this.speed = random(1,3);
    }
    moveAndDisplay(x, y) {
        // is the user touching this coin?
        if (x && y && dist(x,y,this.x,this.y) < 30) {
            this.reset();
            return;
        }

        // otherwise just draw and move the coin as usual
        imageMode(CENTER);
        image(coinArtwork, this.x, this.y);
        this.y += this.speed;
        if (this.y > height) {
            this.reset();
        }
    }

}