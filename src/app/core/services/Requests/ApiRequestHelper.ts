import { StringUtil } from "src/app/util/StringUtil";
import { ApiAbstractRequest } from "./ApiAbstractRequest";
import { ApiUnexpectedException } from "./ApiUnexpectedException";


export class ApiRequestHelper {

    private static _instance: ApiRequestHelper;

    private constructor() {
    }

    public static getInstance(): ApiRequestHelper {
        //TODO synchronize this
        return this._instance || (this._instance = new this());
    }

    public executeRequest<T extends ApiAbstractRequest>(request: T): T {
        request.getReady();
        request = <T>request.execute();
        return request;
    }




}
