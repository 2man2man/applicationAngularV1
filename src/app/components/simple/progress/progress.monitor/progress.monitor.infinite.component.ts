import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'progress.monitor.infinite',
  templateUrl: './progress.monitor.infinite.component.html',
  styleUrls: ['./progress.monitor.infinite.component.less']
})
export class ProgressMonitorComponent implements OnInit {

  // private execute: () => Promise<void>

  constructor(
    // public dialogRef: MatDialogRef<ProgressMonitorComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any) {
    // this.execute = data.executeFunction;
  ) { }

  ngOnInit(): void {
    // this.execute()
    //   .then(() => {
    //     this.dialogRef.close();
    //   });
  }




}
