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
exports.TextDialog = void 0;
var React = require("react");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var office_ui_fabric_react_2 = require("office-ui-fabric-react");
var react_ace_1 = require("react-ace");
var TextDialog_module_scss_1 = require("./TextDialog.module.scss");
require("./AceEditor.module.scss");
require("brace");
require("brace/mode/html");
require("brace/theme/monokai");
require("brace/ext/language_tools");
var TextDialog = /** @class */ (function (_super) {
    __extends(TextDialog, _super);
    /*************************************************************************************
     * Component's constructor
     * @param props
     * @param state
     *************************************************************************************/
    function TextDialog(props, state) {
        var _this = _super.call(this, props) || this;
        _this.state = { dialogText: _this.props.dialogTextFieldValue, showDialog: false };
        return _this;
    }
    /*************************************************************************************
     * Shows the dialog
     *************************************************************************************/
    TextDialog.prototype.showDialog = function () {
        this.setState({ dialogText: this.state.dialogText, showDialog: true });
    };
    /*************************************************************************************
     * Notifies the parent with the dialog's latest value, then closes the dialog
     *************************************************************************************/
    TextDialog.prototype.saveDialog = function () {
        this.setState({ dialogText: this.state.dialogText, showDialog: false });
        if (this.props.onChanged) {
            this.props.onChanged(this.state.dialogText);
        }
    };
    /*************************************************************************************
     * Closes the dialog without notifying the parent for any changes
     *************************************************************************************/
    TextDialog.prototype.cancelDialog = function () {
        this.setState({ dialogText: this.state.dialogText, showDialog: false });
    };
    /*************************************************************************************
     * Updates the dialog's value each time the textfield changes
     *************************************************************************************/
    TextDialog.prototype.onDialogTextChanged = function (newValue) {
        this.setState({ dialogText: newValue, showDialog: this.state.showDialog });
    };
    /*************************************************************************************
     * Called immediately after updating occurs
     *************************************************************************************/
    TextDialog.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.disabled !== prevProps.disabled || this.props.stateKey !== prevProps.stateKey) {
            this.setState({ dialogText: this.props.dialogTextFieldValue, showDialog: this.state.showDialog });
        }
    };
    /*************************************************************************************
     * Renders the the TextDialog component
     *************************************************************************************/
    TextDialog.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(office_ui_fabric_react_2.Label, null, this.props.strings.dialogButtonLabel),
            React.createElement(office_ui_fabric_react_2.Button, { label: this.props.strings.dialogButtonLabel, onClick: this.showDialog.bind(this) }, this.props.strings.dialogButtonText),
            React.createElement(office_ui_fabric_react_1.Dialog, { type: office_ui_fabric_react_1.DialogType.normal, isOpen: this.state.showDialog, onDismiss: this.cancelDialog.bind(this), title: this.props.strings.dialogTitle, subText: this.props.strings.dialogSubText, isBlocking: true, containerClassName: 'ms-dialogMainOverride ' + TextDialog_module_scss_1.default.textDialog },
                React.createElement(react_ace_1.default, { width: "100%", mode: "html", theme: "monokai", enableLiveAutocompletion: true, showPrintMargin: false, onChange: this.onDialogTextChanged.bind(this), value: this.state.dialogText, name: "CodeEditor", editorProps: { $blockScrolling: 0 } }),
                React.createElement(office_ui_fabric_react_1.DialogFooter, null,
                    React.createElement(office_ui_fabric_react_2.Button, { buttonType: office_ui_fabric_react_2.ButtonType.primary, onClick: this.saveDialog.bind(this) }, this.props.strings.saveButtonText),
                    React.createElement(office_ui_fabric_react_2.Button, { onClick: this.cancelDialog.bind(this) }, this.props.strings.cancelButtonText)))));
    };
    return TextDialog;
}(React.Component));
exports.TextDialog = TextDialog;
//# sourceMappingURL=TextDialog.js.map