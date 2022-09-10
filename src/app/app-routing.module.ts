import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginAccessGuard } from './login/LoginAccessGuard';
import { MainPageComponent } from './pages/main/main.page';
import { SystemComponent } from './pages/system/system';
import { MitarbeiterComponent } from './pages/mitarbeiter/mitarbeiter';
import { MitarbeiterAnlegenComponent } from './pages/mitarbeiter/mitarbeiter.anlegen';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'mainPage' },
  // { path: 'mainPage', component: MainPageComponent },
  { path: 'mainPage', component: MainPageComponent, data: { requiresLogin: true }, canActivate: [LoginAccessGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'system', component: SystemComponent, data: { requiresLogin: true }, canActivate: [LoginAccessGuard] },
  { path: 'employee', component: MitarbeiterComponent, data: { requiresLogin: true }, canActivate: [LoginAccessGuard] },
  { path: 'mitarbeiteranlage', component: MitarbeiterAnlegenComponent, data: { requiresLogin: true }, canActivate: [LoginAccessGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
