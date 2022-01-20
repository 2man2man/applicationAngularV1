import { HttpEvent, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiAbstractRequest, HttpOptionsWrapper } from "./ApiAbstractRequest";



abstract class ApiTokenRequest extends ApiAbstractRequest {

    private _executedRequest!: Observable<HttpResponse<any>>;

    public getExecutedRequest(): Observable<HttpResponse<any>> {
        return this._executedRequest;
    }

    protected addStandardHeaders(headers: HttpHeaders): HttpHeaders {
        return headers;
    }

    getReady() {
        this.header("Content-Type", "application/x-www-form-urlencoded");
        this.endpoint("oauth/token");
        this.header("Authorization", "Basic " + btoa("GUESS_ME:ITS_A_SECRET"))
    }

    public executeImpl(options: HttpOptionsWrapper): Promise<HttpResponse<any>> {
        this._executedRequest = this.getHttpClient().post<HttpResponse<any>>(this.buildUrl(), null, options);
        let response: Promise<HttpResponse<any>> = this._executedRequest.toPromise();
        return response;
    }
}

export class ApiCreateTokenRequest extends ApiTokenRequest {

    private _username!: string;

    private _password!: string;

    public password(value: string): ApiCreateTokenRequest {
        this._password = value;
        return this;
    }

    public username(value: string): ApiCreateTokenRequest {
        this._username = value;
        return this;
    }

    getReady() {
        super.getReady();
        this.param("grant_type", "password");
        this.param("username", this._username);
        this.param("password", this._password);
    }
}

export class ApiRefreshTokenRequest extends ApiTokenRequest {

    private _refreshToken!: string;

    public refreshToken(value: string): ApiRefreshTokenRequest {
        this._refreshToken = value;
        return this;
    }

    getReady() {
        super.getReady();
        this.param("grant_type", "refresh_token");
        this.param("refresh_token", this._refreshToken);
    }
}
