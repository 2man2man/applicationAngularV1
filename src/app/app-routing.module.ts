import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginAccessGuard } from './login/LoginAccessGuard';
import { MainPageComponent } from './pages/main/main.page';
import { SystemComponent } from './pages/system/system';
import { EmployeeComponent } from './pages/employee/employee';
import { EmployeeEditorComponent } from './pages/employee/employee.editor';
import { TenantComponent } from './pages/system/tenant/tenant.view';
import { TenantEditorComponent } from './pages/system/tenant/tenant.editor';
import { LogisticConfigMainViewComponent } from './pages/logisticconfig/logistic.config.mainview';
import { WarehouseViewComponent } from './pages/logisticconfig/warehouse/warehouse.view';
import { WarehouseEditorComponent } from './pages/logisticconfig/warehouse/warehouse.editor';
import { FixedLocationTypeViewComponent } from './pages/logisticconfig/warehouse/fixedlocation/type/fixedlocation.type.view';
import { FixedLocationTypeEditorComponent } from './pages/logisticconfig/warehouse/fixedlocation/type/fixedlocation.type.editor';
import { FixedLocationViewComponent } from './pages/logisticconfig/warehouse/fixedlocation/fixedlocation.view';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'mainPage' },
  // { path: 'mainPage', component: MainPageComponent },
  { path: 'mainPage', component: MainPageComponent, data: { requiresLogin: true }, canActivate: [LoginAccessGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'system', component: SystemComponent, data: { requiresLogin: true }, canActivate: [LoginAccessGuard] },
  { path: 'employee', component: EmployeeComponent, data: { requiresLogin: true }, canActivate: [LoginAccessGuard] },
  { path: 'employee/editor', component: EmployeeEditorComponent, data: { requiresLogin: true }, canActivate: [LoginAccessGuard] },
  { path: 'tenant', component: TenantComponent, data: { requiresLogin: true }, canActivate: [LoginAccessGuard] },
  { path: 'tenant/editor', component: TenantEditorComponent, data: { requiresLogin: true }, canActivate: [LoginAccessGuard] },
  { path: 'logisticConfig', component: LogisticConfigMainViewComponent, data: { requiresLogin: true }, canActivate: [LoginAccessGuard] },
  { path: 'logisticConfig/warehouse', component: WarehouseViewComponent, data: { requiresLogin: true }, canActivate: [LoginAccessGuard] },
  { path: 'logisticConfig/warehouse/editor', component: WarehouseEditorComponent, data: { requiresLogin: true }, canActivate: [LoginAccessGuard] },
  { path: FixedLocationTypeViewComponent.PATH, component: FixedLocationTypeViewComponent, data: { requiresLogin: true }, canActivate: [LoginAccessGuard] },
  { path: FixedLocationTypeEditorComponent.PATH, component: FixedLocationTypeEditorComponent, data: { requiresLogin: true }, canActivate: [LoginAccessGuard] },
  { path: FixedLocationViewComponent.PATH, component: FixedLocationViewComponent, data: { requiresLogin: true }, canActivate: [LoginAccessGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
