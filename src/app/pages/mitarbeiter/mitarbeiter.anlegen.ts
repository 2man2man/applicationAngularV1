import { Component, Injector, NgModule } from '@angular/core';

@Component({
  selector: 'mitarbeiter.anlegen',
  templateUrl: './mitarbeiter.anlegen.html',
  styleUrls: ['./mitarbeiter.anlegen.less'],
})
export class MitarbeiterAnlegenComponent {

  constructor(

  ) { }

  public ngOnInit() {
      
  }

  public save(): void {
      console.log("Speichert");
  }

  }