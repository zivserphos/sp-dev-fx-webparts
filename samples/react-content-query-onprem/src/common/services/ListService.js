"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListService = void 0;
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_http_1 = require("@microsoft/sp-http");
var ListService = /** @class */ (function () {
    /**************************************************************************************************
     * Constructor
     * @param httpClient : The spHttpClient required to perform REST calls against SharePoint
     **************************************************************************************************/
    function ListService(spHttpClient) {
        this.spHttpClient = spHttpClient;
    }
    /**************************************************************************************************
     * Performs a CAML query against the specified list and returns the resulting items
     * @param webUrl : The url of the web which contains the specified list
     * @param listId : The id of the list which contains the elements to query
     * @param camlQuery : The CAML query to perform on the specified list
     **************************************************************************************************/
    ListService.prototype.getListItemsByQuery = function (webUrl, listId, camlQuery) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var endpoint = sp_core_library_1.Text.format("{0}/_api/web/lists(guid'{1}')/GetItems?$expand=FieldValuesAsText,FieldValuesAsHtml", webUrl, listId);
            var data = {
                query: {
                    __metadata: { type: "SP.CamlQuery" },
                    ViewXml: camlQuery
                }
            };
            var options = { headers: { 'odata-version': '3.0' }, body: JSON.stringify(data) };
            _this.spHttpClient.post(endpoint, sp_http_1.SPHttpClient.configurations.v1, options)
                .then(function (postResponse) {
                if (postResponse.ok) {
                    resolve(postResponse.json());
                }
                else {
                    reject(postResponse);
                }
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    /**************************************************************************************************
     * Returns a sorted array of all available list titles for the specified web
     * @param webUrl : The web URL from which the list titles must be taken from
     **************************************************************************************************/
    ListService.prototype.getListTitlesFromWeb = function (webUrl) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var endpoint = sp_core_library_1.Text.format("{0}/_api/web/lists?$select=Id,Title&$filter=(IsPrivate eq false) and (IsCatalog eq false) and (Hidden eq false)", webUrl);
            _this.spHttpClient.get(endpoint, sp_http_1.SPHttpClient.configurations.v1).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        var listTitles = data.value.map(function (list) { return { id: list.Id, title: list.Title }; });
                        resolve(listTitles.sort(function (a, b) { return Number(a.title > b.title); }));
                    })
                        .catch(function (error) { reject(error); });
                }
                else {
                    reject(response);
                }
            })
                .catch(function (error) { reject(error); });
        });
    };
    /**************************************************************************************************
     * Returns the available fields for the specified list id
     * @param webUrl : The web URL from which the specified list is located
     * @param listId : The id of the list from which to load the fields
     * @param selectProperties : Optionnaly, the select properties to narrow down the query size
     * @param orderBy : Optionnaly, the by which the results needs to be ordered
     **************************************************************************************************/
    ListService.prototype.getListFields = function (webUrl, listId, selectProperties, orderBy) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var selectProps = selectProperties ? selectProperties.join(',') : '';
            var order = orderBy ? orderBy : 'InternalName';
            var endpoint = sp_core_library_1.Text.format("{0}/_api/web/lists(guid'{1}')/Fields?$select={2}&$orderby={3}", webUrl, listId, selectProps, order);
            _this.spHttpClient.get(endpoint, sp_http_1.SPHttpClient.configurations.v1).then(function (response) {
                if (response.ok) {
                    resolve(response.json());
                }
                else {
                    reject(response);
                }
            })
                .catch(function (error) { reject(error); });
        });
    };
    return ListService;
}());
exports.ListService = ListService;
//# sourceMappingURL=ListService.js.map