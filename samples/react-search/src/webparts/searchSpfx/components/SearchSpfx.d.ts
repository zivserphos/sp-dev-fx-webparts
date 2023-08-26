import * as React from 'react';
import { ISearchSpfxWebPartProps } from '../ISearchSpfxWebPartProps';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IExternalTemplate } from '../utils/ITemplates';
import 'SearchSpfx.module.scss';
export interface ISearchSpfxProps extends ISearchSpfxWebPartProps {
    context: IWebPartContext;
    firstRender: Boolean;
    externalTemplate?: IExternalTemplate;
}
export interface ISearchState {
    results?: any[];
    loaded?: Boolean;
    component?: any;
    template?: string;
}
export default class SearchSpfx extends React.Component<ISearchSpfxProps, ISearchState> {
    private loader;
    constructor(props: ISearchSpfxProps, context: IWebPartContext);
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: ISearchSpfxProps): void;
    private _getResults;
    private _onChange;
    render(): JSX.Element;
}
