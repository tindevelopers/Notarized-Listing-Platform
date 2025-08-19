"use strict";
exports.id = "vendor-chunks/@radix-ui+react-roving-focus@1.1.10_@types+react-dom@18.3.7_@types+react@18.3.23__@type_6f0d671e87aca0440bc028a3a4162dc7";
exports.ids = ["vendor-chunks/@radix-ui+react-roving-focus@1.1.10_@types+react-dom@18.3.7_@types+react@18.3.23__@type_6f0d671e87aca0440bc028a3a4162dc7"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@radix-ui+react-roving-focus@1.1.10_@types+react-dom@18.3.7_@types+react@18.3.23__@type_6f0d671e87aca0440bc028a3a4162dc7/node_modules/@radix-ui/react-roving-focus/dist/index.mjs":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@radix-ui+react-roving-focus@1.1.10_@types+react-dom@18.3.7_@types+react@18.3.23__@type_6f0d671e87aca0440bc028a3a4162dc7/node_modules/@radix-ui/react-roving-focus/dist/index.mjs ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Item: () => (/* binding */ Item),
/* harmony export */   Root: () => (/* binding */ Root),
/* harmony export */   RovingFocusGroup: () => (/* binding */ RovingFocusGroup),
/* harmony export */   RovingFocusGroupItem: () => (/* binding */ RovingFocusGroupItem),
/* harmony export */   createRovingFocusGroupScope: () => (/* binding */ createRovingFocusGroupScope)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @radix-ui/primitive */ "(ssr)/./node_modules/.pnpm/@radix-ui+primitive@1.1.2/node_modules/@radix-ui/primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_collection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-collection */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-collection@1.1.7_@types+react-dom@18.3.7_@types+react@18.3.23__@types+r_8ed47621286c24058c66cffcdce48db5/node_modules/@radix-ui/react-collection/dist/index.mjs");
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-compose-refs */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-compose-refs@1.1.2_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-compose-refs/dist/index.mjs");
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-context */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-context@1.1.2_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-context/dist/index.mjs");
/* harmony import */ var _radix_ui_react_id__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @radix-ui/react-id */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-id@1.1.1_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-id/dist/index.mjs");
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @radix-ui/react-primitive */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-primitive@2.1.3_@types+react-dom@18.3.7_@types+react@18.3.23__@types+re_db0ee435667e42f4b05fd5a9bb21abc3/node_modules/@radix-ui/react-primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @radix-ui/react-use-callback-ref */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.1_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @radix-ui/react-use-controllable-state */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-use-controllable-state@1.2.2_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs");
/* harmony import */ var _radix_ui_react_direction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @radix-ui/react-direction */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-direction@1.1.1_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-direction/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
/* __next_internal_client_entry_do_not_use__ Item,Root,RovingFocusGroup,RovingFocusGroupItem,createRovingFocusGroupScope auto */ // src/roving-focus-group.tsx











