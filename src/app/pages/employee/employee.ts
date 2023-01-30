import { Component, Injector, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';

@Component({
  selector: 'employee',
  templateUrl: './employee.html',
  styleUrls: ['./employee.less'],
})
export class EmployeeComponent {

  public domainClazz = DomainClazzEnum.Employee;

  constructor() { }

  public ngOnInit() {
  }

  handleRowClick(row: any, router: Router) {
    if (!row) {
      return;
    }
    let employeeIdValue = row.id;
    router.navigate(['employee/editor'], { state: { employeeId: employeeIdValue } });
    // router.navigate(['employee/editor']);
  }

}