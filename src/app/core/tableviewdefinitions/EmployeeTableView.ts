import { DataTableColumDefinition } from "src/app/components/data-table/DataTableColumDefinition";
import { DataTableFilterDefinition } from "src/app/components/data-table/DataTableFilterDefinition";
import { TableViewDefinition } from "./AbstractTableViewDefinition";

export class EmployeeTableView implements TableViewDefinition {

    public getEndpoint(): string {
        return "employee/search";
    }

    public getDisplayedColumns(): DataTableColumDefinition[] {
        let result: DataTableColumDefinition[] = [];
        result.push({ attribute: 'firstName', displayName: "Vorname" });
        result.push({ attribute: 'lastName', displayName: "Nachname" });
        result.push({ attribute: 'userName', displayName: "Benutzer" });
        return result;
    }

    public getDisplayedFilters(): DataTableFilterDefinition[] {
        let result: DataTableFilterDefinition[] = [];
        return result;
    }
}
