"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyPaneLoggingField = void 0;
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyPaneLoggingFieldHost_1 = require("./PropertyPaneLoggingFieldHost");
var PropertyPaneLoggingFieldBuilder = /** @class */ (function () {
    function PropertyPaneLoggingFieldBuilder(props) {
        // Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.targetProperty = undefined;
        this.properties = props;
        this.properties.onDispose = this.dispose;
        this.properties.onRender = this.render;
        this.label = props.label;
        this.value = props.value;
        this.description = props.description;
        this.retrieve = props.retrieve;
    }
    /**
     * @function
     * Render the logging element
     */
    PropertyPaneLoggingFieldBuilder.prototype.render = function (elm) {
        // Construct the JSX properties
        var element = React.createElement(PropertyPaneLoggingFieldHost_1.default, {
            label: this.label,
            value: this.value,
            description: this.description,
            retrieve: this.retrieve,
            onDispose: this.dispose,
            onRender: this.render
        });
        // Calls the REACT content generator
        ReactDom.render(element, elm);
    };
    /**
     * @function
     * Disposes the current object
     */
    PropertyPaneLoggingFieldBuilder.prototype.dispose = function (elem) { };
    return PropertyPaneLoggingFieldBuilder;
}());
function PropertyPaneLoggingField(properties) {
    // Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        description: properties.description,
        value: properties.value,
        retrieve: properties.retrieve,
        onDispose: null,
        onRender: null
    };
    // Calles the PropertyPaneLoggingField builder object
    // This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyPaneLoggingFieldBuilder(newProperties);
}
exports.PropertyPaneLoggingField = PropertyPaneLoggingField;
//# sourceMappingURL=PropertyPaneLoggingField.js.map