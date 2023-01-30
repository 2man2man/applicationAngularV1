import { HttpClient, HttpResponse } from "@angular/common/http";
import { ApiGetRequest } from "src/app/core/services/Requests/ApiGetRequest";
import { ApiRequestHelper } from "src/app/core/services/Requests/ApiRequestHelper";

export class TenantModel {

    number: string;
    name: string;

    constructor() {
    }

    public toCreateJson(): any {
        return {
            "number": this.number,
            "name": this.name,
        }
    }

    public static createEmtpy(): TenantModel {
        let result: TenantModel = new TenantModel();
        return result;
    }

    public static async fillDataByNumber(number: string, model: TenantModel, httpClient: HttpClient): Promise<TenantModel> {

        let request: ApiGetRequest = new ApiGetRequest(httpClient);
        request.endpoint("tenant/getByNumber/" + number);
        request = ApiRequestHelper.getInstance().executeRequest(request);

        let response = await request.getResponsePromise();

        if (!response?.ok) {
            throw new Error("Failed to fetch tenant, status: ${response.status}");
        }
        let responseBody = response.body;
        TenantModel.fillDataFromJson(model, responseBody);
        return model;
    }


    public static fillDataFromJson(model: TenantModel, json: any): void {
        model.number = json["number"];
        model.name = json["name"];
    }


    public static parseFromJson(json: any): TenantModel {
        let result: TenantModel = new TenantModel();
        //TODO
        return result;
    }
}