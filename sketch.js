var balloon,balloonImage1,balloonImage2;
var database
var position

function preload(){
   bg =loadImage("cityImage.png");
   //balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon2.png",
   "hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.scale=0.5;
  var ballonPosition = database.ref("Ballon/Position")
  ballonPosition.on("value",readPosition,showError)
 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
      writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(+1,0);
  }
    else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,-1);

  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,+1);
  }

  drawSprites();
}
function readPosition(data){
  position = data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function writePosition(x,y){
  database.ref("Ballon/Position").set({
      "x":position.x + x, 
      "y":position.y + y 
  })
}
function showError(){
  console.log("error")
}

