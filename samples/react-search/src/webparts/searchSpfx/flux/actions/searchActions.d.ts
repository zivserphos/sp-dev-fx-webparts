import { IWebPartContext } from '@microsoft/sp-webpart-base';
export declare class SearchActionsStatic {
    /**
     * @param  {string} query
     * @param  {string} fields
     */
    get(context: IWebPartContext, query: string, maxResults: number, sorting: string, fields?: string): void;
}
declare const searchActions: SearchActionsStatic;
export default searchActions;
