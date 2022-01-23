import { Component } from '@angular/core';

@Component({
  selector: 'contextmenu',
  templateUrl: './contextmenu.html',
  styleUrls: ['./contextmenu.less'],
})
export class KontextmenuComponent {

  public menu = [
    {
      "punkt": "System"
    },
    {
      "punkt": "Menupunkt Zwei"
    },
    {
      "punkt": "Menupunkt Drei"
    },
  ];

  constructor() { }



}