
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions, HttpRequest, HttpResponse } from '@angular/common/http';
import { ApiUnexpectedException } from './ApiUnexpectedException';


export interface HttpOptionsWrapper {
    headers: HttpHeaders;
    observe?: 'body';
    params: HttpParams;
}

@Injectable({
    providedIn: 'root'
})

export abstract class ApiAbstractRequest {

    private static readonly BASE_URL = "http://localhost:8080/springbootwildfly/"

    private endpointString: string;

    protected bodyString: string;

    protected headers: Map<string, string>;

    protected params: Map<string, string[]>;

    private response: Promise<HttpResponse<any>> | undefined;

    protected abstract executeImpl(options: HttpOptionsWrapper): Promise<HttpResponse<any>>;

    constructor(private httpClient: HttpClient) {
        this.endpointString = "";
        this.bodyString = "";
        this.headers = new Map<string, string>();
        this.params = new Map<string, string[]>();
    }

    public getReady() {
    }

    public endpoint(endpoint: string): ApiAbstractRequest {
        this.endpointString = endpoint;
        return this;
    }

    public isOk(value: HttpResponse<any>): boolean {
        return value.ok;
    }

    public extractStatus(value: HttpResponse<any>): number {
        return value.status;
    }


    public getResponsePromise(): Promise<HttpResponse<any>> {
        return this.response!;
    }

    public body(body: string): ApiAbstractRequest {
        this.bodyString = body;
        return this;
    }

    public header(key: string, value: string): ApiAbstractRequest {
        this.headers.set(key, value);
        return this;
    }

    public param(key: string, value: string): ApiAbstractRequest {
        let values = this.params.get(key);
        if (values == null) {
            values = new Array<string>();
            this.params.set(key, values);
        }
        values.push(value);
        return this;
    }

    protected getHttpClient(): HttpClient {
        return this.httpClient;
    }


    protected buildOptions(): HttpOptionsWrapper {
        let header: HttpHeaders = new HttpHeaders();
        header = this.addStandardHeaders(header);

        this.headers.forEach((value: string, key: string) => { header = header.set(key, value) });

        let httpParams = new HttpParams();
        this.params.forEach(function (value: string[], key: string,) {
            for (let i = 0; i < value.length; i++) {
                if (httpParams.has(key)) {
                    httpParams = httpParams.append(key, value[i]);
                }
                else {
                    httpParams = httpParams.set(key, value[i]);
                }
            }
        });

        const requestOptions = {
            headers: header,
            params: httpParams,
            observe: 'response' as 'body',
        };

        return requestOptions;
    }


    protected addStandardHeaders(headers: HttpHeaders): HttpHeaders {
        headers = headers.set("Content-Type", "application/json");
        console.log(headers);
        return headers;
    }

    protected buildUrl(): string {
        return ApiAbstractRequest.BASE_URL + this.endpointString;
    }

    public execute(): ApiAbstractRequest {
        const options: { headers: HttpHeaders, observe?: 'body', params: HttpParams } = this.buildOptions();
        this.response = this.executeImpl(options);
        this.addErrorHandling(this.response);
        return this;
    }



    protected addErrorHandling(promise: Promise<HttpResponse<any>>) {

    }





}