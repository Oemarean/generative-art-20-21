/* 👇 Start writing your p5.js code here */

let sizewidth = 25
let sizeheight = 25
function setup() {
  createCanvas(sizewidth*30, sizeheight*30);
}

function draw() {
  background(255);
  for(y = 0; y < sizeheight; y++){
    for(x = 0; x < sizewidth; x++){
      if(getItem(x + ":" + y) == null){
          storeItem(x + ":" + y, false)
        }
      if(getItem(x + ":" + y) == true){
        fill(155,0,0)
      }
      rect(x*30, y*30, 30, 30)
      noFill()
    }
  }
}

function mouseClicked(){
  for(y = 0; y < sizeheight; y++){
    for(x = 0; x < sizewidth; x++){
      if(mouseX < x*30+30 && mouseX > x*30 && mouseY < y*30+30 && mouseY > y*30){
          storeItem(x + ":" + y, true)
      }
    }
  }
}

function keyTyped(){
  if(key == " "){
    clearStorage()
  }
  if(key == "a"){
    for(y = 0; y < sizeheight; y++){
      for(x = 0; x < sizewidth; x++){
        if(mouseX < x*30+30 && mouseX > x*30 && mouseY < y*30+30 && mouseY > y*30){
          storeItem(x + ":" + y, false)
        }
      }
    }
  }
}
