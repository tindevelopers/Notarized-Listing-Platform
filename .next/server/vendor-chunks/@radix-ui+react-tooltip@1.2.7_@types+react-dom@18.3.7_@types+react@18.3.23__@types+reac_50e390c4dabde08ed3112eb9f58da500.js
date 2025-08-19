"use strict";
exports.id = "vendor-chunks/@radix-ui+react-tooltip@1.2.7_@types+react-dom@18.3.7_@types+react@18.3.23__@types+reac_50e390c4dabde08ed3112eb9f58da500";
exports.ids = ["vendor-chunks/@radix-ui+react-tooltip@1.2.7_@types+react-dom@18.3.7_@types+react@18.3.23__@types+reac_50e390c4dabde08ed3112eb9f58da500"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@radix-ui+react-tooltip@1.2.7_@types+react-dom@18.3.7_@types+react@18.3.23__@types+reac_50e390c4dabde08ed3112eb9f58da500/node_modules/@radix-ui/react-tooltip/dist/index.mjs":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@radix-ui+react-tooltip@1.2.7_@types+react-dom@18.3.7_@types+react@18.3.23__@types+reac_50e390c4dabde08ed3112eb9f58da500/node_modules/@radix-ui/react-tooltip/dist/index.mjs ***!
  \*********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Arrow: () => (/* binding */ Arrow2),
/* harmony export */   Content: () => (/* binding */ Content2),
/* harmony export */   Portal: () => (/* binding */ Portal),
/* harmony export */   Provider: () => (/* binding */ Provider),
/* harmony export */   Root: () => (/* binding */ Root3),
/* harmony export */   Tooltip: () => (/* binding */ Tooltip),
/* harmony export */   TooltipArrow: () => (/* binding */ TooltipArrow),
/* harmony export */   TooltipContent: () => (/* binding */ TooltipContent),
/* harmony export */   TooltipPortal: () => (/* binding */ TooltipPortal),
/* harmony export */   TooltipProvider: () => (/* binding */ TooltipProvider),
/* harmony export */   TooltipTrigger: () => (/* binding */ TooltipTrigger),
/* harmony export */   Trigger: () => (/* binding */ Trigger),
/* harmony export */   createTooltipScope: () => (/* binding */ createTooltipScope)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @radix-ui/primitive */ "(ssr)/./node_modules/.pnpm/@radix-ui+primitive@1.1.2/node_modules/@radix-ui/primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @radix-ui/react-compose-refs */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-compose-refs@1.1.2_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-compose-refs/dist/index.mjs");
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-context */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-context@1.1.2_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-context/dist/index.mjs");
/* harmony import */ var _radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @radix-ui/react-dismissable-layer */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-dismissable-layer@1.1.10_@types+react-dom@18.3.7_@types+react@18.3.23___dbf8386523191e50867cd199de52aa0e/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs");
/* harmony import */ var _radix_ui_react_id__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-id */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-id@1.1.1_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-id/dist/index.mjs");
/* harmony import */ var _radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-popper */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-popper@1.2.7_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react_ffa2341e59ce9c78f0d0d849ccd75e57/node_modules/@radix-ui/react-popper/dist/index.mjs");
/* harmony import */ var _radix_ui_react_portal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @radix-ui/react-portal */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-portal@1.1.9_@types+react-dom@18.3.7_@types+react@18.3.23__@types+react_6c1cd0a6f7cc4779efee75f9fbbe7053/node_modules/@radix-ui/react-portal/dist/index.mjs");
/* harmony import */ var _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @radix-ui/react-presence */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-presence@1.1.4_@types+react-dom@18.3.7_@types+react@18.3.23__@types+rea_587c7e8c3eecba09139e2afe2a783727/node_modules/@radix-ui/react-presence/dist/index.mjs");
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @radix-ui/react-primitive */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-primitive@2.1.3_@types+react-dom@18.3.7_@types+react@18.3.23__@types+re_db0ee435667e42f4b05fd5a9bb21abc3/node_modules/@radix-ui/react-primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @radix-ui/react-slot */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-slot@1.2.3_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-slot/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @radix-ui/react-use-controllable-state */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-use-controllable-state@1.2.2_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs");
/* harmony import */ var _radix_ui_react_visually_hidden__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @radix-ui/react-visually-hidden */ "(ssr)/./node_modules/.pnpm/@radix-ui+react-visually-hidden@1.2.3_@types+react-dom@18.3.7_@types+react@18.3.23__@ty_bd769e2c7ddceeff6e63be21c84dfac7/node_modules/@radix-ui/react-visually-hidden/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
/* __next_internal_client_entry_do_not_use__ Arrow,Content,Portal,Provider,Root,Tooltip,TooltipArrow,TooltipContent,TooltipPortal,TooltipProvider,TooltipTrigger,Trigger,createTooltipScope auto */ // src/tooltip.tsx















