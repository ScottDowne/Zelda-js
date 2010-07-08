// 	Processing.js Zelda clone
/* @pjs preload="img/tileset.png"; preload="img/link.png"; */

var tileSrc = loadImage("img/tileset.png");
var linkSrc  = loadImage("img/link.png");

var tiles = [get(0,   0,   32, 32, tileSrc), // sand
             get(160, 384, 32, 32, tileSrc), // mountains
             get(192, 384, 32, 32, tileSrc),
             get(224, 384, 32, 32, tileSrc),
             get(160, 416, 32, 32, tileSrc),
             get(192, 416, 32, 32, tileSrc),
             get(224, 416, 32, 32, tileSrc)];

var link = {
  frame: 0,
  total: 0,
  pressed: false,
  direction: 0, // 0: down, 1: left, 2: up, 3: right
  x: 32,
  y: 288,
  sprites: [
    [get(0,   0, 32, 32, linkSrc), get(0,   60, 32, 32, linkSrc)], // down
    [get(60,  0, 32, 32, linkSrc), get(60,  60, 32, 32, linkSrc)], // left
    [get(120, 0, 32, 32, linkSrc), get(120, 60, 32, 32, linkSrc)], // up
    [get(180, 0, 32, 32, linkSrc), get(180, 60, 32, 32, linkSrc)]  // right
  ],
  animate: function() {
    if (this.pressed) {
      if (link.direction === 0) { // down
        link.y+=1;
      } else if (link.direction === 1) { // left
        link.x-=1;
      } else if (link.direction === 2 && collision[Math.ceil(this.y / 32)-4 - 1][Math.floor(this.x / 32)] === 0 && collision[Math.ceil(this.y / 32)-4 - 1][Math.ceil(this.x / 32)] === 0) { // up
        link.y-=1;
      } else if (link.direction === 3) { // right
        link.x+=1;
      }
      mapState[Math.floor(link.y/tile)-4][Math.floor(link.x/tile)] = 1;
      mapState[Math.ceil(link.y/tile)-4][Math.floor(link.x/tile)] = 1;
      mapState[Math.floor(link.y/tile)-4][Math.ceil(link.x/tile)] = 1;
      mapState[Math.ceil(link.y/tile)-4][Math.ceil(link.x/tile)] = 1;
      this.total++;
      if (this.total > 10) {
        this.total = 0;
        this.frame = (this.frame+1) % 2;
      }
    }
    image(this.sprites[this.direction][this.frame], this.x, this.y);
  }
}

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


int tile               = 32;
int statusScreenWidth  = 512;
int statusScreenHeight = 128;

void setup() {
  size(width, height);
}

void draw() {
  drawStatus();
  fill(255);
  stroke(0);
  for (var y = 0, yl = mapTiles.length; y < yl; y++) {
    for (var x = 0, xl = mapTiles[y].length; x < xl; x++) {
      if (mapState[y][x] === 1) {
        mapState[y][x] = 0;
        image(tiles[mapTiles[y][x]], x * tile, (y + 4) * tile);
      }
    }
  }


  link.animate();
  fill(255);
  text(frameRate, 15, 20, 70, 70);
}

/*
void moveLinkUp() {
  if (collision[Math.ceil(yLoc / 32)-4 - 1][Math.floor(xLoc / 32)] === 0 && collision[Math.ceil(yLoc / 32)-4 - 1][Math.ceil(xLoc / 32)] === 0) {
    yLoc-=1;
  }

void moveLinkDown() {
  if (collision[Math.floor(yLoc / 32)-4 + 1][Math.floor(xLoc / 32)] === 0 && collision[Math.floor(yLoc / 32)-4 + 1][Math.ceil(xLoc / 32)] === 0) {
    yLoc+=1;
  }

void moveLinkLeft() {
  if (collision[Math.ceil(yLoc / 32)-4][Math.ceil(xLoc / 32)-1] === 0 && collision[Math.floor(yLoc / 32)-4 ][Math.ceil(xLoc / 32)-1] === 0) {
    xLoc-=1;
  }


void moveLinkRight() {
  if (collision[Math.ceil(yLoc / 32)-4][Math.floor(xLoc / 32)+1] === 0 && collision[Math.floor(yLoc / 32)-4 ][Math.floor(xLoc / 32)+1] === 0) {
    xLoc+=1;
  }
*/

void drawStatus() {
  fill(0);
  rect(0, 0, statusScreenWidth, statusScreenHeight);
}

void keyPressed() {
  if (key === CODED) {
    link.pressed = true;
    if (keyCode === DOWN) {
      link.direction = 0;
    } else if (keyCode === LEFT) {
      link.direction = 1;
    } else if (keyCode === UP) {
      link.direction = 2;
    } else if (keyCode === RIGHT) {
      link.direction = 3;
    }
  }
}

void keyReleased() {
  if (key === CODED) {
    link.pressed = false;
  }
}
