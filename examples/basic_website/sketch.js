/**
 *  Author      : Oemar Alkatiri
 *  Date        : 20 juni 2021
 *
 *  sketch.js:
 *  Maakt een raster aan waarin je met de muis de vakken kan
 *  inkleuren, waarbij de kleur zelf wordt gegenereerd gebaseerd op
 *  de slider waardes aan de rechterkant.
 *
 *  Met de pijltjestoetsen kan de canvas bewogen worden, en met de
 *  backspace knop kan de raster worden reset. Hierbij kan het
 *  helemaal blanco worden reset of wordt door kans bepaalde vakken
 *  ingekleurd. De kans is afhankelijk van de onderste slider.
 */


let cnv;

// De grootte van de raster en blokken.
let sizeWidth = 25;
let sizeHeight = 25;
let sizeBlock = 30;

let sizeOffset = 300;

// Initialisatie
function setup() {
  rSlider = createSlider(0, 255, 255);
  rSlider.position(sizeWidth * sizeHeight + 0.5 * sizeOffset, 20);
  gSlider = createSlider(0, 255, 255);
  gSlider.position(sizeWidth * sizeHeight + 0.5 * sizeOffset, 50);
  bSlider = createSlider(0, 255, 255);
  bSlider.position(sizeWidth * sizeHeight + 0.5 * sizeOffset, 80);
  brightSlider = createSlider(-50, 50, 0);
  brightSlider.position(sizeWidth * sizeHeight + 0.5 * sizeOffset, 110);

  randomSlider = createSlider(0, 100, 0);
  randomSlider.position(sizeWidth * sizeHeight + 0.5 * sizeOffset, 140);

  // text wilt niet past een bepaalde punt????? XD
  textSize(32);
  text('red', 60, 35);
  text('green', gSlider.x + 20 + gSlider.width, 65);
  text('blue', bSlider.x + 20 + bSlider.width, 95);


  resetCanvas(rSlider.value(),
              gSlider.value(),
              bSlider.value(),
              brightSlider.value(),
              randomSlider.value());
}


function draw() {
  const r = rSlider.value();
  const g = gSlider.value();
  const b = bSlider.value();
  const bright = brightSlider.value();


  // let vol = mic.getLevel();

  // Get the overall volume (between 0 and 1.0), where anything louder than 0.05 gets picked up
  // if (vol >= 0.05) {
  //   fill(random(255), random(255), random(255), 1);
  //   rect(mouseX, mouseY, sizeBlock, sizeBlock);
  // }

  if (mouseIsPressed === true) {
    fillBox(r,g,b, bright);
    // fillCircle(r,g,b);
  }

}

/**
 *  Maakt een nieuwe canvas aan.
 */
function resetCanvas(valRed, valGreen, valBlue, valBright, valRandom) {
  cnv = createCanvas(sizeWidth * sizeBlock + sizeOffset, sizeHeight * sizeBlock);

  for(y = 0; y < sizeHeight; y++) {
    for(x = 0; x < sizeWidth; x++) {
      if (random(100) > valRandom) {
        fill('white');
        rect(x * sizeBlock, y * sizeBlock, sizeBlock, sizeBlock)
      }
      else {
        fill(adjustBrightness(random(valRed), valBright),
             adjustBrightness(random(valGreen), valBright),
             adjustBrightness(random(valBlue), valBright),
             255);
       rect(x * sizeBlock, y * sizeBlock, sizeBlock, sizeBlock)
      }
    }
  }
}

/**
 *
 */
function keyPressed() {
  if (keyCode === BACKSPACE) {
    resetCanvas(rSlider.value(),
                gSlider.value(),
                bSlider.value(),
                brightSlider.value(),
                randomSlider.value());
}

  if (keyCode === RIGHT_ARROW) {
    moveRight();
  }
  else if (keyCode === LEFT_ARROW) {
    moveLeft();
  }

  if (keyCode === UP_ARROW) {
    moveUp();
  }
  else if (keyCode === DOWN_ARROW) {
    moveDown();
  }
}

/**
 *  Verplaatst alle vakjes met een stap naar rechts.
 */
function moveRight() {
  let prevCol;
  let curCol;

  for(y = 0; y < sizeHeight; y++) {
    for(x = 0; x < sizeWidth; x++) {
      if (x === 0) {
        prevCol = get((sizeWidth - 1) * sizeBlock + 1, y * sizeBlock + 1);
        curCol = get(x * sizeBlock + 1, y * sizeBlock + 1);

        fill(prevCol);
        rect(x, y * sizeBlock, sizeBlock, sizeBlock);
            }
      else {
        prevCol = curCol;
        curCol = get(x * sizeBlock + 1, y * sizeBlock + 1);

        fill(prevCol);
        rect(x * sizeBlock, y * sizeBlock, sizeBlock, sizeBlock);

      }
    }
 }
}

