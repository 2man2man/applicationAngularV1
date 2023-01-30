import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';



@Component({
  selector: 'domainselection-multi-dialog',
  templateUrl: './domainselection.multi.dialog.component.html',
  styleUrls: ['./domainselection.multi.dialog.component.less']
})
export class DomainSelectionMultiDialogComponent {

  currentSelection: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any,
    private dialogRef: MatDialogRef<any>) { }


  updateCurrentSelection(data: any[]): void {
    this.currentSelection = data.slice();
  }

  confirm(): void {
    this.dialogRef.close(this.currentSelection);
  }

  cancel(): void {
    this.dialogRef.close();
  }




}
