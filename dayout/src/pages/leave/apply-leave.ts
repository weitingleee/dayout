import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

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
  text = {
    "number": "",
    "message": "",
  };

  constructor(public navCtrl: NavController, public http: Http, private alertCtrl: AlertController) {
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
      if (this.modeFrom === 'AM' && this.modeTo==='PM' && this.toDate!==undefined) {
        this.showConfirm("Confirmation", "Are you coming back to the office in the afternoon on " + this.fromDate + " and in the morning on " + this.toDate+"?" );
      }else if (this.modeFrom === 'AM' && this.toDate !== undefined) {
        this.showConfirm("Confirmation", "Are you coming back to the office in the afternoon on " + this.fromDate + "?");
      } else if (this.modeTo === 'PM') {
        this.showConfirm("Confirmation", "Are you coming back to the office in the morning on " + this.toDate + "?");
      }
      if (this.toDate !== undefined) {
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
        })
      } else {
        if (this.modeFrom === 'Full') {
          days = 1;
        } else {
          days = 0.5;
        }
        console.log('number of days: ' + days)
      }

    }
  }
  sendSMS() {

    let search = new URLSearchParams();
    search.append('ID', '95270002');
    search.append('Password', 'hello123');
    search.append('Mobile', '6592223123');
    search.append('Type', 'A');
    search.append('Message', 'Your staff John has taken ' + + 'days of ' + this.leaveType);

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

  showConfirm(main, message) {
    const confirm = this.alertCtrl.create({
      title: main,
      message: message,
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
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
}