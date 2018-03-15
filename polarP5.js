var O;//center for polar axes
var C;//center for cartesian axes
var screenWidth = 1280; 
var screenHeight = 720;
var padding = screenHeight/20;
var buttonWidth = screenWidth / 10;
var buttonHeight = screenHeight / 15;
var t = 0;
var increment = 0.006;
var radiusPoint = 4;
var whichCurve = -1;

var img = [];
//var name = ["cardioid", "circleX"];
//var name =[];// 
//name[0] = "cardioid";
//name[1] = "circle";


//var f;
//function preload() {
//f = loadFont('assets/AvenirNextLTPro-Demi.otf');
//}

function setup() {
  canvas = createCanvas(1280, 720);
canvas.position(50,130);
  O = createVector(width-width/4, height/2);
  C = createVector(width/4, height/2);
background(0);
  drawAxes();
    drawTitles();
  drawButtons(255, -1);
  img[0] = loadImage("cardioid.jpg");
  img[1] = loadImage("circleX.jpg");
  img[2] = loadImage("circleY.jpg");
  img[3] = loadImage("limacon.jpg");
  img[4] = loadImage("spiral.jpg");
  img[5] = loadImage("flower3.jpg");
  img[6] = loadImage("flower7.jpg");
  img[7] = loadImage("flowerX.jpg");
  //var img = [img_cardiod, img_circleX];
  //console.log(name);
  //create object Ball
  //B = new Ball(20, 20, 20);
}

function draw() {
  //image(img, 0, height/2, img.width/2, img.height/2);
  var name = ["cardioid", "circleX", "circleY","limacon", "spiral", "flower3", "flower7", "flowerX"];
  //B.update(mouseX, mouseY);
  //B.display();
    if (mouseIsPressed) {
    increment = 0.008;
  } else {
    increment = 0.006;
  }
    if (t>2*PI) {
    increment = 0;
  }
  t =t + increment;
  var curveChosen;
  if (whichCurve < 0 || whichCurve > name.length) {
    curveChosen = "default";
  } else {

    curveChosen = name[whichCurve];
    //println(curveChosen);
  }
  //var curveChosen = "cardioid";
  fill(255, 255-255/(2*PI)*t, 0);
  //if((t> PI-increment && t < PI+increment*8) || (t> PI/2-increment && t < PI/2+increment*3)|| (t> 3*PI/2-increment && t < 3*PI/2+increment*3)) {
    //fill(0);
  //} else {
  //fill(255, 255-255/(2*PI)*t, 0);
  //}
  noStroke();
  curve = new PolarCurvesList( curveChosen);
  curve.update(t);
  //curve.display();
  
  push();
  translate(O.x, O.y);
  ellipse(curve.x, -curve.y, radiusPoint, radiusPoint );
  drawVector();
  pop();
  push();
  translate(C.x, C.y);
  //yC= -yC; //reorder the axes
  //the if statement is so that it doesn't draw y=0 when in default mode
  if(curveChosen == "default"){
    ellipse(0, -curve.yC, radiusPoint, radiusPoint );
  } else{
  ellipse(curve.xC, -curve.yC, radiusPoint, radiusPoint );
  drawVectorCartesian();
  }
  pop();
}

function drawVector() {
  
  if(t> PI/2-increment*3 && t < PI/2+increment*3){
    //stroke(155, 40, 10);
    stroke(51, 150, 255);
    //maybe draw a thin rectangle instead of a line
  } else if(t> PI-increment*3 && t < PI+increment*3) {
    stroke(51, 150, 255);
  } else if(t> 3*PI/2-increment*3 && t < 3*PI/2+increment*3) {
    stroke(51, 150, 255);
  } else {
    stroke(255, 40);
  }
  //stroke(100, 255-255/(2*PI)*t, 0);
  line(0, 0, curve.x, -curve.y);
}

function drawVectorCartesian() {
    if(t> PI/2-increment*3 && t < PI/2+increment*3){
    //stroke(155, 40, 10);
    stroke(51, 150, 255);
    //maybe draw a thin rectangle instead of a line
  } else if(t> PI-increment*3 && t < PI+increment*3) {
    //stroke(155, 40, 10);
    stroke(51, 150, 255);
  } else if(t> 3*PI/2-increment*3 && t < 3*PI/2+increment*3) {
    //stroke(155, 40, 10);
    stroke(51, 150, 255);
  } else {
    stroke(255, 40);
  }
  line(curve.xC, 0, curve.xC, -curve.yC);
}

//class
function Ball(centerX, centerY, radius) {
  this.x = centerX;
  this.y = centerY;
  this.r= radius;

  this.update = function (mx, my) {
    this.x = mx;
    this.y=my;
  };

  this.display = function() {
    push();
    translate(this.x, this.y);
    fill(255);
    ellipse(0, 0, this.r, this.r);
    pop();
  };
}

