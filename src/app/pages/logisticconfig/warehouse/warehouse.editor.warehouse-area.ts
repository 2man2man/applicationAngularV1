import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Injector, Input, NgModule, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableComponent } from 'src/app/components/data-table/data-table.component';
import { DataTableFixedFilterDefinition } from 'src/app/components/data-table/DataTableFixedFilterDefinition';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';
import { ApiGetRequest } from 'src/app/core/services/Requests/ApiGetRequest';
import { ApiPostRequest } from 'src/app/core/services/Requests/ApiPostRequest';
import { ApiPutRequest } from 'src/app/core/services/Requests/ApiPutRequest';
import { ApiRequestHelper } from 'src/app/core/services/Requests/ApiRequestHelper';
import { GuiUtil } from 'src/app/util/GuiUtil';
import { StringUtil } from 'src/app/util/StringUtil';
import { WarehouseAreaEditorComponent } from './warehouse-area/warehouse-area.editor';
import { WarehouseModel } from './warehouse.model';


@Component({
  selector: 'warehouse-editor-warehouse-area',
  templateUrl: './warehouse.editor.warehouse-area.html',
  styleUrls: ['./warehouse.editor.warehouse-area.less'],
})
export class WarehouseEditorWarehouseAreaComponent implements OnInit {

  @Input() warehouseId: number

  @ViewChild(DataTableComponent) dataTable: DataTableComponent;

  public domainClazz = DomainClazzEnum.WarehouseArea;

  public fixedFilters: DataTableFixedFilterDefinition[] = [];

  constructor(
    public dialog: MatDialog,
  ) { }

  public ngOnInit() {
    this.createFixedFilters();
  }

  private createFixedFilters(): void {
    const warehouseFilter = new DataTableFixedFilterDefinition();
    warehouseFilter.filterAttribute = "warehouseId";
    warehouseFilter.fixedValueNumber = this.warehouseId;
    this.fixedFilters.push(warehouseFilter);
  }


  handleRowClick(row: any, router: Router) {
    if (!row) {
      return;
    }
    let idValue = row.id;

    this.openDialog(idValue);
  }


  public openDialog(warehouseAreaId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { warehouseId: this.warehouseId, areaId: warehouseAreaId };
    const dialogRef = this.dialog.open(WarehouseAreaEditorComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.dataTable.load();
    });
  }





}




