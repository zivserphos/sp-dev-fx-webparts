import { PageContext } from '@microsoft/sp-page-context';

export interface IContentQueryTemplateContext {
	pageContext: PageContext | any;
	items: any[];
	accessDenied: boolean;
	webNotFound: boolean;
	callTimeStamp: number;
}
