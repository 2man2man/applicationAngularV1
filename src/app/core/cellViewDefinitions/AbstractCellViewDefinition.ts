import { DomainClazzEnum } from "../DomainClazzEnum";
import { EmployeeCellView } from "./EmployeeCellView";
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
        else {
            throw new Error(clazz + " is not supported!");
        }
    }
}


