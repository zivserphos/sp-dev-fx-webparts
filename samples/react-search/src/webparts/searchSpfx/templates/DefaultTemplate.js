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
var SearchSpfx_module_scss_1 = require("../components/SearchSpfx.module.scss");
var DefaultTemplate = /** @class */ (function (_super) {
    __extends(DefaultTemplate, _super);
    function DefaultTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultTemplate.prototype.render = function () {
        return (React.createElement("div", { className: SearchSpfx_module_scss_1.default.searchSpfx },
            React.createElement("div", { className: SearchSpfx_module_scss_1.default.searchSpfx },
                React.createElement("h1", { className: 'ms-font-xxl' },
                    "Search results for query: ",
                    this.props.query),
                this.props.results.map(function (result, index) {
                    return (React.createElement("p", { key: index },
                        "Result ",
                        index + 1,
                        ": ",
                        React.createElement("a", { href: result.Path }, result.Title)));
                }))));
    };
    return DefaultTemplate;
}(React.Component));
exports.default = DefaultTemplate;
//# sourceMappingURL=DefaultTemplate.js.map