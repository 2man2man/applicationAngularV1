import { HttpClient, HttpResponse } from "@angular/common/http";
import { ApiGetRequest } from "src/app/core/services/Requests/ApiGetRequest";
import { ApiRequestHelper } from "src/app/core/services/Requests/ApiRequestHelper";

export class FixedLocationTypeModel {

    id: number;
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

    public toUpdateJson(): any {
        return {
            "number": this.number,
            "name": this.name,
        }
    }


    public static createEmtpy(): FixedLocationTypeModel {
        let result: FixedLocationTypeModel = new FixedLocationTypeModel();
        return result;
    }



    public static async fillDataById(id: number, model: FixedLocationTypeModel, httpClient: HttpClient): Promise<FixedLocationTypeModel> {

        let request: ApiGetRequest = new ApiGetRequest(httpClient);
        request.endpoint("fixedLocation/type/getById/" + id);
        request = ApiRequestHelper.getInstance().executeRequest(request);

        let response = await request.getResponsePromise();

        if (!response?.ok) {
            throw new Error("Failed to fetch fixed location type, status: ${response.status}");
        }
        let responseBody = response.body;
        FixedLocationTypeModel.fillDataFromJson(model, responseBody);
        return model;
    }




    public static fillDataFromJson(model: FixedLocationTypeModel, json: any): void {
        model.id = json["id"];
        model.number = json["number"];
        model.name = json["name"];
    }



}