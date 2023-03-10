import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerOrderModel } from '../customerorder..model';

@Component({
  selector: 'customerorder.editor',
  templateUrl: './customerorder.editor.component.html',
  styleUrls: ['./customerorder.editor.component.less']
})
export class CustomerOrderEditorComponent implements OnInit {

  public static readonly PATH = "customerOrder/editor";

  model: CustomerOrderModel;


  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
    this.model = CustomerOrderModel.createEmtpy();
    this.model.id = this.router.getCurrentNavigation()!.extras.state?.existingId;
  }

  ngOnInit(): void {
  }



}
