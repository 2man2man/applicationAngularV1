import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';




import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take, tap } from 'rxjs/operators';



@Injectable()
export class ApiInterceptorLog implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {

        let requestInfo: string = "";
        requestInfo = requestInfo + req.method + " " + req.urlWithParams + "\nHeaders:";


        let keys: string[] = req.headers.keys();
        keys.forEach(element => {
            const value = req.headers.get(element);
            requestInfo = requestInfo + "\n" + element + ": " + value;
        });

        const body = req.body;

        if (body != null) {
            requestInfo = requestInfo + " " + body;
        }
        console.log(requestInfo);


        return next.handle(req).pipe(
            tap(
                response => console.log(response),
                error => console.log(error)
            ));
    }

}


