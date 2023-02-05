import { HttpClient, HttpResponse } from "@angular/common/http";
import { ApiGetRequest } from "src/app/core/services/Requests/ApiGetRequest";
import { ApiRequestHelper } from "src/app/core/services/Requests/ApiRequestHelper";

export class WarehouseModel {

    id: number;
    number: string;
    name: string;

    constructor() {
    }



    public toUpdateJson(): any {
        return {
            "number": this.number,
            "name": this.name,
        }
    }


    public static createEmtpy(): WarehouseModel {
        let result: WarehouseModel = new WarehouseModel();
        return result;
    }

    public static async fillDataById(id: number, model: WarehouseModel, httpClient: HttpClient): Promise<WarehouseModel> {

        let request: ApiGetRequest = new ApiGetRequest(httpClient);
        request.endpoint("warehouse/getById/" + id);
        request = ApiRequestHelper.getInstance().executeRequest(request);

        let response = await request.getResponsePromise();

        if (!response?.ok) {
            throw new Error("Failed to fetch tenant, status: ${response.status}");
        }
        let responseBody = response.body;
        WarehouseModel.fillDataFromJson(model, responseBody);
        return model;
    }




    public static fillDataFromJson(model: WarehouseModel, json: any): void {
        model.id = json["id"];
        model.number = json["number"];
        model.name = json["name"];
    }



}