/**
 *  Verplaatst alle vakjes met een stap naar links.
 */
function moveLeft() {
  let prevCol;
  let curCol;
  let temp;

  for(y = 0; y < sizeHeight; y++) {
    for(x = 0; x < sizeWidth - 1; x++) {
      if (x === sizeWidth - 1) {
        fill(curCol);
        rect(x, y, sizeBlock, sizeBlock);
      }
      else {
        prevCol = get(x * sizeBlock + 1, y * sizeBlock + 1);
        curCol = get((x + 1) * sizeBlock + 1, y * sizeBlock + 1);

        temp = prevCol;
        prevCol = curCol;
        curCol = temp;

        fill(prevCol);
        rect(x * sizeBlock, y * sizeBlock, sizeBlock, sizeBlock);

        fill(curCol);
        rect((x + 1) * sizeBlock, y * sizeBlock, sizeBlock, sizeBlock);
      }
    }
  }
}

/**
 *  Verplaatst alle vakjes met een stap naar beneden.
 */
function moveDown() {
  let prevCol;
  let curCol;

  for(x = 0; x < sizeWidth; x++) {
    for(y = 0; y < sizeHeight; y++) {
      if (y === 0) {
        prevCol = get(x * sizeBlock + 1, (sizeHeight - 1) * sizeBlock + 1);
        curCol = get(x * sizeBlock + 1, y * sizeBlock + 1);

        fill(prevCol);
        rect(x * sizeBlock, y, sizeBlock, sizeBlock);
      }
      else {
        prevCol = curCol;
        curCol = get(x * sizeBlock + 1, y * sizeBlock + 1);

        fill(prevCol);
        rect(x * sizeBlock, y * sizeBlock, sizeBlock, sizeBlock);

      }
    }
 }
}

/**
 *  Verplaatst alle vakjes met een stap naar boven.
 */
function moveUp() {
  let prevCol;
  let curCol;
  let temp;

  for(x = 0; x < sizeWidth; x++) {
    for(y = 0; y < sizeHeight - 1; y++) {
      if (y === sizeHeight - 1) {
        fill(curCol);
        rect(x, y, sizeBlock, sizeBlock);
      }
      else {
        prevCol = get(x * sizeBlock + 1, y * sizeBlock + 1);
        curCol = get(x * sizeBlock + 1, (y + 1) * sizeBlock + 1);

        temp = prevCol;
        prevCol = curCol;
        curCol = temp;

        fill(prevCol);
        rect(x * sizeBlock, y * sizeBlock, sizeBlock, sizeBlock);

        fill(curCol);
        rect(x * sizeBlock, (y + 1) * sizeBlock, sizeBlock, sizeBlock);
      }
    }
  }
}

/**
 *  Vult een vak in waarbij het een willekeurige kleur neemt
 *  afhankelijk van de slider waardes.
 */
function fillBox(valRed, valGreen, valBlue, valBright) {
  if (mouseX < sizeWidth * sizeBlock) {
    blockX = Math.floor(mouseX / sizeBlock) * sizeBlock;
    blockY = Math.floor(mouseY / sizeBlock) * sizeBlock;

    valRed = adjustBrightness(valRed, valBright);
    valGreen = adjustBrightness(valGreen, valBright);
    valBlue = adjustBrightness(valBlue, valBright);

    fill(adjustBrightness(random(valRed), valBright),
         adjustBrightness(random(valGreen), valBright),
         adjustBrightness(random(valBlue), valBright),
         255);

    rect(blockX, blockY, sizeBlock, sizeBlock);
  }
}

/**
 *  Past een kleur aan bepalend aan de helderheid.
 *  source: https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 */
function adjustBrightness(colour, brightness) {
  colour = parseInt(colour * (100 + brightness) / 100);

  colour = (colour<255)?colour:255;

  return colour
}

// WIP: maakt een cirkel dat gebruikt wordt voor geluid
function fillCircle(valRed, valGreen, valBlue) {
  if (mouseX < sizeWidth * sizeBlock) {
    fill(random(valRed), random(valGreen), random(valBlue), 255);
    ellipse(mouseX, mouseY, sizeBlock, sizeBlock);
  }
}
