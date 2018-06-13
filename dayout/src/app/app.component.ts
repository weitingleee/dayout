import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TransportPage } from '../pages/transport/transport';
import { ApplyLeave } from '../pages/leave/apply-leave';
import { InvoicePage } from '../pages/invoice/invoice';
import { TransportOverviewPage } from '../pages/transportoverview/transportoverview';
import { MyFilesPage } from '../pages/my-files/my-files';
import {InAppBrowser} from '@ionic-native/in-app-browser';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Transport', component: TransportPage },
      { title: 'Leave', component: ApplyLeave },
      { title: 'Invoice', component: InvoicePage },
      { title: 'Transport Overview', component: TransportOverviewPage },
      { title: 'My Files', component: MyFilesPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
