var survivalTime=0;
var monkey,monkey_running
var banana,bananaImage,obstacle,obstacleImage
var FoodGroup,obstacleGroup
var score
var gameState="play"

function preload(){
monkey_running =  
loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  

  
  bananaImage=loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
 
}



 function setup() {
 createCanvas(600,400) 
 monkey=createSprite(80,340,20,20)
 monkey.addAnimation("moving",monkey_running);
 monkey.scale=0.1
 
 ground=createSprite(300,380,600,20)
 obstacleGroup=createGroup()
 foodGroup=createGroup()
}


function draw() {
background("lightblue");
if(gameState==="play"){
if(ground.x<0){
ground.x=ground.width/2
}
if(keyDown("space")){
monkey.velocityY=-10  
}
monkey.velocityY=monkey.velocityY+1
spawnobstacle()

spawnfood()
if(monkey.isTouching(foodGroup)){
foodGroup.destroyEach()
score=score+1
}
if(monkey.isTouching(obstacleGroup)){
gameState="end"
}
}
else if(gameState==="end"){
monkey.velocityY=0
foodGroup.setVelocityXEach(0)
obstacleGroup.setVelocityXEach(0)

stroke("white");
textSize(20);
fill("white");
text("Score" + score, 500,500);
  
stroke("black");
textSize(20);
fill("black");
survivalTime=Math.ceil(frameCount/frameRate())
 text("Survival Time: "+ survivalTime,100,50) 
}

monkey.collide(ground)
drawSprites();
}

function spawnobstacle(){

if(frameCount%150===0){
obstacle=createSprite(600,350,50,50)
obstacle.addImage(obstacleImage)
obstacle.velocityX=-3
obstacle.scale=0.1
obstacle.lifetime=200
obstacleGroup.add(obstacle)
}
  
}

function spawnfood(){
if(frameCount%80===0){
banana=createSprite(600,random(150,300),50,50)
banana.addImage(bananaImage)
banana.velocityX=-3
banana.scale=0.1
banana.lifetime=200
foodGroup.add(banana)
}
}