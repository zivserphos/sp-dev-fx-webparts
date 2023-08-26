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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var searchActions_1 = require("../flux/actions/searchActions");
var searchStore_1 = require("../flux/stores/searchStore");
var TemplateLoader_1 = require("../templates/TemplateLoader");
require("SearchSpfx.module.scss");
var SearchSpfx = /** @class */ (function (_super) {
    __extends(SearchSpfx, _super);
    function SearchSpfx(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.loader = new TemplateLoader_1.default();
        _this.state = {
            results: [],
            loaded: false,
            component: null,
            template: ""
        };
        _this._onChange = _this._onChange.bind(_this);
        return _this;
    }
    ;
    SearchSpfx.prototype.componentWillMount = function () {
        var _this = this;
        // Check if rendering is done from an external template
        if (typeof this.props.externalTemplate !== 'undefined') {
            // Loading internal template
            this.loader.getComponent(this.props.template).then(function (component) {
                _this.setState({
                    template: _this.props.template,
                    component: component
                });
            });
        }
    };
    SearchSpfx.prototype.componentDidMount = function () {
        searchStore_1.default.addChangeListener(this._onChange);
        this._getResults(this.props);
    };
    SearchSpfx.prototype.componentWillUnmount = function () {
        searchStore_1.default.removeChangeListener(this._onChange);
    };
    SearchSpfx.prototype.componentWillReceiveProps = function (nextProps) {
        // Get the new results
        this._getResults(nextProps);
    };
    SearchSpfx.prototype._getResults = function (crntProps) {
        if (typeof crntProps.externalTemplate !== 'undefined') {
            searchActions_1.default.get(crntProps.context, crntProps.query, crntProps.maxResults, crntProps.sorting, crntProps.externalTemplate.properties.mappings);
        }
        else {
            searchActions_1.default.get(crntProps.context, crntProps.query, crntProps.maxResults, crntProps.sorting, this.loader.getTemplateMappings(crntProps.template));
        }
    };
    SearchSpfx.prototype._onChange = function () {
        var _this = this;
        // Check if another template needs to be loaded
        if (typeof this.props.externalTemplate === 'undefined' && this.state.template !== this.props.template) {
            this.loader.getComponent(this.props.template).then(function (component) {
                _this.setState({
                    template: _this.props.template,
                    component: component
                });
            });
        }
        this.setState({
            results: searchStore_1.default.getSearchResults(),
            loaded: true
        });
    };
    SearchSpfx.prototype.render = function () {
        if (this.props.firstRender || this.state.loaded) {
            if (this.state.results.length === 0) {
                return (React.createElement("div", null));
            }
            else {
                // Load the template
                if (typeof this.props.externalTemplate !== 'undefined') {
                    /* tslint:disable:variable-name */
                    var CrntComponent = this.props.externalTemplate.component;
                    /* tslint:disable:variable-name */
                    return React.createElement(CrntComponent, __assign({}, this.props, { results: this.state.results }));
                }
                else if (this.state.component !== null) {
                    /* tslint:disable:variable-name */
                    var CrntComponent = this.state.component;
                    /* tslint:disable:variable-name */
                    return React.createElement(CrntComponent, __assign({}, this.props, { results: this.state.results }));
                }
                else {
                    return (React.createElement("div", null));
                }
            }
        }
        else {
            return (React.createElement("div", null));
        }
    };
    return SearchSpfx;
}(React.Component));
exports.default = SearchSpfx;
//# sourceMappingURL=SearchSpfx.js.map