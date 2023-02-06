import { Component, Injector, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';
import { FixedLocationTypeEditorComponent } from './fixedlocation.type.editor';

@Component({
  selector: 'fixedlocation-type.view',
  templateUrl: './fixedlocation.type.view.html',
  styleUrls: ['./fixedlocation.type.view.less'],
})
export class FixedLocationTypeViewComponent {

  public static readonly PATH = "logisticConfig/fixedLocationType";

  public readonly EDITOR_PATH = "/" + FixedLocationTypeEditorComponent.PATH;

  public readonly domainClazz = DomainClazzEnum.FixedLocationType;


  constructor() {
  }

  public ngOnInit() {
  }

  handleRowClick(row: any, router: Router) {
    if (!row) {
      return;
    }
    let idValue = row.id;
    router.navigate([FixedLocationTypeEditorComponent.PATH], { state: { existingId: idValue } });
  }

}