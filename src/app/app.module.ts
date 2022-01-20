import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component'; //'./app.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptorAuth } from './core/services/Requests/ApiInterceptorAuth';
import { ApiInterceptorLog } from './core/services/Requests/ApiInterceptorLog';
import { MainPageComponent } from './pages/main/main.page';
import { AppComponent } from './app.component';
import { LoginAccessGuard } from './login/LoginAccessGuard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorAuth, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorLog, multi: true },
    { provide: LoginAccessGuard, useClass: LoginAccessGuard },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
