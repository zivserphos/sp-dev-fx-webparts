"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var SearchTokenHelper = /** @class */ (function () {
    function SearchTokenHelper() {
        this.regexVal = /\{[^\{]*?\}/gi;
    }
    SearchTokenHelper.prototype.replaceTokens = function (restUrl, context) {
        var _this = this;
        var tokens = restUrl.match(this.regexVal);
        if (tokens !== null && tokens.length > 0) {
            tokens.forEach(function (token) {
                // Check which token has been retrieved
                if (token.toLowerCase().indexOf('today') !== -1) {
                    var dateValue = _this.getDateValue(token);
                    restUrl = restUrl.replace(token, dateValue);
                }
                else if (token.toLowerCase().indexOf('user') !== -1) {
                    var userValue = _this.getUserValue(token, context);
                    restUrl = restUrl.replace(token, userValue);
                }
                else {
                    switch (token.toLowerCase()) {
                        case "{site}":
                            restUrl = restUrl.replace(/{site}/ig, context.pageContext.web.absoluteUrl);
                            break;
                        case "{sitecollection}":
                            restUrl = restUrl.replace(/{sitecollection}/ig, _spPageContextInfo.siteAbsoluteUrl);
                            break;
                        case "{currentdisplaylanguage}":
                            restUrl = restUrl.replace(/{currentdisplaylanguage}/ig, context.pageContext.cultureInfo.currentCultureName);
                            break;
                    }
                }
            });
        }
        return restUrl;
    };
    SearchTokenHelper.prototype.getDateValue = function (token) {
        var dateValue = moment();
        // Check if we need to add days
        if (token.toLowerCase().indexOf("{today+") !== -1) {
            var daysVal = this.getDaysVal(token);
            dateValue = dateValue.add(daysVal, 'day');
        }
        // Check if we need to subtract days
        if (token.toLowerCase().indexOf("{today-") !== -1) {
            var daysVal = this.getDaysVal(token);
            dateValue = dateValue.subtract(daysVal, 'day');
        }
        return dateValue.format('YYYY-MM-DD');
    };
    SearchTokenHelper.prototype.getDaysVal = function (token) {
        var tmpDays = token.substring(7, token.length - 1);
        return parseInt(tmpDays) || 0;
    };
    SearchTokenHelper.prototype.getUserValue = function (token, context) {
        var userValue = '"' + context.pageContext.user.displayName + '"';
        if (token.toLowerCase().indexOf("{user.") !== -1) {
            var propVal = token.toLowerCase().substring(6, token.length - 1);
            switch (propVal) {
                case "name":
                    userValue = '"' + context.pageContext.user.displayName + '"';
                    break;
                case "email":
                    userValue = context.pageContext.user.email;
                    break;
            }
        }
        return userValue;
    };
    return SearchTokenHelper;
}());
exports.default = SearchTokenHelper;
//# sourceMappingURL=SearchTokenHelper.js.map