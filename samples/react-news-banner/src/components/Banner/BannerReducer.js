var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { EBannerTypes } from "./EBannerTypes";
// Reducer
export var reducer = function (state, action) {
    switch (action.type) {
        case EBannerTypes.SET_ITEMS:
            return __assign(__assign({}, state), { items: action.payload });
        case EBannerTypes.SET_SELECTED_ITEM:
            return __assign(__assign({}, state), { selectedItem: action.payload });
        case EBannerTypes.SET_ISLOADING:
            return __assign(__assign({}, state), { isLoading: action.payload });
        case EBannerTypes.SET_MESSAGE:
            return __assign(__assign({}, state), { messageError: action.payload });
        default:
            return state;
    }
};
//# sourceMappingURL=BannerReducer.js.map