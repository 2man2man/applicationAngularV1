import { HttpClient, HttpResponse } from "@angular/common/http";
import { ApiGetRequest } from "src/app/core/services/Requests/ApiGetRequest";
import { ApiRequestHelper } from "src/app/core/services/Requests/ApiRequestHelper";

export class ArticleModel {

    id: number;
    number: string;
    name: string;
    tenant: any

    constructor() {
    }

    public toCreateJson(): any {

        let tenantId: number = this.tenant.id;

        return {
            "number": this.number,
            "name": this.name,
            "tenantId": tenantId
        }
    }

    public toUpdateJson(): any {
        return {
            "number": this.number,
            "name": this.name,
        }
    }


    public static createEmtpy(): ArticleModel {
        let result: ArticleModel = new ArticleModel();
        return result;
    }



    public static async fillDataById(id: number, model: ArticleModel, httpClient: HttpClient): Promise<ArticleModel> {

        let request: ApiGetRequest = new ApiGetRequest(httpClient);
        request.endpoint("article/getById/" + id);
        request = ApiRequestHelper.getInstance().executeRequest(request);

        let response = await request.getResponsePromise();

        if (!response?.ok) {
            throw new Error("Failed to fetch fixed location type, status: ${response.status}");
        }
        let responseBody = response.body;
        ArticleModel.fillDataFromJson(model, responseBody);
        return model;
    }




    public static fillDataFromJson(model: ArticleModel, json: any): void {
        model.id = json["id"];
        model.number = json["number"];
        model.name = json["name"];
        model.tenant = json["tenant"];
    }



}