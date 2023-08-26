/* tslint:disable */
import { INotification } from "../../entities";
import { IListItem } from "../../entities/IListItem";

export interface IBannerState {
  selectedItem: IListItem | undefined;
  items:IListItem[];
  isLoading: boolean;
  messageError: INotification | undefined
}
