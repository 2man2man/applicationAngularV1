import { HttpEvent, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { ApiAbstractRequest, HttpOptionsWrapper } from "./ApiAbstractRequest";



export class ApiPutRequest extends ApiAbstractRequest {
    public executeImpl(options: HttpOptionsWrapper): Promise<HttpResponse<any>> {
        let response: Promise<HttpResponse<any>> = this.getHttpClient().put<HttpResponse<any>>(this.buildUrl(), this.bodyString, options).toPromise();
        return response;
    }
}
