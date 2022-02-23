import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiGetRequest } from 'src/app/core/services/Requests/ApiGetRequest';
import { ApiRequestHelper } from 'src/app/core/services/Requests/ApiRequestHelper';
import { SideMenuEntryInterface } from '../SideMenuEntryInterface';


@Component({
  selector: 'sidemenu',
  templateUrl: './sidemenu.html',
  styleUrls: ['./sidemenu.less'],
})
export class SideMenuComponent implements OnInit {

  systemEntryVisible: boolean = false;

  systemEntry: SideMenuEntryInterface = {
    routerLink: "system",
    displayName: "System"
  }

  constructor(private httpClient: HttpClient) { }


  ngOnInit(): void {
    let getRequest: ApiGetRequest = new ApiGetRequest(this.httpClient);
    getRequest.endpoint("employee/getMyself");

    getRequest = ApiRequestHelper.getInstance().executeRequest(getRequest);
    const newLocal = getRequest.getResponsePromise();
    newLocal?.then((value: HttpResponse<any>) => {
      this.systemEntryVisible = value.body["systemConfigurationPrivilege"];
    }).catch((value: HttpResponse<any>) => {
      alert("Navigation cant be loaded");
    });
  }



}