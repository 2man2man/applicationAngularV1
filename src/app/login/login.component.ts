import { Component, Injector, NgModule } from '@angular/core';
import { Router } from "@angular/router";
import { ApiCreateTokenRequest } from '../core/services/Requests/ApiTokenRequests';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiRequestHelper } from '../core/services/Requests/ApiRequestHelper';
import { StringUtil } from '../util/StringUtil';
import { TokenStorageService } from '../core/services/Requests/token.service';
import { SessionService } from '../core/services/session.service';
import { GuiUtil } from '../util/GuiUtil';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'login-page',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.less'],
})

export class LoginComponent {

  title: "LoginComponent";


  readonly usernameId: string = StringUtil.getRandom();
  readonly passwordId: string = StringUtil.getRandom();

  usernameInput: string;
  passwordInput: string;

  constructor(
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private tokenService: TokenStorageService,
    private sessionService: SessionService,
    private router: Router) { }

  public login() {

    let usernameAvailabe = this.checkEmptyAndSetToRed(this.usernameInput, this.usernameId);
    let passwordAvailabe = this.checkEmptyAndSetToRed(this.passwordInput, this.passwordId);

    if (!usernameAvailabe) {
      return;
    }
    else if (!passwordAvailabe) {
      return;
    }

    Promise.resolve()
      .then(() => { return this.sendLoginRequest() })
      .then((result: HttpResponse<any>) => { return this.handleLoginSuccess(result) })
      .catch((error) => {
        GuiUtil.showErrorDialog(this.dialog, "Benutzername oder Passwort falsch!");
      })

  }

  private handleLoginSuccess(value: HttpResponse<any>) {
    const accessToken: string = value.body["access_token"];
    const refreshToken: string = value.body["refresh_token"];

    this.tokenService.saveToken(accessToken);
    this.tokenService.saveRefreshToken(refreshToken);

    this.router.navigate(['mainPage']);
    this.sessionService.refresh();
  }

  private sendLoginRequest() {
    let loginRequest = new ApiCreateTokenRequest(this.httpClient);

    loginRequest.username(this.usernameInput).password(this.passwordInput);
    // loginRequest.username("admin").password("admin"); //TODO: use actual values 

    loginRequest = ApiRequestHelper.getInstance().executeRequest(loginRequest);
    return loginRequest.getResponsePromise();
  }



  private checkEmptyAndSetToRed(input: string, elemntId: string): boolean {

    if (!StringUtil.isEmpty(input)) {
      return true;
    }
    GuiUtil.setBorderToRed(elemntId);
    return false;
  }
}




