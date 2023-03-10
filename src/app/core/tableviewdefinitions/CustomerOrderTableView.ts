import { DataTableColumDefinition } from "src/app/components/data-table/DataTableColumDefinition";
import { DataTableFilterDefinition } from "src/app/components/data-table/DataTableFilterDefinition";
import { TableViewDefinition } from "./AbstractTableViewDefinition";

export class CustomerOrderTableView implements TableViewDefinition {

    public getEndpoint(): string {
        return "customerOrder/search"
    }

    public getDisplayedColumns(): DataTableColumDefinition[] {
        let result: DataTableColumDefinition[] = [];
        result.push({ attribute: 'number', displayName: "Number" });
        return result;
    }

    public getDisplayedFilters(): DataTableFilterDefinition[] {
        let result: DataTableFilterDefinition[] = [];
        return result;
    }
}
