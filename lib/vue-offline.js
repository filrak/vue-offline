(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vue-offline", [], factory);
	else if(typeof exports === 'object')
		exports["vue-offline"] = factory();
	else
		root["vue-offline"] = factory();
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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: VueOfflineMixin, VueOfflineStorage, VueOfflinePlugin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VueOfflineMixin", function() { return VueOfflineMixin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VueOfflineStorage", function() { return VueOfflineStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VueOfflinePlugin", function() { return VueOfflinePlugin; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* ----------------------- Mixin ------------------------ */

/** This mixin adds:
 * - `isOnline`, `isOffline` data properties
 * - `online`, `offline` in-component events 
 * */
var VueOfflineMixin = {
  data: function data() {
    return {
      isOnline: false,
      isOffline: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== undefined) {
      navigator.onLine ? this.isOnline = true : this.isOffline = true;

      var onlineHandler = function onlineHandler() {
        _this.$emit('online');

        _this.isOnline = true;
        _this.isOffline = false;
      };

      var offlineHandler = function offlineHandler() {
        _this.$emit('offline');

        _this.isOffline = true;
        _this.isOnline = false;
      };

      window.addEventListener('online', onlineHandler);
      window.addEventListener('offline', offlineHandler);
      this.$once('hook:beforeDestroy', function () {
        window.removeEventListener('online', onlineHandler);
        window.removeEventListener('offline', offlineHandler);
      });
    }
  }
};
/* ----------------------- Storage ------------------------ */

function _addKey(newKey) {
  var keys = JSON.parse(localStorage.getItem('VueOfflineStorageKeys')) || [];
  if (!keys.includes(newKey)) keys.push(newKey);
  localStorage.setItem('VueOfflineStorageKeys', JSON.stringify(keys));
}
/** Offline storage based on localStorage. You can import it and use standalone or register a plugin */


var VueOfflineStorage = {
  keys: (typeof window === "undefined" ? "undefined" : _typeof(window)) !== undefined ? localStorage.getItem('VueOfflineStorageKeys') : null,
  set: function set(key, value) {
    if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));

      _addKey(key);
    }
  },
  get: function get(key) {
    return (typeof window === "undefined" ? "undefined" : _typeof(window)) !== undefined ? JSON.parse(localStorage.getItem(key)) : null;
  }
};
/* ----------------------- Plugin ------------------------ */

/** Registers VueOfflineMixin in whole application giving you access to:
 * - isOnline, isOffline data properties
 * - online, offline in-component events
 */

var VueOfflinePlugin = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      mixin: true,
      storage: true
    };
    var pluginOptions = {
      mixin: options.mixin,
      storage: options.storage
    };
    if (pluginOptions.storage) Vue.prototype.$offlineStorage = VueOfflineStorage;
    if (pluginOptions.mixin) Vue.mixin(VueOfflineMixin);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (VueOfflinePlugin);

/***/ })

/******/ });
});
//# sourceMappingURL=vue-offline.js.map