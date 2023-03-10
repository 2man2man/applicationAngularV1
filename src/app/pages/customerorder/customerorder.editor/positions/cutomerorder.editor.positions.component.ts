import { Component, Input, OnInit } from '@angular/core';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';
import { StringUtil } from 'src/app/util/StringUtil';
import { CustomerOrderModel } from '../../customerorder..model';

@Component({
  selector: 'cutomerorder-editor-positions',
  templateUrl: './cutomerorder.editor.headdata.component.html',
  styleUrls: ['./cutomerorder.editor.headdata.component.less']
})
export class CutomerorderEditorHeaddataComponent implements OnInit {

  readonly tenantDomainClazz = DomainClazzEnum.Tenant;

  readonly numberId = StringUtil.getRandom();
  readonly tenantGuiId = StringUtil.getRandom();

  @Input()
  model: CustomerOrderModel

  constructor() { }

  ngOnInit(): void {
  }

}
