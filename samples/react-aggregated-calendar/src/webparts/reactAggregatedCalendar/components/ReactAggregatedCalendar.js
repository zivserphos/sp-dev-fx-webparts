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
var $ = require("jquery");
var moment = require("moment");
require("fullcalendar");
var ReactAggregatedCalendar_module_scss_1 = require("./ReactAggregatedCalendar.module.scss");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var AggregatedCalendarService_1 = require("../service/AggregatedCalendarService");
var AggregatedCalendarMockService_1 = require("../service/AggregatedCalendarMockService");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var strings = require("ReactAggregatedCalendarWebPartStrings");
var Callout_1 = require("office-ui-fabric-react/lib/Callout");
var Label_1 = require("office-ui-fabric-react/lib/Label");
/**
 * React Component for ReactAggregatedCalendar Webpart
 *
 * @export
 * @class ReactAggregatedCalendar
 * @extends {React.Component<IReactAggregatedCalendarProps, IReactAggregatedCalendarState>}
 */
var ReactAggregatedCalendar = /** @class */ (function (_super) {
    __extends(ReactAggregatedCalendar, _super);
    /**
     *Creates an instance of ReactAggregatedCalendar.
     * @param {IReactAggregatedCalendarProps} props
     * @memberof ReactAggregatedCalendar
     */
    function ReactAggregatedCalendar(props) {
        var _this = _super.call(this, props) || this;
        _this.onCalloutDismiss = _this.onCalloutDismiss.bind(_this);
        _this.eventClickHandler = _this.eventClickHandler.bind(_this);
        // Initialize the State for ReactAggregatedCalendar
        _this.state = {
            isCalloutVisible: false,
            selectedEvent: {
                id: 0,
                title: '',
                color: '',
                start: moment(),
                end: moment(),
                description: '',
                location: '',
                allDay: false,
                category: ''
            },
            directionalHint: 5 /* bottomCenter */,
            isBeakVisible: true,
            gapSpace: 10,
            beakWidth: 20,
            EventElement: null
        };
        return _this;
    }
    /**
     * componentDidMount
     *
     * @memberof ReactAggregatedCalendar
     */
    ReactAggregatedCalendar.prototype.componentDidMount = function () {
        this.renderContents();
    };
    /**
     * componentDidUpdate
     *
     * @memberof ReactAggregatedCalendar
     */
    ReactAggregatedCalendar.prototype.componentDidUpdate = function () {
        this.renderContents();
    };
    /**
     * Render method for the ReactAggregatedCalendar React Component
     *
     * @returns {React.ReactElement<IReactAggregatedCalendarProps>}
     * @memberof ReactAggregatedCalendar
     */
    ReactAggregatedCalendar.prototype.render = function () {
        var isCalloutVisible = this.state.isCalloutVisible;
        var calendarLegend = ([]);
        // Render the Legend for the Calendar Events
        calendarLegend = this.props.selectedCalendarLists.map(function (calendar) {
            var calendarLegendColor = {
                'background-color': "".concat(calendar.Color)
            };
            return (React.createElement("div", { className: ReactAggregatedCalendar_module_scss_1.default.outerLegendDiv, title: calendar.CalendarTitle },
                React.createElement("div", { className: ReactAggregatedCalendar_module_scss_1.default.innerLegendDiv, style: calendarLegendColor }),
                calendar.CalendarTitle));
        });
        // Render the FullCalendar container
        return (React.createElement("div", { className: ReactAggregatedCalendar_module_scss_1.default.reactAggregatedCalendar },
            React.createElement("h1", null, this.props.header),
            React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement("div", null,
                        React.createElement("div", { id: "aggregatedCalendarComp" }),
                        this.props.showLegend &&
                            React.createElement("div", { className: ReactAggregatedCalendar_module_scss_1.default.legend }, calendarLegend)))),
            isCalloutVisible && (React.createElement(Callout_1.Callout, { className: "ms-CalloutExample", ariaLabelledBy: 'callout-label-1', ariaDescribedBy: 'callout-description-1', role: 'alertdialog', target: this.state.EventElement, onDismiss: this.onCalloutDismiss, gapSpace: this.state.gapSpace, isBeakVisible: this.state.isBeakVisible, beakWidth: this.state.beakWidth, directionalHint: this.state.directionalHint, setInitialFocus: true },
                React.createElement("button", { onClick: this.onCalloutDismiss, className: (0, Utilities_1.css)(ReactAggregatedCalendar_module_scss_1.default.msCalloutclose, ReactAggregatedCalendar_module_scss_1.default.closeIconFocus, 'ms-fontColor-white') },
                    React.createElement("i", { className: "ms-Icon ms-Icon--Clear" })),
                React.createElement("div", { className: (0, Utilities_1.css)(ReactAggregatedCalendar_module_scss_1.default.msCalloutheader, 'ms-fontColor-white') },
                    React.createElement("p", { className: ReactAggregatedCalendar_module_scss_1.default.msCallouttitle }, this.state.selectedEvent.title)),
                React.createElement("div", { className: (0, Utilities_1.css)(ReactAggregatedCalendar_module_scss_1.default.msCalloutinner, ReactAggregatedCalendar_module_scss_1.default.calloutInnerEventContent) },
                    React.createElement("div", { className: "ms-Callout-content" },
                        React.createElement("p", { className: ReactAggregatedCalendar_module_scss_1.default.msCalloutsubText, dangerouslySetInnerHTML: this.createMarkup(this.state.selectedEvent.description) }),
                        React.createElement("p", { className: ReactAggregatedCalendar_module_scss_1.default.msCalloutsubText },
                            React.createElement(Label_1.Label, null,
                                strings.StartTimeLabel,
                                this.state.selectedEvent.start.format(this.props.dateFormat),
                                " "),
                            this.state.selectedEvent.end !== null &&
                                React.createElement(Label_1.Label, null,
                                    strings.EndTimeLabel,
                                    " ",
                                    this.state.selectedEvent.end.format(this.props.dateFormat)),
                            this.state.selectedEvent.location !== '' &&
                                React.createElement(Label_1.Label, null,
                                    strings.LocationLabel,
                                    this.state.selectedEvent.location),
                            this.state.selectedEvent.category !== '' &&
                                React.createElement(Label_1.Label, null,
                                    strings.CategoryLabel,
                                    this.state.selectedEvent.category))))))));
    };
    /**
     * Render the Full Calendar Plugin
     *
     * @private
     * @memberof ReactAggregatedCalendar
     */
    ReactAggregatedCalendar.prototype.renderContents = function () {
        var containerEl = $('#aggregatedCalendarComp');
        var eventSourcesArray = [];
        var dataService = (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Test
            || sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) ? new AggregatedCalendarMockService_1.AggregatedCalendarMockService() :
            this.props.context.serviceScope.consume(AggregatedCalendarService_1.AggregatedCalendarService.serviceKey);
        console.log(this.props.selectedCalendarLists);
        this.props.selectedCalendarLists.forEach(function (calendarData) {
            var calendarRestApi = calendarData.SiteUrl.trim()
                + '/_api/Web/Lists/GetByTitle(\'' + calendarData.CalendarListTitle.trim() + '\')/items';
            eventSourcesArray.push({
                events: (function (start, end, timezone, callback) {
                    var startDate = start.format('YYYY-MM-DD');
                    var endDate = end.format('YYYY-MM-DD');
                    dataService.getEventsForCalendar(calendarRestApi, calendarData.Color, startDate, endDate)
                        .then(function (response) {
                        callback(response);
                    });
                })
            });
        });
        containerEl.fullCalendar({
            timezone: 'local',
            header: {
                left: 'prev,next today',
                center: 'title'
            },
            defaultDate: new Date(),
            navLinks: true,
            editable: true,
            eventLimit: true,
            eventSources: eventSourcesArray,
            eventClick: this.eventClickHandler
        });
    };
    /**
     * Click Event handler when the event is clicked on the Calendar
     * Display the Callout function to display event details
     * @private
     * @param {*} eventObj
     * @param {*} jsEvent
     * @param {*} view
     * @memberof ReactAggregatedCalendar
     */
    ReactAggregatedCalendar.prototype.eventClickHandler = function (eventObj, jsEvent, view) {
        var _this = this;
        this.setState(function () {
            return {
                isCalloutVisible: !_this.state.isCalloutVisible,
                selectedEvent: {
                    id: eventObj.id,
                    title: eventObj.title,
                    color: eventObj.color,
                    start: moment(eventObj.start),
                    end: moment(eventObj.end),
                    description: eventObj.description,
                    location: eventObj.location,
                    allDay: eventObj.allDay,
                    category: eventObj.category
                },
                EventElement: jsEvent.toElement
            };
        });
    };
    /**
    * Hide the call out component on close
    *
    * @private
    * @memberof ReactAggregatedCalendar
    */
    ReactAggregatedCalendar.prototype.onCalloutDismiss = function () {
        this.setState({
            isCalloutVisible: false
        });
    };
    /**
     * Create markup for rendering HTML on react component
     *
     * @private
     * @returns
     * @memberof ReactAggregatedCalendar
     */
    ReactAggregatedCalendar.prototype.createMarkup = function (description) {
        return { __html: description };
    };
    return ReactAggregatedCalendar;
}(React.Component));
exports.default = ReactAggregatedCalendar;
//# sourceMappingURL=ReactAggregatedCalendar.js.map