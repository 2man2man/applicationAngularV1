import { Component, NgModule } from '@angular/core';
import { ApiHttpService } from '../core/services/api-http.services';
import { stringIsEmpty } from '../util/StringUtil';


@Component({
  selector: 'app-root',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.less'],
})

export class LoginComponent {

  public title = "Title";

  //constructor(private httpClient: ApiHttpService) {
  // }

  public login() {
    let usernameAvailabe = this.checkEmptyAndSetToRed("username");
    let passwordAvailabe = this.checkEmptyAndSetToRed("password");

    if (!usernameAvailabe) {
      return;
    }
    else if (!passwordAvailabe) {
      return;
    }

    //this.httpClient.post
  }

  private checkEmptyAndSetToRed(elemntId: string) {
    const element = (document.getElementById(elemntId)) as HTMLInputElement;
    if (element == null) {
      const errorMessage = "elememt " + elemntId + " not found";
      alert(errorMessage);
      return false;
    }
    const elementContent = element.value;
    if (stringIsEmpty(elementContent)) {
      element.style.borderColor = "red";
      return false;
    }
    element.style.borderColor = "green";
    return true;
  }
}

