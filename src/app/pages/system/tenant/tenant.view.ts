import { Component, Injector, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';

@Component({
  selector: 'tenant-view',
  templateUrl: './tenant.view.html',
  styleUrls: ['./tenant.view.less'],
})
export class TenantComponent {

  public domainClazz = DomainClazzEnum.Tenant;

  constructor() { }

  public ngOnInit() {
  }

  handleRowClick(row: any, router: Router) {
    if (!row) {
      return;
    }
    let idValue = row.id;
    router.navigate(['tenant/editor'], { state: { existingId: idValue } });
  }

}