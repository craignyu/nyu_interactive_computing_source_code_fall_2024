/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates segmenting a person by body parts with ml5.bodySegmentation.
 */

let bodySegmentation;
let capture;
let segmentation;

// built-in options for this model
// built-in options for this model
/*
background: A mask of the background. The result is an image with transparent pixels on the background and black pixels on the person.
person: A mask of the person. The result is an image with black pixels on the background and transparent pixels on the person.
parts: BodyPix only. A mask of the body parts. The result is an image with white pixels on the background and various color pixels for each body part.
*/
let options = {
    maskType: "parts",
};

function preload() {
    bodySegmentation = ml5.bodySegmentation("BodyPix", options);
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

    bodySegmentation.detectStart(capture, gotResults);
}

function draw() {
    background(255);
    image(capture, 0, 0);
    if (segmentation) {
        image(segmentation.mask, 0, 0, width, height);
    }
}

// callback function for body segmentation
function gotResults(result) {
    segmentation = result;
}
