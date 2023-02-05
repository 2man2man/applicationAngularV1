import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Injector, Input, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';
import { ApiGetRequest } from 'src/app/core/services/Requests/ApiGetRequest';
import { ApiPostRequest } from 'src/app/core/services/Requests/ApiPostRequest';
import { ApiPutRequest } from 'src/app/core/services/Requests/ApiPutRequest';
import { ApiRequestHelper } from 'src/app/core/services/Requests/ApiRequestHelper';
import { GuiUtil } from 'src/app/util/GuiUtil';
import { StringUtil } from 'src/app/util/StringUtil';
import { WarehouseModel } from './warehouse.model';


@Component({
  selector: 'warehouse-editor-head-data',
  templateUrl: './warehouse.editor.head-data.html',
  styleUrls: ['./warehouse.editor.head-data.less'],
})
export class WarehouseEditorHeadDataComponent {

  readonly numberId: string = "WarehouseEditorHeadDataComponent_numberId";
  readonly nameId: string = "WarehouseEditorHeadDataComponent_nameId";

  @Input() warehouseId: number


  model: WarehouseModel = WarehouseModel.createEmtpy();


  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
  }

  public ngOnInit() {
    this.loadExisting();
  }

  private loadExisting() {

    Promise.resolve()
      .then(() => {
        return WarehouseModel.fillDataById(this.warehouseId, this.model, this.httpClient);
      })
      .catch((error) => {
        let errorMessage = "Warehouse could not be loaded: " + error;
        console.log(errorMessage);
        alert(errorMessage);
      });


  }


  public save(): void {

    Promise.resolve()
      .then(() => { return this.checkRequiredFields() })
      .then((value) => { return this.checkNumberUnique() })
      .then((value) => { return this.sendRequest() })
      .catch(error => {
        console.log(error)
      });
  }


  private sendRequest(): Promise<any> {
    return this.doUpdate();
  }

  private checkRequiredFields(): boolean {

    let missingFields: string[] = [];
    if (StringUtil.isEmpty(this.model.number)) {
      missingFields.push("number");
      GuiUtil.setBorderToRed(this.numberId);
    }
    if (StringUtil.isEmpty(this.model.name)) {
      missingFields.push("name");
      GuiUtil.setBorderToRed(this.nameId);
    }
    if (missingFields.length == 0) {
      return true;
    }
    throw new Error("Some required fields are missing: " + StringUtil.combineWithSeparator(", ", missingFields));
  }

  private checkNumberUnique(): Promise<any> {

    const currentNumber = this.model.number;
    if (StringUtil.isEmpty(currentNumber)) {
      return Promise.resolve();
    }

    let request: ApiGetRequest = new ApiGetRequest(this.httpClient);
    request.endpoint("warehouse/getByNumber/" + currentNumber);
    request = ApiRequestHelper.getInstance().executeRequest(request);
    return request.getResponsePromise()
      .then((value: HttpResponse<any>) => {
        const exisingId = value.body["id"];
        if (exisingId == this.warehouseId) {
          return;
        }
        GuiUtil.setBorderToRed(this.numberId); //TODO: add message for user, that usename is not unique
        throw new Error("Number is not unique");
      },
        (reason) => {
          console.log(reason);
        });
  }





  public returnToMainView(): void {
    this.router.navigate(['logisticConfig/warehouse']);
  }


  private doUpdate(): Promise<HttpResponse<any>> {
    let request: ApiPutRequest = new ApiPutRequest(this.httpClient);
    request.endpoint("warehouse/updateById/" + this.warehouseId);
    request.body(JSON.stringify(this.model.toUpdateJson()));
    request = ApiRequestHelper.getInstance().executeRequest(request);
    return request.getResponsePromise();
  }

}




