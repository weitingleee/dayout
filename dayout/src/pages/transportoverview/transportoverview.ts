import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-transportoverview',
  templateUrl: 'transportoverview.html'
})

export class TransportOverviewPage {
  private image: string; 
  start: any;
  destination: any;
  distance: any;
  generate: boolean;
  posts: any;
  myDate: any; 
  timeStarts: any;
  parking: any;
  erp: any; 
  amount: any; 
  purpose: any;
  mode: any;

  constructor(public navParams: NavParams) {
    this.myDate = navParams.get('date');
    this.timeStarts = navParams.get('time');
    this.start = navParams.get('from');
    this.destination = navParams.get('to');      
    this.mode = navParams.get('tptmode');    
    this.distance = navParams.get('mileage'); 
    this.parking = navParams.get('parking'); 
    this.erp = navParams.get('erp');   
    this.amount = navParams.get('amount'); 
    this.purpose = navParams.get('purpose'); 
  }

}