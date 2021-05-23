import { Component } from '@angular/core';
import { stringIsEmpty } from '../util/StringUtil';


@Component({
  selector: 'app-root',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.less'],
})
export class LoginComponent {

  public title = "Title";

  public login() {
    let usernameAvailabe = this.checkEmptyAndSetToRed("username");
    let passwordAvailabe = this.checkEmptyAndSetToRed("password");

    if (!usernameAvailabe) {
      return;
    }
    else if (!passwordAvailabe) {
      return;
    }
  }

  private checkEmptyAndSetToRed(elemntId: string) {
    const element = document.getElementById(elemntId);
    if (element == null) {
      const errorMessage = "elememt " + elemntId + " not found";
      alert(errorMessage);
      return false;
    }
    const elementContent = element.innerHTML;
    if (stringIsEmpty(elementContent)) {
      element.style.borderColor = "red";
      return false;
    }
    return true;
  }
}

