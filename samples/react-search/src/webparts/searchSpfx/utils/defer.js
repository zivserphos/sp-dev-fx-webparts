"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defer = void 0;
function defer() {
    var resolve;
    var reject;
    var promise = new Promise(function (cbResolve, cbReject) {
        resolve = cbResolve;
        reject = cbReject;
    });
    return {
        resolve: resolve,
        reject: reject,
        promise: promise
    };
}
exports.defer = defer;
//# sourceMappingURL=defer.js.map