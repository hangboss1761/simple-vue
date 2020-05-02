import { Dep } from './dep';
import { isObject } from '../../utils/typeof';

export class Observer {
  constructor(data) {
    if (isObject(data)) {
      this.walk(data);
    }
  }

  walk(data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        defineReactive(data, key, element);
      }
    }
  }
}

const observe = data => {
  if (isObject) {
    new Observer(data);
  }
};

const defineReactive = (data, key, val) => {
  let dep = new Dep();

  observe(val);
  Object.defineProperty(data, key, {
    get() {
      dep.depend();
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        observe(newVal);
        val = newVal;
        dep.notify();
      }
    },
  });
};
