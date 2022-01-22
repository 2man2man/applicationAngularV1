import { Component, Injector, NgModule } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiGetRequest } from 'src/app/core/services/Requests/ApiGetRequest';
import { ApiRequestHelper } from 'src/app/core/services/Requests/ApiRequestHelper';


@Component({
  selector: 'main-page',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.less'],
})
export class MainPageComponent {

  public title = "MainPage";
  public menu = [
    {
      "punkt": "System"
    },
    {
      "punkt": "Menupunkt Zwei"
    },
    {
      "punkt": "Menupunkt Drei"
    },
  ];

  constructor(
    private httpClient: HttpClient) { }


  public getData() {

    let request: ApiGetRequest = new ApiGetRequest(this.httpClient);
    request.endpoint("article/getById/64");
    request = ApiRequestHelper.getInstance().executeRequest(request);

    request.getResponsePromise()?.
      then((value: HttpResponse<any>) => {
        console.log(value);
        alert("This was a success");
      }).catch((value: HttpResponse<any>) => {
        alert("That failed");
      });

  }

}