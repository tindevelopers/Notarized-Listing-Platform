"use strict";
exports.id = "vendor-chunks/@radix-ui+react-tabs@1.1.12_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react@_039f4c9042ddc46bc6b9dbdec180c93a";
exports.ids = ["vendor-chunks/@radix-ui+react-tabs@1.1.12_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react@_039f4c9042ddc46bc6b9dbdec180c93a"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@radix-ui+react-tabs@1.1.12_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react@_039f4c9042ddc46bc6b9dbdec180c93a/node_modules/@radix-ui/react-tabs/dist/index.mjs":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@radix-ui+react-tabs@1.1.12_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react@_039f4c9042ddc46bc6b9dbdec180c93a/node_modules/@radix-ui/react-tabs/dist/index.mjs ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Content: () => (/* binding */ Content),
/* harmony export */   List: () => (/* binding */ List),
/* harmony export */   Root: () => (/* binding */ Root2),
/* harmony export */   Tabs: () => (/* binding */ Tabs),
/* harmony export */   TabsContent: () => (/* binding */ TabsContent),
/* harmony export */   TabsList: () => (/* binding */ TabsList),
/* harmony export */   TabsTrigger: () => (/* binding */ TabsTrigger),
/* harmony export */   Trigger: () => (/* binding */ Trigger),
/* harmony export */   createTabsScope: () => (/* binding */ createTabsScope)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @radix-ui/primitive */ "(ssr)/./node_modules/.pnpm/@radix-ui+primitive@1.1.2/node_modules/@radix-ui/primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-context */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-context@1.1.2_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-context/dist/index.mjs");
/* harmony import */ var _radix_ui_react_roving_focus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-roving-focus */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-roving-focus@1.1.10_@types+react-dom@18.3.7_@types+react@18.3.23__@type_6f0d671e87aca0440bc028a3a4162dc7/node_modules/@radix-ui/react-roving-focus/dist/index.mjs");
/* harmony import */ var _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @radix-ui/react-presence */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-presence@1.1.4_@types+react-dom@18.3.7_@types+react@18.3.23__@types+rea_587c7e8c3eecba09139e2afe2a783727/node_modules/@radix-ui/react-presence/dist/index.mjs");
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @radix-ui/react-primitive */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-primitive@2.1.3_@types+react-dom@18.3.7_@types+react@18.3.23__@types+re_db0ee435667e42f4b05fd5a9bb21abc3/node_modules/@radix-ui/react-primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_direction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-direction */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-direction@1.1.1_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-direction/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @radix-ui/react-use-controllable-state */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-use-controllable-state@1.2.2_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs");
/* harmony import */ var _radix_ui_react_id__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @radix-ui/react-id */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-id@1.1.1_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-id/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
/* __next_internal_client_entry_do_not_use__ Content,List,Root,Tabs,TabsContent,TabsList,TabsTrigger,Trigger,createTabsScope auto */ // src/tabs.tsx











var TABS_NAME = "Tabs";
var [createTabsContext, createTabsScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__.createContextScope)(TABS_NAME, [
    _radix_ui_react_roving_focus__WEBPACK_IMPORTED_MODULE_3__.createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = (0,_radix_ui_react_roving_focus__WEBPACK_IMPORTED_MODULE_3__.createRovingFocusGroupScope)();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeTabs, value: valueProp, onValueChange, defaultValue, orientation = "horizontal", dir, activationMode = "automatic", ...tabsProps } = props;
    const direction = (0,_radix_ui_react_direction__WEBPACK_IMPORTED_MODULE_4__.useDirection)(dir);
    const [value, setValue] = (0,_radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_5__.useControllableState)({
        prop: valueProp,
        onChange: onValueChange,
        defaultProp: defaultValue ?? "",
        caller: TABS_NAME
    });
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TabsProvider, {
        scope: __scopeTabs,
        baseId: (0,_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_6__.useId)(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__.Primitive.div, {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
        })
    });
});
Tabs.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_roving_focus__WEBPACK_IMPORTED_MODULE_3__.Root, {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__.Primitive.div, {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
        })
    });
});
TabsList.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_roving_focus__WEBPACK_IMPORTED_MODULE_3__.Item, {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__.Primitive.button, {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__.composeEventHandlers)(props.onMouseDown, (event)=>{
                if (!disabled && event.button === 0 && event.ctrlKey === false) {
                    context.onValueChange(value);
                } else {
                    event.preventDefault();
                }
            }),
            onKeyDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__.composeEventHandlers)(props.onKeyDown, (event)=>{
                if ([
                    " ",
                    "Enter"
                ].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__.composeEventHandlers)(props.onFocus, ()=>{
                const isAutomaticActivation = context.activationMode !== "manual";
                if (!isSelected && !disabled && isAutomaticActivation) {
                    context.onValueChange(value);
                }
            })
        })
    });
});
TabsTrigger.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(isSelected);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const rAF = requestAnimationFrame(()=>isMountAnimationPreventedRef.current = false);
        return ()=>cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_9__.Presence, {
        present: forceMount || isSelected,
        children: ({ present })=>/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__.Primitive.div, {
                "data-state": isSelected ? "active" : "inactive",
                "data-orientation": context.orientation,
                role: "tabpanel",
                "aria-labelledby": triggerId,
                hidden: !present,
                id: contentId,
                tabIndex: 0,
                ...contentProps,
                ref: forwardedRef,
                style: {
                    ...props.style,
                    animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
                },
                children: present && children
            })
    });
});
TabsContent.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
    return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
    return `${baseId}-content-${value}`;
}
var Root2 = Tabs;
var List = TabsList;
var Trigger = TabsTrigger;
var Content = TabsContent;
 //# sourceMappingURL=index.mjs.map


/***/ })

};
;