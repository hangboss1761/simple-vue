import {Complier} from './compiler/compiler';
import {Observer} from './core/observer/observer';
import {proxy2Vm} from './utils/utils';

export default class Vue {
  constructor(options) {
    this.$data = typeof options.data === 'function' ? options.data() : options.data;
    this.$el = options.el;
    let methods = options.methods;
    let computed = options.computed;

    proxy2Vm(this, this.$data);
    proxy2Vm(this, methods);
    proxy2Vm(this, computed);

    new Observer(this.$data, this);
    new Complier(this.$el, this);
  }
}
