import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Injector, NgModule } from '@angular/core';
import { ApiGetRequest } from 'src/app/core/services/Requests/ApiGetRequest';
import { ApiPostRequest } from 'src/app/core/services/Requests/ApiPostRequest';
import { ApiRequestHelper } from 'src/app/core/services/Requests/ApiRequestHelper';


@Component({
  selector: 'mitarbeiter.anlegen',
  templateUrl: './mitarbeiter.anlegen.html',
  styleUrls: ['./mitarbeiter.anlegen.less'],
})
export class MitarbeiterAnlegenComponent {

  public mitarbeiter: any = {};

  constructor(
    private httpClient: HttpClient
  ) { }

  public ngOnInit() {
      
  }

  public save(): void {
    let request: ApiPostRequest = new ApiPostRequest(this.httpClient);
    request.endpoint("employee");
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