// ML5 variables
let bodySegmentation;
let capture;
let segmentation;

// built-in options for this model
/*
background: A mask of the background. The result is an image with transparent pixels on the background and black pixels on the person.
person: A mask of the person. The result is an image with black pixels on the background and transparent pixels on the person.
parts: BodyPix only. A mask of the body parts. The result is an image with white pixels on the background and various color pixels for each body part.
*/

let options = {
    maskType: "background",
};

// green screen background
let greenScreenBackground;

// buffer to hold our computed result
let outputBuffer;

function preload() {
    bodySegmentation = ml5.bodySegmentation("BodyPix", options);
    greenScreenBackground = loadImage("../images/egypt.jpg");
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

    // create our output buffer
    outputBuffer = createGraphics(640, 480);

    bodySegmentation.detectStart(capture, gotResults);
}

function draw() {

    // if there is segmentation data to process
    if (segmentation) {
        background(0);

        // update our output buffer to include a merging of the green screen background & the person's image
        outputBuffer.clear();

        // expose the raw pixels in the output buffer, segmentation mask and live video stream
        outputBuffer.loadPixels();
        greenScreenBackground.loadPixels();
        segmentation.mask.loadPixels();
        capture.loadPixels();

        // iterate over the segmentation mask and copy over the pixels associated with the user's body
        for (let i = 0; i < segmentation.mask.pixels.length; i += 4) {
            // get the transparency of this pixel
            let t = segmentation.mask.pixels[i+3];

            // check if this pixel is opaque - that means it's the person's body and we need to copy pixels from the video stream
            if (t > 0) {
                outputBuffer.pixels[i] = capture.pixels[i];
                outputBuffer.pixels[i+1] = capture.pixels[i+1];
                outputBuffer.pixels[i+2] = capture.pixels[i+2];
                outputBuffer.pixels[i+3] = capture.pixels[i+3];
            }
            // otherwise grab pixels from the green screen background
            else {
                outputBuffer.pixels[i] = greenScreenBackground.pixels[i];
                outputBuffer.pixels[i+1] = greenScreenBackground.pixels[i+1];
                outputBuffer.pixels[i+2] = greenScreenBackground.pixels[i+2];
                outputBuffer.pixels[i+3] = 255;
            }
        }

        // update pixels and draw to the screen
        outputBuffer.updatePixels();

        // draw the output buffer to the screen
        image(outputBuffer, 0, 0);
    }

    // otherwise there's no segmentation data - just draw the green screen image
    else {
        image(greenScreenBackground, 0, 0);
    }
}

// callback function for body segmentation
function gotResults(result) {
    segmentation = result;
}
