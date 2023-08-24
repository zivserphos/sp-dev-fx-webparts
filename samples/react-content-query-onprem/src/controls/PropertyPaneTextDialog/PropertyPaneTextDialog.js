"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyPaneTextDialog = void 0;
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var TextDialog_1 = require("./components/TextDialog/TextDialog");
var PropertyPaneTextDialog = /** @class */ (function () {
    /*****************************************************************************************
     * Property pane's contructor
     * @param targetProperty
     * @param properties
     *****************************************************************************************/
    function PropertyPaneTextDialog(targetProperty, properties) {
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.targetProperty = targetProperty;
        this.properties = {
            dialogTextFieldValue: properties.dialogTextFieldValue,
            onPropertyChange: properties.onPropertyChange,
            disabled: properties.disabled,
            strings: properties.strings,
            onRender: this.onRender.bind(this),
            key: targetProperty
        };
    }
    /*****************************************************************************************
     * Renders the QueryFilterPanel property pane
     *****************************************************************************************/
    PropertyPaneTextDialog.prototype.render = function () {
        if (!this.elem) {
            return;
        }
        this.onRender(this.elem);
    };
    /*****************************************************************************************
     * Renders the QueryFilterPanel property pane
     *****************************************************************************************/
    PropertyPaneTextDialog.prototype.onRender = function (elem) {
        if (!this.elem) {
            this.elem = elem;
        }
        var textDialog = React.createElement(TextDialog_1.TextDialog, {
            dialogTextFieldValue: this.properties.dialogTextFieldValue,
            onChanged: this.onChanged.bind(this),
            disabled: this.properties.disabled,
            strings: this.properties.strings,
            // required to allow the component to be re-rendered by calling this.render() externally
            stateKey: new Date().toString()
        });
        ReactDom.render(textDialog, elem);
    };
    /*****************************************************************************************
     * Call the property pane's onPropertyChange when the TextDialog changes
     *****************************************************************************************/
    PropertyPaneTextDialog.prototype.onChanged = function (text) {
        this.properties.onPropertyChange(this.targetProperty, text);
    };
    return PropertyPaneTextDialog;
}());
exports.PropertyPaneTextDialog = PropertyPaneTextDialog;
//# sourceMappingURL=PropertyPaneTextDialog.js.map