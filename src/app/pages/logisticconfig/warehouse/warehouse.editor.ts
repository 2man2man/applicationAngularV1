import { Component, Injector, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'warehouse-editor',
  templateUrl: './warehouse.editor.html',
  styleUrls: ['./warehouse.editor.less'],
})
export class WarehouseEditorComponent {

  warehouseId: number;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
    this.warehouseId = this.router.getCurrentNavigation()!.extras.state!.warehouseId;
  }

}