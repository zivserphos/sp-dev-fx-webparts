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
exports.AsyncChecklist = void 0;
var React = require("react");
var sp_lodash_subset_1 = require("@microsoft/sp-lodash-subset");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var AsyncChecklist_module_scss_1 = require("./AsyncChecklist.module.scss");
var AsyncChecklist = /** @class */ (function (_super) {
    __extends(AsyncChecklist, _super);
    /*************************************************************************************
     * Component's constructor
     *************************************************************************************/
    function AsyncChecklist(props, state) {
        var _this = _super.call(this, props) || this;
        _this.state = { loading: true, items: [], error: null };
        _this.checkedItems = _this.getDefaultCheckedItems();
        return _this;
    }
    /*************************************************************************************
     * Gets the default checked items
     *************************************************************************************/
    AsyncChecklist.prototype.getDefaultCheckedItems = function () {
        return this.props.checkedItems ? (0, sp_lodash_subset_1.clone)(this.props.checkedItems) : new Array();
    };
    /*************************************************************************************
     * When a checkbox changes within the checklist
     * @param ev : The React.FormEvent object which contains the element that has changed
     * @param checked : Whether the checkbox is not checked or not
     *************************************************************************************/
    AsyncChecklist.prototype.onCheckboxChange = function (ev, checked) {
        var checkboxKey = ev.currentTarget.attributes.getNamedItem('value').value;
        var itemIndex = this.checkedItems.indexOf(checkboxKey);
        if (checked) {
            if (itemIndex == -1) {
                this.checkedItems.push(checkboxKey);
            }
        }
        else {
            if (itemIndex >= 0) {
                this.checkedItems.splice(itemIndex, 1);
            }
        }
        if (this.props.onChange) {
            this.props.onChange(this.checkedItems);
        }
    };
    /*************************************************************************************
     * Returns whether the checkbox with the specified ID should be checked or not
     * @param checkboxId
     *************************************************************************************/
    AsyncChecklist.prototype.isCheckboxChecked = function (checkboxId) {
        return (this.checkedItems.filter(function (checkedItem) { return checkedItem.toLowerCase().trim() == checkboxId.toLowerCase().trim(); }).length > 0);
    };
    /*************************************************************************************
     * Loads the checklist items asynchronously
     *************************************************************************************/
    AsyncChecklist.prototype.loadItems = function () {
        var _this_ = this;
        _this_.checkedItems = this.getDefaultCheckedItems();
        this.setState({
            loading: true,
            items: new Array(),
            error: null
        });
        this.props.loadItems().then(function (items) {
            _this_.setState(function (prevState, props) {
                prevState.loading = false;
                prevState.items = items;
                return prevState;
            });
        })
            .catch(function (error) {
            _this_.setState(function (prevState, props) {
                prevState.loading = false;
                prevState.error = error;
                return prevState;
            });
        });
    };
    /*************************************************************************************
     * Called once after initial rendering
     *************************************************************************************/
    AsyncChecklist.prototype.componentDidMount = function () {
        this.loadItems();
    };
    /*************************************************************************************
     * Called immediately after updating occurs
     *************************************************************************************/
    AsyncChecklist.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.disable !== prevProps.disable || this.props.stateKey !== prevProps.stateKey) {
            this.loadItems();
        }
    };
    /*************************************************************************************
     * Renders the the QueryFilter component
     *************************************************************************************/
    AsyncChecklist.prototype.render = function () {
        var _this = this;
        var loading = this.state.loading ? React.createElement(office_ui_fabric_react_1.Spinner, { label: this.props.strings.loading }) : React.createElement("div", null);
        var error = this.state.error != null ? React.createElement("div", { className: "ms-TextField-errorMessage ms-u-slideDownIn20" }, sp_core_library_1.Text.format(this.props.strings.errorFormat, this.state.error)) : React.createElement("div", null);
        var checklistItems = this.state.items.map(function (item, index) {
            return (React.createElement(office_ui_fabric_react_1.Checkbox, { id: item.id, label: item.label, defaultChecked: _this.isCheckboxChecked(item.id), disabled: _this.props.disable, onChange: _this.onCheckboxChange.bind(_this), inputProps: { value: item.id }, className: AsyncChecklist_module_scss_1.default.checklistItem, key: index }));
        });
        return (React.createElement("div", { className: AsyncChecklist_module_scss_1.default.checklist },
            React.createElement(office_ui_fabric_react_1.Label, null, this.props.strings.label),
            loading,
            !this.state.loading &&
                React.createElement("div", { className: AsyncChecklist_module_scss_1.default.checklistItems },
                    React.createElement("div", { className: AsyncChecklist_module_scss_1.default.checklistPadding }, checklistItems)),
            error));
    };
    return AsyncChecklist;
}(React.Component));
exports.AsyncChecklist = AsyncChecklist;
//# sourceMappingURL=AsyncChecklist.js.map