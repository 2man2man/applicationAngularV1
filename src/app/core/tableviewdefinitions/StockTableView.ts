import { DataTableColumDefinition } from "src/app/components/data-table/DataTableColumDefinition";
import { DataTableFilterDefinition } from "src/app/components/data-table/DataTableFilterDefinition";
import { TableViewDefinition } from "./AbstractTableViewDefinition";

export class StockTableView implements TableViewDefinition {

    public getEndpoint(): string {
        return "stockFixedLocation/search"
    }

    public getDisplayedColumns(): DataTableColumDefinition[] {
        let result: DataTableColumDefinition[] = [];
        result.push({ attribute: 'fixedLocationNumber', displayName: "Location" });
        result.push({ attribute: 'article.number', displayName: "Article number" });
        result.push({ attribute: 'article.name', displayName: "Article name" });
        result.push({ attribute: 'quantity', displayName: "Quantity" });
        return result;
    }

    public getDisplayedFilters(): DataTableFilterDefinition[] {
        let result: DataTableFilterDefinition[] = [];
        return result;
    }
}
