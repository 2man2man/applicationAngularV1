import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppSettings {
  public readonly API_ENDPOINT: string = 'http://localhost:8080/springbootwildfly/';
}