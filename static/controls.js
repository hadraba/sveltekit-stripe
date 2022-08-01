function changeStrokeStyle(e) {
    activeStrokeStyle = e-1;
}

function changeStrokeColor(e) {
    activeStrokeColor = e-1;
}

function changeShirtColor(e) {
    activeShirtColor = e-1;
}

window.addEventListener("popstate", (e) => {
  readURLParams(window.location.search);
});


function updateURLParams(reset) {
  if(reset !== true) {
    let url = "?";
    url += "x=" + rotationX;
    url += "&y=" + rotationY;
    url += "&rng=" + rng;
    let places = "&p=";

    checkboxes.forEach((el, i) => {
      if(el.checked) {
        places += i + "-";
      }
    });

    if(places !== "&p=") {
      places = places.slice(0, -1);
      url += places;
    }

    window.history.pushState(" ", "KULT-25", url);
  } else {
    window.history.pushState(" ", "KULT-25", "/");
  }
}

function readURLParams(url) {
  let tmp = url.substring(1);
  tmp = tmp.split("&");
  if(tmp[0]) {
    let x = tmp[0].split("=");
    rotationX = float(x[1]);
  }
  if(tmp[1]) {
    let y = tmp[1].split("=");
    rotationY = float(y[1]);
  }
  dragging = true;
  if(tmp[2]) {
    let rngT = tmp[2].split("=");
    rng = int(rngT[1]);
  }

  if(tmp[3]) {
    let places = tmp[3].split("=");
    places = places[1].split("-");
    let k = 0;
    checkboxes.forEach((el, index) => {
      if(index === int(places[k])) {
        el.checked = true;
        k++;
      } else {
        el.checked = false;
      }
    });
  }
}

let initialDragPosition = {
  x: 0,
  y: 0};

function mousePressed() {
  //inside canvas
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height && showMode === "generate") {
    dragging = true;
    draggingInitiated = true;
    initialDragPosition = {
      x: mouseX,
      y: mouseY
    }
  }
}

function mouseDragged() {
  //inside canvas
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height && draggingInitiated && showMode === "generate") {
    dragging = true;
    rotationX += (mouseX - initialDragPosition.x)/width;
    rotationY += (mouseY - initialDragPosition.y)/width;
    initialDragPosition.x = mouseX;
    initialDragPosition.y = mouseY;
  }
  return false;
}

function mouseReleased() {
  if(draggingInitiated) {
    updateURLParams();
    draggingInitiated = false;
  }
}

function exportHighResolution() {
    canvasSize = initializeCanvasDimensions();
    resizeCanvas(formatSize.width, formatSize.height);
    draw();
    save("kult-A4.png");
    windowResized();
}
  
function windowResized() {
  canvasSize = initializeCanvasDimensions(formatSize);
  resizeCanvas(canvasSize.width, canvasSize.height);

  if(windowWidth < 280*2 + canvasSize.width) {
      document.getElementById('defaultCanvas0').style.right = "0";
      document.getElementById('defaultCanvas0').style.transform = "none";
  } else {
      document.getElementById('defaultCanvas0').style.right = "calc(50%)";
      document.getElementById('defaultCanvas0').style.transform = "translateX(50%)";
  }
}

function resetView() {
  checkboxes.forEach((element) => {
      element.checked = false;
  });
  rng = createRandomSeed();
  rotationX = 0;
  rotationY = 0;
  camera.z = -4044;
  updateURLParams(true);
}

function randomView() {
  checkboxes.forEach((element) => {
    let treshold = .2;
    if(random() < treshold) {
      element.checked = true;
    } else {
      element.checked = false;
    }
  });
  rng = createRandomSeed();
  rotationX = random(2*PI);
  rotationY = random(2*PI);
  dragging = true;
  updateURLParams();
}