"use strict";
exports.id = "vendor-chunks/@tanstack+react-query@5.84.2_react@18.3.1";
exports.ids = ["vendor-chunks/@tanstack+react-query@5.84.2_react@18.3.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@tanstack+react-query@5.84.2_react@18.3.1/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@tanstack+react-query@5.84.2_react@18.3.1/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js ***!
  \*********************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryClientContext: () => (/* binding */ QueryClientContext),
/* harmony export */   QueryClientProvider: () => (/* binding */ QueryClientProvider),
/* harmony export */   useQueryClient: () => (/* binding */ useQueryClient)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
/* __next_internal_client_entry_do_not_use__ QueryClientContext,QueryClientProvider,useQueryClient auto */ // src/QueryClientProvider.tsx


var QueryClientContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0);
var useQueryClient = (queryClient)=>{
    const client = react__WEBPACK_IMPORTED_MODULE_0__.useContext(QueryClientContext);
    if (queryClient) {
        return queryClient;
    }
    if (!client) {
        throw new Error("No QueryClient set, use QueryClientProvider to set one");
    }
    return client;
};
var QueryClientProvider = ({ client, children })=>{
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        client.mount();
        return ()=>{
            client.unmount();
        };
    }, [
        client
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(QueryClientContext.Provider, {
        value: client,
        children
    });
};
 //# sourceMappingURL=QueryClientProvider.js.map


/***/ })

};
;