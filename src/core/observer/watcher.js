import { Dep } from './dep';
import { getObjVal } from '../../utils/utils';

export class Watcher {
  constructor(data, key, cb) {
    this.cb = cb;
    this.key = key;
    this.data = data;
    this.oldValue = this.getVal();
  }

  getVal() {
    Dep.target = this;
    getObjVal(this.data, this.key);
    Dep.target = null;
  }

  run() {
    let { cb } = this;
    let newVal = getObjVal(this.data, this.key)

    if (newVal !== this.oldValue) {
      cb && cb(newVal);
    }
  }
}
