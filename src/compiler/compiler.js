import { getObjVal, setObjVal } from '../utils/utils';
import { isFunction } from '../utils/typeof';
import { mustacheReg, isMustache, isVDirective } from '../utils/regex';
import { Watcher } from '../core/observer/watcher';

export class Complier {
  constructor($el, vm) {
    this.el = this.isElementNode($el) ? $el : document.querySelector($el);
    this.vm = vm;

    // 转移到内存
    let fragment = this.node2Fragment(this.el);

    // 编译
    this.complier(fragment);

    // 插入处理好的dom到目标区域
    this.el.appendChild(fragment);
  }

  node2Fragment(el) {
    let fragment = document.createDocumentFragment();
    let firstChild;
    while ((firstChild = el.firstChild)) {
      fragment.appendChild(firstChild);
    }

    return fragment;
  }

  /**
   * 编译node
   * @param {Node} node
   */
  complier(node) {
    let { childNodes } = node;

    [...childNodes].forEach(item => {
      if (this.isElementNode(item)) {
        this.complierElement(item);
        this.complier(item);
      } else {
        this.complierText(item);
      }
    });
  }

  /**
   * 编译元素节点
   * @param {Node} node
   */
  complierElement(node) {
    [...node.attributes].forEach(attr => {
      let { nodeName, nodeValue } = attr;

      if (isVDirective(attr.nodeName)) {
        let directive = nodeName.match(/^v-(.+)/)[1];

        CompilerUtil.setModel(node, getObjVal(this.vm, nodeValue));
        CompilerUtil[directive] && CompilerUtil[directive](node, this.vm, nodeValue);
      }
    });
  }

  /**
   * 编译文本节点
   * @param {Node} node
   */
  complierText(node) {
    let newTextContent = node.textContent.replace(mustacheReg, (...rest) => {
      new Watcher(this.vm, rest[1], newVal => {
        CompilerUtil.setText(node, newVal);
      });
      let objVal = getObjVal(this.vm, rest[1]);

      if (isFunction(objVal)) {
        return objVal.call(this.vm);
      }
      return objVal;
    });

    CompilerUtil.setText(node, newTextContent);
  }

  isElementNode(node) {
    // ELEMENT_NODE = 1
    return node.nodeType === 1;
  }
}

const CompilerUtil = {
  model(node, vm, expr) {
    node.addEventListener('input', e => {
      let { value } = e.target;
      setObjVal(vm.$data, expr, value);
    });
  },

  html(node, vm, expr) {
    let val = getObjVal(vm, expr);
    CompilerUtil.setHtml(node, val);
    new Watcher(vm, expr, newVal => {
      CompilerUtil.setHtml(node, newVal);
    });
  },

  text(node, vm, expr) {
    CompilerUtil.setInnerText(node, getObjVal(vm, expr));
    new Watcher(vm, expr, newVal => {
      CompilerUtil.setInnerText(node, newVal);
    });
  },

  setModel(node, value) {
    node.value = value;
  },

  setInnerText(node, value) {
    node.innerText = value;
  },

  setText(node, value) {
    node.nodeValue = value;
  },

  setHtml(node, value) {
    node.innerHTML = value;
  },
};
