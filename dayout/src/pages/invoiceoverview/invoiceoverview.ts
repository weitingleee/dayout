import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-invoiceoverview',
  templateUrl: 'invoiceoverview.html'
})

export class InvoiceOverviewPage {
  private image: string; 
  myDate: any;
  description: any;

  constructor(public navParams: NavParams) {
    this.myDate = navParams.get('date');
    this.description = navParams.get('desription');
  }

}