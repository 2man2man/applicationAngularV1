import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Injector, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';
import { ApiGetRequest } from 'src/app/core/services/Requests/ApiGetRequest';
import { ApiPostRequest } from 'src/app/core/services/Requests/ApiPostRequest';
import { ApiPutRequest } from 'src/app/core/services/Requests/ApiPutRequest';
import { ApiRequestHelper } from 'src/app/core/services/Requests/ApiRequestHelper';
import { GuiUtil } from 'src/app/util/GuiUtil';
import { StringUtil } from 'src/app/util/StringUtil';
import { TenantModel } from '../system/tenant/tenant.model';
import { EmployeeModel } from './employee.model';


@Component({
  selector: 'employee.editor',
  templateUrl: './employee.editor.html',
  styleUrls: ['./employee.editor.less'],
})
export class EmployeeEditorComponent {

  readonly firstNameId: string = "EmployeeEditorComponent_firstNameId";
  readonly lastNameId: string = "EmployeeEditorComponent_lastNameId";
  readonly userNameId: string = "EmployeeEditorComponent_userNameId";
  readonly passwordId: string = "EmployeeEditorComponent_passwordId";

  readonly tenantDomainClazz: DomainClazzEnum = DomainClazzEnum.Tenant;
  readonly warehouseDomainClazz: DomainClazzEnum = DomainClazzEnum.Warehouse;

  idExistingEmployee: number = 0;
  employeeModel: EmployeeModel = EmployeeModel.createEmtpy();

  initialTenants: TenantModel[];


  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
    this.idExistingEmployee = this.router.getCurrentNavigation()?.extras.state?.employeeId;
  }

  public ngOnInit() {
    if (this.idExistingEmployee > 0) {
      this.loadExistingEmployee();
    }
  }

  private loadExistingEmployee() {

    Promise.resolve()
      .then(() => {
        return EmployeeModel.fillDataById(this.idExistingEmployee, this.employeeModel, this.httpClient);
      })
      .then((value: EmployeeModel) => {
        this.initialTenants = value.tenants.slice();
      })
      .catch((error) => {
        let errorMessage = "Employee could not be loaded: " + error;
        console.log(errorMessage);
        alert(errorMessage);
      });


  }

  handleTenantSelection(data: any[]): void {
    if (!data) {
      return;
    }
    this.employeeModel.tenants = [];
    for (let tenantData of data) {
      let tenantModel = TenantModel.createEmtpy();
      TenantModel.fillDataFromJson(tenantModel, tenantData);
      this.employeeModel.tenants.push(tenantModel);
    }
  }

  handleWarehouseSelection(data: any): void {
    this.employeeModel.warehouse = data;
  }


  public save(): void {

    Promise.resolve()
      .then(() => { return this.checkRequiredFields() })
      .then((value) => { return this.checkUserNameUnique() })
      .then((value) => { return this.sendRequest() })
      .then((value) => { return this.returnToEmployeeView() })
      .catch(error => {
        console.log(error)
      });
  }


  private sendRequest(): Promise<any> {
    if (this.isUpdate()) {
      return this.updateEmployee();
    }
    else {
      return this.createEmployee();
    }
  }

  private checkRequiredFields(): boolean {

    let missingFields: string[] = [];
    if (StringUtil.isEmpty(this.employeeModel.firstName)) {
      missingFields.push("firstName");
      GuiUtil.setBorderToRed(this.firstNameId);
    }
    if (StringUtil.isEmpty(this.employeeModel.lastName)) {
      missingFields.push("lastName");
      GuiUtil.setBorderToRed(this.lastNameId);
    }
    if (StringUtil.isEmpty(this.employeeModel.userName)) {
      missingFields.push("userName");
      GuiUtil.setBorderToRed(this.userNameId);
    }

    if (!this.employeeModel.warehouse) { //TODO: add color to gui element
      missingFields.push("warehouse");
    }

    if (!this.isUpdate() && StringUtil.isEmpty(this.employeeModel.password)) {
      missingFields.push("password");
      GuiUtil.setBorderToRed(this.passwordId);
    }
    if (missingFields.length == 0) {
      return true;
    }
    throw new Error("Some required fields are missing: " + StringUtil.combineWithSeparator(", ", missingFields));
  }

  private checkUserNameUnique(): Promise<any> {

    const currentUserName = this.employeeModel.userName;
    if (StringUtil.isEmpty(this.employeeModel.userName)) {
      return Promise.resolve();
    }

    let request: ApiGetRequest = new ApiGetRequest(this.httpClient);
    request.endpoint("employee/getByUserName/" + currentUserName);
    request = ApiRequestHelper.getInstance().executeRequest(request);
    return request.getResponsePromise()
      .then((value: HttpResponse<any>) => {
        const exisingEmployeeId = value.body["id"];
        if (exisingEmployeeId == this.idExistingEmployee) {
          return;
        }
        GuiUtil.setBorderToRed(this.userNameId); //TODO: add message for user, that usename is not unique
        throw new Error("Username is not unique");
      },
        (reason) => {
          console.log(reason);
        });
  }




  private isUpdate(): boolean {
    if (!this.idExistingEmployee) {
      return false;
    }
    else if (this.idExistingEmployee <= 0) {
      return false;
    }
    return true;
  }

  public returnToEmployeeView(): void {
    this.router.navigate(['employee']);
  }

  private createEmployee(): Promise<HttpResponse<any>> {
    let request: ApiPostRequest = new ApiPostRequest(this.httpClient);
    request.endpoint("employee");
    request.body(JSON.stringify(this.employeeModel.toCreateJson()));
    request = ApiRequestHelper.getInstance().executeRequest(request);
    return request.getResponsePromise();
  }

  private updateEmployee(): Promise<HttpResponse<any>> {
    let request: ApiPutRequest = new ApiPutRequest(this.httpClient);
    request.endpoint("employee/updateById/" + this.idExistingEmployee);
    request.body(JSON.stringify(this.employeeModel.toUpdateJson()));
    request = ApiRequestHelper.getInstance().executeRequest(request);
    return request.getResponsePromise();
  }

}




