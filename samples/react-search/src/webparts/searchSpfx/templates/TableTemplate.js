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
var sp_loader_1 = require("@microsoft/sp-loader");
var SearchSpfx_module_scss_1 = require("../components/SearchSpfx.module.scss");
var moment = require("moment");
var TableTemplate = /** @class */ (function (_super) {
    __extends(TableTemplate, _super);
    function TableTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.iconUrl = "https://spoprod-a.akamaihd.net/files/odsp-next-prod_ship-2016-08-15_20160815.002/odsp-media/images/filetypes/16/";
        _this.unknown = ['aspx', 'null'];
        return _this;
    }
    TableTemplate.prototype.getAuthorDisplayName = function (author) {
        if (author !== null) {
            var splits = author.split('|');
            return splits[1].trim();
        }
        else {
            return "";
        }
    };
    TableTemplate.prototype.getDateFromString = function (retrievedDate) {
        if (retrievedDate !== null) {
            return moment(retrievedDate).format('DD/MM/YYYY');
        }
        else {
            return "";
        }
    };
    TableTemplate.prototype.render = function () {
        var _this = this;
        // Load the Office UI Fabrics components css file via the module loader
        sp_loader_1.SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');
        return (React.createElement("div", { className: SearchSpfx_module_scss_1.default.searchSpfx },
            (function () {
                // Check if you need to show a title
                if (_this.props.title !== "") {
                    return React.createElement("h1", { className: 'ms-font-xxl' }, _this.props.title);
                }
            })(),
            React.createElement("table", { className: "ms-Table ".concat(SearchSpfx_module_scss_1.default.templateTable) },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Type"),
                        React.createElement("th", null, "Name"),
                        React.createElement("th", null, "Modified"),
                        React.createElement("th", null, "Modified by"))),
                React.createElement("tbody", null, this.props.results.map(function (result, index) {
                    return (React.createElement("tr", { key: index },
                        React.createElement("td", null,
                            React.createElement("a", { href: result.Path },
                                React.createElement("img", { src: "".concat(_this.iconUrl).concat(result.Fileextension !== null && _this.unknown.indexOf(result.Fileextension) === -1 ? result.Fileextension : 'code', ".png"), alt: "File extension" }))),
                        React.createElement("td", null,
                            React.createElement("a", { href: result.Path }, result.Filename !== null ? result.Filename.substring(0, result.Filename.lastIndexOf('.')) : "")),
                        React.createElement("td", null, _this.getDateFromString(result.ModifiedOWSDATE)),
                        React.createElement("td", null, _this.getAuthorDisplayName(result.EditorOWSUSER))));
                })))));
    };
    return TableTemplate;
}(React.Component));
exports.default = TableTemplate;
//# sourceMappingURL=TableTemplate.js.map