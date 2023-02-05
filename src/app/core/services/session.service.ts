import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiGetRequest } from './Requests/ApiGetRequest';
import { ApiRequestHelper } from './Requests/ApiRequestHelper';

@Injectable({
    providedIn: 'root'
}
)
export class SessionService {

    privilegeSystemConfig = new BehaviorSubject<boolean>(false);
    privilegeSystemConfigObservable = this.privilegeSystemConfig.asObservable();

    privilegeLogisticConfig = new BehaviorSubject<boolean>(false);
    privilegeLogisticConfigObservable = this.privilegeLogisticConfig.asObservable();


    constructor(private httpClient: HttpClient) {
        this.refresh();
    }

    public refresh(): void {
        Promise.resolve()
            .then((value) => this.loadUserInfo())
            .catch((error) => {
                // let errorMessage = ("Error while refreshing session information: " + error)
                // console.log(errorMessage);
                // alert(errorMessage);
            });
    }

    private async loadUserInfo() {
        let getRequest: ApiGetRequest = new ApiGetRequest(this.httpClient);
        getRequest.endpoint("employee/getMyself");
        getRequest = ApiRequestHelper.getInstance().executeRequest(getRequest);
        const resposne = await getRequest.getResponsePromise();

        const fetchedSystemConfigurationPrivilege: boolean = resposne.body["systemConfigurationPrivilege"]
        this.privilegeSystemConfig.next(fetchedSystemConfigurationPrivilege);

        const fetchedLogisticConfigurationPrivilege: boolean = resposne.body["logisticConfigurationPrivilege"]
        this.privilegeLogisticConfig.next(fetchedLogisticConfigurationPrivilege);
    }

}