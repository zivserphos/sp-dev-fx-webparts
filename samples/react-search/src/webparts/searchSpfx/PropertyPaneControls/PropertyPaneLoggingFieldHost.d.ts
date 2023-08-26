import * as React from 'react';
import { IPropertyPaneLoggingFieldPropsInternal } from './PropertyPaneLoggingField';
/**
 * @interface
 * PropertyPaneLoggingFieldHost properties interface
 *
 */
export interface IPropertyPaneLoggingFieldHostProps extends IPropertyPaneLoggingFieldPropsInternal {
}
/**
 * @interface
 * PropertyPaneLoggingFieldHost state interface
 *
 */
export interface IPropertyPaneLoggingFieldState {
    logging?: any[];
}
/**
 * @class
 * Renders the controls for PropertyPaneLoggingField component
 */
export default class PropertyPaneLoggingFieldHost extends React.Component<IPropertyPaneLoggingFieldHostProps, IPropertyPaneLoggingFieldState> {
    /**
     * @function
     * Contructor
     */
    constructor(props: IPropertyPaneLoggingFieldHostProps);
    /**
     * @function
     * componentDidMount
     */
    componentDidMount(): void;
    /**
     * @function
     * componentWillReceiveProps
     */
    componentWillReceiveProps(nextProps: IPropertyPaneLoggingFieldHostProps): void;
    /**
     * @function
     * Retrieve new logging value
     */
    private getLogging;
    /**
     * @function
     * Renders the key values
     */
    private renderValue;
    /**
     * @function
     * Renders the logging field control
     */
    render(): JSX.Element;
}
