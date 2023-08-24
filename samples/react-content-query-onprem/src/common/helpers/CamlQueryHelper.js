"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamlQueryHelper = void 0;
var moment = require("moment");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_lodash_subset_1 = require("@microsoft/sp-lodash-subset");
var QueryFilterOperator_1 = require("../../controls/PropertyPaneQueryFilterPanel/components/QueryFilter/QueryFilterOperator");
var QueryFilterJoin_1 = require("../../controls/PropertyPaneQueryFilterPanel/components/QueryFilter/QueryFilterJoin");
var QueryFilterFieldType_1 = require("../../controls/PropertyPaneQueryFilterPanel/components/QueryFilter/QueryFilterFieldType");
var CamlQueryHelper = /** @class */ (function () {
    function CamlQueryHelper() {
    }
    /*************************************************************************************************
     * Generates a full CAML query based on the provided IQuerySettings
     * @param querySettings : A IQuerySettings object required for generating the CAML query
     *************************************************************************************************/
    CamlQueryHelper.generateCamlQuery = function (querySettings) {
        var query = '';
        // Generates the <Where /> part
        if (querySettings.filters && !(0, sp_lodash_subset_1.isEmpty)(querySettings.filters)) {
            var sortedFilters = querySettings.filters.sort(function (a, b) { return a.index - b.index; });
            query += sp_core_library_1.Text.format('<Where>{0}</Where>', this.generateFilters(sortedFilters));
        }
        // Generates the <OrderBy /> part
        if (querySettings.orderBy && !(0, sp_lodash_subset_1.isEmpty)(querySettings.orderBy)) {
            var isAscending = querySettings.orderByDirection == 'desc' ? 'FALSE' : 'TRUE';
            query += sp_core_library_1.Text.format("<OrderBy><FieldRef Name='{0}' Ascending='{1}' /></OrderBy>", querySettings.orderBy, isAscending);
        }
        // Wraps the <Where /> and <OrderBy /> into a <Query /> tag
        query = sp_core_library_1.Text.format('<Query>{0}</Query>', query);
        // Generates the <RowLimit /> part
        if (querySettings.limitEnabled) {
            query += sp_core_library_1.Text.format('<RowLimit>{0}</RowLimit>', querySettings.itemLimit);
        }
        // Generates the <ViewFields /> part
        if (querySettings.viewFields && !(0, sp_lodash_subset_1.isEmpty)(querySettings.viewFields)) {
            query += sp_core_library_1.Text.format('<ViewFields>{0}</ViewFields>', querySettings.viewFields.map(function (field) { return sp_core_library_1.Text.format("<FieldRef Name='{0}' />", field); }).join(''));
        }
        // Wraps the everything into a final <View /> tag
        if (querySettings.recursiveEnabled) {
            query = sp_core_library_1.Text.format('<View Scope="RecursiveAll">{0}</View>', query);
        }
        else {
            query = sp_core_library_1.Text.format('<View>{0}</View>', query);
        }
        return query;
    };
    /*************************************************************************************************
     * Generates the CAML filters based on the specified array of IQueryFilter objects
     * @param filters : The filters that needs to be converted to a CAML string
     *************************************************************************************************/
    CamlQueryHelper.generateFilters = function (filters) {
        // Store the generic filter format for later use
        var query = '';
        var filterXml = '';
        // Appends a CAML node for each filter
        var itemCount = 0;
        for (var _i = 0, _a = filters.reverse(); _i < _a.length; _i++) {
            var filter = _a[_i];
            filterXml = '<{0}><FieldRef Name="{1}" /><Value {2} Type="{3}">{4}</Value></{0}>';
            itemCount++;
            var specialAttribute = '';
            // Sets the special attribute if needed
            if (filter.field.type == QueryFilterFieldType_1.QueryFilterFieldType.Datetime) {
                specialAttribute = 'IncludeTimeValue="' + filter.includeTime + '"';
            }
            // If it's a <IsNull /> or <IsNotNull> filter
            if (filter.operator == QueryFilterOperator_1.QueryFilterOperator.IsNull || filter.operator == QueryFilterOperator_1.QueryFilterOperator.IsNotNull) {
                filterXml = '<{0}><FieldRef Name="{1}" /></{0}>';
                query += sp_core_library_1.Text.format(filterXml, QueryFilterOperator_1.QueryFilterOperator[filter.operator], filter.field.internalName);
            }
            // If it's a taxonomy filter
            else if (filter.field.type == QueryFilterFieldType_1.QueryFilterFieldType.Taxonomy) {
                query += this.generateTaxonomyFilter(filter);
            }
            // If it's a user filter
            else if (filter.field.type == QueryFilterFieldType_1.QueryFilterFieldType.User) {
                query += this.generateUserFilter(filter);
            }
            // If it's any other kind of filter (Text, DateTime, Lookup, Number etc...)
            else {
                var valueType = (filter.field.type == QueryFilterFieldType_1.QueryFilterFieldType.Lookup ? QueryFilterFieldType_1.QueryFilterFieldType[QueryFilterFieldType_1.QueryFilterFieldType.Text] : QueryFilterFieldType_1.QueryFilterFieldType[filter.field.type]);
                query += sp_core_library_1.Text.format(filterXml, QueryFilterOperator_1.QueryFilterOperator[filter.operator], filter.field.internalName, specialAttribute, valueType, this.formatFilterValue(filter));
            }
            // Appends the Join tags if needed
            if (itemCount >= 2) {
                var logicalJoin = QueryFilterJoin_1.QueryFilterJoin[filter.join];
                query = sp_core_library_1.Text.format("<{0}>", logicalJoin) + query;
                query += sp_core_library_1.Text.format("</{0}>", logicalJoin);
            }
        }
        return query;
    };
    /*************************************************************************************************
     * Generates a valid CAML filter string based on the specified taxonomy filter
     * @param filter : The taxonomy filter that needs to be formatted into a CAML filter string
     *************************************************************************************************/
    CamlQueryHelper.generateTaxonomyFilter = function (filter) {
        var filterOutput = '';
        var filterTerms = filter.value;
        if ((0, sp_lodash_subset_1.isEmpty)(filter.value)) {
            return '';
        }
        else if (filter.operator == QueryFilterOperator_1.QueryFilterOperator.ContainsAny || filterTerms == null) {
            var values = filterTerms != null ? filterTerms.map(function (x) { return sp_core_library_1.Text.format("<Value Type='Integer'>{0}</Value>", x.key); }).join('') : '';
            filterOutput = sp_core_library_1.Text.format("<In><FieldRef Name='{0}' LookupId='TRUE' /><Values>{1}</Values></In>", filter.field.internalName, values);
        }
        else if (filter.operator == QueryFilterOperator_1.QueryFilterOperator.ContainsAll) {
            var taxFilters = [];
            for (var _i = 0, filterTerms_1 = filterTerms; _i < filterTerms_1.length; _i++) {
                var term = filterTerms_1[_i];
                var termValue = [term];
                var taxFilter = {
                    index: null,
                    field: filter.field,
                    value: termValue,
                    join: QueryFilterJoin_1.QueryFilterJoin.And,
                    operator: QueryFilterOperator_1.QueryFilterOperator.ContainsAny
                };
                taxFilters.push(taxFilter);
            }
            filterOutput = this.generateFilters(taxFilters);
        }
        return filterOutput;
    };
    /*************************************************************************************************
     * Generates a valid CAML filter string based on the specified user filter
     * @param filter : The user filter that needs to be formatted into a CAML filter string
     *************************************************************************************************/
    CamlQueryHelper.generateUserFilter = function (filter) {
        var filterOutput = '';
        var filterUsers = filter.value;
        if (filter.me) {
            filterOutput = sp_core_library_1.Text.format("<Eq><FieldRef Name='{0}' /><Value Type='Integer'><UserID /></Value></Eq>", filter.field.internalName);
        }
        else if ((0, sp_lodash_subset_1.isEmpty)(filter.value)) {
            return '';
        }
        else if (filter.operator == QueryFilterOperator_1.QueryFilterOperator.ContainsAny || filterUsers == null) {
            var values = filterUsers != null ? filterUsers.map(function (x) { return sp_core_library_1.Text.format("<Value Type='Integer'>{0}</Value>", x.optionalText); }).join('') : '';
            filterOutput = sp_core_library_1.Text.format("<In><FieldRef Name='{0}' LookupId='TRUE' /><Values>{1}</Values></In>", filter.field.internalName, values);
        }
        else if (filter.operator == QueryFilterOperator_1.QueryFilterOperator.ContainsAll) {
            var userFilters = [];
            for (var _i = 0, filterUsers_1 = filterUsers; _i < filterUsers_1.length; _i++) {
                var user = filterUsers_1[_i];
                var userValue = [user];
                var userFilter = {
                    index: null,
                    field: filter.field,
                    value: userValue,
                    join: QueryFilterJoin_1.QueryFilterJoin.And,
                    operator: QueryFilterOperator_1.QueryFilterOperator.ContainsAny
                };
                userFilters.push(userFilter);
            }
            filterOutput = this.generateFilters(userFilters);
        }
        return filterOutput;
    };
    /*************************************************************************************************
     * Returns the value of the specified filter correctly formatted based on its type of value
     * @param filter : The filter that needs its value to be formatted
     *************************************************************************************************/
    CamlQueryHelper.formatFilterValue = function (filter) {
        var filterValue = "";
        if (filter.field.type == QueryFilterFieldType_1.QueryFilterFieldType.Datetime) {
            if (filter.expression != null && !(0, sp_lodash_subset_1.isEmpty)(filter.expression)) {
                filterValue = this.formatDateExpressionFilterValue(filter.expression);
            }
            else {
                filterValue = this.formatDateFilterValue(filter.value);
            }
        }
        else {
            filterValue = this.formatTextFilterValue(filter.value);
        }
        return filterValue;
    };
    /*************************************************************************************************
     * Converts the specified serialized ISO date into the required string format
     * @param dateValue : A valid ISO 8601 date string
     *************************************************************************************************/
    CamlQueryHelper.formatDateFilterValue = function (dateValue) {
        var date = moment(dateValue, moment.ISO_8601, true);
        if (date.isValid()) {
            dateValue = date.format("YYYY-MM-DDTHH:mm:ss\\Z");
        }
        return dateValue || '';
    };
    /*************************************************************************************************
     * Replaces any "[Today]" or "[Today] +/- [digit]" expression by it's actual value
     * @param filterValue : The filter value
     *************************************************************************************************/
    CamlQueryHelper.formatDateExpressionFilterValue = function (filterValue) {
        // Replaces any "[Today] +/- [digit]" expression
        var regex = new RegExp("\\[Today\\]\\s*[\\+-]\\s*\\[{0,1}\\d{1,}\\]{0,1}");
        var results = regex.exec(filterValue);
        if (results != null) {
            for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
                var result = results_1[_i];
                var operator = result.indexOf('+') > 0 ? '+' : '-';
                var addOrRemove = operator == '+' ? 1 : -1;
                var operatorSplit = result.split(operator);
                var digit = parseInt(operatorSplit[operatorSplit.length - 1].replace("[", "").replace("]", "").trim()) * addOrRemove;
                var dt = new Date();
                dt.setDate(dt.getDate() + digit);
                var formatDate = moment(dt).format("YYYY-MM-DDTHH:mm:ss\\Z");
                filterValue = filterValue.replace(result, formatDate);
            }
        }
        // Replaces any "[Today]" expression by it's actual value
        var formattedDate = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss\\Z");
        filterValue = filterValue.replace("[Today]", formattedDate);
        return filterValue;
    };
    /*************************************************************************************************
     * Formats the specified text filter value
     * @param textValue : The text filter value which needs to be formatted
     *************************************************************************************************/
    CamlQueryHelper.formatTextFilterValue = function (textValue) {
        var regex = new RegExp("\\[PageQueryString:[A-Za-z0-9_-]*\\]");
        var results = regex.exec(textValue);
        if (results != null) {
            for (var _i = 0, results_2 = results; _i < results_2.length; _i++) {
                var result = results_2[_i];
                var parameter = result.substring(17, result.length - 1);
                textValue = textValue.replace(result, this.getUrlParameter(parameter));
            }
        }
        return textValue != null ? textValue : '';
    };
    /*************************************************************************************************
     * Returns the value of the query string parameter with the specified name
     * @param name : The name of the query string parameter
     * @param url : Optionnaly, the specific url to use instead of the current url
     *************************************************************************************************/
    CamlQueryHelper.getUrlParameter = function (name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };
    return CamlQueryHelper;
}());
exports.CamlQueryHelper = CamlQueryHelper;
//# sourceMappingURL=CamlQueryHelper.js.map