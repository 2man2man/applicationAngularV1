import { SelectionModel } from '@angular/cdk/collections';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';
import { TableViewFactory } from 'src/app/core/tableviewdefinitions/AbstractTableViewDefinition';
import { StringUtil } from 'src/app/util/StringUtil';
import { DataTableFilterComponent } from './data-table-filter/data-table-filter.component';
import { DataTableColumDefinition } from './DataTableColumDefinition';
import { DataTableDataSource } from './DataTableDataSource';
import { DataTableFilterDefinition } from './DataTableFilterDefinition';
import { DataTableFixedFilterDefinition } from './DataTableFixedFilterDefinition';


@Component({
  selector: 'data-table',
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
  domainClazz: DomainClazzEnum;

  displayedColumns: DataTableColumDefinition[];
  displayedFilters: DataTableFilterDefinition[];

  @Input()
  fixedFilters: DataTableFixedFilterDefinition[];

  @Input()
  rowClickedFunction: (row: any, router: Router) => void;

  @Input() multiSelection: boolean;

  @Input() singleSelection: boolean;

  @Output()
  selectionEmitter: EventEmitter<any[]> = new EventEmitter();

  selection = new SelectionModel<any>(true, []);

  @ViewChildren('filter')
  filterelements: QueryList<DataTableFilterComponent>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  pageEvent: PageEvent;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 50, 100];

  dataSourceImpl: DataTableDataSource;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private httpClient: HttpClient,
    private router: Router,
    @Inject(DOCUMENT) document: Document) {
  }

  ngOnInit(): void {
    let viewProps = new TableViewFactory().create(this.domainClazz);
    this.displayedColumns = viewProps.getDisplayedColumns();
    this.displayedFilters = viewProps.getDisplayedFilters();
    this.dataSourceImpl = new DataTableDataSource(this.httpClient, viewProps.getEndpoint());
  }



  ngAfterViewInit(): void {

    this.paginator.page.pipe(tap(() => this.load()))
      .subscribe();
    this.load();
  }

  public load() {
    let filterMap = new Map<string, any>();

    for (const filterElem of this.filterelements) {
      const filterAttribute = filterElem.filterAttribute;
      const filterValue = filterElem.getFilterValue();
      if (StringUtil.isEmpty(filterValue)) {
        continue;
      }
      filterMap.set(filterAttribute, filterValue);
    }

    if (this.fixedFilters && this.fixedFilters.length > 0) {
      for (const filterElem of this.fixedFilters) {
        filterMap.set(filterElem.filterAttribute, filterElem.getValue());
      }
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

    if (this.multiSelection || this.singleSelection) {
      result.push("select");
    }

    for (let entry of this.displayedColumns) {
      result.push(entry.attribute);
    }
    return result;
  }


  rowClicked(row: any) {
    if (this.rowClickedFunction) {
      this.rowClickedFunction(row, this.router);
    }
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceImpl.totalResults; //TODO check this for dialogs with multiple pages
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSourceImpl.currentItems.forEach(row => this.selection.select(row));
    this.outputSelectionChanges();
  }

  handleRowSelection(event: MatCheckboxChange, row: any): void {
    if (!event) {
      return;
    }
    if (this.multiSelection) {
      this.handleMultiSelection(event, row);
    }
    if (this.singleSelection) {
      this.handleSingleSelection(event, row);
    }

    this.outputSelectionChanges();
  }

  handleMultiSelection(event: MatCheckboxChange, row: any) {
    if (event.checked) {
      this.selection.select(row);
    }
    else {
      this.selection.deselect(row);
    }
  }

  handleSingleSelection(event: MatCheckboxChange, row: any) {
    this.selection.clear();
    if (event.checked) {
      this.selection.select(row);
    }
  }



  outputSelectionChanges(): void {
    this.selectionEmitter.emit(this.selection.selected);
  }





}

