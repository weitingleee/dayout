import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { InvoiceOverviewPage } from '../invoiceoverview/invoiceoverview';
import { storage, initializeApp } from 'firebase';
import { FIREBASE_CONFIG } from '../../app/firebase.config';
import firebase from 'firebase';

@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html'
})

export class InvoicePage {
  myDate: any; 
  description: any;
  captureDataUrl: string;

  constructor(private modalCtrl:ModalController, private toastCtrl: ToastController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,private camera:Camera, public alertCtrl: AlertController, public http: Http,) {
    initializeApp(FIREBASE_CONFIG);
  }

  takePicture(){
    try{
      //Define camera options
          const cameraOptions: CameraOptions = {
          quality: 50,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          cameraDirection: this.camera.Direction.BACK,
      };

    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
    }
    catch(e){
      console.error(e);
    }
  }

  submitTransport(){
    let alert = this.alertCtrl.create({
      title: 'Done',
      subTitle: 'Sent',
      buttons: ['OK']
    });
    alert.present();     
   
    this.navCtrl.push(InvoiceOverviewPage, {
      date: this.myDate,
      description: this.description,
    });

    if(this.captureDataUrl != null){
      let storageRef = firebase.storage().ref('invoices/');
      // Create a timestamp as filename
      const filename = Math.floor(Date.now() / 1000);

      // Create a reference to 'images/todays-date.jpg'
      const imageRef = storageRef.child(`invoices/${filename}.jpg`);

      imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
        this.displayToastSuccess(filename);
      });
    }
  }

  displaySuccessAlert(res){
      console.log(res);
      let alert = this.alertCtrl.create({
        title: 'Saved',
        subTitle: res,
        buttons: ['OK']
      });
      alert.present();  
    }

    displayToastSuccess(filename){
      let toast = this.toastCtrl.create({
        message: 'New image ' + filename + ' uploaded!',
        duration: 1000
      });
      toast.present();      
    }
  }