import { DomainClazzEnum } from "../DomainClazzEnum";
import { ArticleCellView } from "./ArticleCellView";
import { EmployeeCellView } from "./EmployeeCellView";
import { FixedLocationCellView } from "./FixedLocationCellView";
import { FixedLocationTypeCellView } from "./FixedLocationTypeCellView";
import { TenantCellView } from "./TenantCellView";
import { WarehouseAreaCellView } from "./WarehouseAreaCellView";
import { WarehouseCellView } from "./WarehouseCellView";

export interface CellViewDefinition {

    singleObjectToString(data: any): string;
    arrayToString(data: any[]): string;
}

export class CellViewFactory {

    public create(clazz: DomainClazzEnum): CellViewDefinition {
        if (clazz == DomainClazzEnum.Tenant) {
            return new TenantCellView();
        }
        else if (clazz == DomainClazzEnum.Employee) {
            return new EmployeeCellView();
        }
        else if (clazz == DomainClazzEnum.FixedLocationType) {
            return new FixedLocationTypeCellView();
        }
        else if (clazz == DomainClazzEnum.WarehouseArea) {
            return new WarehouseAreaCellView();
        }
        else if (clazz == DomainClazzEnum.Warehouse) {
            return new WarehouseCellView();
        }
        else if (clazz == DomainClazzEnum.FixedLocation) {
            return new FixedLocationCellView();
        }
        else if (clazz == DomainClazzEnum.Article) {
            return new ArticleCellView();
        }
        else {
            throw new Error(DomainClazzEnum[clazz] + " is not supported!");
        }
    }
}


