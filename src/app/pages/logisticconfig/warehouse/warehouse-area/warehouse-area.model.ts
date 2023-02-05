import { HttpClient, HttpResponse } from "@angular/common/http";
import { ApiGetRequest } from "src/app/core/services/Requests/ApiGetRequest";
import { ApiRequestHelper } from "src/app/core/services/Requests/ApiRequestHelper";

export class WarehouseAreaModel {

    id: number;
    warehouseId: number;
    number: string;
    name: string;

    constructor() {
    }

    public toCreateJson(): any {
        return {
            "warehouseId": this.warehouseId,
            "number": this.number,
            "name": this.name,
        }
    }

    public toUpdateJson(): any {
        return {
            "number": this.number,
            "name": this.name,
        }
    }


    public static createEmtpy(): WarehouseAreaModel {
        let result: WarehouseAreaModel = new WarehouseAreaModel();
        return result;
    }


    public static async fillDataById(id: number, model: WarehouseAreaModel, httpClient: HttpClient): Promise<WarehouseAreaModel> {

        let request: ApiGetRequest = new ApiGetRequest(httpClient);
        request.endpoint("warehouse/area/getById/" + id);
        request = ApiRequestHelper.getInstance().executeRequest(request);

        let response = await request.getResponsePromise();

        if (!response?.ok) {
            throw new Error("Failed to fetch warehouse area, status: ${response.status}");
        }
        let responseBody = response.body;
        WarehouseAreaModel.fillDataFromJson(model, responseBody);
        return model;
    }




    public static fillDataFromJson(model: WarehouseAreaModel, json: any): void {
        model.id = json["id"];
        model.warehouseId = json["warehouseId"];
        model.number = json["number"];
        model.name = json["name"];
    }



}