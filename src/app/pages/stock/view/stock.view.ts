import { Component } from '@angular/core';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';

@Component({
  selector: 'stock-view',
  templateUrl: './stock.view.html',
  styleUrls: ['./stock.view.less'],
})
export class StockViewComponent {

  public static readonly PATH = "stock";

  public domainClazz = DomainClazzEnum.Stock;

  constructor() { }

  public ngOnInit() {
  }



}