var scale = 1.00, 
    tile = 32  * scale,
    direction = 0, // 1: Up 2: Right 3: Down 4: Left
    tiles = {
        src: load("img/tilesset.png"),
        link: load("img/link.png")
        sand: get(0, 0, 32, 32, this.src),
        mountains: [
           get(160, 384, 32, 32, this.src),
           get(192, 384, 32, 32, this.src),
           get(192 + 32, 384, 32, 32, this.src),
           get(160, 384 + 32, 32, 32, this.src),
           get(192, 384 + 32, 32, 32, this.src),
           get(192 + 32, 384 + 32, 32, 32, this.src)
        ], 
    }

var toggle = false;

var mapTiles = [[5,5,5,5,5,5,5,0,0,5,5,5,5,5,5,5],
                [5,5,5,5,5,5,6,0,0,5,5,5,5,5,5,5],
                [5,5,5,6,0,0,0,0,0,5,5,5,5,5,5,5],
                [5,5,6,0,0,0,0,0,0,5,5,5,5,5,5,5],
                [5,6,0,0,0,0,0,0,0,4,5,5,5,5,5,5],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [2,3,0,0,0,0,0,0,0,0,0,0,0,0,1,2],
                [5,5,0,0,0,0,0,0,0,0,0,0,0,0,5,5],
                [5,5,0,0,0,0,0,0,0,0,0,0,0,0,5,5],
                [5,5,2,2,2,2,2,2,2,2,2,2,2,2,5,5],
                [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]];
           
var mapState = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
            
