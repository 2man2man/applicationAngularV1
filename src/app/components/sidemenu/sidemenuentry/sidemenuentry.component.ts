import { Component, Input, OnInit } from '@angular/core';
import { SideMenuEntryInterface } from '../SideMenuEntryInterface';

@Component({
  selector: 'sidemenuentry',
  templateUrl: './sidemenuentry.component.html',
  styleUrls: ['./sidemenuentry.component.less']
})
export class SidemenuentryComponent {

  @Input() entryDetails!: SideMenuEntryInterface;

  constructor() {
  }





}


