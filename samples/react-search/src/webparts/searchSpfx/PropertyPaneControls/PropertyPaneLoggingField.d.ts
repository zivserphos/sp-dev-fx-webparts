import { IPropertyPaneField } from '@microsoft/sp-webpart-base';
import { IPropertyPaneLoggingFieldProps } from './IPropertyPaneLoggingFieldProps';
export interface IPropertyPaneLoggingFieldPropsInternal extends IPropertyPaneLoggingFieldProps {
    onRender(elem: HTMLElement): void;
    onDispose(elem: HTMLElement): void;
}
export declare function PropertyPaneLoggingField(properties: IPropertyPaneLoggingFieldProps): IPropertyPaneField<IPropertyPaneLoggingFieldPropsInternal>;