function drawAxes() {
  fill(0);
  noStroke();
  rect(width/4-10, height/20+height/15, width/4+width/2+10, height);
  push();
  // draw graph -- center on origin
  translate(O.x, O.y);
  stroke(255);
  // draw axes
  line(-width/4+width/16, 0, width/4-width/16, 0);
  line(0, height/3, 0, -height/3);
  pop();

  //axes for cartesian plot
  push();
  // draw graph -- center on origin
  translate(C.x, C.y);
  stroke(255);
  // draw axes
  line(0, 0, width/4, 0);
  line(0, height/3, 0, -height/3);
  pop();
}


//function drawButtons (colorBox, selected) {
//var name = ["cardioid", "circleX", "circleY"];
//  for ( var i = 0; i < name.length; i++ ) {
//    fill(255);//resets the fill of rectangles to white
//    if (i == selected) {
//      fill(colorBox);
//    }

//    var xButton =padding;
//    var yButton =  padding+(buttonHeight+padding)*i;
//    //var curve = name[i];
//    button = createButton(name[i]);
//    button.position(xButton, yButton);
//    button.mousePressed(chooseCurve);
//    //rect(xButton, yButton, buttonWidth, buttonHeight );

//    //textFont(f, 16);                  // STEP 3 Specify font to be used
//    //fill(0);                         // STEP 4 Specify font color 
//    //text(name[i], xButton+buttonWidth/4, yButton+buttonHeight/1.5);   // STEP 5 Display Text
//  }
//}



//function chooseCurve() {
//  var curveChosen = 2;
//}



function drawButtons( colorBox,  selected) {
var name = ["cardioid", "circleX", "circleY","limacon", "spiral", "flower3", "flower7", "flowerX"];
  for (var i = 0; i < name.length; i++ ) {
    fill(255);//resets the fill of rectangles to white
    if(i == selected){
      fill(colorBox);
    }
    var xButton =padding;
    var yButton =  padding+(buttonHeight+padding)*i;
    rect(xButton, yButton, buttonWidth, buttonHeight );
    //textFont(f, 16);                  // STEP 3 Specify font to be used
    fill(0);                         // STEP 4 Specify font color 
    text(name[i], xButton+buttonWidth/4, yButton+buttonHeight/1.5);   // STEP 5 Display Text
  }
}

function drawTitles() {

  fill(255);
  var xButton =width/4+width/10;
  var yButton =  padding;
  var xButton2 = width/2+width/5;
  var yButton2 =  padding;
  rect(xButton, yButton, buttonWidth, buttonHeight );
  rect(xButton2, yButton2, buttonWidth, buttonHeight );

  //textFont(f, 16);                  // STEP 3 Specify font to be used
  fill(0);                         // STEP 4 Specify font color 
  text("CARTESIAN", xButton+buttonWidth/8, yButton+buttonHeight/1.5);   // STEP 5 Display Text
  text("POLAR", xButton2+buttonWidth/4, yButton2+buttonHeight/1.5);   // STEP 5 Display Text
}


function mousePressed() {
  var name = ["cardioid", "circleX", "circleY", "limacon", "spiral", "flower3", "flower7", "flowerX"];
  var xButton =padding;
  var isMouseXoverABox = (mouseX > xButton && mouseX <xButton+buttonWidth);
  for (var i = 0; i < name.length; i++ ) {
    var yButton =  padding+(buttonHeight+padding)*i;
    var isMouseYoverABox = (mouseY > yButton && mouseY <yButton+buttonHeight);
    if ( isMouseXoverABox && isMouseYoverABox) {
      whichCurve = i;
      //reset the graph
      drawAxes();
      t=0;
      //highlight the button pressed
      drawButtons(color(255,200,0), i);
      image(img[i], xButton+buttonWidth+2, yButton, buttonWidth, buttonHeight);
    }
  }
}

function PolarCurvesList(name) {
  this.Name = name;
  var scaleRadius = 100;
  this.r = 0;
  this.x = 0;
  this.y = 0;
  this.xC = 0;
  this.yC = 0;

  this.update = function (t1) {
    switch(this.Name){
      case "cardioid": 
      this.r = scaleRadius+scaleRadius*cos(t1);
      break;
      
      case "circleX":
      this.r = 2*(scaleRadius*cos(t1));
      break;
      
      case "circleY":
      this.r = 2*(scaleRadius*sin(t1));
      break;
      
      case "limacon":
      this.r = (scaleRadius/2+scaleRadius*cos(t1));
      break;
      
      case "spiral":
      this.r = scaleRadius/5*t1;   
      break;
      
      case "flower3":
      this.r = scaleRadius*sin(3*t1);      
      break;
      
      case "flower7":
      this.r = scaleRadius*sin(7*t1);      
      break;
      
      case "flowerX":
      this.r = scaleRadius*sin(3*t1/2);
      break;
      
      default: 
      this.r = 0;      
      
    }
    
    this.xC = 50*t;//to make the scale of the x axis not too small
    this.yC = this.r;
    this.x = this.r*cos(t1);
    this.y = this.r*sin(t1);
  };

  this.display = function() {
    fill(255)
    //push();
    //translate(O.x, O.y);
    //this.y= -this.y; //reorder the axes
    ellipse(this.x, this.y, radiusPoint, radiusPoint );
    //drawVector();
    //pop();
  };
}
