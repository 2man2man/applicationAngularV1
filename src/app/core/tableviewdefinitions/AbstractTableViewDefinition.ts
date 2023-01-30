import { DataTableColumDefinition } from "src/app/components/data-table/DataTableColumDefinition";
import { DataTableFilterDefinition } from "src/app/components/data-table/DataTableFilterDefinition";
import { DomainClazzEnum } from "../DomainClazzEnum";
import { EmployeeTableView } from "./EmployeeTableView";
import { TenantTableView } from "./TenantTableView";

export interface TableViewDefinition {

    getEndpoint(): string;
    getDisplayedColumns(): DataTableColumDefinition[];
    getDisplayedFilters(): DataTableFilterDefinition[];
}

export class TableViewFactory {

    public create(clazz: DomainClazzEnum): TableViewDefinition {
        if (clazz == DomainClazzEnum.Tenant) {
            return new TenantTableView();
        }
        else if (clazz == DomainClazzEnum.Employee) {
            return new EmployeeTableView();
        }
        else {
            throw new Error(clazz + " is not supported!");
        }
    }
}


