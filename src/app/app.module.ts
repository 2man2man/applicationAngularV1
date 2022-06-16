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
import { MitarbeiterComponent } from './pages/mitarbeiter/mitarbeiter';
import { MitarbeiterAnlegenComponent } from './pages/mitarbeiter/mitarbeiter.anlegen';
import { SidemenuentryComponent } from './components/sidemenu/sidemenuentry/sidemenuentry.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MatInputModule } from "@angular/material/input"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSortModule } from "@angular/material/sort"
import { MatTableModule } from "@angular/material/table"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    SystemComponent,
    MitarbeiterComponent,
    MitarbeiterAnlegenComponent,
    SideMenuComponent,
    SidemenuentryComponent,
    DataTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorAuth, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorLog, multi: true },
    { provide: LoginAccessGuard, useClass: LoginAccessGuard },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
