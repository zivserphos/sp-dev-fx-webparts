import { IListItem, ISPList } from "./../entities";
import { ISelectedProperties } from "../entities";
import { ISPColumn } from "../entities";
declare type retrunFunctions = {
    getListColumns: (webUrl: string, listId: string) => Promise<ISPColumn[]>;
    getLists: (webUrl: string, baseTemplate: number) => Promise<ISPList[]>;
    getItems: (seletedProperties: ISelectedProperties) => Promise<IListItem[]>;
};
export declare const useList: () => retrunFunctions;
export {};
