import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery'; 
import { File } from '@ionic-native/file';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { InvoiceOverviewPage } from '../invoiceoverview/invoiceoverview';
import { storage, initializeApp } from 'firebase';
//import { FIREBASE_CONFIG } from '../../app/firebase.config';
import firebase from 'firebase';

@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html'
})

export class InvoicePage {
  myDate: any; 
  description: any;
  captureDataUrl: string;

  constructor(private modalCtrl:ModalController, private toastCtrl: ToastController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,private camera:Camera, public alertCtrl: AlertController, private base64ToGallery: Base64ToGallery, public http: Http,) {
    //initializeApp(FIREBASE_CONFIG);
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
      subTitle: 'Sent successfully',
      buttons: ['OK']
    });
    alert.present();     
   
    this.navCtrl.push(InvoiceOverviewPage, {
      date: this.myDate,
      description: this.description,
    });

    let storageRef = firebase.storage().ref('invoices/');
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`invoices/${filename}.jpg`);

    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
     // Do something here when the data is succesfully uploaded!
     this.displayToastSuccess(filename);
    });

    this.uploadInformation("Date: " + this.myDate + "\nDescription: " + this.description);

  }
displaySuccessAlert(res){
    console.log(res);
    let alert = this.alertCtrl.create({
      title: 'Saved invoice to gallery',
      subTitle: res,
      buttons: ['OK']
    });
    alert.present();  
  }
    
  uploadInformation(information) {
      let uploadRef = firebase.storage().ref('text/');
      const filename = Math.floor(Date.now() / 1000);
      const textRef = uploadRef.child(`text/${filename}.txt`);
      uploadRef.putString(information).then((snapshot)=> {
        let toast = this.toastCtrl.create({
          message: 'New invoice submission(' + filename + ') added!',
          duration: 3000
        });
        toast.present();
      })
    }

    displayToastSuccess(filename){
      let toast = this.toastCtrl.create({
        message: 'New image ' + filename + ' uploaded!',
        duration: 1000
      });
      toast.present();      
    }
  }