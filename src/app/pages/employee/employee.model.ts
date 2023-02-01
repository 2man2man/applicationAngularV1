import { HttpClient, HttpResponse } from "@angular/common/http";
import { ApiGetRequest } from "src/app/core/services/Requests/ApiGetRequest";
import { ApiRequestHelper } from "src/app/core/services/Requests/ApiRequestHelper";
import { SleepUtils } from "src/app/util/SleepUtils";
import { TenantModel } from "../system/tenant/tenant.model";

//TODO: find a better way to handle the sleep function
export class EmployeeModel {

    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    tenants: TenantModel[] = [];

    constructor() {
    }

    public toCreateJson(): any {

        let tenantNumbers: string[] = [];
        this.tenants.forEach(element => { tenantNumbers.push(element.number); });

        return {
            "firstName": this.firstName,
            "lastName": this.lastName,
            "userName": this.userName,
            "password": this.password,
            "tenants": tenantNumbers
        }
    }

    public toUpdateJson(): any {
        return this.toCreateJson();
    }


    public static createEmtpy(): EmployeeModel {
        let employee: EmployeeModel = new EmployeeModel();
        return employee;
    }

    public static async fillDataById(id: number, model: EmployeeModel, httpClient: HttpClient): Promise<EmployeeModel> {

        let request: ApiGetRequest = new ApiGetRequest(httpClient);
        request.endpoint("employee/getById/" + id);
        request = ApiRequestHelper.getInstance().executeRequest(request);

        const response = await request.getResponsePromise();
        if (!response?.ok) {
            throw new Error("Failed to fetch employee, status: ${response.status}");
        }

        let responseBody = response.body;
        await EmployeeModel.fillDataFromJson(model, responseBody, httpClient);

        return model;
    }

    private static async fillDataFromJson(model: EmployeeModel, json: any, httpClient: HttpClient) {

        model.firstName = json["firstName"];
        model.lastName = json["lastName"];
        model.userName = json["userName"];

        let tenantNumbers: string[] = json["tenants"];
        tenantNumbers.sort();

        for (let tenantNumber of tenantNumbers) {
            let tenantModel = TenantModel.createEmtpy();
            await TenantModel.fillDataByNumber(tenantNumber, tenantModel, httpClient)
                .then((result: TenantModel) => {
                    model.tenants.push(result);
                });
        }
    }

    public static async test(testValue: string): Promise<string> {
        return testValue + testValue;
    }

}