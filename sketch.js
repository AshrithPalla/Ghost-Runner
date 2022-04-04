var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();

  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.25;

  spookySound.loop();
}

function draw() {
  background(0);
 
  if(gameState == "play") {
    //infinite scrolling tower.
    if(tower.y > 400){
      tower.y = 300
    }

    spawnDoorsNRailings();

    if(keyDown("space")) {
      ghost.velocityY = -5;
    }

    if(keyDown("right_arrow")) {
      ghost.x = ghost.x+3;
    }

    if(keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }

    //gravity effect
    ghost.velocityY = ghost.velocityY + 0.8;

    if(ghost.y > 600) {
      gameState = "end";
    }

    drawSprites();
  }

  if(gameState == "end") {
      background(0);
      ghost.destroy();
      textSize(30);
      fill("yellow");
      text("GAME OVER!", 220, 300)
  }

  
}

function spawnDoorsNRailings() {
  if(frameCount % 200 === 0) {
    door = createSprite(200, -50);
    door.addImage(doorImg);
    door.velocityY = 2;
    door.x = Math.round(random(100,500));

    //s = d/t lifetime = 700/2
    door.lifetime = 350;

    door.scale = 0.5;

    //grouping 
    doorsGroup.add(door);

    climber = createSprite(200, -15);
    climber.addImage(climberImg);
    climber.velocityY = door.velocityY;
    climber.x = door.x;

    climber.lifetime = door.lifetime;

    climbersGroup.add(climber);
    
    climber.scale = door.scale;

    ghost.depth = door.depth;
    climber.depth = door.depth;
    ghost.depth = ghost.depth + 1;
  }
}

