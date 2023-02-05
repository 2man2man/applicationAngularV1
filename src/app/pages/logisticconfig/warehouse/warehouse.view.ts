import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Injector, NgModule } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/simple/confirm-dialog/confirm.dialog.component';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';
import { ApiPostRequest } from 'src/app/core/services/Requests/ApiPostRequest';
import { ApiRequestHelper } from 'src/app/core/services/Requests/ApiRequestHelper';

@Component({
  selector: 'warehouse-view',
  templateUrl: './warehouse.view.html',
  styleUrls: ['./warehouse.view.less'],
})
export class WarehouseViewComponent {

  public domainClazz = DomainClazzEnum.Warehouse;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  public ngOnInit() {
  }

  handleRowClick(row: any, router: Router) {
    if (!row) {
      return;
    }
    let idValue = row.id;
    WarehouseViewComponent.forwardToEditor(router, idValue);
  }


  private static forwardToEditor(router: Router, idValue: number) {
    router.navigate(['logisticConfig/warehouse/editor'], { state: { warehouseId: idValue } });
  }

  createNewWarehouse(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { title: "Confirm", text: "The creation of a new warehouse can't be undone. Do you really want to create a new warehouse?" };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      Promise.resolve()
        .then(() => this.initNewWarehouse())
        .then((value: HttpResponse<any>) => {
          const idCreatedWarehouse: number = value.body["id"];
          WarehouseViewComponent.forwardToEditor(this.router, idCreatedWarehouse);
        })
        .catch((error) => {
          const errorString: string = "Error during warehouse creation: " + error;
          console.log(errorString);
          alert(errorString);
        });
    });

  }



  private initNewWarehouse(): Promise<HttpResponse<any>> {
    let request: ApiPostRequest = new ApiPostRequest(this.httpClient);
    request.endpoint("warehouse/initNew");
    request = ApiRequestHelper.getInstance().executeRequest(request);
    return request.getResponsePromise();
  }


}