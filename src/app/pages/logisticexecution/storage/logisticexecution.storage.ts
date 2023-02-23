import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProgressMonitorComponent } from 'src/app/components/simple/progress/progress.monitor/progress.monitor.infinite.component';
import { ApiPostRequest } from 'src/app/core/services/Requests/ApiPostRequest';
import { ApiRequestHelper } from 'src/app/core/services/Requests/ApiRequestHelper';
import { GuiUtil } from 'src/app/util/GuiUtil';
import { LogisticExecutionSelectionComponent } from '../selection/logisticexecution.selection';

@Component({
  selector: 'logisticexecution-storage',
  templateUrl: './logisticexecution.storage.html',
  styleUrls: ['./logisticexecution.storage.less'],
})
export class LogisticExecutionStorageComponent {

  public static readonly PATH = "logisticExecution/storage";

  dialogRef: MatDialogRef<ProgressMonitorComponent>;
  storageExecutionId: number;


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private httpClient: HttpClient,

  ) { }

  public ngOnInit() {

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
    this.storageExecutionId = response.body["id"];
  }

  private openProgressDialog(): void {
    this.dialogRef = GuiUtil.openProgressDialog(this.dialog)
  }

  public returnToSelectionView(): void {
    this.router.navigate([LogisticExecutionSelectionComponent.PATH]);
  }


}