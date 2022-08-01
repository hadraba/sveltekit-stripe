let formatSize = {
  width: 2480,
  height: 3508
} //A4 without bleed

//let initialPlaces = [[211, 2198], [971, 751], [1235, 918], [899, 2002], [1055, 1946], [1421, 1871], [1673, 1946], [1292, 2114], [1444, 2114], [1378, 2296], [1556, 2254], [1702, 2198], [1785, 2610], [1929, 2438], [2190, 2370], [1963, 2594], [2168, 2757]];
let initialPlaces = [
[1686, 300, 2, "Shiner"],
[1850, 590, 1, "Foxy"],
[300, 1500, 3, "Guinness"],
[790, 1735, 2, "Chance"],
[2000, 3000, 5, "Chester"],
[1616, 1404, 1, "Zoe"],
[2120, 1630, 1, "Thor"],
[2310, 1900, 1, "Dolce"],
[1412, 1544, 1, "Rudy"],
[1299, 1905, 1, "Ella"],
[980, 1920, 1, "Zeus"],
[928, 2225, 3, "Maggie"],
[1480, 2135, 3, "Bentley"],
[1900, 1950, 3, "Ava"],
[1126, 2280, 2, "Jeter"],
[2210, 2206, 2, "Emma"],
[1270, 2500, 1, "Stella"],
[1944, 2290, 1, "Roxie"],
[1940, 2620, 1, "Lilly"],
[2130, 2522, 1, "Nina"],
[2320, 2590, 1, "Riley"],
[2268, 2758, 1, "Sydney"],
[1534, 3020, 1, "Mickey"],
[2330, 3180, 1, "Rocco"],
[1120, 1620, 4, "Brandy"],
]
let initialStrokeWidth = 148;
let minTouchArea = 40;
let showPoints = true;

let scaler = 1; //scales everything so it has the same proportion
let margin = 20;

let hoveringSize = 0;
let frame = 0;
let rng;
let ballNormal;
let ballLit;

let shirtColors = ["#111111", "#f5f5f5", "#FEB52A"];
let activeShirtColor = 0;

let strokeColorBg = ["#2157ff", "#ffcd6d", "#e64c82"];
let activeStrokeColor = 0;

let checkboxes = [];

let rotationX = 0;
let rotationY = 0;

let activeStrokeStyle = 0;
let dragging = false;
let strokeWidth = 0;

let canvasSize = {
  width: 0,
  height: 0
}

let draggingInitiated = false;

let camera;


//generate, preview, printing
//showMode = "generate";

function preload() {
  ballNormal = [];
  ballLit = [];
  for(let i = 0; i < 25; i++) {
    //ballNormal.push(loadImage(`img/negative/${i+1}.png`));
    ballNormal.push(loadImage(`img/normal/${i+1}.jpg`));
  }
  for(let i = 0; i < 25; i++) {
    ballLit.push(loadImage(`img/lit/${i}.jpg`));
  }
}

function setup() {
  canvasSize = initializeCanvasDimensions(formatSize);
  createCanvas(canvasSize.width, canvasSize.height);
  
  

  //INIT CONTROLS – works with Svelte ui and variables outside these documents
  scriptLoaded = true;


  for(let i = 1; i <= 25; i++) {
    let checkbox = document.getElementById("ch" + i);
    checkbox.addEventListener('change', (event) => {
      updateURLParams();
    });
    checkboxes.push(checkbox);
  }

  if(showMode === "generate") {
    let resetter = document.getElementById("resetter");
    resetter.addEventListener('click', (event) => {
      resetView();
    });
    let randomizer = document.getElementById("randomizer");
    randomizer.addEventListener('click', (event) => {
      randomView();
    });
    let save = document.getElementById("save");
    save.addEventListener('click', (event) => {
      exportHighResolution();
    });
  }
  //END OF INIT CONTROLS

  readURLParams(window.location.search);
  frameRate(24);

  if(!rng) {
    rng = createRandomSeed();
  }
 
  camera = {
    x: formatSize.width/2,
    y: formatSize.height/2,
    z: -4044,
    rx: 0,
    ry: 0,
    rz: 0,
  }
}

