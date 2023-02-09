import { Component, Injector, NgModule } from '@angular/core';
import { FixedLocationViewComponent } from './warehouse/fixedlocation/fixedlocation.view';
import { FixedLocationTypeViewComponent } from './warehouse/fixedlocation/type/fixedlocation.type.view';

@Component({
  selector: 'logistic-config-mainview',
  templateUrl: './logistic.config.mainview.html',
  styleUrls: ['./logistic.config.mainview.less'],
})
export class LogisticConfigMainViewComponent {

  locationTypeViewUrl: string;

  fixedLocationViewUrl: string;

  constructor(
  ) {
    this.locationTypeViewUrl = "/" + FixedLocationTypeViewComponent.PATH;
    this.fixedLocationViewUrl = "/" + FixedLocationViewComponent.PATH;
  }

  public ngOnInit() {
  }

}