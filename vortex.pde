ArrayList particles;

void setup() {
  size(window.innerWidth, window.innerHeight);
  particles = new ArrayList();
  background(0);
}

void draw() {
  background(0);

  particles.add(new Particle());
  if (particles.size() > 200) {
    particles.remove(0);
  }

  for (int i = 0; i < particles.size(); i++) {
    Particle p = (Particle) particles.get(i);
    p.update();
    p.show();
  }
}

class Particle {
  PVector pos, vel, acc;
  float size;

  Particle() {
    pos = new PVector(random(width), random(height));
    vel = new PVector(0, 0);
    acc = new PVector(0, 0);
    size = 4;
  }

  void update() {
    PVector center = new PVector(width / 2, height / 2);
    PVector force = PVector.sub(center, pos);
    force.normalize();
    force.mult(0.5);
    acc.add(force);

    vel.add(acc);
    vel.limit(4);
    pos.add(vel);
    acc.mult(0);
  }

  void show() {
    noStroke();
    fill(255, 100);
    ellipse(pos.x, pos.y, size, size);
  }
}
