import { Component, Injector, NgModule } from '@angular/core';
import { Router } from "@angular/router";
import { ApiCreateTokenRequest } from '../core/services/Requests/ApiTokenRequests';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiRequestHelper } from '../core/services/Requests/ApiRequestHelper';
import { StringUtil } from '../util/StringUtil';
import { TokenStorageService } from '../core/services/Requests/token.service';
import { SessionService } from '../core/services/session.service';


@Component({
  selector: 'login-page',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.less'],
})

export class LoginComponent {

  public title = "Title";

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenStorageService,
    private sessionService: SessionService,
    private router: Router) { }

  public login() {

    let usernameAvailabe = this.checkEmptyAndSetToRed("username");
    let passwordAvailabe = this.checkEmptyAndSetToRed("password");

    if (!usernameAvailabe) {
      return;
    }
    else if (!passwordAvailabe) {
      return;
    }
    let loginRequest: ApiCreateTokenRequest = new ApiCreateTokenRequest(this.httpClient);

    loginRequest.username("admin").password("admin"); //TODO: use actual values 


    loginRequest = ApiRequestHelper.getInstance().executeRequest(loginRequest);
    const newLocal = loginRequest.getResponsePromise();
    newLocal?.
      then((value: HttpResponse<any>) => {
        const accessToken: string = value.body["access_token"];
        const refreshToken: string = value.body["refresh_token"];

        this.tokenService.saveToken(accessToken);
        this.tokenService.saveRefreshToken(refreshToken);

        this.router.navigate(['mainPage']);
        this.sessionService.refresh();

      }).catch((value: HttpResponse<any>) => {
        alert("Benutzername oder Passwort falsch!");
      });
  }


  private checkEmptyAndSetToRed(elemntId: string) {
    const element = (document.getElementById(elemntId)) as HTMLInputElement;
    if (element == null) {
      const errorMessage = "elememt " + elemntId + " not found";
      alert(errorMessage);
      return false;
    }
    const elementContent = element.value;
    if (StringUtil.isEmpty(elementContent)) {
      element.style.borderColor = "red";
      return false;
    }
    element.style.borderColor = "green";
    return true;
  }
}




