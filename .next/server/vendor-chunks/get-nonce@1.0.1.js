"use strict";
exports.id = "vendor-chunks/get-nonce@1.0.1";
exports.ids = ["vendor-chunks/get-nonce@1.0.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/get-nonce@1.0.1/node_modules/get-nonce/dist/es2015/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/.pnpm/get-nonce@1.0.1/node_modules/get-nonce/dist/es2015/index.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getNonce: () => (/* binding */ getNonce),
/* harmony export */   setNonce: () => (/* binding */ setNonce)
/* harmony export */ });
var currentNonce;
var setNonce = function (nonce) {
    currentNonce = nonce;
};
var getNonce = function () {
    if (currentNonce) {
        return currentNonce;
    }
    if (true) {
        return __webpack_require__.nc;
    }
    return undefined;
};


/***/ })

};
;