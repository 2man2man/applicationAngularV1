import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';




import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { TokenStorageService } from './token.service';
import { ApiRefreshTokenRequest } from './ApiTokenRequests';
import { ApiRequestHelper } from './ApiRequestHelper';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class ApiInterceptorAuth implements HttpInterceptor {

    private isRefreshing = false;

    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private tokenService: TokenStorageService,
        private httpClient: HttpClient) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
        let authReq = req;

        if (authReq.url.includes('oauth/token')) {
            return next.handle(req);
        }

        const token = this.tokenService.getToken();
        if (token != null) {
            authReq = this.addTokenHeader(req, token);
        }

        return next.handle(authReq).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                return this.handle401Error(authReq, next);
            }
            return throwError(error);
        }));
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {

        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            const token = this.tokenService.getRefreshToken();

            if (token) {

                let refreshTokenRequest: ApiRefreshTokenRequest = new ApiRefreshTokenRequest(this.httpClient);
                refreshTokenRequest.refreshToken(token);
                refreshTokenRequest = ApiRequestHelper.getInstance().executeRequest(refreshTokenRequest);

                return refreshTokenRequest.getExecutedRequest().pipe(

                    switchMap((token: any) => {
                        this.isRefreshing = false;

                        const accessToken: string = token.body["access_token"];
                        const refreshToken: string = token.body["refresh_token"];

                        this.tokenService.saveToken(accessToken);
                        this.tokenService.saveRefreshToken(refreshToken);

                        this.refreshTokenSubject.next(accessToken);

                        return next.handle(this.addTokenHeader(request, accessToken));
                    }),
                    catchError((err) => {
                        this.isRefreshing = false;

                        this.tokenService.signOut();
                        return throwError(err);
                    })
                );
            }
        }

        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => next.handle(this.addTokenHeader(request, token)))
        );
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, "Bearer " + token) });
    }
}