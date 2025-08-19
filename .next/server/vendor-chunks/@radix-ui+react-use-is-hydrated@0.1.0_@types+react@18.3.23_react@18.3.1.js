"use strict";
exports.id = "vendor-chunks/@radix-ui+react-use-is-hydrated@0.1.0_@types+react@18.3.23_react@18.3.1";
exports.ids = ["vendor-chunks/@radix-ui+react-use-is-hydrated@0.1.0_@types+react@18.3.23_react@18.3.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@radix-ui+react-use-is-hydrated@0.1.0_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-use-is-hydrated/dist/index.mjs":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@radix-ui+react-use-is-hydrated@0.1.0_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-use-is-hydrated/dist/index.mjs ***!
  \****************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useIsHydrated: () => (/* binding */ useIsHydrated)
/* harmony export */ });
/* harmony import */ var use_sync_external_store_shim__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! use-sync-external-store/shim */ "(ssr)/./node_modules/.pnpm/use-sync-external-store@1.5.0_react@18.3.1/node_modules/use-sync-external-store/shim/index.js");
// src/use-is-hydrated.tsx

function useIsHydrated() {
  return (0,use_sync_external_store_shim__WEBPACK_IMPORTED_MODULE_0__.useSyncExternalStore)(
    subscribe,
    () => true,
    () => false
  );
}
function subscribe() {
  return () => {
  };
}

//# sourceMappingURL=index.mjs.map


/***/ })

};
;