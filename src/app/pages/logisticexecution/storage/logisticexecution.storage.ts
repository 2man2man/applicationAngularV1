import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchParams } from 'src/app/components/data-table/DataTableDataSourceServer';
import { ErrorDialogComponent } from 'src/app/components/simple/error-dialog/error.dialog.component';
import { ProgressDialogComponent } from 'src/app/components/simple/progress/dialog/progress.dialog.component';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';
import { ScanHandler } from 'src/app/core/scanner/ScanHandler';
import { ApiPostRequest } from 'src/app/core/services/Requests/ApiPostRequest';
import { ApiRequestHelper } from 'src/app/core/services/Requests/ApiRequestHelper';
import { GuiUtil } from 'src/app/util/GuiUtil';
import { SleepUtils } from 'src/app/util/SleepUtils';
import { StringUtil } from 'src/app/util/StringUtil';
import { LogisticExecutionSelectionComponent } from '../selection/logisticexecution.selection';
import { LogisticExecutionStorageModel } from './logisticexecution.storage.model';

@Component({
  selector: 'logisticexecution-storage',
  templateUrl: './logisticexecution.storage.html',
  styleUrls: ['./logisticexecution.storage.less'],
})
export class LogisticExecutionStorageComponent {

  public static readonly PATH = "logisticExecution/storage";

  readonly fixedLocationDomainClazz: DomainClazzEnum = DomainClazzEnum.FixedLocation;
  readonly articleDomainClazz: DomainClazzEnum = DomainClazzEnum.Article;



  dialogRef: MatDialogRef<ProgressDialogComponent>;

  model: LogisticExecutionStorageModel = new LogisticExecutionStorageModel();

  scannedCode: string;
  private scanHandler: ScanHandler = new ScanHandler();

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private httpClient: HttpClient,
  ) { }

  public ngOnInit() {

    this.scanHandler.handleFixedLocationScan = this.handleFixedLocationScan.bind(this);

    Promise.resolve()
      .then(() => this.openProgressDialog())
      .then(() => this.createStorage())
      .then((response) => this.setStorageExecutionId(response))
      .catch((error) => {
        console.log(error);
        GuiUtil.closeProgressDialog(this.dialogRef);
        GuiUtil.showErrorDialog(this.dialog, error).afterClosed().subscribe(() => this.returnToSelectionView())
      })
      .finally(() => (GuiUtil.closeProgressDialog(this.dialogRef)));

  }

  private createStorage(): Promise<HttpResponse<any>> {
    let request: ApiPostRequest = new ApiPostRequest(this.httpClient);
    request.endpoint("storageExecution");
    request.body(JSON.stringify({}));
    request = ApiRequestHelper.getInstance().executeRequest(request);
    return request.getResponsePromise();
  }

  private setStorageExecutionId(response: HttpResponse<any>): void {
    this.model.storageExecutionId = response.body["id"];
  }

  private openProgressDialog(): void {
    this.dialogRef = GuiUtil.openProgressDialog(this.dialog);
  }

  public returnToSelectionView(): void {
    this.router.navigate([LogisticExecutionSelectionComponent.PATH]);
  }



  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.scanHandler.scanInput(event.key);
  }

  handleFixedLocationScan(scannedValue: string) {

    let searchRequst: ApiPostRequest = new ApiPostRequest(this.httpClient);
    searchRequst.endpoint("fixedLocation/search");
    let filterMap = new Map<string, any>();
    filterMap.set("barcode", scannedValue);
    searchRequst.body(JSON.stringify(new SearchParams(0, 1, filterMap)));

    searchRequst = ApiRequestHelper.getInstance().executeRequest(searchRequst)
    searchRequst.getResponsePromise().then((result) => {
      let locations: any[] = result.body["results"];
      if (locations && locations.length > 0) {
        this.model.setFixedLocation(locations[0]);
      }

    }).catch((error) => {
      GuiUtil.showErrorDialog(this.dialog, error);
    });

  }




  incrementInterval: any;

  startChangeQuantiy(increase: boolean) {

    let incrementQuantity = increase ? 1 : -1;
    let incrementRepetion = 0;
    this.model.changeQuantity(incrementQuantity);

    this.incrementInterval = setInterval(() => {

      if (this.model.quantity >= LogisticExecutionStorageModel.MAX_STOCK_QUANTITY) {
        this.stopChangeQuantity();
        return;
      }

      this.model.changeQuantity(incrementQuantity);
      incrementRepetion = incrementRepetion + 1;
      if (incrementRepetion % 10 == 0) {
        incrementQuantity = incrementQuantity * 10;
      }
    }, 100);

    window.addEventListener('mouseup', this.stopChangeQuantity.bind(this));

  }

  stopChangeQuantity() {
    clearInterval(this.incrementInterval);
    window.removeEventListener('mouseup', this.stopChangeQuantity.bind(this));
  }


  store() {
    Promise.resolve()
      .then(() => this.checkInput())
      .then(() => this.openProgressDialog())
      .then(() => this.sendStorageRequest())
      .then(() => this.showProgressSuccess())
      .then(() => this.model.reset())
      .catch((error) => {
        console.log(error);
        GuiUtil.closeProgressDialog(this.dialogRef);
        GuiUtil.showErrorDialog(this.dialog, error)
      })
      .finally(() => (GuiUtil.closeProgressDialog(this.dialogRef)));
  }

  private checkInput(): void {
    let missingFields: string[] = [];

    if (!this.model.article) {
      missingFields.push("article");
    }
    if (!this.model.fixedLocation) {
      missingFields.push("fixedLocation");
    }
    if (missingFields.length == 0) {
      return;
    }
    throw new Error("Some required fields are missing: " + StringUtil.combineWithSeparator(", ", missingFields));
  }

  private sendStorageRequest(): Promise<HttpResponse<any>> {
    let request: ApiPostRequest = new ApiPostRequest(this.httpClient);
    request.endpoint("storageExecution/updateById/" + this.model.storageExecutionId + "/addPosition");
    request.body(JSON.stringify(this.model.toStoragePositionJson()));
    request = ApiRequestHelper.getInstance().executeRequest(request);
    return request.getResponsePromise();
  }

  private showProgressSuccess(): Promise<any> {
    return GuiUtil.showProgressDialogComplete(this.dialogRef, 2000);
  }



}