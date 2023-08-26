"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchActionsStatic = void 0;
var appDispatcher_1 = require("../dispatcher/appDispatcher");
var searchActionIDs_1 = require("./searchActionIDs");
var SearchActionsStatic = /** @class */ (function () {
    function SearchActionsStatic() {
    }
    /**
     * @param  {string} query
     * @param  {string} fields
     */
    SearchActionsStatic.prototype.get = function (context, query, maxResults, sorting, fields) {
        appDispatcher_1.default.dispatch({
            actionType: searchActionIDs_1.default.SEARCH_GET,
            context: context,
            query: query,
            maxResults: maxResults,
            sorting: sorting,
            fields: fields
        });
    };
    return SearchActionsStatic;
}());
exports.SearchActionsStatic = SearchActionsStatic;
var searchActions = new SearchActionsStatic();
exports.default = searchActions;
//# sourceMappingURL=searchActions.js.map