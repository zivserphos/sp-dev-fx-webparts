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
var strings = require("contentQueryStrings");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var sp_webpart_base_2 = require("@microsoft/sp-webpart-base");
var sp_webpart_base_3 = require("@microsoft/sp-webpart-base");
var sp_webpart_base_4 = require("@microsoft/sp-webpart-base");
var sp_lodash_subset_1 = require("@microsoft/sp-lodash-subset");
var ContentQuery_1 = require("./components/ContentQuery");
var PropertyPaneAsyncDropdown_1 = require("../../controls/PropertyPaneAsyncDropdown/PropertyPaneAsyncDropdown");
var PropertyPaneQueryFilterPanel_1 = require("../../controls/PropertyPaneQueryFilterPanel/PropertyPaneQueryFilterPanel");
var PropertyPaneAsyncChecklist_1 = require("../../controls/PropertyPaneAsyncChecklist/PropertyPaneAsyncChecklist");
var PropertyPaneTextDialog_1 = require("../../controls/PropertyPaneTextDialog/PropertyPaneTextDialog");
var ContentQueryService_1 = require("../../common/services/ContentQueryService");
var ContentQueryConstants_1 = require("../../common/constants/ContentQueryConstants");
var ContentQueryWebPart = /** @class */ (function (_super) {
    __extends(ContentQueryWebPart, _super);
    function ContentQueryWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.logSource = "ContentQueryWebPart.ts";
        return _this;
    }
    Object.defineProperty(ContentQueryWebPart.prototype, "dataVersion", {
        /***************************************************************************
         * Returns the WebPart's version
         ***************************************************************************/
        // @ts-ignore
        get: function () {
            return sp_core_library_1.Version.parse('1.0.11');
        },
        enumerable: false,
        configurable: true
    });
    /***************************************************************************
     * Initializes the WebPart
     ***************************************************************************/
    ContentQueryWebPart.prototype.onInit = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // @ts-ignore
            _this.ContentQueryService = new ContentQueryService_1.ContentQueryService(_this.context, _this.context.spHttpClient);
            _this.properties.webUrl = _this.properties.siteUrl || _this.properties.webUrl ? _this.properties.webUrl : _this.context.pageContext.web.absoluteUrl.toLocaleLowerCase().trim();
            _this.properties.siteUrl = _this.properties.siteUrl ? _this.properties.siteUrl : _this.context.pageContext.site.absoluteUrl.toLowerCase().trim();
            resolve();
        });
    };
    /***************************************************************************
     * Renders the WebPart
     ***************************************************************************/
    ContentQueryWebPart.prototype.render = function () {
        var querySettings = {
            webUrl: this.properties.webUrl,
            listId: this.properties.listId,
            limitEnabled: this.properties.limitEnabled,
            itemLimit: this.properties.itemLimit,
            recursiveEnabled: this.properties.recursiveEnabled,
            orderBy: this.properties.orderBy,
            orderByDirection: this.properties.orderByDirection,
            filters: this.properties.filters,
            viewFields: this.properties.viewFields,
        };
        var element = React.createElement(ContentQuery_1.default, {
            onLoadTemplate: this.loadTemplate.bind(this),
            onLoadTemplateContext: this.loadTemplateContext.bind(this),
            siteUrl: this.properties.siteUrl,
            querySettings: querySettings,
            templateText: this.properties.templateText,
            templateUrl: this.properties.templateUrl,
            wpContext: this.context,
            externalScripts: this.properties.externalScripts ? this.properties.externalScripts.split('\n').filter(function (script) { return (script && script.trim() != ''); }) : null,
            strings: strings.contentQueryStrings,
            stateKey: new Date().toString()
        });
        ReactDom.render(element, this.domElement);
    };
    /***************************************************************************
     * Loads the toolpart configuration
     ***************************************************************************/
    ContentQueryWebPart.prototype.getPropertyPaneConfiguration = function () {
        var firstCascadingLevelDisabled = !this.properties.siteUrl;
        var secondCascadingLevelDisabled = !this.properties.siteUrl || !this.properties.webUrl;
        var thirdCascadingLevelDisabled = !this.properties.siteUrl || !this.properties.webUrl || !this.properties.listId;
        // Creates a custom PropertyPaneAsyncDropdown for the siteUrl property
        this.siteUrlDropdown = new PropertyPaneAsyncDropdown_1.PropertyPaneAsyncDropdown(ContentQueryConstants_1.ContentQueryConstants.propertySiteUrl, {
            label: strings.SiteUrlFieldLabel,
            loadingLabel: strings.SiteUrlFieldLoadingLabel,
            errorLabelFormat: strings.SiteUrlFieldLoadingError,
            loadOptions: this.loadSiteUrlOptions.bind(this),
            onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
            selectedKey: this.properties.siteUrl || ""
        });
        // Creates a custom PropertyPaneAsyncDropdown for the webUrl property
        this.webUrlDropdown = new PropertyPaneAsyncDropdown_1.PropertyPaneAsyncDropdown(ContentQueryConstants_1.ContentQueryConstants.propertyWebUrl, {
            label: strings.WebUrlFieldLabel,
            loadingLabel: strings.WebUrlFieldLoadingLabel,
            errorLabelFormat: strings.WebUrlFieldLoadingError,
            loadOptions: this.loadWebUrlOptions.bind(this),
            onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
            selectedKey: this.properties.webUrl || "",
            disabled: firstCascadingLevelDisabled
        });
        // Creates a custom PropertyPaneAsyncDropdown for the listId property
        this.listTitleDropdown = new PropertyPaneAsyncDropdown_1.PropertyPaneAsyncDropdown(ContentQueryConstants_1.ContentQueryConstants.propertyListId, {
            label: strings.ListTitleFieldLabel,
            loadingLabel: strings.ListTitleFieldLoadingLabel,
            errorLabelFormat: strings.ListTitleFieldLoadingError,
            loadOptions: this.loadListTitleOptions.bind(this),
            onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
            selectedKey: this.properties.listId || "",
            disabled: secondCascadingLevelDisabled
        });
        // Creates a custom PropertyPaneAsyncDropdown for the orderBy property
        this.orderByDropdown = new PropertyPaneAsyncDropdown_1.PropertyPaneAsyncDropdown(ContentQueryConstants_1.ContentQueryConstants.propertyOrderBy, {
            label: strings.OrderByFieldLabel,
            loadingLabel: strings.OrderByFieldLoadingLabel,
            errorLabelFormat: strings.OrderByFieldLoadingError,
            loadOptions: this.loadOrderByOptions.bind(this),
            onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
            selectedKey: this.properties.orderBy || "",
            disabled: thirdCascadingLevelDisabled
        });
        // Creates a custom PropertyPaneQueryFilterPanel for the filters property
        this.filtersPanel = new PropertyPaneQueryFilterPanel_1.PropertyPaneQueryFilterPanel(ContentQueryConstants_1.ContentQueryConstants.propertyFilters, {
            filters: this.properties.filters,
            loadFields: this.loadFilterFields.bind(this),
            onLoadTaxonomyPickerSuggestions: this.loadTaxonomyPickerSuggestions.bind(this),
            onLoadPeoplePickerSuggestions: this.loadPeoplePickerSuggestions.bind(this),
            onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
            trimEmptyFiltersOnChange: true,
            disabled: thirdCascadingLevelDisabled,
            strings: strings.queryFilterPanelStrings
        });
        // Creates a custom PropertyPaneAsyncChecklist for the viewFields property
        this.viewFieldsChecklist = new PropertyPaneAsyncChecklist_1.PropertyPaneAsyncChecklist(ContentQueryConstants_1.ContentQueryConstants.propertyViewFields, {
            loadItems: this.loadViewFieldsChecklistItems.bind(this),
            checkedItems: this.properties.viewFields,
            onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
            disable: thirdCascadingLevelDisabled,
            strings: strings.viewFieldsChecklistStrings
        });
        // Creates a custom PropertyPaneTextDialog for the templateText property
        this.templateTextDialog = new PropertyPaneTextDialog_1.PropertyPaneTextDialog(ContentQueryConstants_1.ContentQueryConstants.propertyTemplateText, {
            dialogTextFieldValue: this.properties.templateText,
            onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
            disabled: false,
            strings: strings.templateTextStrings
        });
        // Creates a PropertyPaneChoiceGroup for the orderByDirection property
        this.orderByDirectionChoiceGroup = (0, sp_webpart_base_3.PropertyPaneChoiceGroup)(ContentQueryConstants_1.ContentQueryConstants.propertOrderByDirection, {
            options: [
                { text: strings.ShowItemsAscending, key: 'asc', checked: !this.properties.orderByDirection || this.properties.orderByDirection == 'asc', disabled: secondCascadingLevelDisabled },
                { text: strings.ShowItemsDescending, key: 'desc', checked: this.properties.orderByDirection == 'desc', disabled: secondCascadingLevelDisabled }
            ]
        });
        // Creates a PropertyPaneTextField for the templateUrl property
        this.templateUrlTextField = (0, sp_webpart_base_2.PropertyPaneTextField)(ContentQueryConstants_1.ContentQueryConstants.propertyTemplateUrl, {
            label: strings.TemplateUrlFieldLabel,
            placeholder: strings.TemplateUrlPlaceholder,
            deferredValidationTime: 500,
            onGetErrorMessage: this.onTemplateUrlChange.bind(this)
        });
        // Creates a PropertyPaneToggle for the limitEnabled property
        this.limitEnabledToggle = (0, sp_webpart_base_4.PropertyPaneToggle)(ContentQueryConstants_1.ContentQueryConstants.propertyLimitEnabled, {
            label: strings.LimitEnabledFieldLabel,
            offText: 'Disabled',
            onText: 'Enabled',
            checked: this.properties.limitEnabled,
            disabled: thirdCascadingLevelDisabled
        });
        // Creates a PropertyPaneTextField for the itemLimit property
        this.itemLimitTextField = (0, sp_webpart_base_2.PropertyPaneTextField)(ContentQueryConstants_1.ContentQueryConstants.propertyItemLimit, {
            deferredValidationTime: 500,
            placeholder: strings.ItemLimitPlaceholder,
            disabled: !this.properties.limitEnabled || secondCascadingLevelDisabled,
            onGetErrorMessage: this.onItemLimitChange.bind(this)
        });
        // Creates a PropertyPaneToggle for the limitEnabled property
        this.recursiveEnabledToggle = (0, sp_webpart_base_4.PropertyPaneToggle)(ContentQueryConstants_1.ContentQueryConstants.propertyRecursiveEnabled, {
            label: strings.RecursiveEnabledFieldLabel,
            offText: 'Disabled',
            onText: 'Enabled',
            checked: this.properties.recursiveEnabled,
            disabled: thirdCascadingLevelDisabled
        });
        // Creates a PropertyPaneTextField for the externalScripts property
        this.externalScripts = (0, sp_webpart_base_2.PropertyPaneTextField)(ContentQueryConstants_1.ContentQueryConstants.propertyExternalScripts, {
            label: strings.ExternalScriptsLabel,
            deferredValidationTime: 500,
            placeholder: strings.ExternalScriptsPlaceholder,
            multiline: true,
            rows: 5,
            onGetErrorMessage: function () { return ''; }
        });
        return {
            pages: [
                {
                    header: { description: strings.SourcePageDescription },
                    groups: [
                        {
                            groupName: strings.SourceGroupName,
                            groupFields: [
                                this.siteUrlDropdown,
                                this.webUrlDropdown,
                                this.listTitleDropdown
                            ]
                        }
                    ]
                },
                {
                    header: { description: strings.QueryPageDescription },
                    groups: [
                        {
                            groupName: strings.QueryGroupName,
                            groupFields: [
                                this.orderByDropdown,
                                this.orderByDirectionChoiceGroup,
                                this.limitEnabledToggle,
                                this.itemLimitTextField,
                                this.recursiveEnabledToggle,
                                this.filtersPanel
                            ]
                        }
                    ]
                },
                {
                    header: { description: strings.DisplayPageDescription },
                    groups: [
                        {
                            groupName: strings.DisplayGroupName,
                            groupFields: [
                                this.viewFieldsChecklist,
                                this.templateTextDialog,
                                this.templateUrlTextField
                            ]
                        }
                    ]
                },
                {
                    header: { description: strings.ExternalPageDescription },
                    groups: [
                        {
                            groupName: strings.ExternalGroupName,
                            groupFields: [
                                this.externalScripts
                            ]
                        }
                    ]
                }
            ]
        };
    };
    /***************************************************************************
     * Loads the HandleBars template from the specified url
     ***************************************************************************/
    ContentQueryWebPart.prototype.loadTemplate = function (templateUrl) {
        return this.ContentQueryService.getFileContent(templateUrl);
    };
    /***************************************************************************
     * Loads the HandleBars context based on the specified query
     ***************************************************************************/
    ContentQueryWebPart.prototype.loadTemplateContext = function (querySettings, callTimeStamp) {
        return this.ContentQueryService.getTemplateContext(querySettings, callTimeStamp);
    };
    /***************************************************************************
     * Loads the dropdown options for the webUrl property
     ***************************************************************************/
    ContentQueryWebPart.prototype.loadSiteUrlOptions = function () {
        return this.ContentQueryService.getSiteUrlOptions();
    };
    /***************************************************************************
     * Loads the dropdown options for the webUrl property
     ***************************************************************************/
    ContentQueryWebPart.prototype.loadWebUrlOptions = function () {
        return this.ContentQueryService.getWebUrlOptions(this.properties.siteUrl);
    };
    /***************************************************************************
     * Loads the dropdown options for the listTitle property
     ***************************************************************************/
    ContentQueryWebPart.prototype.loadListTitleOptions = function () {
        return this.ContentQueryService.getListTitleOptions(this.properties.webUrl);
    };
    /***************************************************************************
     * Loads the dropdown options for the orderBy property
     ***************************************************************************/
    ContentQueryWebPart.prototype.loadOrderByOptions = function () {
        return this.ContentQueryService.getOrderByOptions(this.properties.webUrl, this.properties.listId);
    };
    /***************************************************************************
     * Loads the dropdown options for the listTitle property
     ***************************************************************************/
    ContentQueryWebPart.prototype.loadFilterFields = function () {
        return this.ContentQueryService.getFilterFields(this.properties.webUrl, this.properties.listId);
    };
    /***************************************************************************
     * Loads the checklist items for the viewFields property
     ***************************************************************************/
    ContentQueryWebPart.prototype.loadViewFieldsChecklistItems = function () {
        return this.ContentQueryService.getViewFieldsChecklistItems(this.properties.webUrl, this.properties.listId);
    };
    /***************************************************************************
     * Returns the user suggestions based on the user entered picker input
     * @param filterText : The filter specified by the user in the people picker
     * @param currentPersonas : The IPersonaProps already selected in the people picker
     * @param limitResults : The results limit if any
     ***************************************************************************/
    ContentQueryWebPart.prototype.loadPeoplePickerSuggestions = function (filterText, currentPersonas, limitResults) {
        return this.ContentQueryService.getPeoplePickerSuggestions(this.properties.webUrl, filterText, currentPersonas, limitResults);
    };
    /***************************************************************************
     * Returns the taxonomy suggestions based on the user entered picker input
     * @param field : The taxonomy field from which to load the terms from
     * @param filterText : The filter specified by the user in the people picker
     * @param currentPersonas : The IPersonaProps already selected in the people picker
     * @param limitResults : The results limit if any
     ***************************************************************************/
    ContentQueryWebPart.prototype.loadTaxonomyPickerSuggestions = function (field, filterText, currentTerms) {
        return this.ContentQueryService.getTaxonomyPickerSuggestions(this.properties.webUrl, this.properties.listId, field, filterText, currentTerms);
    };
    /***************************************************************************
     * When a custom property pane updates
     ***************************************************************************/
    ContentQueryWebPart.prototype.onCustomPropertyPaneChange = function (propertyPath, newValue) {
        sp_core_library_1.Log.verbose(this.logSource, "WebPart property '" + propertyPath + "' has changed, refreshing WebPart...", this.context.serviceScope);
        var rerenderTemplateTextDialog = false;
        var oldValue = (0, sp_lodash_subset_1.get)(this.properties, propertyPath);
        // Stores the new value in web part properties
        (0, sp_lodash_subset_1.update)(this.properties, propertyPath, function () { return newValue; });
        this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
        // Resets dependent property panes if needed
        this.resetDependentPropertyPanes(propertyPath);
        // If the viewfields have changed, update the default template text if it hasn't been altered by the user
        if (propertyPath == ContentQueryConstants_1.ContentQueryConstants.propertyViewFields && !this.properties.hasDefaultTemplateBeenUpdated) {
            var generatedTemplate_1 = this.ContentQueryService.generateDefaultTemplate(newValue);
            (0, sp_lodash_subset_1.update)(this.properties, ContentQueryConstants_1.ContentQueryConstants.propertyTemplateText, function () { return generatedTemplate_1; });
            this.templateTextDialog.properties.dialogTextFieldValue = generatedTemplate_1;
            rerenderTemplateTextDialog = true;
        }
        // If the templateText have changed, update the "hasDefaultTemplateBeenUpdated" to true so the WebPart doesn't override the user template after updating view fields
        if (propertyPath == ContentQueryConstants_1.ContentQueryConstants.propertyTemplateText && !this.properties.hasDefaultTemplateBeenUpdated) {
            (0, sp_lodash_subset_1.update)(this.properties, ContentQueryConstants_1.ContentQueryConstants.propertyhasDefaultTemplateBeenUpdated, function () { return true; });
        }
        // Refreshes the web part manually because custom fields don't update since sp-webpart-base@1.1.1
        // https://github.com/SharePoint/sp-dev-docs/issues/594
        if (!this.disableReactivePropertyChanges)
            this.render();
        if (rerenderTemplateTextDialog) {
            this.templateTextDialog.render();
        }
    };
    /***************************************************************************
     * Validates the templateUrl property
     ***************************************************************************/
    ContentQueryWebPart.prototype.onTemplateUrlChange = function (value) {
        var _this = this;
        sp_core_library_1.Log.verbose(this.logSource, "WebPart property 'templateUrl' has changed, refreshing WebPart...", this.context.serviceScope);
        return new Promise(function (resolve, reject) {
            // Doesn't raise any error if file is empty (otherwise error message will show on initial load...)
            if ((0, sp_lodash_subset_1.isEmpty)(value)) {
                resolve('');
            }
            // Resolves an error if the file isn't a valid .htm or .html file
            else if (!_this.ContentQueryService.isValidTemplateFile(value)) {
                resolve(strings.ErrorTemplateExtension);
            }
            // Resolves an error if the file doesn't answer a simple head request
            else {
                _this.ContentQueryService.ensureFileResolves(value).then(function (isFileResolving) {
                    resolve('');
                })
                    .catch(function (error) {
                    resolve(sp_core_library_1.Text.format(strings.ErrorTemplateResolve, error));
                });
            }
        });
    };
    /***************************************************************************
     * Validates the itemLimit property
     ***************************************************************************/
    ContentQueryWebPart.prototype.onItemLimitChange = function (value) {
        sp_core_library_1.Log.verbose(this.logSource, "WebPart property 'itemLimit' has changed, refreshing WebPart...", this.context.serviceScope);
        return new Promise(function (resolve, reject) {
            // Resolves an error if the file isn't a valid number between 1 to 999
            var parsedValue = parseInt(value);
            var isNumeric = !isNaN(parsedValue) && isFinite(parsedValue);
            var isValid = (isNumeric && parsedValue >= 1 && parsedValue <= 999) || (0, sp_lodash_subset_1.isEmpty)(value);
            resolve(!isValid ? strings.ErrorItemLimit : '');
        });
    };
    /***************************************************************************
     * Resets dependent property panes if needed
     ***************************************************************************/
    ContentQueryWebPart.prototype.resetDependentPropertyPanes = function (propertyPath) {
        if (propertyPath == ContentQueryConstants_1.ContentQueryConstants.propertySiteUrl) {
            this.resetWebUrlPropertyPane();
            this.resetListTitlePropertyPane();
            this.resetOrderByPropertyPane();
            this.resetFiltersPropertyPane();
            this.resetViewFieldsPropertyPane();
        }
        else if (propertyPath == ContentQueryConstants_1.ContentQueryConstants.propertyWebUrl) {
            this.resetListTitlePropertyPane();
            this.resetOrderByPropertyPane();
            this.resetFiltersPropertyPane();
            this.resetViewFieldsPropertyPane();
        }
        else if (propertyPath == ContentQueryConstants_1.ContentQueryConstants.propertyListId) {
            this.resetOrderByPropertyPane();
            this.resetFiltersPropertyPane();
            this.resetViewFieldsPropertyPane();
        }
    };
    /***************************************************************************
     * Resets the List Title property pane and re-renders it
     ***************************************************************************/
    ContentQueryWebPart.prototype.resetWebUrlPropertyPane = function () {
        var _this = this;
        sp_core_library_1.Log.verbose(this.logSource, "Resetting 'webUrl' property...", this.context.serviceScope);
        this.properties.webUrl = "";
        this.ContentQueryService.clearCachedWebUrlOptions();
        (0, sp_lodash_subset_1.update)(this.properties, ContentQueryConstants_1.ContentQueryConstants.propertyWebUrl, function () { return _this.properties.webUrl; });
        this.webUrlDropdown.properties.selectedKey = "";
        this.webUrlDropdown.properties.disabled = (0, sp_lodash_subset_1.isEmpty)(this.properties.siteUrl);
        this.webUrlDropdown.render();
    };
    /***************************************************************************
     * Resets the List Title property pane and re-renders it
     ***************************************************************************/
    ContentQueryWebPart.prototype.resetListTitlePropertyPane = function () {
        var _this = this;
        sp_core_library_1.Log.verbose(this.logSource, "Resetting 'listTitle' property...", this.context.serviceScope);
        this.properties.listId = null;
        this.ContentQueryService.clearCachedListTitleOptions();
        (0, sp_lodash_subset_1.update)(this.properties, ContentQueryConstants_1.ContentQueryConstants.propertyListId, function () { return _this.properties.listId; });
        this.listTitleDropdown.properties.selectedKey = "";
        this.listTitleDropdown.properties.disabled = (0, sp_lodash_subset_1.isEmpty)(this.properties.webUrl);
        this.listTitleDropdown.render();
    };
    /***************************************************************************
     * Resets the Filters property pane and re-renders it
     ***************************************************************************/
    ContentQueryWebPart.prototype.resetOrderByPropertyPane = function () {
        var _this = this;
        sp_core_library_1.Log.verbose(this.logSource, "Resetting 'orderBy' property...", this.context.serviceScope);
        this.properties.orderBy = null;
        this.ContentQueryService.clearCachedOrderByOptions();
        (0, sp_lodash_subset_1.update)(this.properties, ContentQueryConstants_1.ContentQueryConstants.propertyOrderBy, function () { return _this.properties.orderBy; });
        this.orderByDropdown.properties.selectedKey = "";
        this.orderByDropdown.properties.disabled = (0, sp_lodash_subset_1.isEmpty)(this.properties.webUrl) || (0, sp_lodash_subset_1.isEmpty)(this.properties.listId);
        this.orderByDropdown.render();
    };
    /***************************************************************************
     * Resets the Filters property pane and re-renders it
     ***************************************************************************/
    ContentQueryWebPart.prototype.resetFiltersPropertyPane = function () {
        var _this = this;
        sp_core_library_1.Log.verbose(this.logSource, "Resetting 'filters' property...", this.context.serviceScope);
        this.properties.filters = null;
        this.ContentQueryService.clearCachedFilterFields();
        (0, sp_lodash_subset_1.update)(this.properties, ContentQueryConstants_1.ContentQueryConstants.propertyFilters, function () { return _this.properties.filters; });
        this.filtersPanel.properties.filters = null;
        this.filtersPanel.properties.disabled = (0, sp_lodash_subset_1.isEmpty)(this.properties.webUrl) || (0, sp_lodash_subset_1.isEmpty)(this.properties.listId);
        this.filtersPanel.render();
    };
    /***************************************************************************
     * Resets the View Fields property pane and re-renders it
     ***************************************************************************/
    ContentQueryWebPart.prototype.resetViewFieldsPropertyPane = function () {
        var _this = this;
        sp_core_library_1.Log.verbose(this.logSource, "Resetting 'viewFields' property...", this.context.serviceScope);
        this.properties.viewFields = null;
        this.ContentQueryService.clearCachedViewFields();
        (0, sp_lodash_subset_1.update)(this.properties, ContentQueryConstants_1.ContentQueryConstants.propertyViewFields, function () { return _this.properties.viewFields; });
        this.viewFieldsChecklist.properties.checkedItems = null;
        this.viewFieldsChecklist.properties.disable = (0, sp_lodash_subset_1.isEmpty)(this.properties.webUrl) || (0, sp_lodash_subset_1.isEmpty)(this.properties.listId);
        this.viewFieldsChecklist.render();
    };
    return ContentQueryWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = ContentQueryWebPart;
//# sourceMappingURL=ContentQueryWebPart.js.map