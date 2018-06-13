import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery'; 
import { EmailComposer } from '@ionic-native/email-composer';
import { File } from '@ionic-native/file';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-transportoverview',
  templateUrl: 'transportoverview.html'
})

export class TransportOverviewPage {
  icons: string[];
  items: Array<{title: string}>;
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera:Camera, public alertCtrl: AlertController, private base64ToGallery: Base64ToGallery, private emailComposer: EmailComposer, private file: File, public http: Http,) {
    // If we navigated to this page, we will have an item available as a nav param
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
  }

}