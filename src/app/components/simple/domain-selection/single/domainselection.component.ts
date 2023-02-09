import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CellViewDefinition, CellViewFactory } from 'src/app/core/cellViewDefinitions/AbstractCellViewDefinition';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';
import { DomainSelectionSingleDialogComponent } from './dialog/domainselection.dialog.component';

@Component({
  selector: 'domainselection',
  templateUrl: './domainselection.component.html',
  styleUrls: ['./domainselection.component.less']
})
export class DomainSelectionSingleComponent implements OnInit, OnChanges {

  @Input()
  domainClazz: DomainClazzEnum;

  @Input()
  currentSelection: any;


  @Output()
  dialogSelection: EventEmitter<any> = new EventEmitter();

  cellView: CellViewDefinition;
  currentSelctionString: string | null = "";

  constructor(public dialog: MatDialog, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.cellView = new CellViewFactory().create(this.domainClazz);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { domainClazz: this.domainClazz };
    const dialogRef = this.dialog.open(DomainSelectionSingleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      const selectionFromDialog = result;
      this.currentSelection = selectionFromDialog;
      this.updateCurrentSelectionString();
      this.dialogSelection.emit(selectionFromDialog);
    });
  }

  private updateCurrentSelectionString(): void {
    if (this.currentSelection) {
      this.currentSelctionString = this.cellView.singleObjectToString(this.currentSelection);
    }
    else {
      this.currentSelctionString = null;
    }
  }

  removeSelection() {
    this.currentSelection = null;
    this.updateCurrentSelectionString();
    this.dialogSelection.emit(this.currentSelection);
  }

  ngOnChanges() {
    this.updateCurrentSelectionString();
  }


}
