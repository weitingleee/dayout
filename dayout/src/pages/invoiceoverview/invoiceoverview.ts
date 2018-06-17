import { Component } from '@angular/core';
import { NavParams, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { DataProvider} from './../../providers/data/data';

@Component({
  selector: 'page-invoiceoverview',
  templateUrl: 'invoiceoverview.html'
})

export class InvoiceOverviewPage {
  private image: string; 
  myDate: any;
  description: any;

  constructor(public navParams: NavParams, public dataProvider: DataProvider, private toastCtrl: ToastController) {
    this.myDate = navParams.get('date');
    this.description = navParams.get('description');

    this.uploadInformation("Date: " + this.myDate + "\nDescription: " + this.description);    
  }

  uploadInformation(text) {
    let upload = this.dataProvider.uploadToStorage(text);
    upload.then().then(res => {
      console.log('res:', res);
      this.dataProvider.storeInfoToDatabse(res.metadata).then(() => {
        let toast = this.toastCtrl.create({
          message: 'New invoice item added!',
          duration: 3000
        });
        toast.present();
      })
    })
  }
}