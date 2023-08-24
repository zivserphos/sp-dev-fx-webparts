"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyPaneAsyncChecklist = void 0;
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var AsyncChecklist_1 = require("./components/AsyncChecklist/AsyncChecklist");
var PropertyPaneAsyncChecklist = /** @class */ (function () {
    /*****************************************************************************************
     * Property pane's contructor
     * @param targetProperty
     * @param properties
     *****************************************************************************************/
    function PropertyPaneAsyncChecklist(targetProperty, properties) {
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.targetProperty = targetProperty;
        this.properties = {
            loadItems: properties.loadItems,
            checkedItems: properties.checkedItems,
            onPropertyChange: properties.onPropertyChange,
            disable: properties.disable,
            strings: properties.strings,
            onRender: this.onRender.bind(this),
            key: targetProperty
        };
    }
    /*****************************************************************************************
     * Renders the AsyncChecklist property pane
     *****************************************************************************************/
    PropertyPaneAsyncChecklist.prototype.render = function () {
        if (!this.elem) {
            return;
        }
        this.onRender(this.elem);
    };
    /*****************************************************************************************
     * Renders the AsyncChecklist property pane
     *****************************************************************************************/
    PropertyPaneAsyncChecklist.prototype.onRender = function (elem) {
        if (!this.elem) {
            this.elem = elem;
        }
        var asyncChecklist = React.createElement(AsyncChecklist_1.AsyncChecklist, {
            loadItems: this.properties.loadItems,
            checkedItems: this.properties.checkedItems,
            onChange: this.onChange.bind(this),
            disable: this.properties.disable,
            strings: this.properties.strings,
            stateKey: new Date().toString()
        });
        ReactDom.render(asyncChecklist, elem);
        this.loadedItems = true;
    };
    /*****************************************************************************************
     * Call the property pane's onPropertyChange when the QueryFilterPanel changes
     *****************************************************************************************/
    PropertyPaneAsyncChecklist.prototype.onChange = function (checkedKeys) {
        this.properties.onPropertyChange(this.targetProperty, checkedKeys);
    };
    return PropertyPaneAsyncChecklist;
}());
exports.PropertyPaneAsyncChecklist = PropertyPaneAsyncChecklist;
//# sourceMappingURL=PropertyPaneAsyncChecklist.js.map