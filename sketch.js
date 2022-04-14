var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;

var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg, tornadoImage, windImage;

var redBubbleGroup, redBubbleGroup, bulletGroup, bubbleGroup;


var life =3;
var score=0;
var gameState=1


function preload(){
  gunImg = loadImage("gun1.png")
  tornadoImage = loadImage("tornado.png")
  windImage = loadImage("wind.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  windGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");

}

function draw() {
  resizeWindowWidthandWindowHeight();
  background("#BDA297");
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    gun.y=mouseY  

    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    if(keyDown("space")){
      shootWind();
    }

    if (blueBubbleGroup.collide(backBoard)){
      handleGameover(blueBubbleGroup);
    }
    
    if (redBubbleGroup.collide(backBoard)) {
      handleGameover(redBubbleGroup);
    }
    
    /*if(blueBubbleGroup.(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }*/

    if(blueBubbleGroup.collide(windGroup)){
      handleBubbleCollision();
    }
    
    /*if(blueBubbleGroup.collide()){
      handleBubbleCollision(blueBubbleGroup);
    }*/
    
    /*if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }*/

    if(redBubbleGroup.collide(windGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    drawSprites();
  }
    
  
}

function drawblueBubble(){
  bluebubble = createSprite(windowWidth,random(windowHeight),100,100);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}
function drawredBubble(){
  redbubble = createSprite(windowWidth,random(windowHeight),100,100);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);

}

function shootWind(){
  wind= createSprite(150, width/2, 100,100)
  wind.y= gun.y-20
  wind.addImage(windImage)
  wind.scale=0.12
  wind.velocityX= 7
  windGroup.add(wind);
}

function handleBubbleCollision(redBubbleGroup){
    if (life > 0) {
       score=score+1;
    }

    tornado= createSprite(bullet.x+60, bullet.y, 50,50);
    torando.addImage(tornadoImage);

    /* blast= sprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) */

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.add(blastImg) */

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    image(blastImg) */
    
    tornado.scale=0.3
    tornado.life=20
    bulletGroup.destroyEach();
    redBubbleGroup.destroyEach();
}

function handleBubbleCollision(blueBubbleGroup){
  if (life > 0) {
     score=score+1;
  }

  tornado= createSprite(wind.x+60, wind.y, 50,50);
  tornado.addImage(tornadoImage);

  /* blast= sprite(bullet.x+60, bullet.y, 50,50);
  blast.addImage(blastImg) */

  /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
  blast.add(blastImg) */

  /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
  image(blastImg) */
  
  tornado.scale=0.3
  tornado.life=10;
  windGroup.destroyEach();
}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
}

function resizeWindowWidthandWindowHeight(){
  resizeCanvas(windowWidth, windowHeight);
}