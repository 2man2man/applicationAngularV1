import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'data-table-filter',
  templateUrl: './data-table-filter.component.html',
  styleUrls: ['./data-table-filter.component.less'],
})
export class DataTableFilterComponent implements AfterViewInit {

  @Input("displayName") displayName: string;
  @Input("filterAttribute") filterAttribute: string;
  @ViewChild('input') refElem: ElementRef;

  @Output() loadEvent = new EventEmitter<void>();

  ngAfterViewInit(): void {

    fromEvent(this.refElem.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.loadEvent.next();
        })
      )
      .subscribe();
  }

  public getFilterValue(): string {
    return this.refElem.nativeElement.value;
  }


}

