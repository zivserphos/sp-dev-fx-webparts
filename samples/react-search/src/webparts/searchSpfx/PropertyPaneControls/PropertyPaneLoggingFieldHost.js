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
var React = require("react");
var PropertyPaneLoggingFieldStyling_module_scss_1 = require("./PropertyPaneLoggingFieldStyling.module.scss");
/**
 * @class
 * Renders the controls for PropertyPaneLoggingField component
 */
var PropertyPaneLoggingFieldHost = /** @class */ (function (_super) {
    __extends(PropertyPaneLoggingFieldHost, _super);
    /**
     * @function
     * Contructor
     */
    function PropertyPaneLoggingFieldHost(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            logging: []
        };
        _this.getLogging = _this.getLogging.bind(_this);
        return _this;
    }
    /**
     * @function
     * componentDidMount
     */
    PropertyPaneLoggingFieldHost.prototype.componentDidMount = function () {
        this.setState({
            logging: this.props.value
        });
    };
    /**
     * @function
     * componentWillReceiveProps
     */
    PropertyPaneLoggingFieldHost.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                logging: nextProps.value
            });
        }
    };
    /**
     * @function
     * Retrieve new logging value
     */
    PropertyPaneLoggingFieldHost.prototype.getLogging = function () {
        this.setState({
            logging: this.props.retrieve()
        });
    };
    /**
     * @function
     * Renders the key values
     */
    PropertyPaneLoggingFieldHost.prototype.renderValue = function (val, subClass) {
        var output = [];
        for (var k in val) {
            if (typeof val[k] === "object") {
                output.push(React.createElement("div", { key: k, className: subClass },
                    React.createElement("span", { className: PropertyPaneLoggingFieldStyling_module_scss_1.default.keyValue }, k),
                    ": object ",
                    this.renderValue(val[k], PropertyPaneLoggingFieldStyling_module_scss_1.default.subElm)));
            }
            else {
                output.push(React.createElement("div", { key: k, className: subClass },
                    React.createElement("span", { className: PropertyPaneLoggingFieldStyling_module_scss_1.default.keyValue }, k),
                    ": ",
                    val[k]));
            }
        }
        return output;
    };
    /**
     * @function
     * Renders the logging field control
     */
    PropertyPaneLoggingFieldHost.prototype.render = function () {
        var _this = this;
        var valToRender = this.renderValue(this.state.logging);
        //Renders content
        return (React.createElement("div", { className: PropertyPaneLoggingFieldStyling_module_scss_1.default.loggingField },
            React.createElement("label", { className: "ms-Label" }, this.props.label),
            (function () {
                if (typeof _this.props.retrieve !== 'undefined') {
                    return React.createElement("div", { className: PropertyPaneLoggingFieldStyling_module_scss_1.default.updateLogging },
                        React.createElement("a", { className: "ms-Link", onClick: _this.getLogging, role: "button" }, "Update logging"));
                }
            })(),
            React.createElement("pre", { className: PropertyPaneLoggingFieldStyling_module_scss_1.default.logging }, valToRender),
            (function () {
                if (typeof _this.props.description !== 'undefined') {
                    return React.createElement("span", { className: "ms-TextField-description" }, _this.props.description);
                }
            })()));
    };
    return PropertyPaneLoggingFieldHost;
}(React.Component));
exports.default = PropertyPaneLoggingFieldHost;
//# sourceMappingURL=PropertyPaneLoggingFieldHost.js.map