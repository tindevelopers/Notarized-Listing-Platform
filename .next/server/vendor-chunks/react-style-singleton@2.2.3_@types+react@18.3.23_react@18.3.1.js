"use strict";
exports.id = "vendor-chunks/react-style-singleton@2.2.3_@types+react@18.3.23_react@18.3.1";
exports.ids = ["vendor-chunks/react-style-singleton@2.2.3_@types+react@18.3.23_react@18.3.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@18.3.23_react@18.3.1/node_modules/react-style-singleton/dist/es2015/component.js":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@18.3.23_react@18.3.1/node_modules/react-style-singleton/dist/es2015/component.js ***!
  \******************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   styleSingleton: () => (/* binding */ styleSingleton)
/* harmony export */ });
/* harmony import */ var _hook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hook */ "(ssr)/./node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@18.3.23_react@18.3.1/node_modules/react-style-singleton/dist/es2015/hook.js");

/**
 * create a Component to add styles on demand
 * - styles are added when first instance is mounted
 * - styles are removed when the last instance is unmounted
 * - changing styles in runtime does nothing unless dynamic is set. But with multiple components that can lead to the undefined behavior
 */
var styleSingleton = function () {
    var useStyle = (0,_hook__WEBPACK_IMPORTED_MODULE_0__.styleHookSingleton)();
    var Sheet = function (_a) {
        var styles = _a.styles, dynamic = _a.dynamic;
        useStyle(styles, dynamic);
        return null;
    };
    return Sheet;
};


/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@18.3.23_react@18.3.1/node_modules/react-style-singleton/dist/es2015/hook.js":
/*!*************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@18.3.23_react@18.3.1/node_modules/react-style-singleton/dist/es2015/hook.js ***!
  \*************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   styleHookSingleton: () => (/* binding */ styleHookSingleton)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./singleton */ "(ssr)/./node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@18.3.23_react@18.3.1/node_modules/react-style-singleton/dist/es2015/singleton.js");


/**
 * creates a hook to control style singleton
 * @see {@link styleSingleton} for a safer component version
 * @example
 * ```tsx
 * const useStyle = styleHookSingleton();
 * ///
 * useStyle('body { overflow: hidden}');
 */
var styleHookSingleton = function () {
    var sheet = (0,_singleton__WEBPACK_IMPORTED_MODULE_1__.stylesheetSingleton)();
    return function (styles, isDynamic) {
        react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
            sheet.add(styles);
            return function () {
                sheet.remove();
            };
        }, [styles && isDynamic]);
    };
};


/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@18.3.23_react@18.3.1/node_modules/react-style-singleton/dist/es2015/index.js":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@18.3.23_react@18.3.1/node_modules/react-style-singleton/dist/es2015/index.js ***!
  \**************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   styleHookSingleton: () => (/* reexport safe */ _hook__WEBPACK_IMPORTED_MODULE_2__.styleHookSingleton),
/* harmony export */   styleSingleton: () => (/* reexport safe */ _component__WEBPACK_IMPORTED_MODULE_0__.styleSingleton),
/* harmony export */   stylesheetSingleton: () => (/* reexport safe */ _singleton__WEBPACK_IMPORTED_MODULE_1__.stylesheetSingleton)
/* harmony export */ });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "(ssr)/./node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@18.3.23_react@18.3.1/node_modules/react-style-singleton/dist/es2015/component.js");
/* harmony import */ var _singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./singleton */ "(ssr)/./node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@18.3.23_react@18.3.1/node_modules/react-style-singleton/dist/es2015/singleton.js");
/* harmony import */ var _hook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hook */ "(ssr)/./node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@18.3.23_react@18.3.1/node_modules/react-style-singleton/dist/es2015/hook.js");





/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@18.3.23_react@18.3.1/node_modules/react-style-singleton/dist/es2015/singleton.js":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@18.3.23_react@18.3.1/node_modules/react-style-singleton/dist/es2015/singleton.js ***!
  \******************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stylesheetSingleton: () => (/* binding */ stylesheetSingleton)
/* harmony export */ });
/* harmony import */ var get_nonce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! get-nonce */ "(ssr)/./node_modules/.pnpm/get-nonce@1.0.1/node_modules/get-nonce/dist/es2015/index.js");

function makeStyleTag() {
    if (!document)
        return null;
    var tag = document.createElement('style');
    tag.type = 'text/css';
    var nonce = (0,get_nonce__WEBPACK_IMPORTED_MODULE_0__.getNonce)();
    if (nonce) {
        tag.setAttribute('nonce', nonce);
    }
    return tag;
}
function injectStyles(tag, css) {
    // @ts-ignore
    if (tag.styleSheet) {
        // @ts-ignore
        tag.styleSheet.cssText = css;
    }
    else {
        tag.appendChild(document.createTextNode(css));
    }
}
function insertStyleTag(tag) {
    var head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(tag);
}
var stylesheetSingleton = function () {
    var counter = 0;
    var stylesheet = null;
    return {
        add: function (style) {
            if (counter == 0) {
                if ((stylesheet = makeStyleTag())) {
                    injectStyles(stylesheet, style);
                    insertStyleTag(stylesheet);
                }
            }
            counter++;
        },
        remove: function () {
            counter--;
            if (!counter && stylesheet) {
                stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
                stylesheet = null;
            }
        },
    };
};


/***/ })

};
;