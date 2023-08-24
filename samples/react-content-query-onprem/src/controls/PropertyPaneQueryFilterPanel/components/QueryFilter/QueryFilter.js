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
exports.QueryFilter = void 0;
var React = require("react");
var moment = require("moment");
var sp_lodash_subset_1 = require("@microsoft/sp-lodash-subset");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var office_ui_fabric_react_2 = require("office-ui-fabric-react");
var office_ui_fabric_react_3 = require("office-ui-fabric-react");
var office_ui_fabric_react_4 = require("office-ui-fabric-react");
var QueryFilterOperator_1 = require("./QueryFilterOperator");
var QueryFilterJoin_1 = require("./QueryFilterJoin");
var QueryFilterFieldType_1 = require("./QueryFilterFieldType");
var QueryFilter_module_scss_1 = require("./QueryFilter.module.scss");
var QueryFilter = /** @class */ (function (_super) {
    __extends(QueryFilter, _super);
    /*************************************************************************************
     * Component's constructor
     * @param props
     * @param state
     *************************************************************************************/
    function QueryFilter(props, state) {
        var _this = _super.call(this, props) || this;
        moment.locale(_this.props.strings.datePickerLocale);
        _this.state = {
            filter: (_this.props.filter ? (0, sp_lodash_subset_1.cloneDeep)(_this.props.filter) : { index: 0, field: null, operator: QueryFilterOperator_1.QueryFilterOperator.Eq, value: '', join: QueryFilterJoin_1.QueryFilterJoin.Or }),
            pickersKey: Math.random()
        };
        _this.onAnyChange = _this.onAnyChange.bind(_this);
        return _this;
    }
    /*************************************************************************************
     * When the field Dropdown changes
     *************************************************************************************/
    QueryFilter.prototype.onFieldDropdownChange = function (option, index) {
        var field = this.props.fields.filter(function (f) { return f.internalName == option.key; });
        this.state.filter.field = field != null && field.length > 0 ? field[0] : null;
        this.state.filter.operator = (this.state.filter.field && (this.state.filter.field.type == QueryFilterFieldType_1.QueryFilterFieldType.User || this.state.filter.field.type == QueryFilterFieldType_1.QueryFilterFieldType.Taxonomy) ? QueryFilterOperator_1.QueryFilterOperator.ContainsAny : QueryFilterOperator_1.QueryFilterOperator.Eq);
        this.state.filter.value = null;
        this.state.filter.me = false;
        this.state.filter.includeTime = false;
        this.state.filter.expression = null;
        this.setState({ filter: this.state.filter, pickersKey: Math.random() });
        this.onAnyChange();
    };
    /*************************************************************************************
     * When the operator Dropdown changes
     *************************************************************************************/
    QueryFilter.prototype.onOperatorDropdownChange = function (option, index) {
        this.state.filter.operator = QueryFilterOperator_1.QueryFilterOperator[option.key];
        this.setState({ filter: this.state.filter, pickersKey: this.state.pickersKey });
        this.onAnyChange();
    };
    /*************************************************************************************
     * When the TextField value changes
     *************************************************************************************/
    QueryFilter.prototype.onValueTextFieldChange = function (newValue) {
        if (this.state.filter.value != newValue) {
            this.state.filter.value = newValue;
            this.onAnyChange();
        }
        return '';
    };
    /*************************************************************************************
     * When the people picker value changes
     *************************************************************************************/
    QueryFilter.prototype.onPeoplePickerResolve = function (items) {
        this.state.filter.value = items;
        this.onAnyChange();
    };
    /*************************************************************************************
     * When the "Me" checkbox changes
     * @param ev : The React.FormEvent object which contains the element that has changed
     * @param checked : Whether the checkbox is not checked or not
     *************************************************************************************/
    QueryFilter.prototype.onPeoplePickerCheckboxChange = function (ev, checked) {
        this.state.filter.me = checked;
        this.setState({ filter: this.state.filter, pickersKey: this.state.pickersKey });
        this.onAnyChange();
    };
    /*************************************************************************************
     * When the NormalPeoplePicker value changes
     *************************************************************************************/
    QueryFilter.prototype.onTaxonomyPickerResolve = function (items) {
        this.state.filter.value = items;
        this.onAnyChange();
    };
    /*************************************************************************************
     * When the date picker value changes
     *************************************************************************************/
    QueryFilter.prototype.onDatePickerChange = function (date) {
        this.state.filter.value = date;
        this.state.filter.expression = '';
        this.setState({ filter: this.state.filter, pickersKey: this.state.pickersKey });
        this.onAnyChange();
    };
    /*************************************************************************************
     * When the date expression text field value changes
     *************************************************************************************/
    QueryFilter.prototype.onDateExpressionChange = function (newValue) {
        // Validates the picker
        var regex = new RegExp(/^\[Today\](\s{0,}[\+-]\s{0,}\[{0,1}\d{1,4}\]{0,1}){0,1}$/);
        var isValid = regex.test(newValue) || (0, sp_lodash_subset_1.isEmpty)(newValue);
        var errorMsg = isValid ? '' : this.props.strings.datePickerExpressionError;
        if (isValid) {
            // If the change is NOT triggered by the date picker change
            if (!((0, sp_lodash_subset_1.isEmpty)(newValue) && this.state.filter.value != null)) {
                this.state.filter.value = null;
                this.state.filter.expression = newValue;
                this.setState({ filter: this.state.filter, pickersKey: this.state.pickersKey });
                this.onAnyChange();
            }
        }
        return errorMsg;
    };
    /*************************************************************************************
     * When the include time checkbox changes
     * @param ev : The React.FormEvent object which contains the element that has changed
     * @param checked : Whether the checkbox is not checked or not
     *************************************************************************************/
    QueryFilter.prototype.onDateIncludeTimeChange = function (ev, checked) {
        this.state.filter.includeTime = checked;
        this.onAnyChange();
    };
    /*************************************************************************************
     * When the join ChoiceGroup changes
     *************************************************************************************/
    QueryFilter.prototype.onJoinChoiceChange = function (ev, option) {
        if (option) {
            this.state.filter.join = QueryFilterJoin_1.QueryFilterJoin[option.key];
            this.onAnyChange();
        }
    };
    /*************************************************************************************
     * Call the parent onChanged with the updated IQueryFilter object
     *************************************************************************************/
    QueryFilter.prototype.onAnyChange = function () {
        if (this.props.onChanged) {
            this.props.onChanged(this.state.filter);
        }
    };
    /*************************************************************************************
     * Returns the options for the field Dropdown component
     *************************************************************************************/
    QueryFilter.prototype.getFieldDropdownOptions = function () {
        var options = [
            { key: "", text: this.props.strings.fieldSelectLabel }
        ];
        for (var _i = 0, _a = this.props.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            var option = { key: field.internalName, text: sp_core_library_1.Text.format("{0} \{\{{1}\}\}", field.displayName, field.internalName) };
            options.push(option);
        }
        return options;
    };
    /*************************************************************************************
     * Returns the options for the operator Dropdown component
     *************************************************************************************/
    QueryFilter.prototype.getOperatorDropdownOptions = function () {
        var fieldType = this.state.filter.field ? this.state.filter.field.type : QueryFilterFieldType_1.QueryFilterFieldType.Text;
        var options;
        // Operators for User and Taxonomy field types
        if (fieldType == QueryFilterFieldType_1.QueryFilterFieldType.User || fieldType == QueryFilterFieldType_1.QueryFilterFieldType.Taxonomy) {
            options = [
                { key: QueryFilterOperator_1.QueryFilterOperator[QueryFilterOperator_1.QueryFilterOperator.ContainsAny], text: this.props.strings.operatorContainsAnyLabel },
                { key: QueryFilterOperator_1.QueryFilterOperator[QueryFilterOperator_1.QueryFilterOperator.ContainsAll], text: this.props.strings.operatorContainsAllLabel },
                { key: QueryFilterOperator_1.QueryFilterOperator[QueryFilterOperator_1.QueryFilterOperator.IsNull], text: this.props.strings.operatorIsNullLabel },
                { key: QueryFilterOperator_1.QueryFilterOperator[QueryFilterOperator_1.QueryFilterOperator.IsNotNull], text: this.props.strings.operatorIsNotNullLabel }
            ];
        }
        // Operators for Text, Number, Datetime and Lookup field types
        else {
            options = [
                { key: QueryFilterOperator_1.QueryFilterOperator[QueryFilterOperator_1.QueryFilterOperator.Eq], text: this.props.strings.operatorEqualLabel },
                { key: QueryFilterOperator_1.QueryFilterOperator[QueryFilterOperator_1.QueryFilterOperator.Neq], text: this.props.strings.operatorNotEqualLabel },
                { key: QueryFilterOperator_1.QueryFilterOperator[QueryFilterOperator_1.QueryFilterOperator.Gt], text: this.props.strings.operatorGreaterLabel },
                { key: QueryFilterOperator_1.QueryFilterOperator[QueryFilterOperator_1.QueryFilterOperator.Lt], text: this.props.strings.operatorLessLabel },
                { key: QueryFilterOperator_1.QueryFilterOperator[QueryFilterOperator_1.QueryFilterOperator.Geq], text: this.props.strings.operatorGreaterEqualLabel },
                { key: QueryFilterOperator_1.QueryFilterOperator[QueryFilterOperator_1.QueryFilterOperator.Leq], text: this.props.strings.operatorLessEqualLabel },
                { key: QueryFilterOperator_1.QueryFilterOperator[QueryFilterOperator_1.QueryFilterOperator.IsNull], text: this.props.strings.operatorIsNullLabel },
                { key: QueryFilterOperator_1.QueryFilterOperator[QueryFilterOperator_1.QueryFilterOperator.IsNotNull], text: this.props.strings.operatorIsNotNullLabel }
            ];
            // Specific operators for text field type
            if (fieldType == QueryFilterFieldType_1.QueryFilterFieldType.Text) {
                options = options.concat([
                    { key: QueryFilterOperator_1.QueryFilterOperator[QueryFilterOperator_1.QueryFilterOperator.BeginsWith], text: this.props.strings.operatorBeginsWithLabel },
                    { key: QueryFilterOperator_1.QueryFilterOperator[QueryFilterOperator_1.QueryFilterOperator.Contains], text: this.props.strings.operatorContainsLabel }
                ]);
            }
        }
        return options;
    };
    /*************************************************************************************
     * Returns the options for the operator Dropdown component
     *************************************************************************************/
    QueryFilter.prototype.getJoinGroupOptions = function () {
        var options = [
            { key: QueryFilterJoin_1.QueryFilterJoin[QueryFilterJoin_1.QueryFilterJoin.And], text: this.props.strings.andLabel, checked: (this.state.filter.join == QueryFilterJoin_1.QueryFilterJoin.And) },
            { key: QueryFilterJoin_1.QueryFilterJoin[QueryFilterJoin_1.QueryFilterJoin.Or], text: this.props.strings.orLabel, checked: (this.state.filter.join == QueryFilterJoin_1.QueryFilterJoin.Or) }
        ];
        return options;
    };
    /*************************************************************************************
     * Returns the user suggestions based on the specified user-entered filter
     *************************************************************************************/
    QueryFilter.prototype.onLoadPeoplePickerSuggestions = function (filterText, currentPersonas, limitResults) {
        if ((0, sp_lodash_subset_1.isEmpty)(filterText)) {
            return [];
        }
        return this.props.onLoadPeoplePickerSuggestions(filterText, currentPersonas, limitResults);
    };
    /*************************************************************************************
     * Returns the tag suggestions based on the specified user-entered filter
     *************************************************************************************/
    QueryFilter.prototype.onLoadTagPickerSuggestions = function (filterText, currentTerms) {
        if ((0, sp_lodash_subset_1.isEmpty)(filterText)) {
            return [];
        }
        return this.props.onLoadTaxonomyPickerSuggestions(this.state.filter.field, filterText, currentTerms);
    };
    /*************************************************************************************
     * Converts the specified filter value into a Date object if valid, otherwise null
     * @param dateValue : The filter value that must be transformed into a Date object
     *************************************************************************************/
    QueryFilter.prototype.getDatePickerValue = function (dateValue) {
        if (dateValue instanceof Date) {
            return dateValue;
        }
        else if (typeof (dateValue) === 'string') {
            var date = moment(dateValue, moment.ISO_8601, true);
            if (date.isValid()) {
                return date.toDate();
            }
        }
        return null;
    };
    /*************************************************************************************
     * Converts the date resolved by the DatePicker into a formatted string
     * @param date : The date resolved by the DatePicker
     *************************************************************************************/
    QueryFilter.prototype.onDatePickerFormat = function (date) {
        return moment(date).format(this.props.strings.datePickerFormat);
    };
    /*************************************************************************************
     * Converts the string manually entered by the user in the people picker to a Date
     * @param dateStr : The string that must be parsed to a Date object
     *************************************************************************************/
    QueryFilter.prototype.onDatePickerParse = function (dateStr) {
        var date = moment(dateStr, this.props.strings.datePickerFormat, true);
        return date.toDate();
    };
    /*************************************************************************************
     * Renders the the QueryFilter component
     *************************************************************************************/
    QueryFilter.prototype.render = function () {
        var filterFieldKey = this.state.filter.field != null ? this.state.filter.field.internalName : "";
        var datePickerValue = this.getDatePickerValue(this.state.filter.value);
        var hideValueSection = this.state.filter.operator == QueryFilterOperator_1.QueryFilterOperator.IsNull || this.state.filter.operator == QueryFilterOperator_1.QueryFilterOperator.IsNotNull;
        var showTextField = (!this.state.filter.field || (this.state.filter.field.type == QueryFilterFieldType_1.QueryFilterFieldType.Text || this.state.filter.field.type == QueryFilterFieldType_1.QueryFilterFieldType.Number || this.state.filter.field.type == QueryFilterFieldType_1.QueryFilterFieldType.Lookup)) && !hideValueSection;
        var showPeoplePicker = this.state.filter.field && this.state.filter.field.type == QueryFilterFieldType_1.QueryFilterFieldType.User && !hideValueSection;
        var showTaxonomyPicker = this.state.filter.field && this.state.filter.field.type == QueryFilterFieldType_1.QueryFilterFieldType.Taxonomy && !hideValueSection;
        var showDatePicker = this.state.filter.field && this.state.filter.field.type == QueryFilterFieldType_1.QueryFilterFieldType.Datetime && !hideValueSection;
        var taxonomyPickerSuggestionProps = {
            suggestionsHeaderText: this.props.strings.taxonomyPickerSuggestionHeader,
            noResultsFoundText: this.props.strings.taxonomyPickerNoResults,
            loadingText: this.props.strings.taxonomyPickerLoading
        };
        var peoplePickerSuggestionProps = {
            suggestionsHeaderText: this.props.strings.peoplePickerSuggestionHeader,
            noResultsFoundText: this.props.strings.peoplePickerNoResults,
            loadingText: this.props.strings.peoplePickerLoading
        };
        return (React.createElement("div", { className: QueryFilter_module_scss_1.default.queryFilter + ' ' + (this.props.disabled ? QueryFilter_module_scss_1.default.disabled : '') },
            React.createElement("div", { className: QueryFilter_module_scss_1.default.paddingContainer },
                React.createElement(office_ui_fabric_react_1.Dropdown, { label: this.props.strings.fieldLabel, disabled: this.props.disabled, onChanged: this.onFieldDropdownChange.bind(this), selectedKey: filterFieldKey, options: this.getFieldDropdownOptions() }),
                React.createElement(office_ui_fabric_react_1.Dropdown, { label: this.props.strings.operatorLabel, disabled: this.props.disabled, onChanged: this.onOperatorDropdownChange.bind(this), selectedKey: QueryFilterOperator_1.QueryFilterOperator[this.state.filter.operator], options: this.getOperatorDropdownOptions() }),
                showTextField &&
                    React.createElement(office_ui_fabric_react_1.TextField, { label: this.props.strings.valueLabel, disabled: this.props.disabled, onGetErrorMessage: this.onValueTextFieldChange.bind(this), deferredValidationTime: 500, value: this.state.filter.value != null ? this.state.filter.value : '' }),
                showPeoplePicker &&
                    React.createElement("div", null,
                        React.createElement(office_ui_fabric_react_2.Label, null, this.props.strings.valueLabel),
                        React.createElement(office_ui_fabric_react_2.NormalPeoplePicker, { onResolveSuggestions: this.onLoadPeoplePickerSuggestions.bind(this), onChange: this.onPeoplePickerResolve.bind(this), defaultSelectedItems: this.state.filter.value, getTextFromItem: function (user) { return user.primaryText; }, pickerSuggestionsProps: peoplePickerSuggestionProps, className: QueryFilter_module_scss_1.default.peoplePicker + (this.state.filter.me ? ' ' + QueryFilter_module_scss_1.default.disabled : ''), inputProps: { disabled: this.state.filter.me }, key: "peoplePicker" + this.state.pickersKey }),
                        React.createElement(office_ui_fabric_react_4.Checkbox, { label: this.props.strings.peoplePickerMe, onChange: this.onPeoplePickerCheckboxChange.bind(this), checked: this.state.filter.me })),
                showTaxonomyPicker &&
                    React.createElement("div", null,
                        React.createElement(office_ui_fabric_react_2.Label, null, this.props.strings.valueLabel),
                        React.createElement(office_ui_fabric_react_3.TagPicker, { onResolveSuggestions: this.onLoadTagPickerSuggestions.bind(this), onChange: this.onTaxonomyPickerResolve.bind(this), defaultSelectedItems: this.state.filter.value, getTextFromItem: function (term) { return term.name; }, pickerSuggestionsProps: taxonomyPickerSuggestionProps, key: "taxonomyPicker" + this.state.pickersKey })),
                showDatePicker &&
                    React.createElement("div", null,
                        React.createElement(office_ui_fabric_react_4.DatePicker, { label: this.props.strings.valueLabel, placeholder: this.props.strings.datePickerDatePlaceholder, allowTextInput: true, value: datePickerValue, formatDate: this.onDatePickerFormat.bind(this), parseDateFromString: this.onDatePickerParse.bind(this), onSelectDate: this.onDatePickerChange.bind(this), strings: this.props.strings.datePickerStrings }),
                        React.createElement(office_ui_fabric_react_1.TextField, { placeholder: this.props.strings.datePickerExpressionPlaceholder, onGetErrorMessage: this.onDateExpressionChange.bind(this), deferredValidationTime: 500, value: this.state.filter.expression || '' }),
                        React.createElement(office_ui_fabric_react_4.Checkbox, { label: this.props.strings.datePickerIncludeTime, onChange: this.onDateIncludeTimeChange.bind(this), checked: this.state.filter.includeTime })),
                React.createElement(office_ui_fabric_react_1.ChoiceGroup, { options: this.getJoinGroupOptions(), onChange: this.onJoinChoiceChange.bind(this), disabled: this.props.disabled }))));
    };
    return QueryFilter;
}(React.Component));
exports.QueryFilter = QueryFilter;
//# sourceMappingURL=QueryFilter.js.map