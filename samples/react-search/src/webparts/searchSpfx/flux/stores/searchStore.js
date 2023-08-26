"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchStoreStatic = void 0;
var appDispatcher_1 = require("../dispatcher/appDispatcher");
var searchActionIDs_1 = require("../actions/searchActionIDs");
var SearchTokenHelper_1 = require("../helpers/SearchTokenHelper");
var sp_http_1 = require("@microsoft/sp-http");
var fbemitter_1 = require("fbemitter");
var CHANGE_EVENT = 'change';
var SearchStoreStatic = /** @class */ (function (_super) {
    __extends(SearchStoreStatic, _super);
    function SearchStoreStatic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._results = [];
        return _this;
    }
    /**
     * @param {function} callback
     */
    SearchStoreStatic.prototype.addChangeListener = function (callback) {
        this.addListener(CHANGE_EVENT, callback);
    };
    /**
     * @param {function} callback
     */
    SearchStoreStatic.prototype.removeChangeListener = function (callback) {
        this.removeCurrentListener();
    };
    SearchStoreStatic.prototype.emitChange = function () {
        this.emit(CHANGE_EVENT);
    };
    SearchStoreStatic.prototype.getSearchResults = function () {
        return this._results;
    };
    SearchStoreStatic.prototype.setSearchResults = function (crntResults, fields) {
        if (crntResults.length > 0) {
            var flds_1 = fields.toLowerCase().split(',');
            var temp_1 = [];
            crntResults.forEach(function (result) {
                // Create a temp value
                var val = {};
                result.Cells.forEach(function (cell) {
                    if (flds_1.indexOf(cell.Key.toLowerCase()) !== -1) {
                        // Add key and value to temp value
                        val[cell.Key] = cell.Value;
                    }
                });
                // Push this to the temp array
                temp_1.push(val);
            });
            this._results = temp_1;
        }
        else {
            this._results = [];
        }
    };
    /**
     * @param {IWebPartContext} context
     * @param {string} url
     */
    SearchStoreStatic.prototype.GetSearchData = function (context, url) {
        return context.spHttpClient.get(url, sp_http_1.SPHttpClient.configurations.v1).then(function (res) {
            return res.json();
        });
    };
    /**
     * @param {string} value
     */
    SearchStoreStatic.prototype.isEmptyString = function (value) {
        return value === null || typeof value === "undefined" || !value.length;
    };
    /**
     * @param {any} value
     */
    SearchStoreStatic.prototype.isNull = function (value) {
        return value === null || typeof value === "undefined";
    };
    SearchStoreStatic.prototype.setLoggingInfo = function (url, response) {
        this._url = url;
        this._response = response;
    };
    SearchStoreStatic.prototype.getLoggingInfo = function () {
        return {
            URL: this._url,
            Response: this._response
        };
    };
    return SearchStoreStatic;
}(fbemitter_1.EventEmitter));
exports.SearchStoreStatic = SearchStoreStatic;
var searchStore = new SearchStoreStatic();
appDispatcher_1.default.register(function (action) {
    switch (action.actionType) {
        case searchActionIDs_1.default.SEARCH_GET:
            var tokenHelper = new SearchTokenHelper_1.default();
            var url_1 = action.context.pageContext.web.absoluteUrl + "/_api/search/query?querytext=";
            // Check if a query is provided
            url_1 += !searchStore.isEmptyString(action.query) ? "'".concat(tokenHelper.replaceTokens(action.query, action.context), "'") : "'*'";
            // Check if there are fields provided
            url_1 += '&selectproperties=';
            url_1 += !searchStore.isEmptyString(action.fields) ? "'".concat(action.fields, "'") : "'path,title'";
            // Add the rowlimit
            url_1 += "&rowlimit=";
            url_1 += !searchStore.isNull(action.maxResults) ? action.maxResults : 10;
            // Add sorting
            url_1 += !searchStore.isEmptyString(action.sorting) ? "&sortlist='".concat(action.sorting, "'") : "";
            // Add the client type
            url_1 += "&clienttype='ContentSearchRegular'";
            searchStore.GetSearchData(action.context, url_1).then(function (res) {
                searchStore.setLoggingInfo(url_1, res);
                var resultsRetrieved = false;
                if (res !== null) {
                    if (typeof res.PrimaryQueryResult !== 'undefined') {
                        if (typeof res.PrimaryQueryResult.RelevantResults !== 'undefined') {
                            if (typeof res.PrimaryQueryResult.RelevantResults !== 'undefined') {
                                if (typeof res.PrimaryQueryResult.RelevantResults.Table !== 'undefined') {
                                    if (typeof res.PrimaryQueryResult.RelevantResults.Table.Rows !== 'undefined') {
                                        resultsRetrieved = true;
                                        searchStore.setSearchResults(res.PrimaryQueryResult.RelevantResults.Table.Rows, action.fields);
                                    }
                                }
                            }
                        }
                    }
                }
                // Reset the store its search result set on error
                if (!resultsRetrieved) {
                    searchStore.setSearchResults([], null);
                }
                searchStore.emitChange();
            });
            break;
    }
});
exports.default = searchStore;
//# sourceMappingURL=searchStore.js.map