function draw() {
  if(showMode === "generate") {
    cursor("grab");
  } else {
    cursor("draw");
  }
  blendMode(BLEND);
  Math.seedrandom(rng);
  background(shirtColors[activeShirtColor]);
  fill(strokeColorBg[activeStrokeColor]);
  noStroke();

  let firstOverflowing = false;
  for(let i = 0; true; i++) {
    let balls = [];
    initialPlaces.forEach((element) => {
      let p2d; let p2dS; let scale;
      let rotated = rotatePointAroundOtherPoint(element[0], element[1], 0, formatSize.width/2, formatSize.height/2, 0, 0, rotationX, rotationY)
      p2d = projectToPlane(camera, rotated.x, rotated.y, rotated.z);
      p2dS = projectToPlane(camera, rotated.x + 2, rotated.y, rotated.z);
      scale = (p2dS.x - p2d.x) * strokeWidth/1.5 * element[2];
      balls.push([p2d.x * scaler, p2d.y * scaler, scale]);
    }); 
    
    let overflowing = false;

    if(dragging) {
      balls.forEach((element) => {
        if(isOverflowing(element[0],element[1],element[2])) {
          overflowing = true;
          if(i === 0) {
            firstOverflowing = true;
          }
        };
      });

      if(firstOverflowing === false && overflowing === false) {
        camera.z++;
        continue;
      }

      if(firstOverflowing === true && overflowing === true) {
        camera.z--;
        continue;
      }
    }

    balls.forEach((element, index) => {
      blendMode(SCREEN);
      let random = getRandomInt(0, 24);
      if(checkboxes[index].checked) {   
        image(ballLit[random], element[0] - element[2]/2, element[1] - element[2]/2, element[2], element[2]);
      } else {
        image(ballNormal[index], element[0] - element[2]/2, element[1] - element[2]/2, element[2], element[2]);
      }
    });
    break;
  }

  frame++;
  dragging = false;
}


function rotatePointAroundOtherPoint(px, py, pz, ox, oy, oz, ax, ay, az) {
  //substract the pivot point
  let nx = px - ox;
  let ny = py - oy;
  let nz = pz - oz;

  let A = [[cos(ax), -sin(ax), 0],
           [sin(ax), cos(ax), 0],
           [0, 0, 1]];
  let B = [[cos(ay), 0, -sin(ay)],
           [0, 1, 0],
           [sin(ay), 0, cos(ay)]];
  let C = [[1, 0, 0],
           [0, cos(az), -sin(az)],
           [0, sin(az), cos(az)]];

  let D = [[nx], [ny], [nz]];

  let res = matrixMul(matrixMul(matrixMul(A,B),C),D);

  //add the pivot point back
  return createVector(res[0][0] +ox, res[1][0]+oy, res[2][0] +oz);
}

function isOverflowing(x,y,scale) {
  if(x-scale/2 <= 0 || y-scale/2 <= 0) {
    return true;
  }
  if(x+scale/2 >= width || y+scale/2 >= height) {
    return true;
  }
  return false;
}

function projectToPlane(camera, ax, ay, az) {
  let cx = camera.x;
  let cy = camera.y;
  let cz = camera.z;

  //the display surface's position relative to the camera pinhole C
  let ex = formatSize.width/2; let ey = formatSize.height/2; let ez = 1/(4000);

  let x = ax - cx;
  let y = ay - cy;
  let z = az - cz;

  let bx = (ez/z)*x + ex;
  let by = (ez/z)*y + ey;

  bx = (x*formatSize.width)/(z*formatSize.width)/ez + camera.x;
  by = (y*formatSize.height)/(z*formatSize.height)/ez + camera.y;

  return createVector(bx, by);
}

function matrixMul( A, B ) {
  if ( !Array.isArray(A) && !Array.isArray(B) ) throw Error( 'No matrices to multiply' );
  if ( !Array.isArray(A) ) A = identity( B.length, A );
  if ( !Array.isArray(B) ) B = identity( A[0].length, B );
  if ( A[0].length !== B.length ) throw Error( 'Incompatible matrices to multiply' );

  var C = matrix( A.length, B[0].length, 0 );

  for ( var i = 0 ; i < A.length ; i++ )
    for ( var j = 0 ; j < B[0].length ; j++ )
      for ( var k = 0 ; k < A[0].length ; k++ )
        C[i][j] = add( C[i][j], mul( A[i][k], B[k][j] ) );

  return C;

}

function matrix( rows, columns, value=0 ) {

  var columns = columns || rows;

  var m = [];
  for ( var i = 0 ; i < rows ; i++ ) {
    m.push( [] );
    for ( var j = 0 ; j < columns ; j++ ) m[i].push( value );
  }

  return m;

}

function add( x, y ) {

  if ( arguments.length > 2 ) {

    var z = add( x, y );
    for ( var i = 2 ; i < arguments.length ; i++ ) z = add( z, arguments[i] );
    return z; 

  }

  if ( isComplex(x) || isComplex(y) ) {

    if ( !isComplex(x) ) x = complex(x);
    if ( !isComplex(y) ) y = complex(y);

    return { re: x.re + y.re, im: x.im + y.im };

  }

  return x + y;

}

function mul( x, y ) {

  if ( arguments.length > 2 ) {

    var z = mul( x, y );
    for ( var i = 2 ; i < arguments.length ; i++ ) z = mul( z, arguments[i] );
    return z; 

  }

  if ( isComplex(x) || isComplex(y) ) {

    if ( !isComplex(x) ) x = complex(x);
    if ( !isComplex(y) ) y = complex(y);

    return { re: x.re * y.re - x.im * y.im,
             im: x.im * y.re + x.re * y.im };

  }

  return x * y;

}

function isComplex( x ) { return typeof x === 'object' && 're' in x; }