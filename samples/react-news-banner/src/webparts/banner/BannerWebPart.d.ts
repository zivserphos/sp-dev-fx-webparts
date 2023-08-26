import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from "@microsoft/sp-webpart-base";
import { IPropertyFieldSite } from "@pnp/spfx-property-controls";
export interface IBannerWebPartProps {
    title: string;
    listId: string;
    titleFieldName: string;
    dateFieldName: string;
    descriptionFieldName: string;
    imageUrlFieldName: string;
    listBasetemplate: number;
    numberItems: number;
    sites: IPropertyFieldSite[];
    titleLink: string;
}
export default class BannerWebPart extends BaseClientSideWebPart<IBannerWebPartProps> {
    private textColumns;
    private dateColumns;
    private URLColumns;
    private columns;
    private lists;
    private listColumns;
    private _messageError;
    protected onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected get disableReactivePropertyChanges(): boolean;
    private addLists;
    protected onPropertyPaneConfigurationStart(): Promise<void>;
    protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: unknown, newValue: unknown): Promise<void>;
    private addListColumns;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
