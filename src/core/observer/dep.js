export class Dep {
  constructor() {
    this.subs = [];
  }

  depend() {
    if (Dep.target) {
      this.subs.push(Dep.target);
    }
  }

  notify() {
    this.subs.forEach(item => {
      item && item.run();
    });
  }
}

Dep.target = null;
