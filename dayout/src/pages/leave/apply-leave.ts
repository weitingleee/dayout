import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { DataProvider } from './../../providers/data/data';
import { SocialSharing } from '@ionic-native/social-sharing';
@Component({
  selector: 'page-home',
  templateUrl: 'apply-leave.html'
})
export class ApplyLeave {
  fromDate: any;
  toDate: any;
  modeFrom: any;
  modeTo: any;
  leaveType: any;
  posts: any;
  overseas: boolean = false;
  visibility: boolean = false;
  continue: boolean = true;

  text = {
    "number": "",
    "message": "",
  };

  constructor(public navCtrl: NavController, private socialSharing: SocialSharing, public dataProvider: DataProvider, public http: Http, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.modeFrom = 'Full';
    this.modeTo = 'Full';
    this.leaveType = 'Please select one';

  }
  submitLeave() {
    console.log(this.fromDate);
    console.log(this.toDate);
    console.log(this.modeFrom);
    console.log(this.modeTo);
    console.log(this.leaveType);
    var check = false;
    if (this.fromDate === undefined) {
      this.showAlert("Error", "Please fill in from date");
      check = true;
    }
    if (this.leaveType === 'Please select one') {
      this.showAlert("Error", "Please select one type of leave");
      check = true;
    }
    if (!check) {
      var days = 0;
      if (this.modeFrom === 'AM' && this.modeTo === 'PM' && this.toDate !== undefined) {
        this.showConfirm("Confirmation", "Are you coming back to the office in the afternoon on " + this.fromDate + " and in the morning on " + this.toDate + "?");
      } else if (this.modeFrom === 'AM' && this.toDate !== undefined) {
        this.showConfirm("Confirmation", "Are you coming back to the office in the afternoon on " + this.fromDate + "?");
      } else if (this.modeTo === 'PM') {
        this.showConfirm("Confirmation", "Are you coming back to the office in the morning on " + this.toDate + "?");
      } else
        if (this.toDate !== undefined && this.continue) {
          days = (new Date(this.toDate).getTime() - new Date(this.fromDate).getTime()) / (1000 * 60 * 60 * 24) + 1;
          var publicHoliday = [];

          this.http.get('https://www.googleapis.com/calendar/v3/calendars/9js9gi0rl42rcervt427tf1a10@group.calendar.google.com/events?key=AIzaSyBVXQmKg9DsI69_Vm_cnbhLWzXI8jG2SSA').map(res => res.json()).subscribe(data => {
            for (let i = 0; i < data.items.length; i++) {
              if (new Date(data.items[i].start.date) >= new Date()) {
                publicHoliday.push(new Date(data.items[i].start.date));
              }
            }
            var checkDate = new Date(this.fromDate);
            console.log('number of days before: ' + days)
            //add a day to the date
            var totalDays = days;
            for (let i = 0; i < totalDays; i++) {
              if (checkDate.getDay() === 6 || checkDate.getDay() === 0) {
                days = days - 1;
              }
              checkDate.setDate(checkDate.getDate() + 1);
            }
            checkDate = new Date(this.fromDate);
            for (let i = 0; i < totalDays; i++) {
              for (let j = 0; j < publicHoliday.length; j++) {
                console.log(publicHoliday[j].getTime() + " " + checkDate.getTime())
                if (publicHoliday[j].getTime() == checkDate.getTime()) {
                  if (publicHoliday[j].getDay() !== 0 || publicHoliday[j].getDay() !== 6) {
                    days = days - 1;
                  }
                }
              }
              checkDate.setDate(checkDate.getDate() + 1)
            }

            this.posts = null;

            if (this.modeFrom !== 'Full') {
              days = days - 0.5;
            }


            if (this.modeTo !== 'Full') {
              days = days - 0.5;
            }
            console.log('number of days: ' + days)
            console.log(this.fromDate);
            console.log(this.toDate);
            console.log(this.modeFrom);
            console.log(this.modeTo);
            console.log(this.leaveType);
            this.uploadInformation("leave;\nJohn" + new Date().getTime() + "; " + this.fromDate + ";" + this.toDate + ";" + this.modeFrom + ";" + this.modeTo + ";" + this.leaveType + ";");

            this.sendSMS(days);
          })
        } else {
          if (this.modeFrom === 'Full') {
            days = 1;
          } else {
            days = 0.5;
          }
          console.log('number of days: ' + days)
          this.sendSMS(days);
        }

    }
  }

  sendSMS(days) {
var message='Good day, your staff John has taken ' + days + ' days of ' + this.leaveType + ' leave from ' + this.fromDate + ' to ' + this.toDate + '.';
    let search = new URLSearchParams();
    //search.append('ID', '95240002');
    search.append('Password', 'hello123');
    search.append('Mobile', '6592223123');
    search.append('Type', 'A');
    search.append('Message', message);
    
    // Share via email
    // Share via email
    this.socialSharing.shareViaWhatsApp(message,null,null).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
    this.http.post('https://www.commzgate.net/gateway/SendMsg', search).subscribe(res => console.log(res.json.toString()));

  }











  showAlert(main, message) {
    let alert = this.alertCtrl.create({
      title: main,
      subTitle: message,
      buttons: ['OK'],
      cssClass: 'alertCustomCss'
    });
    alert.present();
  }

  changeLeave() {
    if (this.leaveType !== 'annual') {
      this.overseas = false;
      this.visibility = false;
    }
  }
  showConfirm(main, message) {
    const confirm = this.alertCtrl.create({
      title: main,
      message: message,
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
            this.continue
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  showDOT() {
    if (!this.overseas) {
      this.visibility = false;
    } else {
      this.visibility = true;
    }
  }


  uploadInformation(text) {
    let upload = this.dataProvider.uploadToStorage(text);
    upload.then().then(res => {
      console.log('res:', res);
      this.dataProvider.storeInfoToDatabse(res.metadata).then(() => {
        let toast = this.toastCtrl.create({
          message: 'New leave request added!',
          duration: 3000
        });
        toast.present();
      })
    })
  }
}