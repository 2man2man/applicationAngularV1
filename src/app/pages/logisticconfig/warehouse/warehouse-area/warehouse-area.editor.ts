import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Inject, Injector, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiPostRequest } from 'src/app/core/services/Requests/ApiPostRequest';
import { ApiPutRequest } from 'src/app/core/services/Requests/ApiPutRequest';
import { ApiRequestHelper } from 'src/app/core/services/Requests/ApiRequestHelper';
import { GuiUtil } from 'src/app/util/GuiUtil';
import { StringUtil } from 'src/app/util/StringUtil';
import { WarehouseAreaModel } from './warehouse-area.model';


@Component({
  selector: 'warehouse-area-editor',
  templateUrl: './warehouse-area.editor.html',
  styleUrls: ['./warehouse-area.editor.less'],
})
export class WarehouseAreaEditorComponent {

  readonly numberId: string = "WarehouseAreaEditorComponent_numberId";
  readonly nameId: string = "WarehouseAreaEditorComponent_nameId";

  idExisting: number = 0;
  warehouseId: number = 0;
  model: WarehouseAreaModel = WarehouseAreaModel.createEmtpy();


  constructor(
    private httpClient: HttpClient,
    public dialogRef: MatDialogRef<WarehouseAreaEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idExisting = data.areaId;
    this.warehouseId = data.warehouseId;
  }

  public ngOnInit() {
    if (this.idExisting > 0) {
      this.loadExisting();
    }
    else {
      this.model.warehouseId = this.warehouseId;
    }
  }

  private loadExisting() {

    Promise.resolve()
      .then(() => {
        return WarehouseAreaModel.fillDataById(this.idExisting, this.model, this.httpClient);
      })
      .catch((error) => {
        let errorMessage = "WarehouseArea could not be loaded: " + error;
        console.log(errorMessage);
        alert(errorMessage);
      });


  }

  public save(): void {

    Promise.resolve()
      .then(() => { return this.checkRequiredFields() })
      .then((value) => { return this.sendRequest() })
      .then((value) => { this.dialogRef.close(value) })
      .catch(error => {
        console.log(error) //TODO: handle error better
        alert(error);
      });
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }


  private sendRequest(): Promise<any> {
    if (this.isUpdate()) {
      return this.doUpdate();
    }
    else {
      return this.doCreate();
    }
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



  private isUpdate(): boolean {
    if (!this.idExisting) {
      return false;
    }
    else if (this.idExisting <= 0) {
      return false;
    }
    return true;
  }



  private doCreate(): Promise<HttpResponse<any>> {
    let request: ApiPostRequest = new ApiPostRequest(this.httpClient);
    request.endpoint("warehouse/area");
    request.body(JSON.stringify(this.model.toCreateJson()));
    request = ApiRequestHelper.getInstance().executeRequest(request);
    return request.getResponsePromise();
  }

  private doUpdate(): Promise<HttpResponse<any>> {
    let request: ApiPutRequest = new ApiPutRequest(this.httpClient);
    request.endpoint("warehouse/area/updateById/" + this.idExisting);
    request.body(JSON.stringify(this.model.toUpdateJson()));
    request = ApiRequestHelper.getInstance().executeRequest(request);
    return request.getResponsePromise();
  }

}




