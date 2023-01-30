import { EmployeeModel } from "src/app/pages/employee/employee.model";
import { StringUtil } from "src/app/util/StringUtil";
import { CellViewDefinition } from "./AbstractCellViewDefinition";

export class EmployeeCellView implements CellViewDefinition {

    singleObjectToString(data: any): string {

        if (data instanceof EmployeeModel) {
            let model: EmployeeModel = data;
            return model.firstName + " " + model.lastName;
        }
        return data.firstName + " " + data.lastName;
    }
    arrayToString(data: any[]): string {
        let strings: string[] = [];
        data.forEach(element => {
            const singleString = this.singleObjectToString(element);
            strings.push(singleString);
        });
        return StringUtil.combineWithSeparator(", ", strings);
    }

}