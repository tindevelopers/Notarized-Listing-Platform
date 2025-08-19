"use strict";
exports.id = "vendor-chunks/@radix-ui+primitive@1.1.2";
exports.ids = ["vendor-chunks/@radix-ui+primitive@1.1.2"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@radix-ui+primitive@1.1.2/node_modules/@radix-ui/primitive/dist/index.mjs":
/*!******************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@radix-ui+primitive@1.1.2/node_modules/@radix-ui/primitive/dist/index.mjs ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   composeEventHandlers: () => (/* binding */ composeEventHandlers)
/* harmony export */ });
// packages/core/primitive/src/primitive.tsx
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}

//# sourceMappingURL=index.mjs.map


/***/ })

};
;