var [createTooltipContext, createTooltipScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__.createContextScope)("Tooltip", [
    _radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_3__.createPopperScope
]);
var usePopperScope = (0,_radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_3__.createPopperScope)();
var PROVIDER_NAME = "TooltipProvider";
var DEFAULT_DELAY_DURATION = 700;
var TOOLTIP_OPEN = "tooltip.open";
var [TooltipProviderContextProvider, useTooltipProviderContext] = createTooltipContext(PROVIDER_NAME);
var TooltipProvider = (props)=>{
    const { __scopeTooltip, delayDuration = DEFAULT_DELAY_DURATION, skipDelayDuration = 300, disableHoverableContent = false, children } = props;
    const isOpenDelayedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(true);
    const isPointerInTransitRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const skipDelayTimerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(0);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const skipDelayTimer = skipDelayTimerRef.current;
        return ()=>window.clearTimeout(skipDelayTimer);
    }, []);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TooltipProviderContextProvider, {
        scope: __scopeTooltip,
        isOpenDelayedRef,
        delayDuration,
        onOpen: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
            window.clearTimeout(skipDelayTimerRef.current);
            isOpenDelayedRef.current = false;
        }, []),
        onClose: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
            window.clearTimeout(skipDelayTimerRef.current);
            skipDelayTimerRef.current = window.setTimeout(()=>isOpenDelayedRef.current = true, skipDelayDuration);
        }, [
            skipDelayDuration
        ]),
        isPointerInTransitRef,
        onPointerInTransitChange: react__WEBPACK_IMPORTED_MODULE_0__.useCallback((inTransit)=>{
            isPointerInTransitRef.current = inTransit;
        }, []),
        disableHoverableContent,
        children
    });
};
TooltipProvider.displayName = PROVIDER_NAME;
var TOOLTIP_NAME = "Tooltip";
var [TooltipContextProvider, useTooltipContext] = createTooltipContext(TOOLTIP_NAME);
var Tooltip = (props)=>{
    const { __scopeTooltip, children, open: openProp, defaultOpen, onOpenChange, disableHoverableContent: disableHoverableContentProp, delayDuration: delayDurationProp } = props;
    const providerContext = useTooltipProviderContext(TOOLTIP_NAME, props.__scopeTooltip);
    const popperScope = usePopperScope(__scopeTooltip);
    const [trigger, setTrigger] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const contentId = (0,_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_4__.useId)();
    const openTimerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(0);
    const disableHoverableContent = disableHoverableContentProp ?? providerContext.disableHoverableContent;
    const delayDuration = delayDurationProp ?? providerContext.delayDuration;
    const wasOpenDelayedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const [open, setOpen] = (0,_radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_5__.useControllableState)({
        prop: openProp,
        defaultProp: defaultOpen ?? false,
        onChange: (open2)=>{
            if (open2) {
                providerContext.onOpen();
                document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN));
            } else {
                providerContext.onClose();
            }
            onOpenChange?.(open2);
        },
        caller: TOOLTIP_NAME
    });
    const stateAttribute = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        return open ? wasOpenDelayedRef.current ? "delayed-open" : "instant-open" : "closed";
    }, [
        open
    ]);
    const handleOpen = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
        window.clearTimeout(openTimerRef.current);
        openTimerRef.current = 0;
        wasOpenDelayedRef.current = false;
        setOpen(true);
    }, [
        setOpen
    ]);
    const handleClose = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
        window.clearTimeout(openTimerRef.current);
        openTimerRef.current = 0;
        setOpen(false);
    }, [
        setOpen
    ]);
    const handleDelayedOpen = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
        window.clearTimeout(openTimerRef.current);
        openTimerRef.current = window.setTimeout(()=>{
            wasOpenDelayedRef.current = true;
            setOpen(true);
            openTimerRef.current = 0;
        }, delayDuration);
    }, [
        delayDuration,
        setOpen
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        return ()=>{
            if (openTimerRef.current) {
                window.clearTimeout(openTimerRef.current);
                openTimerRef.current = 0;
            }
        };
    }, []);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_3__.Root, {
        ...popperScope,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TooltipContextProvider, {
            scope: __scopeTooltip,
            contentId,
            open,
            stateAttribute,
            trigger,
            onTriggerChange: setTrigger,
            onTriggerEnter: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
                if (providerContext.isOpenDelayedRef.current) handleDelayedOpen();
                else handleOpen();
            }, [
                providerContext.isOpenDelayedRef,
                handleDelayedOpen,
                handleOpen
            ]),
            onTriggerLeave: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
                if (disableHoverableContent) {
                    handleClose();
                } else {
                    window.clearTimeout(openTimerRef.current);
                    openTimerRef.current = 0;
                }
            }, [
                handleClose,
                disableHoverableContent
            ]),
            onOpen: handleOpen,
            onClose: handleClose,
            disableHoverableContent,
            children
        })
    });
};
Tooltip.displayName = TOOLTIP_NAME;
var TRIGGER_NAME = "TooltipTrigger";
var TooltipTrigger = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeTooltip, ...triggerProps } = props;
    const context = useTooltipContext(TRIGGER_NAME, __scopeTooltip);
    const providerContext = useTooltipProviderContext(TRIGGER_NAME, __scopeTooltip);
    const popperScope = usePopperScope(__scopeTooltip);
    const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_6__.useComposedRefs)(forwardedRef, ref, context.onTriggerChange);
    const isPointerDownRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const hasPointerMoveOpenedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const handlePointerUp = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>isPointerDownRef.current = false, []);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        return ()=>document.removeEventListener("pointerup", handlePointerUp);
    }, [
        handlePointerUp
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_3__.Anchor, {
        asChild: true,
        ...popperScope,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__.Primitive.button, {
            "aria-describedby": context.open ? context.contentId : void 0,
            "data-state": context.stateAttribute,
            ...triggerProps,
            ref: composedRefs,
            onPointerMove: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__.composeEventHandlers)(props.onPointerMove, (event)=>{
                if (event.pointerType === "touch") return;
                if (!hasPointerMoveOpenedRef.current && !providerContext.isPointerInTransitRef.current) {
                    context.onTriggerEnter();
                    hasPointerMoveOpenedRef.current = true;
                }
            }),
            onPointerLeave: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__.composeEventHandlers)(props.onPointerLeave, ()=>{
                context.onTriggerLeave();
                hasPointerMoveOpenedRef.current = false;
            }),
            onPointerDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__.composeEventHandlers)(props.onPointerDown, ()=>{
                if (context.open) {
                    context.onClose();
                }
                isPointerDownRef.current = true;
                document.addEventListener("pointerup", handlePointerUp, {
                    once: true
                });
            }),
            onFocus: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__.composeEventHandlers)(props.onFocus, ()=>{
                if (!isPointerDownRef.current) context.onOpen();
            }),
            onBlur: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__.composeEventHandlers)(props.onBlur, context.onClose),
            onClick: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__.composeEventHandlers)(props.onClick, context.onClose)
        })
    });
});
TooltipTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "TooltipPortal";
var [PortalProvider, usePortalContext] = createTooltipContext(PORTAL_NAME, {
    forceMount: void 0
});
var TooltipPortal = (props)=>{
    const { __scopeTooltip, forceMount, children, container } = props;
    const context = useTooltipContext(PORTAL_NAME, __scopeTooltip);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(PortalProvider, {
        scope: __scopeTooltip,
        forceMount,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_9__.Presence, {
            present: forceMount || context.open,
            children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_portal__WEBPACK_IMPORTED_MODULE_10__.Portal, {
                asChild: true,
                container,
                children
            })
        })
    });
};
TooltipPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "TooltipContent";
var TooltipContent = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeTooltip);
    const { forceMount = portalContext.forceMount, side = "top", ...contentProps } = props;
    const context = useTooltipContext(CONTENT_NAME, props.__scopeTooltip);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_9__.Presence, {
        present: forceMount || context.open,
        children: context.disableHoverableContent ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TooltipContentImpl, {
            side,
            ...contentProps,
            ref: forwardedRef
        }) : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TooltipContentHoverable, {
            side,
            ...contentProps,
            ref: forwardedRef
        })
    });
});
var TooltipContentHoverable = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const context = useTooltipContext(CONTENT_NAME, props.__scopeTooltip);
    const providerContext = useTooltipProviderContext(CONTENT_NAME, props.__scopeTooltip);
    const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_6__.useComposedRefs)(forwardedRef, ref);
    const [pointerGraceArea, setPointerGraceArea] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const { trigger, onClose } = context;
    const content = ref.current;
    const { onPointerInTransitChange } = providerContext;
    const handleRemoveGraceArea = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
        setPointerGraceArea(null);
        onPointerInTransitChange(false);
    }, [
        onPointerInTransitChange
    ]);
    const handleCreateGraceArea = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((event, hoverTarget)=>{
        const currentTarget = event.currentTarget;
        const exitPoint = {
            x: event.clientX,
            y: event.clientY
        };
        const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
        const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide);
        const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
        const graceArea = getHull([
            ...paddedExitPoints,
            ...hoverTargetPoints
        ]);
        setPointerGraceArea(graceArea);
        onPointerInTransitChange(true);
    }, [
        onPointerInTransitChange
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        return ()=>handleRemoveGraceArea();
    }, [
        handleRemoveGraceArea
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (trigger && content) {
            const handleTriggerLeave = (event)=>handleCreateGraceArea(event, content);
            const handleContentLeave = (event)=>handleCreateGraceArea(event, trigger);
            trigger.addEventListener("pointerleave", handleTriggerLeave);
            content.addEventListener("pointerleave", handleContentLeave);
            return ()=>{
                trigger.removeEventListener("pointerleave", handleTriggerLeave);
                content.removeEventListener("pointerleave", handleContentLeave);
            };
        }
    }, [
        trigger,
        content,
        handleCreateGraceArea,
        handleRemoveGraceArea
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (pointerGraceArea) {
            const handleTrackPointerGrace = (event)=>{
                const target = event.target;
                const pointerPosition = {
                    x: event.clientX,
                    y: event.clientY
                };
                const hasEnteredTarget = trigger?.contains(target) || content?.contains(target);
                const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea);
                if (hasEnteredTarget) {
                    handleRemoveGraceArea();
                } else if (isPointerOutsideGraceArea) {
                    handleRemoveGraceArea();
                    onClose();
                }
            };
            document.addEventListener("pointermove", handleTrackPointerGrace);
            return ()=>document.removeEventListener("pointermove", handleTrackPointerGrace);
        }
    }, [
        trigger,
        content,
        pointerGraceArea,
        onClose,
        handleRemoveGraceArea
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TooltipContentImpl, {
        ...props,
        ref: composedRefs
    });
});
var [VisuallyHiddenContentContextProvider, useVisuallyHiddenContentContext] = createTooltipContext(TOOLTIP_NAME, {
    isInside: false
});
var Slottable = (0,_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_11__.createSlottable)("TooltipContent");
var TooltipContentImpl = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeTooltip, children, "aria-label": ariaLabel, onEscapeKeyDown, onPointerDownOutside, ...contentProps } = props;
    const context = useTooltipContext(CONTENT_NAME, __scopeTooltip);
    const popperScope = usePopperScope(__scopeTooltip);
    const { onClose } = context;
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        document.addEventListener(TOOLTIP_OPEN, onClose);
        return ()=>document.removeEventListener(TOOLTIP_OPEN, onClose);
    }, [
        onClose
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (context.trigger) {
            const handleScroll = (event)=>{
                const target = event.target;
                if (target?.contains(context.trigger)) onClose();
            };
            window.addEventListener("scroll", handleScroll, {
                capture: true
            });
            return ()=>window.removeEventListener("scroll", handleScroll, {
                    capture: true
                });
        }
    }, [
        context.trigger,
        onClose
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_12__.DismissableLayer, {
        asChild: true,
        disableOutsidePointerEvents: false,
        onEscapeKeyDown,
        onPointerDownOutside,
        onFocusOutside: (event)=>event.preventDefault(),
        onDismiss: onClose,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_3__.Content, {
            "data-state": context.stateAttribute,
            ...popperScope,
            ...contentProps,
            ref: forwardedRef,
            style: {
                ...contentProps.style,
                // re-namespace exposed content custom properties
                ...{
                    "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
                    "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
                    "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
                    "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
                    "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
                }
            },
            children: [
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Slottable, {
                    children
                }),
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(VisuallyHiddenContentContextProvider, {
                    scope: __scopeTooltip,
                    isInside: true,
                    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_visually_hidden__WEBPACK_IMPORTED_MODULE_13__.Root, {
                        id: context.contentId,
                        role: "tooltip",
                        children: ariaLabel || children
                    })
                })
            ]
        })
    });
});
TooltipContent.displayName = CONTENT_NAME;
var ARROW_NAME = "TooltipArrow";
var TooltipArrow = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeTooltip, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopeTooltip);
    const visuallyHiddenContentContext = useVisuallyHiddenContentContext(ARROW_NAME, __scopeTooltip);
    return visuallyHiddenContentContext.isInside ? null : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_3__.Arrow, {
        ...popperScope,
        ...arrowProps,
        ref: forwardedRef
    });
});
TooltipArrow.displayName = ARROW_NAME;
function getExitSideFromRect(point, rect) {
    const top = Math.abs(rect.top - point.y);
    const bottom = Math.abs(rect.bottom - point.y);
    const right = Math.abs(rect.right - point.x);
    const left = Math.abs(rect.left - point.x);
    switch(Math.min(top, bottom, right, left)){
        case left:
            return "left";
        case right:
            return "right";
        case top:
            return "top";
        case bottom:
            return "bottom";
        default:
            throw new Error("unreachable");
    }
}
function getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
    const paddedExitPoints = [];
    switch(exitSide){
        case "top":
            paddedExitPoints.push({
                x: exitPoint.x - padding,
                y: exitPoint.y + padding
            }, {
                x: exitPoint.x + padding,
                y: exitPoint.y + padding
            });
            break;
        case "bottom":
            paddedExitPoints.push({
                x: exitPoint.x - padding,
                y: exitPoint.y - padding
            }, {
                x: exitPoint.x + padding,
                y: exitPoint.y - padding
            });
            break;
        case "left":
            paddedExitPoints.push({
                x: exitPoint.x + padding,
                y: exitPoint.y - padding
            }, {
                x: exitPoint.x + padding,
                y: exitPoint.y + padding
            });
            break;
        case "right":
            paddedExitPoints.push({
                x: exitPoint.x - padding,
                y: exitPoint.y - padding
            }, {
                x: exitPoint.x - padding,
                y: exitPoint.y + padding
            });
            break;
    }
    return paddedExitPoints;
}
function getPointsFromRect(rect) {
    const { top, right, bottom, left } = rect;
    return [
        {
            x: left,
            y: top
        },
        {
            x: right,
            y: top
        },
        {
            x: right,
            y: bottom
        },
        {
            x: left,
            y: bottom
        }
    ];
}
function isPointInPolygon(point, polygon) {
    const { x, y } = point;
    let inside = false;
    for(let i = 0, j = polygon.length - 1; i < polygon.length; j = i++){
        const ii = polygon[i];
        const jj = polygon[j];
        const xi = ii.x;
        const yi = ii.y;
        const xj = jj.x;
        const yj = jj.y;
        const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }
    return inside;
}
function getHull(points) {
    const newPoints = points.slice();
    newPoints.sort((a, b)=>{
        if (a.x < b.x) return -1;
        else if (a.x > b.x) return 1;
        else if (a.y < b.y) return -1;
        else if (a.y > b.y) return 1;
        else return 0;
    });
    return getHullPresorted(newPoints);
}
function getHullPresorted(points) {
    if (points.length <= 1) return points.slice();
    const upperHull = [];
    for(let i = 0; i < points.length; i++){
        const p = points[i];
        while(upperHull.length >= 2){
            const q = upperHull[upperHull.length - 1];
            const r = upperHull[upperHull.length - 2];
            if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) upperHull.pop();
            else break;
        }
        upperHull.push(p);
    }
    upperHull.pop();
    const lowerHull = [];
    for(let i = points.length - 1; i >= 0; i--){
        const p = points[i];
        while(lowerHull.length >= 2){
            const q = lowerHull[lowerHull.length - 1];
            const r = lowerHull[lowerHull.length - 2];
            if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) lowerHull.pop();
            else break;
        }
        lowerHull.push(p);
    }
    lowerHull.pop();
    if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y) {
        return upperHull;
    } else {
        return upperHull.concat(lowerHull);
    }
}
var Provider = TooltipProvider;
var Root3 = Tooltip;
var Trigger = TooltipTrigger;
var Portal = TooltipPortal;
var Content2 = TooltipContent;
var Arrow2 = TooltipArrow;
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/@radix-ui+react-tooltip@1.2.7_@types+react-dom@18.3.7_@types+react@18.3.23__@types+reac_50e390c4dabde08ed3112eb9f58da500/node_modules/@radix-ui/react-tooltip/dist/index.mjs":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@radix-ui+react-tooltip@1.2.7_@types+react-dom@18.3.7_@types+react@18.3.23__@types+reac_50e390c4dabde08ed3112eb9f58da500/node_modules/@radix-ui/react-tooltip/dist/index.mjs ***!
  \*********************************************************************************************************************************************************************************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Arrow: () => (/* binding */ e0),
