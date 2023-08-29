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
var MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
/**
 * React MessageComponent for displaying the messages
 *
 * @export
 * @class MessageComponent
 * @extends {React.Component<IMessageComponentProps, any>}
 */
var MessageComponent = /** @class */ (function (_super) {
    __extends(MessageComponent, _super);
    /**
     *Creates an instance of MessageComponent.
     * @param {IMessageComponentProps} props
     * @memberof MessageComponent
     */
    function MessageComponent(props) {
        return _super.call(this, props) || this;
    }
    /**
     * Render method of the Message Component
     *
     * @returns {React.ReactElement<IMessageComponentProps>}
     * @memberof MessageComponent
     */
    MessageComponent.prototype.render = function () {
        return (React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" }, this.props.Display &&
                React.createElement("div", null,
                    React.createElement(MessageBar_1.MessageBar, { messageBarType: MessageBar_1.MessageBarType.error, isMultiline: false, dismissButtonAriaLabel: "Close" }, this.props.Message)))));
    };
    return MessageComponent;
}(React.Component));
exports.default = MessageComponent;
//# sourceMappingURL=MessageComponent.js.map