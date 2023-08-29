import { IAggregatedCalendarService } from './IAggregatedCalendarService';
import { FullCalendarEvent } from '../model/FullCalendarEvent';
/**
 * Mock Service for AggregatedCalendarService
 *
 * @export
 * @class AggregatedCalendarMockService
 * @implements {IAggregatedCalendarService}
 */
export declare class AggregatedCalendarMockService implements IAggregatedCalendarService {
    /**
     * Returns the mock data for the calendar events
     *
     * @param {string} calendarRestApi
     * @param {string} calendarColor
     * @param {string} startDate
     * @param {string} endDate
     * @returns {Promise<FullCalendarEvent[]>}
     * @memberof AggregatedCalendarMockService
     */
    getEventsForCalendar(calendarRestApi: string, calendarColor: string, startDate: string, endDate: string): Promise<FullCalendarEvent[]>;
}
