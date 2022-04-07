var mapa;
var personagem1;
var maca;
var macaImg;
var textbox;
var textboxImg;
var txtinteragirmaca = "Pressione E para comer ou Q para guardar.";
var comendoSom;
var macaInv = null;
var house;
var porta;
var casa1Dentro = false;

function preload(){

  mapa = loadImage("images/mapa.png");

  macaImg = loadImage("images/apple.png");

  textboxImg = loadImage("images/textbox.png");
  
  comendoSom = loadSound("sounds/comendo.mp3");

  house = loadImage("images/house.png");
}

function setup(){
  createCanvas(600,400);
 
  personagem1 = createSprite(300,200, 10,10);
  personagem1.shapeColor = "red";

  maca = createSprite(695,140);
  maca.addImage(macaImg);
  maca.scale = 0.02;

  textbox = createSprite(maca.x, maca.y - 70);
  textbox.addImage(textboxImg);
  textbox.visible = false;
  textbox.scale = 0.23

  porta = createSprite(488,163,14,15);
  porta.shapeColor = "black";
}

function draw(){
  background('black');
  image(mapa,0,0);

  controles();

  if(personagem1.x > 980){
    camera.x = 980;
  }else if(personagem1.x < 300){
    camera.x = 300;
  }else{
    camera.x = personagem1.x;
  }

  if(personagem1.y < 200){
    camera.y = 200;
  }else if(personagem1.y > 760){
    camera.y = 760;
  }else{
    camera.y = personagem1.y
  }

  if(personagem1.x > 1275){
    personagem1.x = 1275;
  }

  if(personagem1.x < 5){
    personagem1.x = 5;
  }

  if(personagem1.y < 5){
    personagem1.y = 5;
  }

  if(personagem1.y > 955){
    personagem1.y = 955;
  }

  if(personagem1.isTouching(porta) && keyDown("e")){

    casa1Dentro = true;
    }
  
  if(casa1Dentro === true){
    mapaCasa1();  
    }
  
  
  drawSprites();

  if(personagem1.isTouching(maca)){
     textbox.visible = true;
     fill("black");
     text(txtinteragirmaca, textbox.x - 110, textbox.y + 5)
    
     if(keyDown("e")){
      maca.destroy();
      comendoSom.play(); 
     }else if(keyDown("q") && macaInv === null){
       macaInv = createImg("images/apple.png");
       macaInv.position (camera.x - 200, camera.y + 150);
       macaInv.size(20,20);
       maca.destroy();

       console.log(macaInv);
      }
  }else{
    textbox.visible = false
  }

  if(macaInv != null){
  macaInv.mouseClicked(comer);
  } 


}

function controles(){

  if(keyDown("w")){
    personagem1.y -= 5;
    console.log("y =" + personagem1.y);
  
  }

  if(keyDown("s")){
    personagem1.y += 5;
    console.log("Y =" + personagem1.y);
  }

  if(keyDown("a")){
    personagem1.x -= 5;
    console.log("X =" + personagem1.x);
  }

  if(keyDown("d")){
    personagem1.x += 5;
    console.log("X =" + personagem1.x);
  }
}

function comer(){
  comendoSom.play();
  //macaInv = null;
  macaInv.hide();
}

function mapaCasa1(){
  clear();
  background('black')
  imageMode(CENTER);
  image(house,500,160);
  porta.visible = false;
  maca.visible = false;
}