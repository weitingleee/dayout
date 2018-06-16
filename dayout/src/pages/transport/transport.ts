import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { TransportOverviewPage } from '../transportoverview/transportoverview';
import { storage, initializeApp } from 'firebase';
import firebase from 'firebase';
//import {AutocompletePage} from './autocomplete';


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
  captureDataUrl: string;
  address: any; 

  constructor(private modalCtrl:ModalController, private toastCtrl: ToastController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,private camera:Camera, public alertCtrl: AlertController, public http: Http,) {
    //initializeApp(FIREBASE_CONFIG);
    this.address = {
      place: ''
    };
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

    let storageRef = firebase.storage().ref('images/');
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
     // Do something here when the data is succesfully uploaded!
     this.displayToastSuccess(filename);
    });

    this.uploadInformation("Date: " + this.myDate + "\nTime: " + this.timeStarts + "\nStart Location: " + this.start_txt + " " + this.start + "\nEnd Location: " + this.destination_txt + " " + this.destination + "\nMode: "+ this.mode + "\nMileage: " + this.distance + "\nParking: " + this.parking + "\nERP: " + this.erp + "\nAmount: " + this.amount + "\nPurpose: " + this.purpose);

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

    uploadInformation(information) {
      let uploadRef = firebase.storage().ref('text/');
      const filename = Math.floor(Date.now() / 1000);
      const textRef = uploadRef.child(`text/${filename}.txt`);
      uploadRef.putString(information).then(()=> {
        let toast = this.toastCtrl.create({
          message: 'New transport claim(' + filename + ') added!',
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

    showAddressModal () {
      /*let modal = this.modalCtrl.create(AutocompletePage);
      let me = this;
      modal.onDidDismiss(data => {
        this.address.place = data;
      });
      modal.present();*/
    }

  }