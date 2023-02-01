import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiGetRequest } from 'src/app/core/services/Requests/ApiGetRequest';
import { ApiRequestHelper } from 'src/app/core/services/Requests/ApiRequestHelper';
import { SessionService } from 'src/app/core/services/session.service';
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

  constructor(
    private sessionService: SessionService
  ) { }


  ngOnInit(): void {
    this.handleSystemConfigPrivilege();
  }

  private handleSystemConfigPrivilege() {
    this.systemEntryVisible = this.sessionService.privilegeSystemConfig.getValue();
    this.sessionService.privilegeSystemConfigObservable.subscribe((value: boolean) => {
      this.systemEntryVisible = value;
    });
  }
}