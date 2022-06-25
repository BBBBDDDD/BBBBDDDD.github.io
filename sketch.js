let paused = false;

let current_time = 0;

let x = 0, y = 0, h = 0, bgx1 = 640, bgx2 = 1920;

let candy = [], candy2 = [], pill = [];
let candyNum = 5, candyNum2 = 2, pillNum = 1;

let FAT = 0, SCORE = 0;

let playcheck = 0, howchek = 0;

let BACKGROUND, GAMEOVER, PAUSE, TITLE, STATE, STATE0, FONT;
let TITLEMUSIC, BACKGROUNDMUSIC, STARTSOUND, OVERSOUND, EATSOUND1, EATSOUND2, EATSOUND3;
let NEMO0, NEMO1, NEMO2, NEMO3, NEMO4, NEMO5;
let BCANDY, PCANDY, CANDY1, CANDY2, CANDY3, CANDY4, CANDY5, CANDY6, CANDY7, CANDY8;



function preload() {
  BACKGROUND = loadImage('asset/img/bg.png');
  GAMEOVER = loadImage('asset/img/gameover.png');
  PAUSE = loadImage('asset/img/pause.png');
  TITLE = loadImage('asset/img/title.png');
  STATE = loadImage('asset/img/state.png');
  STATE0 = loadImage('asset/img/state-.png');
  FONT = loadFont('asset/DOSGOTHIC.TTF');

  TITLEMUSIC = loadSound('asset/mp3/title.mp3');
  BACKGROUNDMUSIC = loadSound('asset/mp3/bgm.mp3');
  STARTSOUND = loadSound('asset/mp3/start.mp3');
  OVERSOUND = loadSound('asset/mp3/over.mp3');
  EATSOUND1 = loadSound('asset/mp3/eatcandy.mp3');
  EATSOUND2 = loadSound('asset/mp3/eatBcandy.mp3');
  EATSOUND3 = loadSound('asset/mp3/eatPcandy.mp3');

  NEMO0 = loadImage('asset/img/nemo0.png');
  NEMO1 = loadImage('asset/img/nemo1.png');
  NEMO2 = loadImage('asset/img/nemo2.png');
  NEMO3 = loadImage('asset/img/nemo3.png');
  NEMO4 = loadImage('asset/img/nemo4.png');
  NEMO5 = loadImage('asset/img/nemo5.png');

  BCANDY = loadImage('asset/img/Bcandy.png');
  PCANDY = loadImage('asset/img/Pcandy.png');
  CANDY1 = loadImage('asset/img/candy1.png');
  CANDY2 = loadImage('asset/img/candy2.png');
  CANDY3 = loadImage('asset/img/candy3.png');
  CANDY4 = loadImage('asset/img/candy4.png');
  CANDY5 = loadImage('asset/img/candy5.png');
  CANDY6 = loadImage('asset/img/candy6.png');
  CANDY7 = loadImage('asset/img/candy7.png');
  CANDY8 = loadImage('asset/img/candy8.png');
}

function setup() {
  createCanvas(1280, 720);

  TITLEMUSIC.loop();

  x = 80;
  y = height/6;
  
  for(let i = 0; i<candyNum; i++) { 
    candy[i] = new Candy(54, 5, 10);
  }
  for(let i2 = 0; i2<candyNum2; i2++) { 
    candy2[i2] = new Candy(80, 3, 8);
  }
  for(let i3 = 0; i3<pillNum; i3++) { 
    pill[i3] = new Candy(52, 5, 10);
  }


}

function draw() {
  background(220);

  pause();

  if (!paused) {
    Background();
    NEMO(x, y, 91, 99);
    state();
    candyCheck();
    eatcandy();
  
    current_time = int(millis());
    if (current_time % 4000 < 16) {
      FAT --;
    }
    if (FAT < 0) {
      FAT = 0;
    }
  }

  Game();

  print(current_time % 4000);

}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    y -= height/6
  }
  if (keyCode === DOWN_ARROW) {
    y += height/6
  }

  if (y < height/6) {
    y = height/6;
  } else if (y > height*2/3) {
    y = height*2/3;
  }

  
  if (playcheck == 0 || FAT > 5) {
    if (keyCode === 32) {
      paused = false;
      start();
      STARTSOUND.play();
    }
  }

  if (playcheck > 0) {
    if (keyCode === 90) {
      paused = !paused;
      if (BACKGROUNDMUSIC.isPlaying()) {
        BACKGROUNDMUSIC.pause();
      } else {
        BACKGROUNDMUSIC.play();
      }
    }
  }

}

function candyCheck() {
  let i = 0;
  let i2 = 0;
  let i3 = 0;

  while(i < candyNum) {
    candy[i].display();
    candy[i].move();
    i++;
  }
  for(let i = 0; i < candyNum; i++) { 
    if(candy[i].x < 0) {
      candy[i].reset(1280);
    }
  } 

  while(i2 < candyNum2) {
    candy2[i2].display();
    candy2[i2].move();
    i2++;
  }
  for(let i2 = 0; i2 < candyNum2; i2++) { 
    if(candy2[i2].x < 0) {
      candy2[i2].reset(1280);
    }
  } 

  while(i3 < pillNum) {
    pill[i3].display();
    pill[i3].move();
    i3++;
  }
  for(let i3 = 0; i3 < pillNum; i3++) { 
    if(pill[i3].x < 0) {
      pill[i3].reset(4000);
    }
  } 
}

