import { HttpEvent, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { ApiAbstractRequest, HttpOptionsWrapper } from "./ApiAbstractRequest";



export class ApiGetRequest extends ApiAbstractRequest {

    public executeImpl(options: HttpOptionsWrapper): Promise<HttpResponse<any>> {
        let response: Promise<HttpResponse<any>> = this.getHttpClient().get<HttpResponse<any>>(this.buildUrl(), options).toPromise();
        return response;
    }
}
