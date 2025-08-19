"use strict";
exports.id = "vendor-chunks/@radix-ui+react-focus-guards@1.1.2_@types+react@18.3.23_react@18.3.1";
exports.ids = ["vendor-chunks/@radix-ui+react-focus-guards@1.1.2_@types+react@18.3.23_react@18.3.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@radix-ui+react-focus-guards@1.1.2_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-focus-guards/dist/index.mjs":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@radix-ui+react-focus-guards@1.1.2_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-focus-guards/dist/index.mjs ***!
  \**********************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FocusGuards: () => (/* binding */ FocusGuards),
/* harmony export */   Root: () => (/* binding */ Root),
/* harmony export */   useFocusGuards: () => (/* binding */ useFocusGuards)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* __next_internal_client_entry_do_not_use__ FocusGuards,Root,useFocusGuards auto */ // packages/react/focus-guards/src/focus-guards.tsx

var count = 0;
function FocusGuards(props) {
    useFocusGuards();
    return props.children;
}
function useFocusGuards() {
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
        document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard());
        document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard());
        count++;
        return ()=>{
            if (count === 1) {
                document.querySelectorAll("[data-radix-focus-guard]").forEach((node)=>node.remove());
            }
            count--;
        };
    }, []);
}
function createFocusGuard() {
    const element = document.createElement("span");
    element.setAttribute("data-radix-focus-guard", "");
    element.tabIndex = 0;
    element.style.outline = "none";
    element.style.opacity = "0";
    element.style.position = "fixed";
    element.style.pointerEvents = "none";
    return element;
}
var Root = FocusGuards;
 //# sourceMappingURL=index.mjs.map


/***/ })

};
;