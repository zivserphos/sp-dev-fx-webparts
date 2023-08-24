import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
import { IContentQueryWebPartProps } from './IContentQueryWebPartProps';
export default class ContentQueryWebPart extends BaseClientSideWebPart<IContentQueryWebPartProps> {
    private readonly logSource;
    /***************************************************************************
     * Service used to perform REST calls
     ***************************************************************************/
    private ContentQueryService;
    /***************************************************************************
     * Custom ToolPart Property Panes
     ***************************************************************************/
    private siteUrlDropdown;
    private webUrlDropdown;
    private listTitleDropdown;
    private orderByDropdown;
    private orderByDirectionChoiceGroup;
    private limitEnabledToggle;
    private itemLimitTextField;
    private recursiveEnabledToggle;
    private filtersPanel;
    private viewFieldsChecklist;
    private templateTextDialog;
    private templateUrlTextField;
    private externalScripts;
    /***************************************************************************
     * Returns the WebPart's version
     ***************************************************************************/
    protected get dataVersion(): Version | any;
    /***************************************************************************
     * Initializes the WebPart
     ***************************************************************************/
    protected onInit(): Promise<void>;
    /***************************************************************************
     * Renders the WebPart
     ***************************************************************************/
    render(): void;
    /***************************************************************************
     * Loads the toolpart configuration
     ***************************************************************************/
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    /***************************************************************************
     * Loads the HandleBars template from the specified url
     ***************************************************************************/
    private loadTemplate;
    /***************************************************************************
     * Loads the HandleBars context based on the specified query
     ***************************************************************************/
    private loadTemplateContext;
    /***************************************************************************
     * Loads the dropdown options for the webUrl property
     ***************************************************************************/
    private loadSiteUrlOptions;
    /***************************************************************************
     * Loads the dropdown options for the webUrl property
     ***************************************************************************/
    private loadWebUrlOptions;
    /***************************************************************************
     * Loads the dropdown options for the listTitle property
     ***************************************************************************/
    private loadListTitleOptions;
    /***************************************************************************
     * Loads the dropdown options for the orderBy property
     ***************************************************************************/
    private loadOrderByOptions;
    /***************************************************************************
     * Loads the dropdown options for the listTitle property
     ***************************************************************************/
    private loadFilterFields;
    /***************************************************************************
     * Loads the checklist items for the viewFields property
     ***************************************************************************/
    private loadViewFieldsChecklistItems;
    /***************************************************************************
     * Returns the user suggestions based on the user entered picker input
     * @param filterText : The filter specified by the user in the people picker
     * @param currentPersonas : The IPersonaProps already selected in the people picker
     * @param limitResults : The results limit if any
     ***************************************************************************/
    private loadPeoplePickerSuggestions;
    /***************************************************************************
     * Returns the taxonomy suggestions based on the user entered picker input
     * @param field : The taxonomy field from which to load the terms from
     * @param filterText : The filter specified by the user in the people picker
     * @param currentPersonas : The IPersonaProps already selected in the people picker
     * @param limitResults : The results limit if any
     ***************************************************************************/
    private loadTaxonomyPickerSuggestions;
    /***************************************************************************
     * When a custom property pane updates
     ***************************************************************************/
    private onCustomPropertyPaneChange;
    /***************************************************************************
     * Validates the templateUrl property
     ***************************************************************************/
    private onTemplateUrlChange;
    /***************************************************************************
     * Validates the itemLimit property
     ***************************************************************************/
    private onItemLimitChange;
    /***************************************************************************
     * Resets dependent property panes if needed
     ***************************************************************************/
    private resetDependentPropertyPanes;
    /***************************************************************************
     * Resets the List Title property pane and re-renders it
     ***************************************************************************/
    private resetWebUrlPropertyPane;
    /***************************************************************************
     * Resets the List Title property pane and re-renders it
     ***************************************************************************/
    private resetListTitlePropertyPane;
    /***************************************************************************
     * Resets the Filters property pane and re-renders it
     ***************************************************************************/
    private resetOrderByPropertyPane;
    /***************************************************************************
     * Resets the Filters property pane and re-renders it
     ***************************************************************************/
    private resetFiltersPropertyPane;
    /***************************************************************************
     * Resets the View Fields property pane and re-renders it
     ***************************************************************************/
    private resetViewFieldsPropertyPane;
}