var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = {
    bubbles: false,
    cancelable: true
};
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = (0,_radix_ui_react_collection__WEBPACK_IMPORTED_MODULE_2__.createCollection)(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_3__.createContextScope)(GROUP_NAME, [
    createCollectionScope
]);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Collection.Provider, {
        scope: props.__scopeRovingFocusGroup,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Collection.Slot, {
            scope: props.__scopeRovingFocusGroup,
            children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(RovingFocusGroupImpl, {
                ...props,
                ref: forwardedRef
            })
        })
    });
});
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeRovingFocusGroup, orientation, loop = false, dir, currentTabStopId: currentTabStopIdProp, defaultCurrentTabStopId, onCurrentTabStopIdChange, onEntryFocus, preventScrollOnEntryFocus = false, ...groupProps } = props;
    const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__.useComposedRefs)(forwardedRef, ref);
    const direction = (0,_radix_ui_react_direction__WEBPACK_IMPORTED_MODULE_5__.useDirection)(dir);
    const [currentTabStopId, setCurrentTabStopId] = (0,_radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_6__.useControllableState)({
        prop: currentTabStopIdProp,
        defaultProp: defaultCurrentTabStopId ?? null,
        onChange: onCurrentTabStopIdChange,
        caller: GROUP_NAME
    });
    const [isTabbingBackOut, setIsTabbingBackOut] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    const handleEntryFocus = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_7__.useCallbackRef)(onEntryFocus);
    const getItems = useCollection(__scopeRovingFocusGroup);
    const isClickFocusRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const [focusableItemsCount, setFocusableItemsCount] = react__WEBPACK_IMPORTED_MODULE_0__.useState(0);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const node = ref.current;
        if (node) {
            node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
            return ()=>node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
        }
    }, [
        handleEntryFocus
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(RovingFocusProvider, {
        scope: __scopeRovingFocusGroup,
        orientation,
        dir: direction,
        loop,
        currentTabStopId,
        onItemFocus: react__WEBPACK_IMPORTED_MODULE_0__.useCallback((tabStopId)=>setCurrentTabStopId(tabStopId), [
            setCurrentTabStopId
        ]),
        onItemShiftTab: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>setIsTabbingBackOut(true), []),
        onFocusableItemAdd: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>setFocusableItemsCount((prevCount)=>prevCount + 1), []),
        onFocusableItemRemove: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>setFocusableItemsCount((prevCount)=>prevCount - 1), []),
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__.Primitive.div, {
            tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
            "data-orientation": orientation,
            ...groupProps,
            ref: composedRefs,
            style: {
                outline: "none",
                ...props.style
            },
            onMouseDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__.composeEventHandlers)(props.onMouseDown, ()=>{
                isClickFocusRef.current = true;
            }),
            onFocus: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__.composeEventHandlers)(props.onFocus, (event)=>{
                const isKeyboardFocus = !isClickFocusRef.current;
                if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
                    const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
                    event.currentTarget.dispatchEvent(entryFocusEvent);
                    if (!entryFocusEvent.defaultPrevented) {
                        const items = getItems().filter((item)=>item.focusable);
                        const activeItem = items.find((item)=>item.active);
                        const currentItem = items.find((item)=>item.id === currentTabStopId);
                        const candidateItems = [
                            activeItem,
                            currentItem,
                            ...items
                        ].filter(Boolean);
                        const candidateNodes = candidateItems.map((item)=>item.ref.current);
                        focusFirst(candidateNodes, preventScrollOnEntryFocus);
                    }
                }
                isClickFocusRef.current = false;
            }),
            onBlur: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__.composeEventHandlers)(props.onBlur, ()=>setIsTabbingBackOut(false))
        })
    });
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeRovingFocusGroup, focusable = true, active = false, tabStopId, children, ...itemProps } = props;
    const autoId = (0,_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_10__.useId)();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (focusable) {
            onFocusableItemAdd();
            return ()=>onFocusableItemRemove();
        }
    }, [
        focusable,
        onFocusableItemAdd,
        onFocusableItemRemove
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Collection.ItemSlot, {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__.Primitive.span, {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__.composeEventHandlers)(props.onMouseDown, (event)=>{
                if (!focusable) event.preventDefault();
                else context.onItemFocus(id);
            }),
            onFocus: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__.composeEventHandlers)(props.onFocus, ()=>context.onItemFocus(id)),
            onKeyDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__.composeEventHandlers)(props.onKeyDown, (event)=>{
                if (event.key === "Tab" && event.shiftKey) {
                    context.onItemShiftTab();
                    return;
                }
                if (event.target !== event.currentTarget) return;
                const focusIntent = getFocusIntent(event, context.orientation, context.dir);
                if (focusIntent !== void 0) {
                    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                    event.preventDefault();
                    const items = getItems().filter((item)=>item.focusable);
                    let candidateNodes = items.map((item)=>item.ref.current);
                    if (focusIntent === "last") candidateNodes.reverse();
                    else if (focusIntent === "prev" || focusIntent === "next") {
                        if (focusIntent === "prev") candidateNodes.reverse();
                        const currentIndex = candidateNodes.indexOf(event.currentTarget);
                        candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                    }
                    setTimeout(()=>focusFirst(candidateNodes));
                }
            }),
            children: typeof children === "function" ? children({
                isCurrentTabStop,
                hasTabStop: currentTabStopId != null
            }) : children
        })
    });
});
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
    ArrowLeft: "prev",
    ArrowUp: "prev",
    ArrowRight: "next",
    ArrowDown: "next",
    PageUp: "first",
    Home: "first",
    PageDown: "last",
    End: "last"
};
function getDirectionAwareKey(key, dir) {
    if (dir !== "rtl") return key;
    return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
    const key = getDirectionAwareKey(event.key, dir);
    if (orientation === "vertical" && [
        "ArrowLeft",
        "ArrowRight"
    ].includes(key)) return void 0;
    if (orientation === "horizontal" && [
        "ArrowUp",
        "ArrowDown"
    ].includes(key)) return void 0;
    return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
    const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
    for (const candidate of candidates){
        if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
        candidate.focus({
            preventScroll
        });
        if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
    }
}
function wrapArray(array, startIndex) {
    return array.map((_, index)=>array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
 //# sourceMappingURL=index.mjs.map


/***/ })

};
;