/* harmony export */   Content: () => (/* binding */ e1),
/* harmony export */   Portal: () => (/* binding */ e2),
/* harmony export */   Provider: () => (/* binding */ e3),
/* harmony export */   Root: () => (/* binding */ e4),
/* harmony export */   Tooltip: () => (/* binding */ e5),
/* harmony export */   TooltipArrow: () => (/* binding */ e6),
/* harmony export */   TooltipContent: () => (/* binding */ e7),
/* harmony export */   TooltipPortal: () => (/* binding */ e8),
/* harmony export */   TooltipProvider: () => (/* binding */ e9),
/* harmony export */   TooltipTrigger: () => (/* binding */ e10),
/* harmony export */   Trigger: () => (/* binding */ e11),
/* harmony export */   createTooltipScope: () => (/* binding */ e12)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/build/webpack/loaders/next-flight-loader/module-proxy */ "(rsc)/./node_modules/.pnpm/next@14.2.8_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js");


const proxy = await (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/home/ubuntu/notarized_listing_platform/node_modules/.pnpm/@radix-ui+react-tooltip@1.2.7_@types+react-dom@18.3.7_@types+react@18.3.23__@types+reac_50e390c4dabde08ed3112eb9f58da500/node_modules/@radix-ui/react-tooltip/dist/index.mjs`)
const e0 = proxy["Arrow"];

const e1 = proxy["Content"];

const e2 = proxy["Portal"];

const e3 = proxy["Provider"];

const e4 = proxy["Root"];

const e5 = proxy["Tooltip"];

const e6 = proxy["TooltipArrow"];

const e7 = proxy["TooltipContent"];

const e8 = proxy["TooltipPortal"];

const e9 = proxy["TooltipProvider"];

const e10 = proxy["TooltipTrigger"];

const e11 = proxy["Trigger"];

const e12 = proxy["createTooltipScope"];


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ })

};
;