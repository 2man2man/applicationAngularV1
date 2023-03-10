import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'progress-dialog5',
  templateUrl: './progress.dialog.component.html',
  styleUrls: ['./progress.dialog.component.less']
})
export class ProgressDialogComponent implements OnInit {

  isComplete = false;

  constructor(

  ) { }

  ngOnInit(): void {
  }


  setComplete() {
    this.isComplete = true;
  }





}
