import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { ApiPostRequest } from "src/app/core/services/Requests/ApiPostRequest";
import { ApiRequestHelper } from "src/app/core/services/Requests/ApiRequestHelper";


export class DataTableDataSourceServer implements DataSource<any> {

    private readonly endpoint: string;

    private lessonsSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    public totalResults: number = 0;
    public currentItems: any[] = [];

    constructor(private httpClient: HttpClient,
        endpoint: string
    ) {
        this.endpoint = endpoint;
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

    load(page: number, limit: number, filters?: Map<string, any>): void {

        if (limit <= 0) {
            limit = 50;
        }
        if (page <= 0) {
            page = 0;
        }

        let filtersElem = filters;
        if (!filtersElem) {
            filtersElem = new Map<string, any>();
        }


        this.loadingSubject.next(true);

        let request: ApiPostRequest = new ApiPostRequest(this.httpClient);
        request.endpoint(this.endpoint);

        let body: SearchParams = new SearchParams(page, limit, filtersElem);


        const bodyString = JSON.stringify(body);

        request.body(bodyString);
        request = ApiRequestHelper.getInstance().executeRequest(request);

        const newLocal = request.getResponsePromise();
        newLocal?.then((value: HttpResponse<any>) => {

            let results = value.body["results"];
            this.currentItems = results;
            this.totalResults = value.body["totalResults"];
            this.lessonsSubject.next(results);

        }).catch((value: HttpResponse<any>) => {
            console.log(value)
            alert("Load failed");
        }).finally(() => {
            this.loadingSubject.next(false);
        });
    }
}

export class SearchParams {

    private page: number;
    private limit: number;
    private filters: Object = {};

    constructor(page: number, limit: number, filterMap: Map<string, any>) {
        this.page = page;
        this.limit = limit;
        filterMap.forEach((value, key) => {
            this.filters[key as keyof Object] = value
        });
    }

}