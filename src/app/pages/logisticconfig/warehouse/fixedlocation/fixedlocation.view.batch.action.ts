import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Injector, Input, NgModule } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ProgressDialogComponent } from 'src/app/components/simple/progress/dialog/progress.dialog.component';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';
import { ApiPostRequest } from 'src/app/core/services/Requests/ApiPostRequest';
import { ApiRequestHelper } from 'src/app/core/services/Requests/ApiRequestHelper';
import { GuiUtil } from 'src/app/util/GuiUtil';
import { PrintUtils } from 'src/app/util/PrintUtil';
import { StringUtil } from 'src/app/util/StringUtil';

@Component({
  selector: 'fixedlocation-view-batchAction',
  templateUrl: './fixedlocation.view.batch.action.html',
  styleUrls: ['./fixedlocation.view.batch.action.less'],
})
export class FixedLocationViewBatchActionComponent {

  readonly modeId: string = StringUtil.getRandom();
  readonly warehouseAreaId: string = StringUtil.getRandom();
  readonly locationTypeId: string = StringUtil.getRandom();
  readonly fromRowId: string = StringUtil.getRandom();
  readonly toRowId: string = StringUtil.getRandom();
  readonly fromColumnId: string = StringUtil.getRandom();
  readonly toColumnId: string = StringUtil.getRandom();
  readonly fromLevelId: string = StringUtil.getRandom();
  readonly toLevelId: string = StringUtil.getRandom();
  readonly fromFragmentId: string = StringUtil.getRandom();
  readonly toFragmentId: string = StringUtil.getRandom();

  readonly domainClazzWarehouseArea = DomainClazzEnum.WarehouseArea;
  readonly domainClazzFixedLocationType = DomainClazzEnum.FixedLocationType;

  model: FixedLocationBatchActionModel = new FixedLocationBatchActionModel();

  batchActionModeEnum = BatchActionMode;
  batchActionModes = Object.values(BatchActionMode);

  @Input() refreshTableFunction: () => void;

