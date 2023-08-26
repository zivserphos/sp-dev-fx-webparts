export interface IDeferred<T> {
    resolve: (result: T) => void;
    reject: (err: T) => void;
    promise: Promise<T>;
}
export declare function defer<T>(): IDeferred<T>;
