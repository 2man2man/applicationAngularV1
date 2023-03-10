import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiGetRequest } from 'src/app/core/services/Requests/ApiGetRequest';
import { ApiRequestHelper } from 'src/app/core/services/Requests/ApiRequestHelper';
import { SessionService } from 'src/app/core/services/session.service';
import { CustomerOrderViewComponent } from 'src/app/pages/customerorder/customerorder.view/customerorder.view.component';
import { LogisticExecutionSelectionComponent } from 'src/app/pages/logisticexecution/selection/logisticexecution.selection';
import { SideMenuEntryInterface } from '../SideMenuEntryInterface';


@Component({
  selector: 'sidemenu',
  templateUrl: './sidemenu.html',
  styleUrls: ['./sidemenu.less'],
})
export class SideMenuComponent implements OnInit {


  logisticExecutionEntryVisible: boolean = true;
  logisticExecutionEntry: SideMenuEntryInterface = {
    routerLink: LogisticExecutionSelectionComponent.PATH,
    displayName: "Logistic execution"
  }

  logisticConfigEntryVisible: boolean = false;
  logisticConfigEntry: SideMenuEntryInterface = {
    routerLink: "logisticConfig",
    displayName: "Logistic configuration"
  }

  systemEntryVisible: boolean = false;
  systemEntry: SideMenuEntryInterface = {
    routerLink: "system",
    displayName: "System"
  }

  stockEntryVisible: boolean = true;
  stockEntry: SideMenuEntryInterface = {
    routerLink: "stock",
    displayName: "Stock"
  }


  articleEntryVisible: boolean = true;
  articleEntry: SideMenuEntryInterface = {
    routerLink: "article",
    displayName: "Article"
  }

  customerOrderEntryVisible: boolean = true;
  customerOrderEntry: SideMenuEntryInterface = {
    routerLink: CustomerOrderViewComponent.PATH,
    displayName: "Customer order"
  }

  constructor(
    private sessionService: SessionService
  ) { }


  ngOnInit(): void {
    this.handleSystemConfigPrivilege();
    this.handleLogisticConfigPrivilege();
  }

  private handleLogisticConfigPrivilege() {
    this.logisticConfigEntryVisible = this.sessionService.privilegeLogisticConfig.getValue();
    this.sessionService.privilegeLogisticConfigObservable.subscribe((value: boolean) => {
      this.logisticConfigEntryVisible = value;
    });
  }

  private handleSystemConfigPrivilege() {
    this.systemEntryVisible = this.sessionService.privilegeSystemConfig.getValue();
    this.sessionService.privilegeSystemConfigObservable.subscribe((value: boolean) => {
      this.systemEntryVisible = value;
    });
  }
}