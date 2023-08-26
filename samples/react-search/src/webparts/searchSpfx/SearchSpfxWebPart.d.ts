import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
import { ISearchSpfxWebPartProps } from './ISearchSpfxWebPartProps';
export default class SearchSpfxWebPart extends BaseClientSideWebPart<ISearchSpfxWebPartProps> {
    private crntExternalTemplateUrl;
    private crntExternalTemplate;
    private onChangeBinded;
    private removeChangeBinding;
    constructor();
    protected get dataVersion(): Version;
    /**
     * Return the element to render
     */
    private _getElement;
    /**
     * Load all scripts required to render the element
     */
    private _loadScriptsBeforeRender;
    /**
     * Append the scripts to load
     */
    private _loadScripts;
    /**
     * Check the type of the function name
     */
    private TypeofFullName;
    /**
     * Load stylesheets required for your element
     */
    private _loadStyles;
    /**
     * Render the element
     */
    render(): void;
    protected onPropertyPaneRendered(): void;
    protected onPropertyPaneConfigurationComplete(): void;
    /**
     * Property pane settings
     */
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    /**
     * Function to retrieve the logging value from the store
     */
    private getLogging;
    /**
     * Function to refresh the property pane when a change is retrieved from the store
     */
    private setLogging;
    /**
     * Function to remove the change binding when property pane is closed
     */
    private removeLogging;
    /**
     * Prevent from changing the query on typing
     */
    protected get disableReactivePropertyChanges(): boolean;
}
