import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginAccessGuard } from './login/LoginAccessGuard';
import { MainPageComponent } from './pages/main/main.page';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'mainPage' },
  // { path: 'mainPage', component: MainPageComponent },
  { path: 'mainPage', component: MainPageComponent, data: { requiresLogin: true }, canActivate: [LoginAccessGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
