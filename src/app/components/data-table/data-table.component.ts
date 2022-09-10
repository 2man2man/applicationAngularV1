import { HttpClient, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ApiGetRequest } from 'src/app/core/services/Requests/ApiGetRequest';
import { ApiPostRequest } from 'src/app/core/services/Requests/ApiPostRequest';
import { ApiRequestHelper } from 'src/app/core/services/Requests/ApiRequestHelper';
import { DataTableDataSource } from './DataTableDataSource';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { tap } from 'rxjs/internal/operators/tap';
import { DataTableColumDefinition } from './DataTableColumDefinition';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { DataTableFilterDefinition } from './DataTableFilterDefinition';
import { DOCUMENT } from '@angular/common';
import { StringUtil } from 'src/app/util/StringUtil';
import { DataTableFilterComponent } from './data-table-filter/data-table-filter.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.less'],
})

//https://edupala.com/how-to-implement-angular-material-table-in-angular-12/
//https://edupala.com/how-to-implement-angular-material-table-in-angular-12/
//https://www.angularjswiki.com/material/mat-table/#step-2-creating-data-source-for-the-table

export class DataTableComponent implements OnInit, AfterViewInit {

  @Input()
  title: string;

  @Input()
  displayedColumns: DataTableColumDefinition[];

  displayedFilters: DataTableFilterDefinition[] = [{ filterAttribute: 'firstName', displayName: "VornameFilter" },
  { filterAttribute: 'lastName', displayName: "NachnameFilter" },
  { filterAttribute: 'userName', displayName: "BenutzernameFilter" }];

  @ViewChildren('filter') filterelements: QueryList<DataTableFilterComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageEvent: PageEvent;
  pageSize = 2;
  pageSizeOptions: number[] = [2, 50, 100];

  dataSourceImpl: DataTableDataSource;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private httpClient: HttpClient, @Inject(DOCUMENT) document: Document) {
  }

  ngOnInit(): void {
    this.dataSourceImpl = new DataTableDataSource(this.httpClient, "employee/search");
  }

  ngAfterViewInit(): void {

    this.paginator.page.pipe(tap(() => this.load()))
      .subscribe();

    this.load();
  }

  load() {

    let filterMap = new Map<string, any>();

    for (const filterElem of this.filterelements) {

      const filterAttribute = filterElem.filterAttribute;
      const filterValue = filterElem.getFilterValue();
      if (StringUtil.isEmpty(filterValue)) {
        continue;
      }
      filterMap.set(filterAttribute, filterValue);
    }

    this.dataSourceImpl.load(this.getPageIndex(), this.getPageSize(), filterMap);
  }

  private getPageIndex(): number {
    if (this.paginator) {
      return this.paginator.pageIndex;
    }
    return 0;
  }

  private getPageSize(): number {
    if (this.paginator) {
      return this.paginator.pageSize;
    }
    return this.pageSize;
  }


  setPageSizeOptions(setPageSizeOptionsInput: string) {
  }

  onMatSortChange() {
  }


  getDisplayedColumns(): string[] {
    let result: string[] = [];
    for (let entry of this.displayedColumns) {
      result.push(entry.attribute);
    }
    return result;
  }
}

