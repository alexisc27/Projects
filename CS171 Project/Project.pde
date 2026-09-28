import java.util.Random;

PImage scene, boat, bottle, straw, leftfish, rightfish; // Variable to store information about an image

//This is to be able to put x-axis and y-axis for each image
int boat_x, boat_y;
int bottle_x, bottle_y;
int bottle1_x, bottle1_y;
int straw_x, straw_y;
int straw1_x, straw1_y;
int leftfish_x, leftfish_y;
int rightfish_x, rightfish_y;
int score, lives;


void setup() // Entry point (start of program), runs once
{
 size(1062,750,P2D); // Create a Window, must be same size as scene
 scene = loadImage("background2.bmp"); // load image and data into scene data structure
 boat = loadImage("boat2.png");
 bottle=loadImage("waterbottle.png");
 straw=loadImage("straw.png");
 leftfish=loadImage("leftfish.png");
 rightfish=loadImage("rightfish.png");
 
 //The score and lives count
 score=0;
 lives=3;
 
 
 textureMode(NORMAL);
 blendMode(BLEND);
 noStroke();
 
 
 //The x-axis and y-axis of each object
 boat_x=200;
 boat_y=400;
 
 bottle_x=550;
 bottle_y=650;
 
 bottle1_x=900;
 bottle1_y=570;
 
 straw_x=450;
 straw_y=660;
 
 straw1_x=150;
 straw1_y=560;
 
 leftfish_x=0;
 leftfish_y=580;
 
 rightfish_x=1062;
 rightfish_y=680;
 
}
void draw()
{
 background(scene); // Display background image referenced by scene
 
 pushMatrix(); // Store current location of origin (0,0)
 translate(boat_x,boat_y); // Change origin (0,0) for drawing to (drop_x,drop_y)
 beginShape(); // Open graphics pipeline
 texture(boat); // Tell GPU to use drop to texture the polygon
 vertex( -300, -300, 0, 0); // Load vertex data (x,y) and (U,V) texture data into GPU
 vertex(300, -300, 1, 0); // Square centred on (0,0) of width 40 and height 40
 vertex(300, 300, 1, 1); // Textured with an image of a drop
 vertex( -300, 300, 0, 1);
 endShape(CLOSE); // Tell GPU you have loaded shape into memory.
 popMatrix(); 
 
 pushMatrix(); // Store current location of origin (0,0)
 leftfish_x=leftfish_x + 6;
 translate(leftfish_x,leftfish_y); // Change origin (0,0) for drawing to (drop_x,drop_y)
 beginShape(); // Open graphics pipeline
 texture(leftfish); // Tell GPU to use drop to texture the polygon
 vertex( -80, -80, 0, 0); // Load vertex data (x,y) and (U,V) texture data into GPU
 vertex(80, -80, 1, 0); // Square centred on (0,0) of width 40 and height 40
 vertex(80, 80, 1, 1); // Textured with an image of a drop
 vertex( -80, 80, 0, 1);
 endShape(CLOSE); // Tell GPU you have loaded shape into memory.
 popMatrix();
 
 //Makes the fish go back to the start when reaching the end of the screen
 if (leftfish_x >=1062)
 {
   leftfish_x=0;
 }
 
 pushMatrix(); // Store current location of origin (0,0)
 rightfish_x=rightfish_x - 6;
 translate(rightfish_x,rightfish_y); // Change origin (0,0) for drawing to (drop_x,drop_y)
 beginShape(); // Open graphics pipeline
 texture(rightfish); // Tell GPU to use drop to texture the polygon
 vertex( -60, -60, 0, 0); // Load vertex data (x,y) and (U,V) texture data into GPU
 vertex(60, -60, 1, 0); // Square centred on (0,0) of width 40 and height 40
 vertex(60, 60, 1, 1); // Textured with an image of a drop
 vertex( -60, 60, 0, 1);
 endShape(CLOSE); // Tell GPU you have loaded shape into memory.
 popMatrix();
 
 //Makes the fish go back to the start when reaching the end of the screen
 if (rightfish_x <=0)
 {
   rightfish_x=1062;
 }
 
 //The score 
 textSize(30);
 fill(0,0,0);
 text("Score:"+score, 60, 100);
 
 //The lives
 textSize(30);
 fill(0,0,0);
 text("Lives:"+lives, 700, 100);
 
 
 //When theres no lives the game ends
 if (lives < 1)
 {
   textSize(100);
   textAlign(CENTER, CENTER);
   text("Game Over",562, 450);
 }
 
 // Calculate random shake for x and y positions
 float xShake = random(-2, 2);  // Adjust the range based on the desired shaking speed
 float yShake = random(-2, 2);



  // Draw the image with shake
 image(bottle, (bottle_x + xShake) + 2, bottle_y + yShake);
 image(bottle, (bottle1_x + xShake) + 2, bottle1_y + yShake);
 
 image(straw, (straw_x + xShake) + 2, straw_y + yShake);
 image(straw, (straw1_x + xShake) + 2, straw1_y + yShake);
}

