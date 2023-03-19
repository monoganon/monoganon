const sketch = function (p) {
  let particles;

  p.setup = () => {
    p.size(window.innerWidth, window.innerHeight);
    particles = new p.ArrayList();
    p.background(0);
  };

  p.draw = () => {
    p.background(0);

    particles.add(new Particle(p));
    if (particles.size() > 200) {
      particles.remove(0);
    }

    for (let i = 0; i < particles.size(); i++) {
      const particle = particles.get(i);
      particle.update();
      particle.show();
    }
  };

  class Particle {
    constructor(p) {
      this.p = p;
      this.pos = new p.PVector(p.random(p.width), p.random(p.height));
      this.vel = new p.PVector(0, 0);
      this.acc = new p.PVector(0, 0);
      this.size = 4;
    }

    update() {
      const center = new this.p.PVector(this.p.width / 2, this.p.height / 2);
      const force = this.p.PVector.sub(center, this.pos);
      force.normalize();
      force.mult(0.5);
      this.acc.add(force);

      this.vel.add(this.acc);
      this.vel.limit(4);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }

    show() {
      this.p.noStroke();
      this.p.fill(255, 100);
      this.p.ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
  }
};

const canvas = document.getElementById('vortexCanvas');
const processingInstance = new Processing(canvas, sketch);
