// - visit teachable machine at https://teachablemachine.withgoogle.com/
// - click "get started"
// - create a new image project with a standard model image
// - record live video or upload images into the classes you wish to detect
// - train your model
// - click "export model"
// - click "upload my model"
// - copy the sharable link that appears
// - paste the sharable link into the p5 sketch

// Classifier Variable
let classifier;

// Model URL
// this model will attempt to determine if you have your left arm up, your right arm up, or no arms up
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/AQS3kTfxe/';

// Video
let video;

// To store the classification
let label = "";

// Load the model first
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json', {
        flipped: true
    });
}

function setup() {
    createCanvas(320, 260);
    // Create the video
    video = createCapture(VIDEO, {flipped: true});
    video.size(320, 240);
    video.hide();
    classifyVideo();
}

function draw() {
    background(0);
    // Draw the video
    image(video, 0, 0);

    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
    classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(results) {
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;

    // start the classfication process over again
    classifyVideo();
}
