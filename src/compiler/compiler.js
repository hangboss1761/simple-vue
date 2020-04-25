import { getObjVal } from '../utils/utils'
import { mustacheReg, isMustache, isVDirective } from '../utils/regex'

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

  node2Fragment (el) {
    let fragment = document.createDocumentFragment();
    let firstChild;
    while (firstChild = el.firstChild) {
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
    })
  }

  /**
   * 编译元素节点
   * @param {Node} node
   */
  complierElement (node) {
    console.log('[...node.attributes] :>> ', [...node.attributes]);
    [...node.attributes].forEach(attr => {
      let { nodeName, nodeValue } = attr;
      if (isVDirective(attr.nodeName)) {
        let directive = nodeName.match(/^v-(.+)/)[1];
        CompilerUtil.setModel(node, getObjVal(this.vm.$data, attr.nodeValue));
        CompilerUtil[directive] && CompilerUtil[directive]();
      }
    })
  }

  /**
   * 编译文本节点
   * @param {Node} node
   */
  complierText (node) {
    let newTextContent = node.textContent.replace(mustacheReg, (...rest) => {
      return getObjVal(this.vm.$data, rest[1]);
    })

    CompilerUtil.setText(node, newTextContent);
  }

  isElementNode (node) {
    // ELEMENT_NODE = 1
    return node.nodeType === 1;
  }
}

const CompilerUtil = {
  model (node, vm, expr) {
    // TODO: 实现双向绑定
    console.log('model')
  },
  html () {
    console.log('html')
  },
  text () {
    console.log('text');
  },
  setModel (node, value) {
    node.value = value;
  },

  setText (node, value) {
    node.nodeValue = value;
  },

  setHtml (node, value) {
    node.innerHtml = value;
  }
}