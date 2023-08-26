import { EBannerTypes } from "./EBannerTypes";
import { IBannerState } from "./IBannerState";
export declare const reducer: (state: IBannerState, action: {
    type: EBannerTypes;
    payload: unknown;
}) => IBannerState;
