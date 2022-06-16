import { HttpClient, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ApiGetRequest } from 'src/app/core/services/Requests/ApiGetRequest';
import { ApiPostRequest } from 'src/app/core/services/Requests/ApiPostRequest';
import { ApiRequestHelper } from 'src/app/core/services/Requests/ApiRequestHelper';


interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.less'],
  // animations: [
  // trigger('detailExpand', [
  // state('collapsed', style({ height: '0px', minHeight: '0' })),
  // state('expanded', style({ height: '*' })),
  // transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  // ]),
  // ],
})

//https://edupala.com/how-to-implement-angular-material-table-in-angular-12/
//https://edupala.com/how-to-implement-angular-material-table-in-angular-12/
//https://www.angularjswiki.com/material/mat-table/#step-2-creating-data-source-for-the-table

export class DataTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // MatPaginator Output
  pageEvent: PageEvent;
  pageSize = 3;
  pageSizeOptions: number[] = [1, 5, 7];
  countries: Country[] = [{ name: "test", flag: "", area: 1, population: 2 }];


  displayedColumnsDef: TableColumDefinition[] = [{ attribute: 'firstName', displayName: "firstName" },
  { attribute: 'lastName', displayName: "lastName" },
  { attribute: 'userName', displayName: "userName" },];




  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.countries)
  @ViewChild(MatSort) sort: MatSort;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();

    // let getRequest: ApiGetRequest = new ApiGetRequest(this.httpClient);
    // getRequest.endpoint("employee/getMyself");

    // getRequest = ApiRequestHelper.getInstance().executeRequest(getRequest);
    // const newLoca2l = getRequest.getResponsePromise();
    // newLoca2l?.then((value: HttpResponse<any>) => {
    //   console.log(value);
    //   console.log(value.body["systemConfigurationPrivilege"]);
    // }).catch((value: HttpResponse<any>) => {
    //   alert("Navigation cant be loaded");
    // });


    let request: ApiPostRequest = new ApiPostRequest(this.httpClient);
    request.endpoint("employee/search");
    request.body("{}")
    request = ApiRequestHelper.getInstance().executeRequest(request);

    const newLocal = request.getResponsePromise();
    newLocal?.then((value: HttpResponse<any>) => {
      console.log(value);
      console.log(value.body["systemConfigurationPrivilege"]);


      console.log(value.body["totalResults"]);
      let result = value.body["results"];
      console.log(result);
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    }).catch((value: HttpResponse<any>) => {
      console.log(value)
      alert("Load failed");
    });



    // this.http.get<Country[]>('./assets/data/countries.json')
    //   .subscribe((data: any) => {
    //     // Is important
    //     this.dataSource = new MatTableDataSource(data);
    //     this.dataSource.paginator = this.paginator;

    //   }
    //   );
  }

  getDisplayedColumns(): string[] {
    let result: string[] = [];
    for (let entry of this.displayedColumnsDef) {
      result.push(entry.attribute);
    }
    return result;

  }

  ngAfterViewInit(): void {

    // this.dataSource.sort = this.sort;
  }

  filterCountries(value: any) {

  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    // if (setPageSizeOptionsInput) {
    //   this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    // }
  }

  onMatSortChange() {
    // this.dataSource.sort = this.sort;
  }
}

export interface TableColumDefinition {
  attribute: string,
  displayName: string
}