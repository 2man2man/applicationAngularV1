import { Component, Injector, NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableComponent } from 'src/app/components/data-table/data-table.component';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';

@Component({
  selector: 'fixedlocation.view',
  templateUrl: './fixedlocation.view.html',
  styleUrls: ['./fixedlocation.view.less'],
})
export class FixedLocationViewComponent {

  public static readonly PATH = "logisticConfig/fixedLocation";

  // public readonly EDITOR_PATH = "/" + FixedLocationTypeEditorComponent.PATH;

  public readonly domainClazz = DomainClazzEnum.FixedLocation;

  @ViewChild(DataTableComponent) dataTable: DataTableComponent;

  showBatchAction: boolean = false;


  constructor() {
  }

  public ngOnInit() {
  }

  toggleBatchAction(): void {
    this.showBatchAction = !this.showBatchAction;
  }

  refreshTable() {
    this.dataTable.load();
  }


}