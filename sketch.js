var bgSprite,bgImage;
var player,playerImage;
var bullet, bulletImage;
var enemy,enemyImage;
var meteor, meteorImage;
var obstacleGroup;
var totalBullets = 50;
var bulletGroup;
var life = 3;
var currentlife = 3;

function preload(){
      //Load the images
      bgImage = loadImage("Images/bg2.jpg");
      playerImage = loadImage("Images/spaceship.png");
      bulletImage = loadImage("Images/bullet.png");
      enemyImage = loadImage("Images/enemy spaceship.png");
      meteorImage = loadImage("Images/meteor.png")

}
  
function setup(){

    createCanvas(windowWidth,windowHeight);
    //Create bg and add velocity to it 
    bgSprite = createSprite(windowWidth/2,windowHeight/2,50,50);
    bgSprite.addImage(bgImage);
    bgSprite.scale = 0.7;
    bgSprite.velocityX = -3;
    //Create player and add image
    player = createSprite(100,windowHeight-50,10,20);
    player.setCollider("circle", 0, -3, 110);    
    player.addImage(playerImage);
    player.scale = 0.5;

    obstacleGroup = new Group();

    bulletGroup = new Group();

}

function draw(){
      //Background should not end
      if (bgSprite.x<100){
          bgSprite.x = windowWidth/2;
      }

      //Add movement keys to the player
      if (keyDown("UP_ARROW")){
          player.y = player.y-7;
      }

      if (keyDown("DOWN_ARROW")){
          player.y = player.y+7;
      }

      //Set a boundary for the player
      if (player.y<0){
          player.y = 30;
      }

      if (player.y>windowHeight){
          player.y = windowHeight-30;
      }

      //Create bullet
      if (keyWentDown("space")){
          bullet = createSprite(player.x + 75,player.y-2,10,10);
          bullet.addImage(bulletImage);
          player.depth = bullet.depth + 1;
          bullet.velocityX = 10;
          bullet.scale = 0.1;
          bullet.lifetime = 250;
          bullet.setCollider("circle", 25, 10, 150);
          bulletGroup.add(bullet);
          totalBullets = totalBullets - 1 ;          
      }      

      spawnObstacles();

      obstacleGroup.overlap(bulletGroup,destroyEnemy);

      obstacleGroup.overlap(player,handlePlayerLife);
    
      drawSprites();

      displayScore();

  
}

function spawnObstacles(){
    //Spawn enemy spaceships
    if (frameCount % 80 === 0 ){
        var obstacle = createSprite(windowWidth,Math.round(random(100,windowHeight-100)),20,20);
        obstacle.setCollider("circle", -100, 0, 500);
        var r = Math.round(random(1,2));
        switch(r){
            case 1 : obstacle.addImage(enemyImage);
            break ; 
            case 2 : obstacle.addImage(meteorImage);
            break ;
            default : obstacle.addImage(enemyImage);
            break ;

        }
        
        obstacle.scale = 0.1;
        player.depth = obstacle.depth + 1 ;
        obstacle.velocityX = -5;
        obstacle.lifetime = 350;
        obstacleGroup.add(obstacle);
    }
}

function destroyEnemy(obstacle,bullet){
         obstacle.destroy();
         bullet.destroy();
         totalBullets = totalBullets + 1 ;
}

function handlePlayerLife(obstacle,player){
         currentlife = currentlife - 1;
         obstacle.destroy();
}

function displayScore(){
         text(textSize(30));
         fill("cyan");
         text("Bullets = "+totalBullets,displayWidth-200,40);         
         text("Lives = "+currentlife,displayWidth-165,90);
         
}

