import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery'; 
import { EmailComposer } from '@ionic-native/email-composer';
import { File } from '@ionic-native/file';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { TransportOverviewPage } from '../transportoverview/transportoverview';
import { storage, initializeApp } from 'firebase';
import { FIREBASE_CONFIG } from '../../app/firebase.config';

@Component({
  selector: 'page-transport',
  templateUrl: 'transport.html'
})

export class TransportPage {
  start: any;
  destination: any;
  start_txt: any;
  destination_txt: any;
  distance: any;
  posts: any;
  myDate: any; 
  timeStarts: any;
  mode: any; 
  parking: any;
  erp: any;
  amount: any;
  purpose: any;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,private camera:Camera, public alertCtrl: AlertController, private base64ToGallery: Base64ToGallery, public http: Http,) {
    initializeApp(FIREBASE_CONFIG);
  }

  async takePicture(){
    try{
      //Define camera options
      const options: CameraOptions = {
        quality:100, 
        destinationType: this.camera.DestinationType.DATA_URL, 
        encodingType: this.camera.EncodingType.JPEG,
        saveToPhotoAlbum: true, 
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      }
        const result = await this.camera.getPicture(options);
        const image = 'data:image/jpeg;base64,${result}';
        const pictures = storage().ref('pictures/receipts');
        pictures.putString(image, 'data_url');
    }
    catch(e){
      console.error(e);
    }
  }
  submitTransport(){
    let alert = this.alertCtrl.create({
      title: 'Done',
      subTitle: 'Sent successfully',
      buttons: ['OK']
    });
    alert.present();     
   
    if(this.destination == null){this.destination = "";}
    if(this.destination_txt == null || this.destination_txt == "Others"){this.destination_txt = "";}
    if(this.start == null){this.start = "";}
    if(this.start_txt == null || this.start_txt == "Others"){this.start_txt = "";}
    if(this.parking == null){this.parking="";}
    if(this.erp == null){this.erp="";}

    this.navCtrl.push(TransportOverviewPage, {
      date: this.myDate,
      time: this.timeStarts,
      from: this.start_txt + " " + this.start,
      to: this.destination_txt + " " + this.destination,
      tptmode: this.mode,
      mileage: this.distance,
      parking: this.parking,
      erp: this.erp,
      amount: this.amount,
      purpose: this.purpose,
    });
  }

  generateDistance(){
    this.posts = null;

    this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=km&origins=' + this.start + '&destinations=' + this.destination + '&key=AIzaSyBVXQmKg9DsI69_Vm_cnbhLWzXI8jG2SSA').map(res => res.json()).subscribe(data => {
     
    if (data.rows[0].elements[0].status !==("NOT_FOUND") && this.start!==(undefined) && this.destination!==(undefined)) {

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