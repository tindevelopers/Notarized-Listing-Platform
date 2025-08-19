"use strict";
exports.id = "vendor-chunks/@radix-ui+react-avatar@1.1.10_@types+react-dom@18.3.7_@types+react@18.3.23__@types+reac_bda864f04f6839bc5ab9cf2fb31ea21d";
exports.ids = ["vendor-chunks/@radix-ui+react-avatar@1.1.10_@types+react-dom@18.3.7_@types+react@18.3.23__@types+reac_bda864f04f6839bc5ab9cf2fb31ea21d"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@radix-ui+react-avatar@1.1.10_@types+react-dom@18.3.7_@types+react@18.3.23__@types+reac_bda864f04f6839bc5ab9cf2fb31ea21d/node_modules/@radix-ui/react-avatar/dist/index.mjs":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@radix-ui+react-avatar@1.1.10_@types+react-dom@18.3.7_@types+react@18.3.23__@types+reac_bda864f04f6839bc5ab9cf2fb31ea21d/node_modules/@radix-ui/react-avatar/dist/index.mjs ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Avatar: () => (/* binding */ Avatar),
/* harmony export */   AvatarFallback: () => (/* binding */ AvatarFallback),
/* harmony export */   AvatarImage: () => (/* binding */ AvatarImage),
/* harmony export */   Fallback: () => (/* binding */ Fallback),
/* harmony export */   Image: () => (/* binding */ Image),
/* harmony export */   Root: () => (/* binding */ Root),
/* harmony export */   createAvatarScope: () => (/* binding */ createAvatarScope)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-context */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-context@1.1.2_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-context/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-use-callback-ref */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.1_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @radix-ui/react-use-layout-effect */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-use-layout-effect@1.1.1_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs");
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-primitive */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-primitive@2.1.3_@types+react-dom@18.3.7_@types+react@18.3.23__@types+re_db0ee435667e42f4b05fd5a9bb21abc3/node_modules/@radix-ui/react-primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_is_hydrated__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @radix-ui/react-use-is-hydrated */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-use-is-hydrated@0.1.0_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-use-is-hydrated/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
/* __next_internal_client_entry_do_not_use__ Avatar,AvatarFallback,AvatarImage,Fallback,Image,Root,createAvatarScope auto */ // src/avatar.tsx







var AVATAR_NAME = "Avatar";
var [createAvatarContext, createAvatarScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__.createContextScope)(AVATAR_NAME);
var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
var Avatar = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeAvatar, ...avatarProps } = props;
    const [imageLoadingStatus, setImageLoadingStatus] = react__WEBPACK_IMPORTED_MODULE_0__.useState("idle");
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(AvatarProvider, {
        scope: __scopeAvatar,
        imageLoadingStatus,
        onImageLoadingStatusChange: setImageLoadingStatus,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_3__.Primitive.span, {
            ...avatarProps,
            ref: forwardedRef
        })
    });
});
Avatar.displayName = AVATAR_NAME;
var IMAGE_NAME = "AvatarImage";
var AvatarImage = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeAvatar, src, onLoadingStatusChange = ()=>{}, ...imageProps } = props;
    const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
    const imageLoadingStatus = useImageLoadingStatus(src, imageProps);
    const handleLoadingStatusChange = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_4__.useCallbackRef)((status)=>{
        onLoadingStatusChange(status);
        context.onImageLoadingStatusChange(status);
    });
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_5__.useLayoutEffect)(()=>{
        if (imageLoadingStatus !== "idle") {
            handleLoadingStatusChange(imageLoadingStatus);
        }
    }, [
        imageLoadingStatus,
        handleLoadingStatusChange
    ]);
    return imageLoadingStatus === "loaded" ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_3__.Primitive.img, {
        ...imageProps,
        ref: forwardedRef,
        src
    }) : null;
});
AvatarImage.displayName = IMAGE_NAME;
var FALLBACK_NAME = "AvatarFallback";
var AvatarFallback = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeAvatar, delayMs, ...fallbackProps } = props;
    const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
    const [canRender, setCanRender] = react__WEBPACK_IMPORTED_MODULE_0__.useState(delayMs === void 0);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (delayMs !== void 0) {
            const timerId = window.setTimeout(()=>setCanRender(true), delayMs);
            return ()=>window.clearTimeout(timerId);
        }
    }, [
        delayMs
    ]);
    return canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_3__.Primitive.span, {
        ...fallbackProps,
        ref: forwardedRef
    }) : null;
});
AvatarFallback.displayName = FALLBACK_NAME;
function resolveLoadingStatus(image, src) {
    if (!image) {
        return "idle";
    }
    if (!src) {
        return "error";
    }
    if (image.src !== src) {
        image.src = src;
    }
    return image.complete && image.naturalWidth > 0 ? "loaded" : "loading";
}
function useImageLoadingStatus(src, { referrerPolicy, crossOrigin }) {
    const isHydrated = (0,_radix_ui_react_use_is_hydrated__WEBPACK_IMPORTED_MODULE_6__.useIsHydrated)();
    const imageRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const image = (()=>{
        if (!isHydrated) return null;
        if (!imageRef.current) {
            imageRef.current = new window.Image();
        }
        return imageRef.current;
    })();
    const [loadingStatus, setLoadingStatus] = react__WEBPACK_IMPORTED_MODULE_0__.useState(()=>resolveLoadingStatus(image, src));
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_5__.useLayoutEffect)(()=>{
        setLoadingStatus(resolveLoadingStatus(image, src));
    }, [
        image,
        src
    ]);
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_5__.useLayoutEffect)(()=>{
        const updateStatus = (status)=>()=>{
                setLoadingStatus(status);
            };
        if (!image) return;
        const handleLoad = updateStatus("loaded");
        const handleError = updateStatus("error");
        image.addEventListener("load", handleLoad);
        image.addEventListener("error", handleError);
        if (referrerPolicy) {
            image.referrerPolicy = referrerPolicy;
        }
        if (typeof crossOrigin === "string") {
            image.crossOrigin = crossOrigin;
        }
        return ()=>{
            image.removeEventListener("load", handleLoad);
            image.removeEventListener("error", handleError);
        };
    }, [
        image,
        crossOrigin,
        referrerPolicy
    ]);
    return loadingStatus;
}
var Root = Avatar;
var Image = AvatarImage;
var Fallback = AvatarFallback;
 //# sourceMappingURL=index.mjs.map


/***/ })

};
;