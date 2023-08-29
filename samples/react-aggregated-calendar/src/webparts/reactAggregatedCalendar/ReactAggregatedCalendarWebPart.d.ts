import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
import { SelectedCalendar } from './model/SelectedCalendar';
/**
 * Interface for the Aggregated Calendar Webpart Class Properties
 *
 * @export
 * @interface IReactAggregatedCalendarWebPartProps
 */
export interface IReactAggregatedCalendarWebPartProps {
    header: string;
    calendarList: SelectedCalendar[];
    dateFormat: string;
    showLegend: boolean;
}
/**
 * Aggregated Calendar Webpart Class
 *
 * @export
 * @class ReactAggregatedCalendarWebPart
 * @extends {BaseClientSideWebPart<IReactAggregatedCalendarWebPartProps>}
 */
export default class ReactAggregatedCalendarWebPart extends BaseClientSideWebPart<IReactAggregatedCalendarWebPartProps> {
    private availableViews;
    private timeFormat;
    protected onInit(): Promise<void>;
    /**
     * Renders the React Agggregated Calendar Webpart
     *
     * @memberof ReactAggregatedCalendarWebPart
     */
    render(): void;
    /**
     * Gets the data Version of the Webpart
     *
     * @readonly
     * @protected
     * @type {Version}
     * @memberof ReactAggregatedCalendarWebPart
     */
    protected get dataVersion(): Version;
    /**
     * Initializes the SPFx Property Pane of the Aggregated Calendar Webpart
     *
     * @protected
     * @returns {IPropertyPaneConfiguration}
     * @memberof ReactAggregatedCalendarWebPart
     */
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    /**
     * Check whether Aggregated Calendar needs configuration
     * or not
     * @private
     * @returns {boolean}
     * @memberof ReactAggregatedCalendarWebPart
     */
    private needsConfiguration;
    /**
     * Render Message method to render the message component
     *
     * @private
     * @param {string} statusMessage
     * @param {MessageBarType} statusMessageType
     * @param {boolean} display
     * @memberof ReactAggregatedCalendarWebPart
     */
    private renderMessage;
}
