"use strict";
exports.id = "vendor-chunks/@radix-ui+react-portal@1.1.9_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react_6c1cd0a6f7cc4779efee75f9fbbe7053";
exports.ids = ["vendor-chunks/@radix-ui+react-portal@1.1.9_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react_6c1cd0a6f7cc4779efee75f9fbbe7053"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@radix-ui+react-portal@1.1.9_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react_6c1cd0a6f7cc4779efee75f9fbbe7053/node_modules/@radix-ui/react-portal/dist/index.mjs":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@radix-ui+react-portal@1.1.9_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react_6c1cd0a6f7cc4779efee75f9fbbe7053/node_modules/@radix-ui/react-portal/dist/index.mjs ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Portal: () => (/* binding */ Portal),
/* harmony export */   Root: () => (/* binding */ Root)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-dom.js");
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-primitive */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-primitive@2.1.3_@types+react-dom@18.3.7_@types+react@18.3.23__@types+re_db0ee435667e42f4b05fd5a9bb21abc3/node_modules/@radix-ui/react-primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-use-layout-effect */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-use-layout-effect@1.1.1_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
/* __next_internal_client_entry_do_not_use__ Portal,Root auto */ // src/portal.tsx





var PORTAL_NAME = "Portal";
var Portal = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { container: containerProp, ...portalProps } = props;
    const [mounted, setMounted] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_3__.useLayoutEffect)(()=>setMounted(true), []);
    const container = containerProp || mounted && globalThis?.document?.body;
    return container ? /*#__PURE__*/ react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_4__.Primitive.div, {
        ...portalProps,
        ref: forwardedRef
    }), container) : null;
});
Portal.displayName = PORTAL_NAME;
var Root = Portal;
 //# sourceMappingURL=index.mjs.map


/***/ })

};
;