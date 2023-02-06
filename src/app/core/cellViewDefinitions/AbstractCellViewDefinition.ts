import { DomainClazzEnum } from "../DomainClazzEnum";
import { EmployeeCellView } from "./EmployeeCellView";
import { FixedLocationTypeCellView } from "./FixedLocationTypeCellView";
import { TenantCellView } from "./TenantCellView";

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
        else {
            throw new Error(clazz + " is not supported!");
        }
    }
}


