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
var sp_loader_1 = require("@microsoft/sp-loader");
var strings = require("ReactAggregatedCalendarWebPartStrings");
var ReactAggregatedCalendar_1 = require("./components/ReactAggregatedCalendar");
var MessageComponent_1 = require("../shared/components/MessageComponent");
var MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
var PropertyFieldCustomList_1 = require("sp-client-custom-fields/lib/PropertyFieldCustomList");
/**
 * Aggregated Calendar Webpart Class
 *
 * @export
 * @class ReactAggregatedCalendarWebPart
 * @extends {BaseClientSideWebPart<IReactAggregatedCalendarWebPartProps>}
 */
var ReactAggregatedCalendarWebPart = /** @class */ (function (_super) {
    __extends(ReactAggregatedCalendarWebPart, _super);
    function ReactAggregatedCalendarWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.availableViews = require("../shared/availableViews.json");
        _this.timeFormat = require("../shared/timeFormat.json");
        return _this;
    }
    ReactAggregatedCalendarWebPart.prototype.onInit = function () {
        sp_loader_1.SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.4.0/fullcalendar.min.css');
        return _super.prototype.onInit.call(this);
    };
    /**
     * Renders the React Agggregated Calendar Webpart
     *
     * @memberof ReactAggregatedCalendarWebPart
     */
    ReactAggregatedCalendarWebPart.prototype.render = function () {
        sp_core_library_1.Log.verbose("render()", "Inside Render", this.context.serviceScope);
        if (this.needsConfiguration()) {
            sp_core_library_1.Log.warn("render()", "Webpart not configured", this.context.serviceScope);
            this.renderMessage(strings.WebPartNotConfigured, MessageBar_1.MessageBarType.error, true);
        }
        else {
            sp_core_library_1.Log.info("render()", "Webpart configuration not needed", this.context.serviceScope);
            var element = React.createElement(ReactAggregatedCalendar_1.default, {
                header: this.properties.header,
                selectedCalendarLists: this.properties.calendarList,
                context: this.context,
                domElement: this.domElement,
                dateFormat: this.properties.dateFormat,
                showLegend: this.properties.showLegend
            });
            ReactDom.render(element, this.domElement);
        }
    };
    Object.defineProperty(ReactAggregatedCalendarWebPart.prototype, "dataVersion", {
        /**
         * Gets the data Version of the Webpart
         *
         * @readonly
         * @protected
         * @type {Version}
         * @memberof ReactAggregatedCalendarWebPart
         */
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Initializes the SPFx Property Pane of the Aggregated Calendar Webpart
     *
     * @protected
     * @returns {IPropertyPaneConfiguration}
     * @memberof ReactAggregatedCalendarWebPart
     */
    ReactAggregatedCalendarWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                (0, sp_webpart_base_1.PropertyPaneTextField)('header', {
                                    label: strings.HeaderFieldLabel
                                }),
                                (0, PropertyFieldCustomList_1.PropertyFieldCustomList)('calendarList', {
                                    label: strings.SelectCalendarLabel,
                                    value: this.properties.calendarList,
                                    headerText: 'Manage Calendar',
                                    fields: [
                                        { id: 'CalendarTitle', title: 'Calendar Title', required: true, type: PropertyFieldCustomList_1.CustomListFieldType.string },
                                        { id: 'SiteUrl', title: 'Site Url', required: true, type: PropertyFieldCustomList_1.CustomListFieldType.string },
                                        {
                                            id: 'CalendarListTitle', title: 'Calendar List Title', required: true,
                                            type: PropertyFieldCustomList_1.CustomListFieldType.string
                                        },
                                        { id: 'Color', title: 'Color', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.color }
                                    ],
                                    disabled: false,
                                    onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    context: this.context,
                                    key: 'calendarList'
                                }),
                                (0, sp_webpart_base_1.PropertyPaneDropdown)('dateFormat', {
                                    label: strings.SelectDateFormatFieldLabel,
                                    selectedKey: "MMMM Do YYYY, h: mm a",
                                    options: this.timeFormat
                                }),
                                (0, sp_webpart_base_1.PropertyPaneToggle)('showLegend', {
                                    label: strings.ShowLegendFieldLabel,
                                    onText: strings.OnTextFieldLabel,
                                    offText: strings.OffTextFieldLabel,
                                    checked: false
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    /**
     * Check whether Aggregated Calendar needs configuration
     * or not
     * @private
     * @returns {boolean}
     * @memberof ReactAggregatedCalendarWebPart
     */
    ReactAggregatedCalendarWebPart.prototype.needsConfiguration = function () {
        sp_core_library_1.Log.verbose("needsConfiguration()", "calendarList : " + this.properties.calendarList, this.context.serviceScope);
        return this.properties.calendarList === null ||
            this.properties.calendarList === undefined ||
            this.properties.calendarList.length === 0;
    };
    /**
     * Render Message method to render the message component
     *
     * @private
     * @param {string} statusMessage
     * @param {MessageBarType} statusMessageType
     * @param {boolean} display
     * @memberof ReactAggregatedCalendarWebPart
     */
    ReactAggregatedCalendarWebPart.prototype.renderMessage = function (statusMessage, statusMessageType, display) {
        sp_core_library_1.Log.verbose("renderMessage()", "Rendering Message " + statusMessage + " of type " + statusMessageType, this.context.serviceScope);
        var messageElement = React.createElement(MessageComponent_1.default, {
            Message: statusMessage,
            Type: statusMessageType,
            Display: display
        });
        ReactDom.render(messageElement, this.domElement);
    };
    return ReactAggregatedCalendarWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = ReactAggregatedCalendarWebPart;
//# sourceMappingURL=ReactAggregatedCalendarWebPart.js.map