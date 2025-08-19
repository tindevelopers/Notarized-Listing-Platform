"use strict";
exports.id = "vendor-chunks/@radix-ui+react-arrow@1.1.7_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react@_e9e31f839ccc03b965a9c76fb12e37fb";
exports.ids = ["vendor-chunks/@radix-ui+react-arrow@1.1.7_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react@_e9e31f839ccc03b965a9c76fb12e37fb"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@radix-ui+react-arrow@1.1.7_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react@_e9e31f839ccc03b965a9c76fb12e37fb/node_modules/@radix-ui/react-arrow/dist/index.mjs":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@radix-ui+react-arrow@1.1.7_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react@_e9e31f839ccc03b965a9c76fb12e37fb/node_modules/@radix-ui/react-arrow/dist/index.mjs ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Arrow: () => (/* binding */ Arrow),
/* harmony export */   Root: () => (/* binding */ Root)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-primitive */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-primitive@2.1.3_@types+react-dom@18.3.7_@types+react@18.3.23__@types+re_db0ee435667e42f4b05fd5a9bb21abc3/node_modules/@radix-ui/react-primitive/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
// src/arrow.tsx



var NAME = "Arrow";
var Arrow = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
  const { children, width = 10, height = 5, ...arrowProps } = props;
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
    _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__.Primitive.svg,
    {
      ...arrowProps,
      ref: forwardedRef,
      width,
      height,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: props.asChild ? children : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Arrow.displayName = NAME;
var Root = Arrow;

//# sourceMappingURL=index.mjs.map


/***/ })

};
;