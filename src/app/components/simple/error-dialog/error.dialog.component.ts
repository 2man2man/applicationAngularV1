import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'error.dialog',
  templateUrl: './error.dialog.component.html',
  styleUrls: ['./error.dialog.component.less']
})
//TODO: icon wird nicht richtig angezeigt!
export class ErrorDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  confirm(): void {
    this.dialogRef.close(true);
  }


}
