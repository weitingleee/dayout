import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery'; 
import {EmailComposer} from '@ionic-native/email-composer';
import {File} from '@ionic-native/file';

@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html'
})

export class InvoicePage {
  mileage: any;
  icons: string[];
  items: Array<{title: string}>;
  private image: string; 

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera:Camera, public alertCtrl: AlertController, private base64ToGallery: Base64ToGallery, private emailComposer: EmailComposer, private file: File) {
    // If we navigated to this page, we will have an item available as a nav param
  }

  takePicture(){
    const options: CameraOptions = {
      quality:100, 
      destinationType: this.camera.DestinationType.DATA_URL, 
      saveToPhotoAlbum: true, 
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => { 
      this.image = 'data:image/jpeg;base64,' + imageData;

      this.base64ToGallery.base64ToGallery(imageData).then(
        res => {
          console.log('Saved image to gallery', res);
          this.displaySuccessAlert(res);
          this.sendEmail();
        },
        err => {
          console.log('Error saving image to gallery', err);
          this.displayErrorAlert(err);
        }
      );
    }, (err) => {
      this.displayErrorAlert(err);
    });
  }

  displayErrorAlert(err){
    console.log(err);
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: err,
      buttons: ['OK']
    });
    alert.present();  
  }

  displaySuccessAlert(res){
    console.log(res);
    let alert = this.alertCtrl.create({
      title: 'Saved image to gallery',
      subTitle: res,
      buttons: ['OK']
    });
    alert.present();  
  }

  sendEmail(){
    //this.file.createFile(this.file.dataDirectory, 'transport.csv', true)
    this.file.createFile(this.file.externalRootDirectory, 'transport.docx', true).then(
      res => {
        console.log('Saved image to gallery', res);
        this.displaySuccessAlert(res);
      },
      err => {
        console.log('Error saving image to gallery', err);
        this.displayErrorAlert(err);
      }
    )
  }

  submitTransport(){
    let alert = this.alertCtrl.create({
      title: 'Done',
      subTitle: 'Sent successfully',
      buttons: ['OK']
    });
    alert.present();     
   //GO TO OVERVIEW PAGE 
  }
}


/*
.then(() => {      
      let email = {
        to: 'weitingleee@gmail.com',
        attachments: [
          //this.file.dataDirectory + 'transport.txt'
          'file:///storage/emulated/0/Images/img_201851021629.png',
          '/storage/emulated/0/Documents/transport.txt',
        ],

        subject: 'subject',
        body: 'body text...',
        isHtml: true
      };
      this.emailComposer.open(email);

    })
    .catch((err) => {
      console.error(err);
    });
    */