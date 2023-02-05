import { DataTableColumDefinition } from "src/app/components/data-table/DataTableColumDefinition";
import { DataTableFilterDefinition } from "src/app/components/data-table/DataTableFilterDefinition";
import { TableViewDefinition } from "./AbstractTableViewDefinition";

export class WarehouseAreaTableView implements TableViewDefinition {

    public getEndpoint(): string {
        return "warehouse/area/search"
    }

    public getDisplayedColumns(): DataTableColumDefinition[] {
        let result: DataTableColumDefinition[] = [];
        result.push({ attribute: 'number', displayName: "Number" });
        result.push({ attribute: 'name', displayName: "Name" });
        return result;
    }

    public getDisplayedFilters(): DataTableFilterDefinition[] {
        let result: DataTableFilterDefinition[] = [];
        return result;
    }
}
