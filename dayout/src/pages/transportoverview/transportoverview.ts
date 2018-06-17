import { Component } from '@angular/core';
import { NavParams, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { DataProvider} from './../../providers/data/data';

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

  constructor(public navParams: NavParams, public dataProvider: DataProvider, private toastCtrl: ToastController) {
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

    if(this.distance == null){this.distance == 0;}
    if(this.parking == null){this.parking == 0;}
    if(this.erp == null){this.erp == 0;}
    if(this.mode == "Car"){this.amount == this.parking + this.erp;}
    if(this.mode == "Taxi"){this.distance == 0;}

    this.uploadInformation("Date: " + this.myDate + "\nTime: " + this.timeStarts + "\nStart Location: " + this.start + "\nEnd Location: " +  this.destination + "\nMode: "+ this.mode + "\nMileage: " + this.distance + "\nParking: " + this.parking + "\nERP: " + this.erp + "\nAmount: " + this.amount + "\nPurpose: " + this.purpose);    
  }

  uploadInformation(text) {
    let upload = this.dataProvider.uploadToStorage(text);
    upload.then().then(res => {
      console.log('res:', res);
      this.dataProvider.storeInfoToDatabse(res.metadata).then(() => {
        let toast = this.toastCtrl.create({
          message: 'New transport claim added!',
          duration: 3000
        });
        toast.present();
      })
    })
  }

}