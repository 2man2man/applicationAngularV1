import { DataSource } from "@angular/cdk/collections";

export interface DataTableDataSourceInterface extends DataSource<any> {

    load(page: number, limit: number, filters?: Map<string, any>): void;

}