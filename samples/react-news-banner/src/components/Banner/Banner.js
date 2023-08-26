var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import styles from "./Banner.module.scss";
import * as React from "react";
import { BannerCard } from "../BannerCard";
import { useList } from "../../hooks/useList";
import { reducer } from "./BannerReducer";
import { EBannerTypes } from "./EBannerTypes";
import { Placeholder } from '@pnp/spfx-controls-react';
import { MessageBar, MessageBarType, } from "office-ui-fabric-react/lib/MessageBar";
import { Spinner, SpinnerSize, } from "office-ui-fabric-react/lib/Spinner";
import { Stack, } from "office-ui-fabric-react/lib/Stack";
import strings from "BannerWebPartStrings";
var initialState = {
    isLoading: false,
    items: [],
    messageError: undefined,
    selectedItem: undefined,
};
export var Banner = function (props) {
    var _a;
    var selectedProperties = props.selectedProperties, webpartContext = props.webpartContext;
    var _b = React.useReducer(reducer, initialState), state = _b[0], dispatch = _b[1];
    var getItems = useList().getItems;
    var isLoading = state.isLoading, items = state.items, messageError = state.messageError, selectedItem = state.selectedItem;
    var _onSelectedItem = React.useCallback(function (item) {
        dispatch({
            type: EBannerTypes.SET_SELECTED_ITEM,
            payload: item,
        });
    }, []);
    React.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var _items, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!selectedProperties.listId)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        dispatch({
                            type: EBannerTypes.SET_ISLOADING,
                            payload: true,
                        });
                        return [4 /*yield*/, getItems(selectedProperties)];
                    case 2:
                        _items = _a.sent();
                        dispatch({
                            type: EBannerTypes.SET_ITEMS,
                            payload: _items,
                        });
                        dispatch({
                            type: EBannerTypes.SET_SELECTED_ITEM,
                            payload: _items[0],
                        });
                        dispatch({
                            type: EBannerTypes.SET_MESSAGE,
                            payload: undefined,
                        });
                        dispatch({
                            type: EBannerTypes.SET_ISLOADING,
                            payload: false,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        dispatch({
                            type: EBannerTypes.SET_MESSAGE,
                            payload: {
                                message: "Something went worg",
                                messageBarType: MessageBarType.error,
                                isToShow: true,
                            },
                        });
                        dispatch({
                            type: EBannerTypes.SET_ISLOADING,
                            payload: false,
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProperties]);
    if (messageError === null || messageError === void 0 ? void 0 : messageError.isToShow) {
        return (React.createElement(MessageBar, { messageBarType: messageError.messageBarType, isMultiline: true }, (_a = messageError === null || messageError === void 0 ? void 0 : messageError.message) !== null && _a !== void 0 ? _a : strings.MessageErrorDefault));
    }
    if (isLoading) {
        return (React.createElement(Stack, { horizontal: true, horizontalAlign: "center", verticalAlign: "center" },
            React.createElement(Spinner, { size: SpinnerSize.large })));
    }
    var dateFieldName = selectedProperties.dateFieldName, descriptionFieldName = selectedProperties.descriptionFieldName, imageUrlFieldName = selectedProperties.imageUrlFieldName, listId = selectedProperties.listId, sites = selectedProperties.sites, titleLink = selectedProperties.titleLink;
    if (!titleLink ||
        !sites ||
        !sites.length ||
        !listId ||
        !dateFieldName ||
        !descriptionFieldName ||
        !imageUrlFieldName) {
        return (React.createElement(Placeholder, { iconName: 'Edit', iconText: strings.PlaceholderIconText, description: strings.PlaceHolderDescription, buttonLabel: strings.PlaceHolderButtonDescription, onConfigure: function () { webpartContext.propertyPane.open(); } }));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.container },
            React.createElement("div", { className: styles.imageContainer },
                React.createElement("img", { className: styles.image, src: selectedItem ? selectedItem.imageUrl : "", width: "100%", height: "100%" }),
                React.createElement("div", { className: styles.overlay },
                    React.createElement("a", { rel: "noreferrer", target: "_blank", "data-interception": "off", className: styles.title, href: titleLink ? selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.linkUrl : "" }, selectedItem ? selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.title : ""))),
            React.createElement("div", { className: styles.list }, items.map(function (item, i) {
                var _isSeleted = item.id === selectedItem.id;
                return (React.createElement("div", { key: i },
                    i > 0 && i < items.length ? (React.createElement("div", { className: styles.lineSeparator })) : null,
                    React.createElement(BannerCard, { item: item, isSelected: _isSeleted, onSeletedItem: _onSelectedItem, selectedProperties: selectedProperties, currentCultureName: webpartContext.pageContext.cultureInfo.currentCultureName })));
            })))));
};
//# sourceMappingURL=Banner.js.map