"use strict";
exports.id = "vendor-chunks/@radix-ui+react-visually-hidden@1.2.3_@types+react-dom@18.3.7_@types+react@18.3.23__@ty_bd769e2c7ddceeff6e63be21c84dfac7";
exports.ids = ["vendor-chunks/@radix-ui+react-visually-hidden@1.2.3_@types+react-dom@18.3.7_@types+react@18.3.23__@ty_bd769e2c7ddceeff6e63be21c84dfac7"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@radix-ui+react-visually-hidden@1.2.3_@types+react-dom@18.3.7_@types+react@18.3.23__@ty_bd769e2c7ddceeff6e63be21c84dfac7/node_modules/@radix-ui/react-visually-hidden/dist/index.mjs":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@radix-ui+react-visually-hidden@1.2.3_@types+react-dom@18.3.7_@types+react@18.3.23__@ty_bd769e2c7ddceeff6e63be21c84dfac7/node_modules/@radix-ui/react-visually-hidden/dist/index.mjs ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Root: () => (/* binding */ Root),
/* harmony export */   VISUALLY_HIDDEN_STYLES: () => (/* binding */ VISUALLY_HIDDEN_STYLES),
/* harmony export */   VisuallyHidden: () => (/* binding */ VisuallyHidden)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-primitive */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-primitive@2.1.3_@types+react-dom@18.3.7_@types+react@18.3.23__@types+re_db0ee435667e42f4b05fd5a9bb21abc3/node_modules/@radix-ui/react-primitive/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
// src/visually-hidden.tsx



var VISUALLY_HIDDEN_STYLES = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
});
var NAME = "VisuallyHidden";
var VisuallyHidden = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
      _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__.Primitive.span,
      {
        ...props,
        ref: forwardedRef,
        style: { ...VISUALLY_HIDDEN_STYLES, ...props.style }
      }
    );
  }
);
VisuallyHidden.displayName = NAME;
var Root = VisuallyHidden;

//# sourceMappingURL=index.mjs.map


/***/ })

};
;