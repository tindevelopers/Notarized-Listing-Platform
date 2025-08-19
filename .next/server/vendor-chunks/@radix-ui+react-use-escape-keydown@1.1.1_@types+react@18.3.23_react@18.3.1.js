"use strict";
exports.id = "vendor-chunks/@radix-ui+react-use-escape-keydown@1.1.1_@types+react@18.3.23_react@18.3.1";
exports.ids = ["vendor-chunks/@radix-ui+react-use-escape-keydown@1.1.1_@types+react@18.3.23_react@18.3.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@radix-ui+react-use-escape-keydown@1.1.1_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@radix-ui+react-use-escape-keydown@1.1.1_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs ***!
  \**********************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useEscapeKeydown: () => (/* binding */ useEscapeKeydown)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-use-callback-ref */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.1_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs");
// packages/react/use-escape-keydown/src/use-escape-keydown.tsx


function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis?.document) {
  const onEscapeKeyDown = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__.useCallbackRef)(onEscapeKeyDownProp);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onEscapeKeyDown(event);
      }
    };
    ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [onEscapeKeyDown, ownerDocument]);
}

//# sourceMappingURL=index.mjs.map


/***/ })

};
;