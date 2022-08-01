function initializeCanvasDimensions(fSize) {
    let canvasSize;

    if (fSize === undefined) {
        scaler = 1;
        canvasSize = formatSize;
        strokeWidth = initialStrokeWidth;
        return canvasSize;
    }

    if ((windowHeight - 2 * margin) / fSize.height < (windowWidth - 2 * margin) / fSize.width) {
        scaler = (windowHeight - 2 * margin) / fSize.height;
        canvasSize = {
            width: scaler * fSize.width,
            height: windowHeight - 2 * margin
        }
    } else {
        scaler = (windowWidth - 2 * margin) / fSize.width;
        canvasSize = {
            width: windowWidth - 2 * margin,
            height: scaler * fSize.height
        }
    }

    document.getElementById('defaultCanvas0').style.margin = margin + 'px';

    strokeWidth = initialStrokeWidth * scaler;
    return canvasSize;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const mapNumberToRange = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

function createRandomSeed() {
    rng = getRandomInt(0,1000000000000);
    rng += Date.now();
    return rng;
}