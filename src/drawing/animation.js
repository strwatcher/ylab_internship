export class AnimationController {
  constructor(callback) {
    this.prevTime = null;
    this.request = null;
    this.callback = callback;
 
    this.request = requestAnimationFrame(this.#animate);
  }

  #animate = (time) => {
    if (!!this.prevTime) {
      const dt = time - this.prevTime;
      this.callback(dt);
    }
    this.prevTime = time;
    this.request = requestAnimationFrame(this.#animate);
  }

  destructor() {
    cancelAnimationFrame(this.request);
  }
}
