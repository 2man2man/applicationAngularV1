import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CellViewDefinition, CellViewFactory } from 'src/app/core/cellViewDefinitions/AbstractCellViewDefinition';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';
import { DomainSelectionMultiDialogComponent } from './dialog/domainselection.multi.dialog.component';

@Component({
  selector: 'domainselection-multi',
  templateUrl: './domainselection.multi.component.html',
  styleUrls: ['./domainselection.multi.component.less']
})
export class DomainselectionComponent implements OnInit, OnChanges {

  @Input()
  domainClazz: DomainClazzEnum;

  @Input()
  currentSelection: any[];


  @Output()
  dialogSelection: EventEmitter<any[]> = new EventEmitter();

  cellView: CellViewDefinition;
  currentSelctionString: string = "";

  constructor(public dialog: MatDialog, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.cellView = new CellViewFactory().create(this.domainClazz);
    if (!this.currentSelection) {
      this.currentSelection = [];
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { domainClazz: this.domainClazz };
    const dialogRef = this.dialog.open(DomainSelectionMultiDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      const selectionFromDialog = result.slice();
      this.currentSelection = selectionFromDialog.slice();
      this.updateCurrentSelectionString();
      this.dialogSelection.emit(selectionFromDialog.slice());
    });
  }

  private updateCurrentSelectionString(): void {
    if (this.currentSelection) {
      this.currentSelctionString = this.cellView.arrayToString(this.currentSelection);
    }
  }

  ngOnChanges() {
    this.updateCurrentSelectionString();
  }


}