function eatcandy() {
  for(let i = 0; i<candyNum; i++) { 
    let dis = 100;
    dis = dist(x, y, candy[i].x, candy[i].y);
    if(dis<27) {
      candy[i].x=1280;
      FAT++;
      SCORE++;
      if (FAT <= 5) {
        EATSOUND1.play();
      } else if (FAT > 5) {
        OVERSOUND.play()
      }
    }    
  }

  for(let i2 = 0; i2<candyNum2; i2++) { 
    let dis = 100;
    dis = dist(x, y, candy2[i2].x, candy2[i2].y);
    if(dis<40) {
      candy2[i2].x=1280;
      FAT+=3;
      SCORE+=5;
      if (FAT <= 5) {
        EATSOUND2.play();
      } else if (FAT > 5) {
        OVERSOUND.play()
      }
    }    
  }
  
  for(let i3 = 0; i3<pillNum; i3++) { 
    let dis = 100;
    dis = dist(x, y, pill[i3].x, pill[i3].y);
    if(dis<26) {
      pill[i3].x=-1280;
      FAT-=3;
      if (FAT <= 5) {
        EATSOUND3.play();
      } else if (FAT > 5) {
        OVERSOUND.play()
      }
    }    
  }
}

function state() {
  push();
  imageMode(CENTER);
  NEMO(75, 662, 83, 90);
  image(STATE0, width/2, height/2);

  push();
  stroke(255);
  noFill();
  beginShape();
  for (let x = 140; x <= 1190; x+=100) {
    let y = random(660 - 5, 660 + 5);
    vertex(x, y);
  }
  endShape();
  pop();

  image(STATE, width/2, height/2);

  textAlign(CENTER);
  textFont(FONT);
  fill(0);
  textSize(25);
  text("STATE", 1205, 630);
  textSize(20);
  text(SCORE, 1230, 658);
  text(FAT, 1230, 700);
  pop();
 
}

function NEMO(x, y, s1, s2) {
  if (FAT == 0) {
    image(NEMO0, x, y, s1, s2);
  } else if (FAT == 1) {
    image(NEMO1, x, y, s1, s2);
  } else if (FAT == 2) {
    image(NEMO2, x, y, s1, s2);
  } else if (FAT == 3) {
    image(NEMO3, x, y, s1, s2);
  } else if (FAT == 4) {
    image(NEMO4, x, y, s1, s2);
  } else if (FAT == 5) {
    image(NEMO5, x, y, s1, s2);
  }
}

function Background() {
  imageMode(CENTER);
  image(BACKGROUND, bgx1, height/2);
  image(BACKGROUND, bgx2, height/2);
  bgx1 --;
  bgx2 --;
  if (bgx1 < -640) {
    bgx1 = 1920;
  }
  if (bgx2 < -640) { 
    bgx2 = 1920;
  }
}

function start() {
  TITLEMUSIC.stop();
  BACKGROUNDMUSIC.loop();
  
  playcheck++;
  FAT = 0;
  SCORE = 0;
  x = 80;
  y = height/6

  candy = [];
  candy2 = [];

  for(let i = 0; i<candyNum; i++) { 
    candy[i] = new Candy(54, 5, 10);
  }
  for(let i2 = 0; i2<candyNum; i2++) { 
    candy2[i2] = new Candy(80, 3, 8);
  }
  for(let i3 = 0; i3<pillNum; i3++) { 
    pill[i3] = new Candy(52, 5, 10);
  }

}

function pause() {
  push();
  imageMode(CENTER);
  image(PAUSE, width/2, height/2);

  textAlign(CENTER);
  textFont(FONT);
  fill(0);
  textSize(30);
  text("PRESS Z", width/2, height/2);
  textSize(40);
  text("Star candy : " + SCORE, width/2, 500);
  pop();
}

function Game()
{
  if(FAT > 5) {
    paused = true;
    BACKGROUNDMUSIC.stop();

    push();
    image(GAMEOVER, width/2, height/2);

    textAlign(CENTER);
    textFont(FONT);
    fill(255);
    textSize(40);
    text("Star candy : " + SCORE, width/2, 170);
    textSize(25);
    text("TRY AGAIN? \n PRESS THE SPACE!", width/2, 210);
    pop();
  }  

  if(playcheck == 0) {
    paused = true;

    push();
    Background();
    image(TITLE, width/2, 300);

    textAlign(CENTER);
    textFont(FONT);
    fill(255);
    textSize(30);
    text("PRESS THE SPACE!", width/2, 645);
    textSize(17);
    text("시작 : 스페이스 바 \n 조작키 : 상하 방향키 \n 일시정지 : Z \n 살이 찐 네모토끼는 떨어집니다! \n 살이 빠질 때까지 기다리면서 \n 최대한 많은 별사탕을 먹으세요!", 150, 290);
    text("start : space \n control : up/down arrow \n pause : z \n If NEMOTOKKI fat, it will fall! \n Eat as much star candy as you can, \n waiting until NEMOTOKKI \n lose weight!", 1130, 290);
    pop();
  }  
}
