import { Complier } from './compiler/compiler'

export default class Vue {
  constructor(options) {
    this.$data = typeof options.data === 'function' ? options.data() : options.data;
    this.$el = options.el;

    new Complier(this.$el, this);
  }
}