import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery'; 
import { EmailComposer } from '@ionic-native/email-composer';
import { File } from '@ionic-native/file';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { TransportOverviewPage } from '../transportoverview/transportoverview';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {
  icons: string[];
  items: Array<{title: string}>;
  private image: string; 
  start: any;
  destination: any;
  start_txt: any;
  destination_txt: any;
  distance: any;
  generate: boolean;
  posts: any;
  myDate: any; 
  timeStarts: any;
  mode: any; 
  parking: any;
  erp: any;
  amount: any;
  purpose: any;
  userId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera:Camera, public alertCtrl: AlertController, private base64ToGallery: Base64ToGallery, private emailComposer: EmailComposer, private file: File, public http: Http,) {
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
    this.file.checkDir(this.file.dataDirectory, 'dayout').then(
      _ =>console.log('Directory exists')).catch(      
      err =>{
        console.log('Directory doesn\'t exist');
        file.createDir(file.applicationDirectory, 'dayout', false);
      });

    this.file.createFile(this.file.externalRootDirectory+'/dayout/', 'transport'+this.start+this.destination+this.myDate+this.timeStarts+'.png', true).then(
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