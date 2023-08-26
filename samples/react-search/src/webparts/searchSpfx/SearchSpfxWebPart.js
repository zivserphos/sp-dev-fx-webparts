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
var ReactDom = require("react-dom");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyPaneLoggingField_1 = require("./PropertyPaneControls/PropertyPaneLoggingField");
var sp_loader_1 = require("@microsoft/sp-loader");
var strings = require("mystrings");
var SearchSpfx_1 = require("./components/SearchSpfx");
var defer_1 = require("./utils/defer");
var TemplateLoader_1 = require("./templates/TemplateLoader");
// Import the search store, needed for logging the search requests
var searchStore_1 = require("./flux/stores/searchStore");
// Expose React to window -> required for external template loading
require("expose?React!react");
var SearchSpfxWebPart = /** @class */ (function (_super) {
    __extends(SearchSpfxWebPart, _super);
    function SearchSpfxWebPart() {
        var _this = _super.call(this) || this;
        _this.crntExternalTemplateUrl = "";
        _this.crntExternalTemplate = null;
        _this.onChangeBinded = false;
        _this.removeChangeBinding = null;
        // Bind this to the setLogging method
        _this.setLogging = _this.setLogging.bind(_this);
        _this.removeLogging = _this.removeLogging.bind(_this);
        return _this;
    }
    Object.defineProperty(SearchSpfxWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Return the element to render
     */
    SearchSpfxWebPart.prototype._getElement = function (externalTemplate) {
        return React.createElement(SearchSpfx_1.default, {
            title: this.properties.title,
            query: this.properties.query,
            maxResults: this.properties.maxResults,
            sorting: this.properties.sorting,
            context: this.context,
            firstRender: this.renderedOnce,
            template: this.properties.template,
            externalTemplate: externalTemplate
        });
    };
    /**
     * Load all scripts required to render the element
     */
    SearchSpfxWebPart.prototype._loadScriptsBeforeRender = function (scriptsToLoad) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._loadScripts(scriptsToLoad).then(function () {
                resolve();
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Append the scripts to load
     */
    SearchSpfxWebPart.prototype._loadScripts = function (scriptsToLoad, deferred) {
        var _this = this;
        if (!deferred) {
            deferred = (0, defer_1.defer)();
        }
        if (scriptsToLoad.length > 0) {
            if (this.TypeofFullName(scriptsToLoad[0].funcName) === "function") {
                return this._loadScripts(scriptsToLoad.slice(1, scriptsToLoad.length), deferred);
            }
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = scriptsToLoad[0].url;
            // Wait untin script is loaded
            script.onload = function () {
                // Load the next script
                return _this._loadScripts(scriptsToLoad.slice(1, scriptsToLoad.length), deferred);
            };
            document.getElementsByTagName('head')[0].appendChild(script);
        }
        else {
            deferred.resolve(null);
        }
        return deferred.promise;
    };
    /**
     * Check the type of the function name
     */
    SearchSpfxWebPart.prototype.TypeofFullName = function (funcName) {
        if (!Boolean(funcName)) {
            return "undefined";
        }
        var funcSplit = funcName.split(".");
        var scriptFunc = window;
        for (var i = 0; i < funcSplit.length; i++) {
            scriptFunc = scriptFunc[funcSplit[i]];
            if (typeof scriptFunc == "undefined")
                return "undefined";
        }
        return typeof scriptFunc;
    };
    /**
     * Load stylesheets required for your element
     */
    SearchSpfxWebPart.prototype._loadStyles = function (stylesToLoad) {
        stylesToLoad.forEach(function (style) {
            sp_loader_1.SPComponentLoader.loadCss(style.url);
        });
    };
    /**
     * Render the element
     */
    SearchSpfxWebPart.prototype.render = function () {
        var _this = this;
        // Check if an external template needs to be loaded
        if (this.properties.external && this.properties.externalUrl !== "") {
            // Check if the external template URL has been changed (otherwise load from memory)
            if (this.crntExternalTemplateUrl !== this.properties.externalUrl) {
                // Loading external template
                var externalTmpl = {
                    globalExportsName: "externalTemplate"
                };
                sp_loader_1.SPComponentLoader.loadScript(this.properties.externalUrl, externalTmpl).then(function (externalTemplate) {
                    // Store the current template information
                    _this.crntExternalTemplate = externalTemplate;
                    _this.crntExternalTemplateUrl = _this.properties.externalUrl;
                    // Check if other scripts have to be loaded before rendering the component
                    // Only do this the first time the web part loads
                    if (typeof externalTemplate.properties.scripts !== 'undefined') {
                        _this._loadScriptsBeforeRender(externalTemplate.properties.scripts).then(function () {
                            // Rendering from the external template
                            var element = _this._getElement(externalTemplate);
                            ReactDom.render(element, _this.domElement);
                        });
                    }
                    else {
                        // Rendering from the external template
                        var element = _this._getElement(externalTemplate);
                        ReactDom.render(element, _this.domElement);
                    }
                    // Check if their are any styles that need to be loaded
                    if (typeof externalTemplate.properties.styles !== 'undefined') {
                        _this._loadStyles(externalTemplate.properties.styles);
                    }
                }).catch(function (error) {
                    console.log('ERROR: ', error);
                });
            }
            else {
                // Rendering from the external template from memory
                var element = this._getElement(this.crntExternalTemplate);
                ReactDom.render(element, this.domElement);
            }
        }
        else {
            // Render from internal template
            var element = this._getElement();
            ReactDom.render(element, this.domElement);
        }
    };
    SearchSpfxWebPart.prototype.onPropertyPaneRendered = function () {
        // Clear remove binding timeout. This is necessary if user applied a new configuration.
        if (this.removeChangeBinding !== null) {
            clearTimeout(this.removeChangeBinding);
            this.removeChangeBinding = null;
        }
        // Check if there is a change binding in place
        if (!this.onChangeBinded) {
            this.onChangeBinded = true;
            searchStore_1.default.addChangeListener(this.setLogging);
        }
    };
    // Will probably be renamed to onPropertyConfigurationComplete in the next drop
    SearchSpfxWebPart.prototype.onPropertyPaneConfigurationComplete = function () {
        // Remove the change binding
        this.removeChangeBinding = setTimeout(this.removeLogging, 500);
    };
    /**
     * Property pane settings
     */
    SearchSpfxWebPart.prototype.getPropertyPaneConfiguration = function () {
        // Default template property
        var templateProperty = (0, sp_webpart_base_1.PropertyPaneDropdown)('template', {
            label: strings.FieldsTemplateLabel,
            options: TemplateLoader_1.allTemplates
        });
        // Check if you want to load an external template
        if (this.properties.external) {
            // Show the external URL property instead of the internal template property
            templateProperty = (0, sp_webpart_base_1.PropertyPaneTextField)('externalUrl', {
                label: strings.FieldsExternalTempLabel
            });
        }
        return {
            pages: [{
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [{
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                (0, sp_webpart_base_1.PropertyPaneTextField)('query', {
                                    label: strings.QueryFieldLabel,
                                    description: strings.QueryInfoDescription,
                                    multiline: true
                                }),
                                (0, sp_webpart_base_1.PropertyPaneSlider)('maxResults', {
                                    label: strings.FieldsMaxResults,
                                    min: 1,
                                    max: 50
                                }),
                                (0, sp_webpart_base_1.PropertyPaneTextField)('sorting', {
                                    label: strings.FieldsSorting
                                })
                            ]
                        }, {
                            groupName: strings.TemplateGroupName,
                            groupFields: [
                                (0, sp_webpart_base_1.PropertyPaneTextField)('title', {
                                    label: strings.FieldsTitleLabel
                                }),
                                (0, sp_webpart_base_1.PropertyPaneToggle)('external', {
                                    label: strings.FieldsExternalLabel
                                }),
                                templateProperty
                            ]
                        }, {
                            groupName: strings.LoggingGroupName,
                            groupFields: [
                                (0, PropertyPaneLoggingField_1.PropertyPaneLoggingField)({
                                    label: strings.LoggingFieldLabel,
                                    description: strings.LoggingFieldDescription,
                                    value: searchStore_1.default.getLoggingInfo(),
                                    retrieve: this.getLogging
                                })
                            ]
                        }],
                    displayGroupsAsAccordion: true
                }]
        };
    };
    /**
     * Function to retrieve the logging value from the store
     */
    SearchSpfxWebPart.prototype.getLogging = function () {
        return searchStore_1.default.getLoggingInfo();
    };
    /**
     * Function to refresh the property pane when a change is retrieved from the store
     */
    SearchSpfxWebPart.prototype.setLogging = function () {
        // Refresh the property pane when search rest call is completed
        this.context.propertyPane.refresh();
    };
    /**
     * Function to remove the change binding when property pane is closed
     */
    SearchSpfxWebPart.prototype.removeLogging = function () {
        if (this.onChangeBinded) {
            this.onChangeBinded = false;
            searchStore_1.default.removeChangeListener(this.setLogging);
        }
    };
    Object.defineProperty(SearchSpfxWebPart.prototype, "disableReactivePropertyChanges", {
        /**
         * Prevent from changing the query on typing
         */
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    return SearchSpfxWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = SearchSpfxWebPart;
//# sourceMappingURL=SearchSpfxWebPart.js.map