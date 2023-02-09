import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';



@Component({
  selector: 'domainselection-dialog',
  templateUrl: './domainselection.dialog.component.html',
  styleUrls: ['./domainselection.dialog.component.less']
})
export class DomainSelectionSingleDialogComponent {

  currentSelection: any;

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any,
    private dialogRef: MatDialogRef<any>) { }


  updateCurrentSelection(data: any[]): void {
    if (data.length == 0) {
      this.currentSelection = null;
    }
    else {
      this.currentSelection = data[0];
    }
  }

  confirm(): void {
    this.dialogRef.close(this.currentSelection);
  }

  cancel(): void {
    this.dialogRef.close();
  }




}
