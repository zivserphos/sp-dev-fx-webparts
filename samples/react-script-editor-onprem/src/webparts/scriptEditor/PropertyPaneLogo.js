import { PropertyPaneFieldType } from '@microsoft/sp-webpart-base';
var PropertyPaneLogo = /** @class */ (function () {
    function PropertyPaneLogo() {
        this.type = PropertyPaneFieldType.Custom;
        this.properties = {
            key: "Logo",
            onRender: this.onRender.bind(this)
        };
    }
    PropertyPaneLogo.prototype.onRender = function (elem) {
        elem.innerHTML = "\n    <div style=\"margin-top: 30px\">\n      <div style=\"float:right\">Author: <a href=\"https://twitter.com/mikaelsvenson\" tabindex=\"-1\">Mikael Svenson</a></div>\n    </div>";
    };
    return PropertyPaneLogo;
}());
export { PropertyPaneLogo };
export default PropertyPaneLogo;
//# sourceMappingURL=PropertyPaneLogo.js.map