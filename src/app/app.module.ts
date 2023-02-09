import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component'; //'./app.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptorAuth } from './core/services/Requests/ApiInterceptorAuth';
import { ApiInterceptorLog } from './core/services/Requests/ApiInterceptorLog';
import { MainPageComponent } from './pages/main/main.page';
import { SideMenuComponent } from './components/sidemenu/sidemenumain/sidemenu';
import { AppComponent } from './app.component';
import { LoginAccessGuard } from './login/LoginAccessGuard';
import { SystemComponent } from './pages/system/system';
import { EmployeeComponent } from './pages/employee/employee';
import { EmployeeEditorComponent } from './pages/employee/employee.editor';
import { SidemenuentryComponent } from './components/sidemenu/sidemenuentry/sidemenuentry.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataTableFilterComponent } from './components/data-table/data-table-filter/data-table-filter.component';
import { MatInputModule } from "@angular/material/input"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSortModule } from "@angular/material/sort"
import { MatTableModule } from "@angular/material/table"
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DomainselectionComponent } from './components/simple/domain-selection/multi/domainselection.multi.component';
import { DomainSelectionMultiDialogComponent } from './components/simple/domain-selection/multi/dialog/domainselection.multi.dialog.component';
import { CancelConfirmComponent } from './components/simple/buttons/cancel.confirm.component';
import { TenantComponent } from './pages/system/tenant/tenant.view';
import { TenantEditorComponent } from './pages/system/tenant/tenant.editor';
import { LogisticConfigMainViewComponent } from './pages/logisticconfig/logistic.config.mainview';
import { WarehouseViewComponent } from './pages/logisticconfig/warehouse/warehouse.view';
import { WarehouseEditorComponent } from './pages/logisticconfig/warehouse/warehouse.editor';
import { MatTabsModule } from '@angular/material/tabs';
import { WarehouseEditorHeadDataComponent } from './pages/logisticconfig/warehouse/warehouse.editor.head-data';
import { WarehouseEditorWarehouseAreaComponent } from './pages/logisticconfig/warehouse/warehouse.editor.warehouse-area';
import { WarehouseAreaEditorComponent } from './pages/logisticconfig/warehouse/warehouse-area/warehouse-area.editor';
import { FixedLocationTypeViewComponent } from './pages/logisticconfig/warehouse/fixedlocation/type/fixedlocation.type.view';
import { FixedLocationTypeEditorComponent } from './pages/logisticconfig/warehouse/fixedlocation/type/fixedlocation.type.editor';
import { FixedLocationViewComponent } from './pages/logisticconfig/warehouse/fixedlocation/fixedlocation.view';
import { FixedLocationViewBatchActionComponent } from './pages/logisticconfig/warehouse/fixedlocation/fixedlocation.view.batch.action';
import { DomainSelectionSingleDialogComponent } from './components/simple/domain-selection/single/dialog/domainselection.dialog.component';
import { DomainSelectionSingleComponent } from './components/simple/domain-selection/single/domainselection.component';
import { ProgressMonitorComponent } from './components/simple/progress/progress.monitor/progress.monitor.infinite.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    SystemComponent,
    EmployeeComponent,
    EmployeeEditorComponent,
    TenantComponent,
    TenantEditorComponent,
    SideMenuComponent,
    SidemenuentryComponent,
    DataTableComponent,
    DataTableFilterComponent,
    DomainSelectionMultiDialogComponent,
    DomainselectionComponent,
    DomainSelectionSingleComponent,
    DomainSelectionSingleDialogComponent,
    LogisticConfigMainViewComponent,
    WarehouseViewComponent,
    WarehouseEditorComponent,
    WarehouseEditorHeadDataComponent,
    WarehouseEditorWarehouseAreaComponent,
    WarehouseAreaEditorComponent,
    CancelConfirmComponent,
    FixedLocationTypeViewComponent,
    FixedLocationTypeEditorComponent,
    FixedLocationViewComponent,
    FixedLocationViewBatchActionComponent,
    ProgressMonitorComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTabsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorAuth, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorLog, multi: true },
    { provide: LoginAccessGuard, useClass: LoginAccessGuard },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
