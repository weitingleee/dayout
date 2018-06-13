import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { InvoicePage } from '../invoice/invoice';
import { ApplyLeave } from '../leave/apply-leave';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  start: any;
  destination: any;
  distance: any;
  text = {
    "number": "",
    "message": "",
  };
  posts: any;
  constructor(public navCtrl: NavController, public http: Http,private alertCtrl: AlertController) {

  }
  redirectInvoice(){
    this.navCtrl.push(InvoicePage)
  }
  redirectLeave(){
    this.navCtrl.push(ApplyLeave)
    
  }
}
