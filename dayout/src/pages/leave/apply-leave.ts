import { Component } from '@angular/core';
import { NavController,AlertController  } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  templateUrl: 'apply-leave.html'
})
export class ApplyLeave {
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
  sendSMS() {
    let search = new URLSearchParams();
    search.append('ID', '95270002');
    search.append('Password', 'hello123');
    search.append('Mobile', '6592223123');
    search.append('Type', 'A');
    search.append('Message', 'Hello');

    this.http.post('https://www.commzgate.net/gateway/SendMsg', search).subscribe(res => console.log(res.json.toString()));

  }
    showAlert() {
      let alert = this.alertCtrl.create({
        title: 'Please check your location',
        subTitle: 'Location not found',
        buttons: ['OK'],
        cssClass: 'alertCustomCss'
      });
      alert.present();
    }
  
}