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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
