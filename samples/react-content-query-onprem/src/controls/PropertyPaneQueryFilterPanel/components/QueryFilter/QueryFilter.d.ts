import * as React from 'react';
import { IQueryFilterProps } from './IQueryFilterProps';
import { IQueryFilterState } from './IQueryFilterState';
export declare class QueryFilter extends React.Component<IQueryFilterProps, IQueryFilterState> {
    /*************************************************************************************
     * Stores the IQueryFilter config of the current filter
     *************************************************************************************/
    private filter;
    /*************************************************************************************
     * Component's constructor
     * @param props
     * @param state
     *************************************************************************************/
    constructor(props: IQueryFilterProps, state: IQueryFilterState);
    /*************************************************************************************
     * When the field Dropdown changes
     *************************************************************************************/
    private onFieldDropdownChange;
    /*************************************************************************************
     * When the operator Dropdown changes
     *************************************************************************************/
    private onOperatorDropdownChange;
    /*************************************************************************************
     * When the TextField value changes
     *************************************************************************************/
    private onValueTextFieldChange;
    /*************************************************************************************
     * When the people picker value changes
     *************************************************************************************/
    private onPeoplePickerResolve;
    /*************************************************************************************
     * When the "Me" checkbox changes
     * @param ev : The React.FormEvent object which contains the element that has changed
     * @param checked : Whether the checkbox is not checked or not
     *************************************************************************************/
    private onPeoplePickerCheckboxChange;
    /*************************************************************************************
     * When the NormalPeoplePicker value changes
     *************************************************************************************/
    private onTaxonomyPickerResolve;
    /*************************************************************************************
     * When the date picker value changes
     *************************************************************************************/
    private onDatePickerChange;
    /*************************************************************************************
     * When the date expression text field value changes
     *************************************************************************************/
    private onDateExpressionChange;
    /*************************************************************************************
     * When the include time checkbox changes
     * @param ev : The React.FormEvent object which contains the element that has changed
     * @param checked : Whether the checkbox is not checked or not
     *************************************************************************************/
    private onDateIncludeTimeChange;
    /*************************************************************************************
     * When the join ChoiceGroup changes
     *************************************************************************************/
    private onJoinChoiceChange;
    /*************************************************************************************
     * Call the parent onChanged with the updated IQueryFilter object
     *************************************************************************************/
    private onAnyChange;
    /*************************************************************************************
     * Returns the options for the field Dropdown component
     *************************************************************************************/
    private getFieldDropdownOptions;
    /*************************************************************************************
     * Returns the options for the operator Dropdown component
     *************************************************************************************/
    private getOperatorDropdownOptions;
    /*************************************************************************************
     * Returns the options for the operator Dropdown component
     *************************************************************************************/
    private getJoinGroupOptions;
    /*************************************************************************************
     * Returns the user suggestions based on the specified user-entered filter
     *************************************************************************************/
    private onLoadPeoplePickerSuggestions;
    /*************************************************************************************
     * Returns the tag suggestions based on the specified user-entered filter
     *************************************************************************************/
    private onLoadTagPickerSuggestions;
    /*************************************************************************************
     * Converts the specified filter value into a Date object if valid, otherwise null
     * @param dateValue : The filter value that must be transformed into a Date object
     *************************************************************************************/
    private getDatePickerValue;
    /*************************************************************************************
     * Converts the date resolved by the DatePicker into a formatted string
     * @param date : The date resolved by the DatePicker
     *************************************************************************************/
    private onDatePickerFormat;
    /*************************************************************************************
     * Converts the string manually entered by the user in the people picker to a Date
     * @param dateStr : The string that must be parsed to a Date object
     *************************************************************************************/
    private onDatePickerParse;
    /*************************************************************************************
     * Renders the the QueryFilter component
     *************************************************************************************/
    render(): React.JSX.Element;
}
