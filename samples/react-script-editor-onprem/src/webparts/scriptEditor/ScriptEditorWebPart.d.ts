import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
import { IScriptEditorWebPartProps } from './IScriptEditorWebPartProps';
export default class ScriptEditorWebPart extends BaseClientSideWebPart<IScriptEditorWebPartProps> {
    save: (script: string) => void;
    render(): void;
    private renderEditor;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    private evalScript;
    private nodeName;
    private executeScript;
}
