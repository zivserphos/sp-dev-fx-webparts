import { IAggregatedCalendarService } from './IAggregatedCalendarService';
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
/**
 * Aggregated Calendar Service for teh Aggregated Calendar Webpart to get the Calendar Events
 *
 * @export
 * @class AggregatedCalendarService
 * @implements {IAggregatedCalendarService}
 */
export declare class AggregatedCalendarService implements IAggregatedCalendarService {
    static readonly serviceKey: ServiceKey<IAggregatedCalendarService>;
    private _spHttpClient;
    private _serviceScope;
    /**
     *Creates an instance of AggregatedCalendarService.
     * @param {ServiceScope} serviceScope
     * @memberof AggregatedCalendarService
     */
    constructor(serviceScope: ServiceScope);
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
    getEventsForCalendar(calendarRestApi: string, calendarColor: string, startDate: string, endDate: string): Promise<any[]>;
}
