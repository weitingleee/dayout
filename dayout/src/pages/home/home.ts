import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

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
  sendSMS() {
    console.log("heelo")



    let search = new URLSearchParams();
    // search.append('ID', '95270002');
    search.append('Password', 'hello123');
    search.append('Mobile', '6592223123');
    search.append('Type', 'A');
    search.append('Message', 'Hello');

    this.http.post('https://www.commzgate.net/gateway/SendMsg', search).subscribe(res => console.log(res.json.toString()));

  }

  generateDistance() {
    this.posts = null;

    this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=km&origins=' + this.start + '&destinations=' + this.destination + '&key=AIzaSyBVXQmKg9DsI69_Vm_cnbhLWzXI8jG2SSA').map(res => res.json()).subscribe(data => {
     
    
    if (data.rows[0].elements[0].status !==("NOT_FOUND")) {

        this.posts = data.rows[0].elements[0].distance.text;
        console.log(this.posts);

        this.distance = this.posts;
      }else{
        this.showAlert();
      }
    })

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
