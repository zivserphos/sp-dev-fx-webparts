var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart, PropertyPaneDropdown, PropertyPaneSlider, PropertyPaneTextField, } from "@microsoft/sp-webpart-base";
import * as strings from "BannerWebPartStrings";
import { Banner } from "../../components/Banner";
import { useList } from "../../hooks/useList";
import { PropertyFieldSitePicker, } from "@pnp/spfx-property-controls";
import { sp } from "@pnp/sp";
// eslint-disable-next-line react-hooks/rules-of-hooks
var _a = useList(), getListColumns = _a.getListColumns, getLists = _a.getLists;
var BannerWebPart = /** @class */ (function (_super) {
    __extends(BannerWebPart, _super);
    function BannerWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textColumns = [];
        _this.dateColumns = [];
        _this.URLColumns = [];
        _this.columns = [];
        _this.lists = [];
        _this.listColumns = [];
        _this._messageError = undefined;
        _this.addLists = function (webUrl) { return __awaiter(_this, void 0, void 0, function () {
            var lists, _i, lists_1, list, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.lists = [];
                        return [4 /*yield*/, getLists(webUrl, 0)];
                    case 1:
                        lists = _a.sent();
                        for (_i = 0, lists_1 = lists; _i < lists_1.length; _i++) {
                            list = lists_1[_i];
                            this.lists.push({
                                key: list.Id,
                                text: list.Title,
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        this._messageError = error_1.message;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    BannerWebPart.prototype.onInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                sp.setup({
                    spfxContext: this.context,
                });
                return [2 /*return*/, Promise.resolve()];
            });
        });
    };
    BannerWebPart.prototype.render = function () {
        var element = React.createElement(Banner, {
            selectedProperties: {
                title: this.properties.titleFieldName,
                listId: this.properties.listId,
                titleFieldName: this.properties.titleFieldName,
                dateFieldName: this.properties.dateFieldName,
                descriptionFieldName: this.properties.descriptionFieldName,
                imageUrlFieldName: this.properties.imageUrlFieldName,
                listBasetemplate: this.properties.listBasetemplate,
                numberItems: this.properties.numberItems,
                sites: this.properties.sites,
                titleLink: this.properties.titleLink,
            },
            webpartContext: this.context,
        });
        ReactDom.render(element, this.domElement);
    };
    BannerWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(BannerWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse("1.0");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BannerWebPart.prototype, "disableReactivePropertyChanges", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    BannerWebPart.prototype.onPropertyPaneConfigurationStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.properties.titleFieldName ||
                            this.properties.descriptionFieldName ||
                            this.properties.dateFieldName ||
                            this.properties.imageUrlFieldName ||
                            this.properties.listId ||
                            (this.properties.sites && this.properties.sites.length))) return [3 /*break*/, 4];
                        if (!!this.lists.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.addLists(this.properties.sites[0].url)];
                    case 1:
                        _a.sent();
                        this.context.propertyPane.refresh();
                        _a.label = 2;
                    case 2:
                        if (!(!this.listColumns.length && this.properties.listId)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.addListColumns(this.properties.listId)];
                    case 3:
                        _a.sent();
                        this.context.propertyPane.refresh();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BannerWebPart.prototype.onPropertyPaneFieldChanged = function (propertyPath, oldValue, newValue) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(propertyPath === "listId")) return [3 /*break*/, 3];
                        this.listColumns = [];
                        console.log("listd", this.properties.listId);
                        if (!(newValue === "")) return [3 /*break*/, 1];
                        this.properties.titleFieldName = "";
                        this.properties.descriptionFieldName = "";
                        this.properties.dateFieldName = "";
                        this.properties.imageUrlFieldName = "";
                        this.properties.titleLink = "";
                        this.properties.numberItems = 6;
                        this.context.propertyPane.refresh();
                        return [2 /*return*/];
                    case 1:
                        this.context.propertyPane.refresh();
                        return [4 /*yield*/, this.addListColumns(newValue)];
                    case 2:
                        _a.sent();
                        this.context.propertyPane.refresh();
                        _a.label = 3;
                    case 3:
                        if (!(propertyPath === "sites")) return [3 /*break*/, 6];
                        value = newValue;
                        if (!(value && !value.length)) return [3 /*break*/, 4];
                        this.properties.titleFieldName = "";
                        this.properties.descriptionFieldName = "";
                        this.properties.dateFieldName = "";
                        this.properties.imageUrlFieldName = "";
                        this.properties.listId = "";
                        this.properties.titleLink = "";
                        this.properties.numberItems = 6;
                        this.context.propertyPane.refresh();
                        return [2 /*return*/];
                    case 4:
                        this.context.propertyPane.refresh();
                        return [4 /*yield*/, this.addLists(value[0].url)];
                    case 5:
                        _a.sent();
                        this.context.propertyPane.refresh();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BannerWebPart.prototype.addListColumns = function (newValue) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _i, _b, _column, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        this.listColumns = [];
                        _a = this;
                        return [4 /*yield*/, getListColumns(this.properties.sites[0].url, newValue)];
                    case 1:
                        _a.listColumns = _c.sent();
                        for (_i = 0, _b = this.listColumns; _i < _b.length; _i++) {
                            _column = _b[_i];
                            if ((_column.TypeAsString === "Text" ||
                                _column.TypeAsString === "Note") &&
                                (_column.RichText === false || _column.RichText === undefined)) {
                                this.textColumns.push({
                                    key: _column.InternalName,
                                    text: _column.Title,
                                });
                            }
                            if (_column.TypeAsString === "DateTime") {
                                this.dateColumns.push({
                                    key: _column.InternalName,
                                    text: _column.Title,
                                });
                            }
                            if (_column.TypeAsString === "URL") {
                                this.URLColumns.push({
                                    key: _column.InternalName,
                                    text: _column.Title,
                                });
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _c.sent();
                        console.log(error_2);
                        this._messageError = error_2.message;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BannerWebPart.prototype.getPropertyPaneConfiguration = function () {
        var _pages = [
            {
                header: {
                    description: strings.PropertyPaneDescription,
                },
                groups: [
                    {
                        groupName: strings.BasicGroupName,
                        groupFields: [
                            PropertyPaneTextField("title", {
                                label: strings.DescriptionFieldLabel,
                            }),
                        ],
                    },
                ],
            },
        ];
        var groups = _pages[0].groups[0];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var groupFields = groups.groupFields;
        groupFields.push(PropertyFieldSitePicker("sites", {
            label: "Select site",
            initialSites: this.properties.sites,
            context: this.context,
            deferredValidationTime: 500,
            multiSelect: false,
            onPropertyChange: this.onPropertyPaneFieldChanged,
            properties: this.properties,
            key: "sitesFieldId",
        }));
        if (this.properties.sites && this.properties.sites.length) {
            groupFields.push(PropertyPaneDropdown("listId", {
                label: strings.ListIdLabel,
                options: this.lists,
                selectedKey: this.properties.listId,
            }));
            // Show Columns
            if (this.listColumns.length) {
                groupFields.push(PropertyPaneDropdown("titleFieldName", {
                    label: strings.TitleFieldLabel,
                    options: this.textColumns,
                    selectedKey: this.properties.titleFieldName,
                }));
                groupFields.push(PropertyPaneDropdown("dateFieldName", {
                    label: "Select field with published date",
                    options: this.dateColumns,
                    selectedKey: this.properties.dateFieldName,
                }));
                groupFields.push(PropertyPaneDropdown("descriptionFieldName", {
                    label: "Select field with description",
                    options: this.textColumns,
                    selectedKey: this.properties.descriptionFieldName,
                }));
                groupFields.push(PropertyPaneDropdown("imageUrlFieldName", {
                    label: "Select field width image url",
                    options: this.URLColumns,
                    selectedKey: this.properties.imageUrlFieldName,
                }));
                groupFields.push(PropertyPaneDropdown("titleLink", {
                    label: "Select field for title link",
                    options: this.URLColumns,
                    selectedKey: this.properties.titleLink,
                }));
                groupFields.push(PropertyPaneSlider("numberItems", {
                    label: "Number Items to Show",
                    min: 3,
                    max: 20,
                    value: this.properties.numberItems
                        ? this.properties.numberItems
                        : 3,
                }));
            }
        }
        var _panelConfiguration = { pages: _pages };
        return _panelConfiguration;
    };
    return BannerWebPart;
}(BaseClientSideWebPart));
export default BannerWebPart;
//# sourceMappingURL=BannerWebPart.js.map