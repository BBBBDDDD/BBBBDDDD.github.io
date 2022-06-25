class Candy {
    constructor(d, r1, r2) {
      this.x = 1280;
      this.h = [height/6, height/3, height/2, height*2/3];
      this.y = random(this.h);
      this.d = d;
      this.velocityX = random(r1, r2);
      this.q = int(random(1, 8));

      if (this.d == 52) {
        this.img = PCANDY;
      }

      if (this.d == 80) {
        this.img = BCANDY;
      }

      if (this.d == 54) {
        if (this.q == 1) {
          this.img = CANDY1;
        } else if (this.q == 2) {
          this.img = CANDY2;
        } else if (this.q == 3) {
          this.img = CANDY3;
        } else if (this.q == 4) {
          this.img = CANDY4;
        } else if (this.q == 5) {
          this.img = CANDY5;
        } else if (this.q == 6) {
          this.img = CANDY6;
        } else if (this.q == 7) {
          this.img = CANDY7;
        } else if (this.q == 8) {
          this.img = CANDY8;
        }
      }

    }

    display() {
      push();
      imageMode(CENTER);
      image(this.img, this.x, this.y, this.d, this.d);
      pop();
    }

    move() {
      this.x -= this.velocityX;
    }

    reset(x) {
      this.x = x;
      this.h = [height/6, height/3, height/2, height*2/3];
      this.y = random(this.h);
    }
}