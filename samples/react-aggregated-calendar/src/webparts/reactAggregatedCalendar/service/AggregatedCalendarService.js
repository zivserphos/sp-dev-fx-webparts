"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregatedCalendarService = void 0;
var sp_http_1 = require("@microsoft/sp-http");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var moment = require("moment");
/**
 * Aggregated Calendar Service for teh Aggregated Calendar Webpart to get the Calendar Events
 *
 * @export
 * @class AggregatedCalendarService
 * @implements {IAggregatedCalendarService}
 */
var AggregatedCalendarService = /** @class */ (function () {
    /**
     *Creates an instance of AggregatedCalendarService.
     * @param {ServiceScope} serviceScope
     * @memberof AggregatedCalendarService
     */
    function AggregatedCalendarService(serviceScope) {
        var _this = this;
        serviceScope.whenFinished(function () {
            _this._spHttpClient = serviceScope.consume(sp_http_1.SPHttpClient.serviceKey);
            _this._serviceScope = serviceScope;
        });
    }
    /**
     * Gets the Events from the SharePoint Calendar between startDate and endDate
     *
     * @param {string} calendarRestApi
     * @param {string} calendarColor
     * @param {string} startDate
     * @param {string} endDate
     * @returns {Promise<any[]>}
     * @memberof AggregatedCalendarService
     */
    AggregatedCalendarService.prototype.getEventsForCalendar = function (calendarRestApi, calendarColor, startDate, endDate) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _webRestApi = calendarRestApi +
                '?$Select=Title,EventDate,EndDate,Location,Description,Category,fAllDayEvent&$filter=((EventDate ge \''
                + startDate + '\' and EventDate le \'' + endDate + '\'))';
            sp_core_library_1.Log.info("getEventsForCalendar()", "REST API : " + calendarRestApi, _this._serviceScope);
            _this._spHttpClient.get(_webRestApi, sp_http_1.SPHttpClient.configurations.v1)
                .then(function (response) {
                response.json().then(function (spEvents) {
                    sp_core_library_1.Log.verbose("getEventsForCalendar()", JSON.stringify(spEvents), _this._serviceScope);
                    var fullCalendarEvents = [];
                    // Convert the SharePoint Events into compatible Full Calendar Events
                    spEvents.value.forEach(function (spEvent) {
                        fullCalendarEvents.push({
                            id: spEvent.Id,
                            title: spEvent.Title,
                            start: moment(spEvent.EventDate),
                            end: moment(spEvent.EndDate),
                            color: calendarColor,
                            allDay: spEvent.fAllDayEvent,
                            description: spEvent.Description || '',
                            location: spEvent.Location || '',
                            category: spEvent.Category || ''
                        });
                    });
                    sp_core_library_1.Log.info("getEventsForCalendar()", "Returning Full Calendar Events ", _this._serviceScope);
                    sp_core_library_1.Log.verbose("getEventsForCalendar()", JSON.stringify(fullCalendarEvents), _this._serviceScope);
                    resolve(fullCalendarEvents);
                }).catch(function (error) {
                    sp_core_library_1.Log.error("getEventsForCalendar()", new Error("Error Fetching events from Calendar"), _this._serviceScope);
                    reject(error);
                });
            });
        });
    };
    AggregatedCalendarService.serviceKey = sp_core_library_1.ServiceKey.create('ayka:IAggregatedCalendarService', AggregatedCalendarService);
    return AggregatedCalendarService;
}());
exports.AggregatedCalendarService = AggregatedCalendarService;
//# sourceMappingURL=AggregatedCalendarService.js.map