//This gives each object a hitbox so they can be dragged
void mouseDragged()
{
  if (mouseX > bottle_x-50 && mouseX<bottle_x+50)
  {
    if (mouseY > bottle_y-50 && mouseY<bottle_y+50)
    {
      bottle_x=mouseX;
      bottle_y=mouseY;
    }
  }
  
  if (mouseX > bottle1_x-50 && mouseX<bottle1_x+50)
  {
    if (mouseY > bottle1_y-50 && mouseY<bottle1_y+50)
    {
      bottle1_x=mouseX;
      bottle1_y=mouseY;
    }
  }
  
  if (mouseX > straw_x-50 && mouseX<straw_x+50)
  {
    if (mouseY > straw_y-50 && mouseY<straw_y+50)
    {
      straw_x=mouseX;
      straw_y=mouseY;
    }
  }
  
  if (mouseX > straw1_x-50 && mouseX<straw1_x+50)
  {
    if (mouseY > straw1_y-50 && mouseY<straw1_y+50)
    {
      straw1_x=mouseX;
      straw1_y=mouseY;
    }
  }
  
  if (mouseX > leftfish_x-50 && mouseX<leftfish_x+50)
  {
    if (mouseY > leftfish_y-50 && mouseY<leftfish_y+50)
    {
      leftfish_x=mouseX;
      leftfish_y=mouseY;
    }
  }
  
  if (mouseX > rightfish_x-50 && mouseX<rightfish_x+50)
  {
    if (mouseY > rightfish_y-50 && mouseY<rightfish_y+50)
    {
      rightfish_x=mouseX;
      rightfish_y=mouseY;
    }
  }
}

// this determines where the object gets dropped and what happens when it does
void mouseReleased()
{
  if (bottle_x >= boat_x-100 && bottle_x <= boat_x+100 && bottle_y >= boat_y-150 && bottle_y <= boat_y+150)
  {
    bottle_x=550; bottle_y=650;
    score++;
  }
  else if (bottle_y != 650)
  {
    bottle_x=550; bottle_y=650;
  }
  
  
  
  if (bottle1_x >= boat_x-100 && bottle1_x <= boat_x+100 && bottle1_y >= boat_y-150 && bottle1_y <= boat_y+150)
  {
    bottle1_x=900; bottle1_y=570;
    score++;
  }
  else if (bottle_y != 570)
  {
    bottle1_x=900; bottle1_y=570;
  }
  
  
  
  if (straw_x >= boat_x-100 && straw_x <= boat_x+100 && straw_y >= boat_y-150 && straw_y <= boat_y+150)
  {
    straw_x=450; straw_y=660;
    score++;
  }
  else if (straw_y != 660)
  {
    straw_x=450; straw_y=660;
  }
  
  
  
  if (straw1_x >= boat_x-100 && straw1_x <= boat_x+100 && straw1_y >= boat_y-150 && straw1_y <= boat_y+150)
  {
    straw1_x=150; straw1_y=560;
    score++;
  }
  else if (straw1_y != 560)
  {
    straw1_x=150; straw1_y=560;
  }
  
  
  if (straw_x >= boat_x-100 && straw_x <= boat_x+100 && straw_y >= boat_y-150 && straw_y <= boat_y+150)
  {
    straw_x=450; straw_y=660;
    score++;
  }
  else if (straw_y != 660)
  {
    straw_x=450; straw_y=660;
  }
  
  
  
  if (leftfish_x >= boat_x-100 && leftfish_x <= boat_x+100 && leftfish_y >= boat_y-150 && leftfish_y <= boat_y+150)
  {
    leftfish_x=0; leftfish_y=580;
    lives--;
  }
  else if (leftfish_y != 580)
  {
    leftfish_x=0; leftfish_y=580;
  }
  
  
  
  if (rightfish_x >= boat_x-100 && rightfish_x <= boat_x+100 && rightfish_y >= boat_y-150 && rightfish_y <= boat_y+150)
  {
    rightfish_x=1062; rightfish_y=680;
    lives--;
  }
  else if (rightfish_y != 680)
  {
    rightfish_x=1062; rightfish_y=680;
  }
}
  

  
