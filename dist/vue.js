(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Vue"] = factory();
	else
		root["Vue"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/compiler/compiler.js":
/*!**********************************!*\
  !*** ./src/compiler/compiler.js ***!
  \**********************************/
/*! exports provided: Complier */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Complier", function() { return Complier; });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.js");
/* harmony import */ var _utils_regex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/regex */ "./src/utils/regex.js");



class Complier {
  constructor($el, vm) {
    this.el = this.isElementNode($el) ? $el : document.querySelector($el)
    this.vm = vm

    // 转移到内存
    let fragment = this.node2Fragment(this.el)

    // 编译
    this.complier(fragment)

    // 插入处理好的dom到目标区域
    this.el.appendChild(fragment)
  }

  node2Fragment(el) {
    let fragment = document.createDocumentFragment()
    let firstChild
    while ((firstChild = el.firstChild)) {
      fragment.appendChild(firstChild)
    }

    return fragment
  }

  /**
   * 编译node
   * @param {Node} node
   */
  complier(node) {
    let {childNodes} = node

    ;[...childNodes].forEach(item => {
      if (this.isElementNode(item)) {
        this.complierElement(item)
        this.complier(item)
      } else {
        this.complierText(item)
      }
    })
  }

  /**
   * 编译元素节点
   * @param {Node} node
   */
  complierElement(node) {
    ;[...node.attributes].forEach(attr => {
      let {nodeName, nodeValue} = attr

      if (Object(_utils_regex__WEBPACK_IMPORTED_MODULE_1__["isVDirective"])(attr.nodeName)) {
        let directive = nodeName.match(/^v-(.+)/)[1]

        CompilerUtil.setModel(node, Object(_utils_utils__WEBPACK_IMPORTED_MODULE_0__["getObjVal"])(this.vm, nodeValue))
        CompilerUtil[directive] && CompilerUtil[directive](node, this.vm, nodeValue)
      }
    })
  }

  /**
   * 编译文本节点
   * @param {Node} node
   */
  complierText(node) {
    let newTextContent = node.textContent.replace(_utils_regex__WEBPACK_IMPORTED_MODULE_1__["mustacheReg"], (...rest) => {
      let objVal = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_0__["getObjVal"])(this.vm, rest[1])
      if (typeof objVal === 'function') {
        return objVal.call(this.vm)
      }
      return objVal
    })

    CompilerUtil.setText(node, newTextContent)
  }

  isElementNode(node) {
    // ELEMENT_NODE = 1
    return node.nodeType === 1
  }
}

const CompilerUtil = {
  model(node, vm, expr) {
    node.addEventListener('input', e => {
      let {value} = e.target
      Object(_utils_utils__WEBPACK_IMPORTED_MODULE_0__["setObjVal"])(vm.$data, expr, value)
    })
  },

  html(node, vm, expr) {
    CompilerUtil.setHtml(node, Object(_utils_utils__WEBPACK_IMPORTED_MODULE_0__["getObjVal"])(vm, expr))
  },

  text(node, vm, expr) {
    CompilerUtil.setText(node, Object(_utils_utils__WEBPACK_IMPORTED_MODULE_0__["getObjVal"])(vm, expr))
  },

  setModel(node, value) {
    node.value = value
  },

  setText(node, value) {
    node.nodeValue = value || (node.innerText = value)
  },

  setHtml(node, value) {
    node.innerHTML = value
  },
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Vue; });
/* harmony import */ var _compiler_compiler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./compiler/compiler */ "./src/compiler/compiler.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.js");



class Vue {
  constructor(options) {
    this.$data = typeof options.data === 'function' ? options.data() : options.data;
    this.$el = options.el;
    let methods = options.methods;
    let computed = options.computed;

    Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["proxy2Vm"])(this, this.$data);
    Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["proxy2Vm"])(this, methods);
    Object(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["proxy2Vm"])(this, computed);

    new _compiler_compiler__WEBPACK_IMPORTED_MODULE_0__["Complier"](this.$el, this);
  }
}

/***/ }),

/***/ "./src/utils/regex.js":
/*!****************************!*\
  !*** ./src/utils/regex.js ***!
  \****************************/
/*! exports provided: mustacheReg, isMustache, vdirectiveReg, isVDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mustacheReg", function() { return mustacheReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMustache", function() { return isMustache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vdirectiveReg", function() { return vdirectiveReg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isVDirective", function() { return isVDirective; });

/**
 * 匹配 {{ x }} 语法
 */
const mustacheReg = /\{\{(.+?)\}\}/;
const isMustache = value => mustacheReg.test(value);

/**
 * 匹配 vue v-xx指令
 */
const vdirectiveReg = /^v-/;
const isVDirective = value => vdirectiveReg.test(value)



/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/*! exports provided: getObjVal, setObjVal, proxy2Vm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getObjVal", function() { return getObjVal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setObjVal", function() { return setObjVal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proxy2Vm", function() { return proxy2Vm; });
/**
 *根据路径从对象中获取值
 * @param {object} obj 目标对象
 * @param {string} expr 路径
 * @returns {*}
 */
const getObjVal = (obj = {}, expr) => {
  let keyArr = expr.replace(/\s/g, "").split(".");

  return keyArr.reduce((acc, cur) => {
    return acc[cur];
  }, obj);
};

/**
 * 将传入的value设置到obj指定的属性上
 * @param {object} obj 目标对象
 * @param {string} expr 路径
 * @param {*} value 需要写入的值
 * @returns {object} obj
 */
const setObjVal = (obj = {}, expr, value) => {
  let keyArr = expr.replace(/\s/g, "").split(".");

  keyArr.reduce((acc, cur, idx) => {
    if (idx === keyArr.length - 1) {
      acc[cur] = value;
    }
    return acc[cur];
  }, obj);

  return obj;
};

const proxy2Vm = (vm, originObj) => {
  if (!originObj) {
    return;
  }

  Object.keys(originObj).forEach((key) => {
    Object.defineProperty(vm, key, {
      get () {
        return originObj[key];
      },
      set (val) {
        originObj[key] = val;
      }
    })
  })
};

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=vue.js.map