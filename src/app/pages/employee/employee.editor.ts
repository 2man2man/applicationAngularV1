import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Injector, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';
import { ApiGetRequest } from 'src/app/core/services/Requests/ApiGetRequest';
import { ApiPostRequest } from 'src/app/core/services/Requests/ApiPostRequest';
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
  readonly dateOfBirthId: string = "EmployeeEditorComponent_dateOfBirthId";

  readonly tenantDomainClazz: DomainClazzEnum = DomainClazzEnum.Tenant;

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
    console.log("end of onInit reached!");
  }

  private loadExistingEmployee() {
    EmployeeModel.fillDataById(this.idExistingEmployee, this.employeeModel, this.httpClient)
      .then((result: EmployeeModel) => {
        this.initialTenants = result.tenants.slice();
      })
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


  public save(): void {
    if (!this.checkInput()) {
      return;
    }
    this.sendRequest();
  }
  private checkInput(): boolean {

    let check = true;

    if (StringUtil.isEmpty(this.employeeModel.firstName)) {
      GuiUtil.setBorderToRed(this.firstNameId);
      check = false
    }
    if (StringUtil.isEmpty(this.employeeModel.lastName)) {
      GuiUtil.setBorderToRed(this.lastNameId);
      check = false
    }
    if (StringUtil.isEmpty(this.employeeModel.userName)) {
      GuiUtil.setBorderToRed(this.userNameId);
      check = false
    }
    if (StringUtil.isEmpty(this.employeeModel.password)) {
      GuiUtil.setBorderToRed(this.passwordId);
      check = false
    }

    return check;
  }

  public returnToEmployeeView(): void {
    this.router.navigate(['employee']);
  }

  private sendRequest(): void {
    let request: ApiPostRequest = new ApiPostRequest(this.httpClient);
    request.endpoint("employee");
    request.body(JSON.stringify(this.employeeModel.toCreateJson()));
    request = ApiRequestHelper.getInstance().executeRequest(request);

    request.getResponsePromise()?.
      then((value: HttpResponse<any>) => {
        this.returnToEmployeeView();
      }).catch((value: HttpResponse<any>) => {
        alert("That failed"); //TODO: show better error dialog
      });
  }



}