var collision = [[1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
                 [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
                 [1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1],
                 [1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1],
                 [1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                 [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                 [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                 [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

int scale              = 1.00;
int tile               = 32  * scale;
int statusScreenWidth  = 256 * 2 * scale;
int statusScreenHeight = 64 * 2 * scale;
int zWidth             = 256 * 2 * scale;
int zHeight            = 176 * 2 * scale;

var up    = false;
var down  = false;
var left  = false;
var right = false;
var direction = "down";
var xLoc = 1 * tile;
var yLoc = 9 * tile;
var timer = millis();
var timerStart = 0;
var timerCur = 0;
var timerTotal = 0;
var pressed = false;

void setup() {
  size(width * 2 * scale, height * 2 * scale);
  background(100);
  drawStatus();
}

void draw() {
    //println(collision[Math.floor(yLoc / 32)-4][Math.floor(xLoc / 32)] + " : " + (Math.floor(yLoc / 32)-4) + " : " + Math.floor(xLoc / 32));
  drawStatus();
  fill(255);
  stroke(0);
  for (var y = 0, yl = mapTiles.length; y < yl; y++) {
    for (var x = 0, xl = mapTiles[y].length; x < xl; x++) {
      if (mapState[y][x] === 1) {
        mapState[y][x] = 0;
        if (mapTiles[y][x] === 0) {
          image(sand, x * tile, (y + 4) * tile);
        } else if (mapTiles[y][x] === 1) {
          image(mountain1, x * tile, (y + 4) * tile);
        } else if (mapTiles[y][x] === 2) {
          image(mountain2, x * tile, (y + 4) * tile);
        } else if (mapTiles[y][x] === 3) {
          image(mountain3, x * tile, (y + 4) * tile);
        } else if (mapTiles[y][x] === 4) {
          image(mountain4, x * tile, (y + 4) * tile);
        } else if (mapTiles[y][x] === 5) {
          image(mountain5, x * tile, (y + 4) * tile);
        } else if (mapTiles[y][x] === 6) {
          image(mountain6, x * tile, (y + 4) * tile);
        }
      }
    }
  }

    if (up) {
      if ((xLoc % 16) === 0) {
        link = linkUp.display();
        moveLinkUp();
        direction = "up";
      } else {
        move(direction);
      }
    } else if (down) {
      if ((xLoc % 16) === 0) {
        link = linkDown.display();
        moveLinkDown();
        direction = "down";
      } else {
        move(direction);
      }
    } else if (left) {
      if ((yLoc % 16) === 0) {
        link = linkLeft.display();
        moveLinkLeft();
        direction = "left";
      } else {
        move(direction);
      }
    } else if (right) {
      if ((yLoc % 16) === 0) {
        link = linkRight.display();
        moveLinkRight();
        direction = "right";
      } else {
        move(direction);
      }
    }

  image(link, xLoc, yLoc);
  fill(255);
  text(frameRate, 15, 20, 70, 70);
}

void move(direction) {
  if (direction === "up") {
    moveLinkUp();
  } else if (direction ==="down") {
    moveLinkDown();
  } else if (direction === "left") {
    moveLinkLeft();
  } else if (direction === "right") {
    moveLinkRight();
  }
}

void moveLinkUp() {
  if (collision[Math.ceil(yLoc / 32)-4 - 1][Math.floor(xLoc / 32)] === 0 && collision[Math.ceil(yLoc / 32)-4 - 1][Math.ceil(xLoc / 32)] === 0) {
    yLoc-=1;
  }
  
  timerTotal = (millis() - timerStart); 
  if (timerCur + timerTotal > 100) {
    timerTotal = timerCur = 0;
    pressed = false;
    timerStart = millis();
    link = linkUp.animate();
  }
  
  
  mapState[Math.ceil(yLoc/tile)-4+1][Math.ceil(xLoc/tile)] = 1;
  mapState[Math.ceil(yLoc/tile)-4+1][Math.floor(xLoc/tile)] = 1;
  mapState[Math.floor(yLoc/tile)-4][Math.ceil(xLoc/tile)] = 1;
  mapState[Math.ceil(yLoc/tile)-4][Math.ceil(xLoc/tile)] = 1;
  mapState[Math.floor(yLoc/tile)-4][Math.floor(xLoc/tile)] = 1;
  mapState[Math.ceil(yLoc/tile)-4][Math.floor(xLoc/tile)] = 1;
}

void moveLinkDown() {
  if (collision[Math.floor(yLoc / 32)-4 + 1][Math.floor(xLoc / 32)] === 0 && collision[Math.floor(yLoc / 32)-4 + 1][Math.ceil(xLoc / 32)] === 0) {
    yLoc+=1;
  }
  
  timerTotal = (millis() - timerStart); 
  if (timerCur + timerTotal > 100) {
    timerTotal = timerCur = 0;
    pressed = false;
    timerStart = millis();
    link = linkDown.animate();
  }
  
  mapState[Math.floor(yLoc/tile)-4-1][Math.ceil(xLoc/tile)] = 1;
  mapState[Math.floor(yLoc/tile)-4-1][Math.floor(xLoc/tile)] = 1;
  mapState[Math.floor(yLoc/tile)-4][Math.floor(xLoc/tile)] = 1;
  mapState[Math.ceil(yLoc/tile)-4][Math.floor(xLoc/tile)] = 1;
  mapState[Math.floor(yLoc/tile)-4][Math.ceil(xLoc/tile)] = 1;
  mapState[Math.ceil(yLoc/tile)-4][Math.ceil(xLoc/tile)] = 1;
}

void moveLinkLeft() {
  if (collision[Math.ceil(yLoc / 32)-4][Math.ceil(xLoc / 32)-1] === 0 && collision[Math.floor(yLoc / 32)-4 ][Math.ceil(xLoc / 32)-1] === 0) {
    xLoc-=1;
  }
  
  timerTotal = (millis() - timerStart); 
  if (timerCur + timerTotal > 100) {
    timerTotal = timerCur = 0;
    pressed = false;
    timerStart = millis();
    link = linkLeft.animate();
  }
  
  mapState[Math.ceil(yLoc/tile)-4][Math.ceil(xLoc/tile)+1] = 1;
  mapState[Math.floor(yLoc/tile)-4][Math.ceil(xLoc/tile)+1] = 1;
  mapState[Math.floor(yLoc/tile)-4][Math.floor(xLoc/tile)] = 1;
  mapState[Math.ceil(yLoc/tile)-4][Math.floor(xLoc/tile)] = 1;
  mapState[Math.floor(yLoc/tile)-4][Math.ceil(xLoc/tile)] = 1;
  mapState[Math.ceil(yLoc/tile)-4][Math.ceil(xLoc/tile)] = 1;
}

void moveLinkRight() {
  xLoc+=1;

  timerTotal = (millis() - timerStart); 
  if (timerCur + timerTotal > 100) {
    timerTotal = timerCur = 0;
    pressed = false;
    timerStart = millis();
    link = linkRight.animate();
  }
  
  mapState[Math.ceil(yLoc/tile)-4][Math.floor(xLoc/tile)-1] = 1;
  mapState[Math.floor(yLoc/tile)-4][Math.floor(xLoc/tile)-1] = 1;
  mapState[Math.floor(yLoc/tile)-4][Math.floor(xLoc/tile)] = 1;
  mapState[Math.ceil(yLoc/tile)-4][Math.floor(xLoc/tile)] = 1;
  mapState[Math.floor(yLoc/tile)-4][Math.ceil(xLoc/tile)] = 1;
  mapState[Math.ceil(yLoc/tile)-4][Math.ceil(xLoc/tile)] = 1;
}

void drawStatus() {
  fill(0);
  rect(0, 0, statusScreenWidth, statusScreenHeight);
}

// Class for animating a sequence of PNGs
class Animation {
  PImage[] images;
  int imageCount;
  int frame;
  
  Animation(int loc, int count) {
    imageCount = count;
    images = new PImage[imageCount];
    images[0]    = get(loc, 0, 32, 32, linkTiles);
    images[1]    = get(loc, 60, 32, 32, linkTiles);
  }

  PImage animate() {
    frame = (frame+1) % imageCount;
    return images[frame];
  }
  
  PImage display() {
    return images[frame];
  }
}

void keyPressed() {
  if (key === CODED) {
    if (!pressed) {
      pressed = true;
      timerStart = millis();
    }
    if (keyCode === UP) {
      if (!up) {
        up = true;
      }
    } else if (keyCode === DOWN) {
      if (!down && !up) {
        down = true;
      }
    } else if (keyCode === LEFT) {
      if (!left && !down && !up) {
        left = true;
      }
    } else if (keyCode === RIGHT) {
      if (!right && !left && !down && !up) {
        right = true;
      }
    }
  }
}

void keyReleased() {
  if (key === CODED) {
    pressed = false;
    timerCur += millis() - timerStart;
    if (keyCode === UP) {
      up = false;
    } else if (keyCode === DOWN) {
      down = false;
    } else if (keyCode === LEFT) {
      left = false;
    } else if (keyCode === RIGHT) {
      right = false;
    }
  }
}
