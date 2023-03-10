import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';
import { CustomerOrderEditorComponent } from '../customerorder.editor/customerorder.editor.component';

@Component({
  selector: 'app-customerorder.view',
  templateUrl: './customerorder.view.component.html',
  styleUrls: ['./customerorder.view.component.less']
})
export class CustomerOrderViewComponent implements OnInit {

  public static readonly PATH = "customerOrder";

  public readonly EDITOR_PATH = "/" + CustomerOrderEditorComponent.PATH;


  public domainClazz = DomainClazzEnum.CustomerOrder;

  constructor() { }

  public ngOnInit() {
  }

  handleRowClick(row: any, router: Router) {
    if (!row) {
      return;
    }
    let idValue = row.id;
    router.navigate([CustomerOrderEditorComponent.PATH], { state: { existingId: idValue } });
  }

}
