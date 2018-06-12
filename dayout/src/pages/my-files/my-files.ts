import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { DataProvider} from './../../providers/data/data';
import { Observable } from 'rxjs/Observable';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the MyFilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-files',
  templateUrl: 'my-files.html',
})
export class MyFilesPage {
  files: Observable<any[]>;

  constructor(private iab: InAppBrowser, public navCtrl: NavController, public dataProvider: DataProvider, private alertCtrl: AlertController, private toastCtrl: ToastController) {
  this.files=this.dataProvider.getFiles();
  }
  addFile(){
    let inputAlert = this.alertCtrl.create({
      title: 'Store new information',
      inputs:[
        {
          name:'info',
          placeholder:'Lorem ip'
        }
      ],
      buttons:[
        {
          text:'Cancel',
          role:'cancel'
        },
        {
          text:'Store',
          handler: data=>{
            this.uploadInformation(data.info);
          }
        }
      ]
    });
    inputAlert.present();
  }
  
  uploadInformation(text){
    let upload= this.dataProvider.uploadToStorage(text);
    upload.then().then(res=>{
      console.log('res:', res);
      this.dataProvider.storeInfoToDatabse(res.metadata).then(()=>{
        let toast = this.toastCtrl.create({
          message: 'New File added!',
          duration:3000
        });
        toast.present();
      })
    })
  }
  deleteFile(file){
    this.dataProvider.deleteFile(file).subscribe(()=>{
      let toast = this.toastCtrl.create({
        message: 'File removed!',
        duration:3000
      });
      toast.present();
    })
  }
  viewFile(url){
    this.iab.create(url);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyFilesPage');
  }

}
