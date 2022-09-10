import { Component, Injector, NgModule } from '@angular/core';
import { DataTableColumDefinition } from 'src/app/components/data-table/DataTableColumDefinition';

@Component({
  selector: 'mitarbeiter',
  templateUrl: './mitarbeiter.html',
  styleUrls: ['./mitarbeiter.less'],
})
export class MitarbeiterComponent {

  displayedColumns: DataTableColumDefinition[] = [{ attribute: 'firstName', displayName: "Vorname" },
  { attribute: 'lastName', displayName: "Nachname" },
  { attribute: 'userName', displayName: "Benutzername" },];


  constructor(
  ) { }

  public ngOnInit() {
  }

}