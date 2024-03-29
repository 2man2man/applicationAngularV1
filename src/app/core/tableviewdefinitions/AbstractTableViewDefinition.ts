import { DataTableColumDefinition } from "src/app/components/data-table/DataTableColumDefinition";
import { DataTableFilterDefinition } from "src/app/components/data-table/DataTableFilterDefinition";
import { DomainClazzEnum } from "../DomainClazzEnum";
import { ArticleTableView } from "./ArticleTableView";
import { CustomerOrderTableView } from "./CustomerOrderTableView";
import { EmployeeTableView } from "./EmployeeTableView";
import { FixedLocationTableView } from "./FixedLocationTableView";
import { FixedLocationTypeTableView } from "./FixedLocationTypeTableView";
import { StockTableView } from "./StockTableView";
import { TenantTableView } from "./TenantTableView";
import { WarehouseAreaTableView } from "./WarehouseAreaTableView";
import { WarehouseTableView } from "./WarehouseTableView";

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
        else if (clazz == DomainClazzEnum.Warehouse) {
            return new WarehouseTableView();
        }
        else if (clazz == DomainClazzEnum.WarehouseArea) {
            return new WarehouseAreaTableView();
        }
        else if (clazz == DomainClazzEnum.FixedLocationType) {
            return new FixedLocationTypeTableView();
        }
        else if (clazz == DomainClazzEnum.FixedLocation) {
            return new FixedLocationTableView();
        }
        else if (clazz == DomainClazzEnum.Article) {
            return new ArticleTableView();
        }
        else if (clazz == DomainClazzEnum.Stock) {
            return new StockTableView();
        }
        else if (clazz == DomainClazzEnum.CustomerOrder) {
            return new CustomerOrderTableView();
        }
        else {
            throw new Error(clazz + " is not supported!");
        }
    }
}


