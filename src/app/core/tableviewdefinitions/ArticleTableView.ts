import { DataTableColumDefinition } from "src/app/components/data-table/DataTableColumDefinition";
import { DataTableFilterDefinition } from "src/app/components/data-table/DataTableFilterDefinition";
import { TableViewDefinition } from "./AbstractTableViewDefinition";

export class ArticleTableView implements TableViewDefinition {

    public getEndpoint(): string {
        return "article/search"
    }

    public getDisplayedColumns(): DataTableColumDefinition[] {
        let result: DataTableColumDefinition[] = [];
        result.push({ attribute: 'number', displayName: "Number" });
        result.push({ attribute: 'name', displayName: "Name" });
        result.push({ attribute: 'tenant.number', displayName: "Tenant number" });
        result.push({ attribute: 'tenant.name', displayName: "Tenant name" });
        return result;
    }

    public getDisplayedFilters(): DataTableFilterDefinition[] {
        let result: DataTableFilterDefinition[] = [];
        return result;
    }
}
