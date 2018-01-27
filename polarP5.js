var O;//center for polar axes
var C;//center for cartesian axes
var screenWidth = 1280; 
var screenHeight = 720;
var padding = screenHeight/20;
var buttonWidth = screenWidth / 10;
var buttonHeight = screenHeight / 15;
var t = 0;
var increment = 0.003;
var RadiusPoint = 6;
var whichCurve = -1;
//var name = ["cardioid", "circleX"];
//var name =[];// 
//name[0] = "cardioid";
//name[1] = "circle";


//var f;
//function preload() {
//f = loadFont('assets/AvenirNextLTPro-Demi.otf');
//}

function setup() {
  createCanvas(1280, 720);
  O = createVector(width-width/4, height/2);
  C = createVector(width/4, height/2);
background(0);
  drawAxes();
    drawTitles();
  drawButtons(255, -1);
  //console.log(name);
  //create object Ball
  //B = new Ball(20, 20, 20);
}

function draw() {
  var name = ["cardioid", "circleX", "circleY","limacon", "spiral", "flower3", "flower7", "flowerX"];
  //B.update(mouseX, mouseY);
  //B.display();
    if (mouseIsPressed) {
    increment = 0.006;
  } else {
    increment = 0.003;
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
  noStroke();
  curve = new PolarCurvesList( curveChosen);
  curve.update(t);
  //curve.display();
  var radiusPoint = 6;
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
  stroke(255, 50);
  line(0, 0, curve.x, -curve.y);
}

function drawVectorCartesian() {
  stroke(255, 30);
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