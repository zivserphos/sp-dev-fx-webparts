import * as React from 'react';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
/**
 * Interface to implement the MessageComponent Webpart
 *
 * @export
 * @interface IMessageComponentProps
 */
export interface IMessageComponentProps {
    Message: string;
    Type: MessageBarType;
    Display: boolean;
}
/**
 * React MessageComponent for displaying the messages
 *
 * @export
 * @class MessageComponent
 * @extends {React.Component<IMessageComponentProps, any>}
 */
export default class MessageComponent extends React.Component<IMessageComponentProps, any> {
    /**
     *Creates an instance of MessageComponent.
     * @param {IMessageComponentProps} props
     * @memberof MessageComponent
     */
    constructor(props: IMessageComponentProps);
    /**
     * Render method of the Message Component
     *
     * @returns {React.ReactElement<IMessageComponentProps>}
     * @memberof MessageComponent
     */
    render(): React.ReactElement<IMessageComponentProps>;
}
