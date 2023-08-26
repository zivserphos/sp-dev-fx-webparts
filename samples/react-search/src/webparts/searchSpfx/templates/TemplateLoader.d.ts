import { ITemplates } from '../utils/ITemplates';
export declare const allTemplates: ITemplates[];
export default class TemplateLoader {
    getComponent(templateToLoad: string): Promise<any>;
    getTemplateMappings(templateToLoad: string): string;
}
