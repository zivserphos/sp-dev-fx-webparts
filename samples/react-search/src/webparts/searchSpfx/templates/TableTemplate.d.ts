import * as React from 'react';
import { ISearchSpfxWebPartProps } from '../ISearchSpfxWebPartProps';
export interface ITableTemplate extends ISearchSpfxWebPartProps {
    results: any[];
}
export default class TableTemplate extends React.Component<ITableTemplate, {}> {
    private iconUrl;
    private unknown;
    private getAuthorDisplayName;
    private getDateFromString;
    render(): JSX.Element;
}
