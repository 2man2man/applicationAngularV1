import { HttpClient, HttpResponse } from "@angular/common/http";
import { ApiGetRequest } from "src/app/core/services/Requests/ApiGetRequest";
import { ApiRequestHelper } from "src/app/core/services/Requests/ApiRequestHelper";

export class CustomerOrderModel {

    id: number;
    number: string;
    tenant: any

    constructor() {
    }

    public toCreateJson(): any {

        let tenantId: number = this.tenant.id;

        return {
            "number": this.number,
            "tenantId": tenantId
        }
    }

    public toUpdateJson(): any {
        return {
            "number": this.number,
        }
    }


    public static createEmtpy(): CustomerOrderModel {
        let result: CustomerOrderModel = new CustomerOrderModel();
        return result;
    }



    public static async fillDataById(id: number, model: CustomerOrderModel, httpClient: HttpClient): Promise<CustomerOrderModel> {

        let request: ApiGetRequest = new ApiGetRequest(httpClient);
        request.endpoint("customerOrder/getById/" + id);
        request = ApiRequestHelper.getInstance().executeRequest(request);

        let response = await request.getResponsePromise();

        if (!response?.ok) {
            throw new Error("Failed to fetch customer order, status: ${response.status}");
        }
        let responseBody = response.body;
        CustomerOrderModel.fillDataFromJson(model, responseBody);
        return model;
    }




    public static fillDataFromJson(model: CustomerOrderModel, json: any): void {
        model.id = json["id"];
        model.number = json["number"];
        model.tenant = json["tenant"];
    }



}