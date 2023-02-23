import { Component, Injector, NgModule } from '@angular/core';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';
import { TenantTableView } from 'src/app/core/tableviewdefinitions/TenantTableView';
import { LogisticExecutionStorageComponent } from '../storage/logisticexecution.storage';

@Component({
  selector: 'logisticexecution-selection',
  templateUrl: './logisticexecution.selection.html',
  styleUrls: ['./logisticexecution.selection.less'],
})
export class LogisticExecutionSelectionComponent {

  public static readonly PATH = "logisticExecution";

  readonly storageLink = "/" + LogisticExecutionStorageComponent.PATH;

  constructor(

  ) { }

  public ngOnInit() {
  }

}