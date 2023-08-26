"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allTemplates = void 0;
exports.allTemplates = [
    { key: 'DefaultTemplate', text: 'Default template', mappings: 'Path,Title' },
    { key: 'TableTemplate', text: 'Table template', mappings: 'Path,Title,Filename,Fileextension,ModifiedOWSDATE,EditorOWSUSER' }
];
var TemplateLoader = /** @class */ (function () {
    function TemplateLoader() {
    }
    TemplateLoader.prototype.getComponent = function (templateToLoad) {
        return new Promise(function (resolve, reject) {
            var component = require("../templates/" + templateToLoad + ".js");
            resolve(component.default);
        });
    };
    TemplateLoader.prototype.getTemplateMappings = function (templateToLoad) {
        // Retrieve the fields for the current template
        var fields = exports.allTemplates.filter(function (t) { if (t.key === templateToLoad)
            return true; });
        return fields.length > 0 ? fields[0].mappings : "";
    };
    return TemplateLoader;
}());
exports.default = TemplateLoader;
//# sourceMappingURL=TemplateLoader.js.map