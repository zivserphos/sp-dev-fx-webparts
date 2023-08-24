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
exports.AsyncDropdown = void 0;
var React = require("react");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var AsyncDropdown = /** @class */ (function (_super) {
    __extends(AsyncDropdown, _super);
    /*************************************************************************************
     * Component's constructor
     * @param props
     * @param state
     *************************************************************************************/
    function AsyncDropdown(props, state) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            processed: false,
            options: new Array(),
            selectedKey: props.selectedKey,
            error: null
        };
        return _this;
    }
    /*************************************************************************************
     * Called once after initial rendering
     *************************************************************************************/
    AsyncDropdown.prototype.componentDidMount = function () {
        this.loadOptions();
    };
    /*************************************************************************************
     * Called immediately after updating occurs
     *************************************************************************************/
    AsyncDropdown.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.disabled !== prevProps.disabled || this.props.stateKey !== prevProps.stateKey) {
            this.loadOptions();
        }
    };
    /*************************************************************************************
     * Loads the dropdown options asynchronously
     *************************************************************************************/
    AsyncDropdown.prototype.loadOptions = function () {
        var _this = this;
        this.setState({
            processed: false,
            error: null,
            options: new Array(),
            selectedKey: null
        });
        this.props.loadOptions().then(function (options) {
            _this.setState({
                processed: true,
                error: null,
                options: options,
                selectedKey: _this.props.selectedKey
            });
        })
            .catch(function (error) {
            _this.setState(function (prevState, props) {
                prevState.processed = true;
                prevState.error = error;
                return prevState;
            });
        });
    };
    /*************************************************************************************
     * Temporary fix because of an issue introducted in office-ui-fabric-react 4.32.0 :
     * https://github.com/OfficeDev/office-ui-fabric-react/issues/2719
     * Issue has been resolved but SPFX still refers to 4.32.0, so this is a temporary fix
     * while waiting for SPFX to use a more recent version of office-ui-fabric-react
     *************************************************************************************/
    AsyncDropdown.prototype.onChanged = function (option, index) {
        // reset previously selected options
        var options = this.state.options;
        options.forEach(function (o) {
            if (o.key !== option.key) {
                o.selected = false;
            }
        });
        this.setState(function (prevState, props) {
            prevState.options = options;
            prevState.selectedKey = option.key;
            return prevState;
        });
        if (this.props.onChanged) {
            this.props.onChanged(option, index);
        }
    };
    /*************************************************************************************
     * Renders the the AsyncDropdown component
     *************************************************************************************/
    AsyncDropdown.prototype.render = function () {
        var loading = !this.state.processed ? React.createElement(office_ui_fabric_react_1.Spinner, { label: this.props.loadingLabel }) : React.createElement("div", null);
        var error = this.state.error != null ? React.createElement("div", { className: "ms-TextField-errorMessage ms-u-slideDownIn20" }, sp_core_library_1.Text.format(this.props.errorLabelFormat, this.state.error)) : React.createElement("div", null);
        return (React.createElement("div", null,
            React.createElement(office_ui_fabric_react_1.Dropdown, { label: this.props.label, isDisabled: this.props.disabled, onChanged: this.onChanged.bind(this), selectedKey: this.state.selectedKey, options: this.state.options }),
            loading,
            error));
    };
    return AsyncDropdown;
}(React.Component));
exports.AsyncDropdown = AsyncDropdown;
//# sourceMappingURL=AsyncDropdown.js.map