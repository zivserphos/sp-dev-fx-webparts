import * as React from 'react';
import { ISearchSpfxWebPartProps } from '../ISearchSpfxWebPartProps';
export interface IDefaultTemplate extends ISearchSpfxWebPartProps {
    results: any[];
}
export default class DefaultTemplate extends React.Component<IDefaultTemplate, {}> {
    render(): JSX.Element;
}
