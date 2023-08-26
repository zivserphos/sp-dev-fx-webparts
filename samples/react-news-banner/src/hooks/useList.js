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
/* tslint:disable */
import { Web } from "@pnp/sp";
import { sortBy, uniqBy } from "lodash";
export var useList = function () {
    // Get List Columns
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var getListColumns = function (webUrl, listId) { return __awaiter(void 0, void 0, void 0, function () {
        var web, _listColumnsResults, _wColumns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    web = new Web(webUrl);
                    return [4 /*yield*/, web.lists
                            .getById(listId)
                            .fields.filter("Hidden eq false")
                            .get()];
                case 1:
                    _listColumnsResults = _a.sent();
                    _wColumns = uniqBy(sortBy(_listColumnsResults, "Title"), "Title");
                    console.log(_wColumns);
                    return [2 /*return*/, _wColumns];
            }
        });
    }); };
    var getItems = function (seletedProperties) { return __awaiter(void 0, void 0, void 0, function () {
        var dateFieldName, titleFieldName, descriptionFieldName, imageUrlFieldName, listId, numberItems, titleLink, sites, listItems, web, sortField, _listResults, _i, _listResults_1, item;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    dateFieldName = seletedProperties.dateFieldName, titleFieldName = seletedProperties.titleFieldName, descriptionFieldName = seletedProperties.descriptionFieldName, imageUrlFieldName = seletedProperties.imageUrlFieldName, listId = seletedProperties.listId, numberItems = seletedProperties.numberItems, titleLink = seletedProperties.titleLink, sites = seletedProperties.sites;
                    listItems = [];
                    if (!listId && !sites)
                        return [2 /*return*/, []];
                    web = new Web(sites[0].url);
                    sortField = dateFieldName !== null && dateFieldName !== void 0 ? dateFieldName : "Title";
                    return [4 /*yield*/, web.lists
                            .getById(listId)
                            .items.orderBy(sortField, false)
                            .top(numberItems !== null && numberItems !== void 0 ? numberItems : 3)
                            .get()];
                case 1:
                    _listResults = _c.sent();
                    if (_listResults && _listResults.length) {
                        for (_i = 0, _listResults_1 = _listResults; _i < _listResults_1.length; _i++) {
                            item = _listResults_1[_i];
                            listItems.push({
                                id: item.ID,
                                title: item[titleFieldName],
                                description: item[descriptionFieldName],
                                imageUrl: (_a = item[imageUrlFieldName]) === null || _a === void 0 ? void 0 : _a.Url,
                                linkUrl: (_b = item[titleLink]) === null || _b === void 0 ? void 0 : _b.Url,
                                publishedDate: item[dateFieldName],
                            });
                        }
                    }
                    return [2 /*return*/, listItems];
            }
        });
    }); };
    // Get Lists
    var getLists = function (webUrl, baseTemplate) { return __awaiter(void 0, void 0, void 0, function () {
        var _filter, web, _lists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _filter = "Hidden eq false and ";
                    if (baseTemplate === 0) {
                        _filter = _filter + " BaseType ne 1";
                    }
                    else {
                        _filter = _filter + " BaseType eq 1";
                    }
                    web = new Web(webUrl);
                    return [4 /*yield*/, web.lists.filter(_filter).get()];
                case 1:
                    _lists = _a.sent();
                    console.log("lists", _lists);
                    return [2 /*return*/, _lists];
            }
        });
    }); };
    // Return functions
    return {
        getListColumns: getListColumns,
        getLists: getLists,
        getItems: getItems,
    };
};
//# sourceMappingURL=useList.js.map