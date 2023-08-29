import * as React from 'react';
import 'fullcalendar';
import { IReactAggregatedCalendarProps } from './IReactAggregatedCalendarProps';
import { FullCalendarEvent } from '../model/FullCalendarEvent';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
/**
 * Interface for maintaining ReactAggregatedCalendar webpart state
 *
 * @export
 * @interface IReactAggregatedCalendarState
 */
export interface IReactAggregatedCalendarState {
    isCalloutVisible?: boolean;
    selectedEvent: FullCalendarEvent;
    directionalHint?: DirectionalHint;
    isBeakVisible?: boolean;
    gapSpace?: number;
    beakWidth?: number;
    EventElement: HTMLElement;
}
/**
 * React Component for ReactAggregatedCalendar Webpart
 *
 * @export
 * @class ReactAggregatedCalendar
 * @extends {React.Component<IReactAggregatedCalendarProps, IReactAggregatedCalendarState>}
 */
export default class ReactAggregatedCalendar extends React.Component<IReactAggregatedCalendarProps, IReactAggregatedCalendarState> {
    /**
     *Creates an instance of ReactAggregatedCalendar.
     * @param {IReactAggregatedCalendarProps} props
     * @memberof ReactAggregatedCalendar
     */
    constructor(props: IReactAggregatedCalendarProps);
    /**
     * componentDidMount
     *
     * @memberof ReactAggregatedCalendar
     */
    componentDidMount(): void;
    /**
     * componentDidUpdate
     *
     * @memberof ReactAggregatedCalendar
     */
    componentDidUpdate(): void;
    /**
     * Render method for the ReactAggregatedCalendar React Component
     *
     * @returns {React.ReactElement<IReactAggregatedCalendarProps>}
     * @memberof ReactAggregatedCalendar
     */
    render(): React.ReactElement<IReactAggregatedCalendarProps>;
    /**
     * Render the Full Calendar Plugin
     *
     * @private
     * @memberof ReactAggregatedCalendar
     */
    private renderContents;
    /**
     * Click Event handler when the event is clicked on the Calendar
     * Display the Callout function to display event details
     * @private
     * @param {*} eventObj
     * @param {*} jsEvent
     * @param {*} view
     * @memberof ReactAggregatedCalendar
     */
    private eventClickHandler;
    /**
    * Hide the call out component on close
    *
    * @private
    * @memberof ReactAggregatedCalendar
    */
    private onCalloutDismiss;
    /**
     * Create markup for rendering HTML on react component
     *
     * @private
     * @returns
     * @memberof ReactAggregatedCalendar
     */
    private createMarkup;
}
