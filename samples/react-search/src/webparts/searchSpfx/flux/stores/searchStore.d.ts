import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ISearchResults, ICells } from '../../utils/ISearchResults';
import { EventEmitter } from 'fbemitter';
export declare class SearchStoreStatic extends EventEmitter {
    private _results;
    private _url;
    private _response;
    /**
     * @param {function} callback
     */
    addChangeListener(callback: any): void;
    /**
     * @param {function} callback
     */
    removeChangeListener(callback: any): void;
    emitChange(): void;
    getSearchResults(): ICells[];
    setSearchResults(crntResults: ICells[], fields: string): void;
    /**
     * @param {IWebPartContext} context
     * @param {string} url
     */
    GetSearchData(context: IWebPartContext, url: string): Promise<ISearchResults>;
    /**
     * @param {string} value
     */
    isEmptyString(value: string): boolean;
    /**
     * @param {any} value
     */
    isNull(value: any): boolean;
    setLoggingInfo(url: string, response: any): void;
    getLoggingInfo(): any;
}
declare const searchStore: SearchStoreStatic;
export default searchStore;
