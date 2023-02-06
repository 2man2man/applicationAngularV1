import { Component, Injector, NgModule } from '@angular/core';
import { FixedLocationTypeViewComponent } from './warehouse/fixedlocation/type/fixedlocation.type.view';

@Component({
  selector: 'logistic-config-mainview',
  templateUrl: './logistic.config.mainview.html',
  styleUrls: ['./logistic.config.mainview.less'],
})
export class LogisticConfigMainViewComponent {

  locationTypeViewUrl: string;

  constructor(
  ) {
    this.locationTypeViewUrl = "/" + FixedLocationTypeViewComponent.PATH;
  }

  public ngOnInit() {
  }

}