  dialogRef: MatDialogRef<ProgressDialogComponent>;

  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog,
  ) {
  }

  public ngOnInit() {
    this.model.mode = BatchActionMode.Create;
    console.log(this.model);
  }



  handleWarehouseAreaSelection(data: any): void {
    if (!data) {
      this.model.warehouseArea = null;
    }
    else {
      this.model.warehouseArea = data;
    }
  }

  handleFixedLocationTypeSelection(data: any): void {
    if (!data) {
      this.model.fixedLocationType = null;
    }
    else {
      this.model.fixedLocationType = data;
    }
  }





  public save(): void {
    Promise.resolve()
      .then(() => { return this.checInput() })
      .then(() => { this.openProgressDialog() })
      .then((value) => { return this.sendRequest() })
      .then((value) => { this.handleResponse(value) })
      .then(() => { this.refreshTableFunction() })
      .catch(error => {
        console.log(error)
        alert("This failed: " + error)
      })
      .finally(() => this.closeProgressDialog());
  }

  private openProgressDialog(): void {
    this.dialogRef = this.dialog.open(ProgressDialogComponent);
  }

  private closeProgressDialog(): void {
    if (this.dialogRef)
      this.dialogRef.close();
  }

  private sendRequest(): Promise<any> {
    let request: ApiPostRequest = new ApiPostRequest(this.httpClient);
    request.endpoint("fixedLocation/batchAction");
    request.body(JSON.stringify(this.model.toJson()));
    request = ApiRequestHelper.getInstance().executeRequest(request);
    return request.getResponsePromise();
  }

  private checInput(): boolean {

    let missingFields: string[] = [];

    if (!this.model.mode) {
      missingFields.push("mode");
      GuiUtil.setBorderToRed(this.modeId);
    }
    else if (this.model.mode == BatchActionMode.Create) {
      this.checkCreate(missingFields);
    }
    else if (this.model.mode == BatchActionMode.Delete) {
      this.checkDelete(missingFields);
    }
    else if (this.model.mode == BatchActionMode.Update) {
      this.checkUpdate(missingFields);
    }
    else if (this.model.mode == BatchActionMode.Create_and_Update) {
      this.checkCreateAndUpdate(missingFields);
    }
    else if (this.model.mode == BatchActionMode.Print) {
      this.checkPrint(missingFields);
    }


    if (missingFields.length == 0) {
      return true;
    }

    throw new Error("Some required fields are missing: " + StringUtil.combineWithSeparator(", ", missingFields));
  }

  private checkCreate(missingFields: string[]) {

    if (!this.model.warehouseArea) {
      missingFields.push("warehouseArea");
      GuiUtil.setBorderToRed(this.warehouseAreaId);
    }

    if (!this.model.fixedLocationType) {
      missingFields.push("locationType");
      GuiUtil.setBorderToRed(this.locationTypeId);
    }

    this.checkIdentifier(missingFields);
  }

  private checkIdentifier(missingFields: string[]) {
    if (StringUtil.isEmpty(this.model.fromRow)) {
      missingFields.push("fromRow");
      GuiUtil.setBorderToRed(this.fromRowId);
    }
    if (StringUtil.isEmpty(this.model.toRow)) {
      missingFields.push("toRow");
      GuiUtil.setBorderToRed(this.toRowId);
    }

    if (StringUtil.isEmpty(this.model.fromColumn)) {
      missingFields.push("fromColumn");
      GuiUtil.setBorderToRed(this.fromColumnId);
    }
    if (StringUtil.isEmpty(this.model.toColumn)) {
      missingFields.push("toColumn");
      GuiUtil.setBorderToRed(this.toColumnId);
    }

    if (StringUtil.isEmpty(this.model.fromLevel)) {
      missingFields.push("fromLevel");
      GuiUtil.setBorderToRed(this.fromLevelId);
    }
    if (StringUtil.isEmpty(this.model.toLevel)) {
      missingFields.push("toLevel");
      GuiUtil.setBorderToRed(this.toLevelId);
    }

    if (missingFields.length == 0) {
      this.checkTotalCount(missingFields);
    }

  }

  private checkTotalCount(errors: string[]) {
    const countRow = parseInt(this.model.toRow) - parseInt(this.model.fromRow) + 1;
    const countColumn = parseInt(this.model.toColumn) - parseInt(this.model.fromColumn) + 1;
    const countLevel = parseInt(this.model.toLevel) - parseInt(this.model.fromLevel) + 1;
    let countFragment = 1
    if (this.model.toFragment && this.model.fromFragment) {
      countFragment = Math.max(1, parseInt(this.model.toFragment) - parseInt(this.model.fromFragment)) + 1;
    }

    const totalCount = countRow * countColumn * countLevel * countFragment;
    if (totalCount > 10000) {
      alert("You can handle a maximum of 10000 locations at a time!"); //TODO: show better dialog
      errors.push("totalCount");
    }
  }

  private checkDelete(missingFields: string[]) {
    this.checkIdentifier(missingFields);
  }

  private checkUpdate(missingFields: string[]) {
    this.checkIdentifier(missingFields);
  }

  private checkPrint(missingFields: string[]) {
    this.checkIdentifier(missingFields);
  }

  private checkCreateAndUpdate(missingFields: string[]) {
    this.checkCreate(missingFields);
  }

  private handleResponse(response: HttpResponse<any>) {
    if (this.model.mode == BatchActionMode.Print) {
      this.handleReponsePrint(response);
    }

  }
  private handleReponsePrint(response: HttpResponse<any>) {
    const base64string = response.body["base64String"];
    PrintUtils.openBase64PdfInNewWindow(base64string);
  }


}

export class FixedLocationBatchActionModel {

  mode: BatchActionMode = BatchActionMode.Create;

  warehouseArea: any;
  fixedLocationType: any;

  fromRow: string;
  toRow: string;

  fromColumn: string;
  toColumn: string;

  fromLevel: string;
  toLevel: string;

  fromFragment: string;
  toFragment: string;

  toJson() {

    let warehouseAreaId = 0;
    if (this.warehouseArea) {
      warehouseAreaId = this.warehouseArea.id;
    }

    let fixedLocationTypeId = 0;
    if (this.fixedLocationType) {
      fixedLocationTypeId = this.fixedLocationType.id;
    }

    return {

      "mode": this.mode,
      "warehouseAreaId": warehouseAreaId,
      "locationTypeId": fixedLocationTypeId,
      "fromRow": this.fromRow,
      "toRow": this.toRow,
      "fromColumn": this.fromColumn,
      "toColumn": this.toColumn,
      "fromLevel": this.fromLevel,
      "toLevel": this.toLevel,
      "fromFragment": this.fromFragment,
      "toFragment": this.toFragment,
    }
  }

}


export enum BatchActionMode {
  Create = "Create",
  Update = "Update",
  Create_and_Update = "Create_and_Update",
  Delete = "Delete",
  Print = "Print",
}

