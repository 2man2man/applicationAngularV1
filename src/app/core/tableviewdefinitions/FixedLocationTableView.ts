import { DataTableColumDefinition } from "src/app/components/data-table/DataTableColumDefinition";
import { DataTableFilterDefinition } from "src/app/components/data-table/DataTableFilterDefinition";
import { TableViewDefinition } from "./AbstractTableViewDefinition";

export class FixedLocationTableView implements TableViewDefinition {

    public getEndpoint(): string {
        return "fixedLocation/search"
    }

    public getDisplayedColumns(): DataTableColumDefinition[] {
        let result: DataTableColumDefinition[] = [];
        result.push({ attribute: 'number', displayName: "Nummer" });
        result.push({ attribute: 'warehouseAreaString', displayName: "Area" });
        result.push({ attribute: 'locationTypeString', displayName: "Type" });
        return result;
    }

    public getDisplayedFilters(): DataTableFilterDefinition[] {
        let result: DataTableFilterDefinition[] = [];
        return result;
    }
}
