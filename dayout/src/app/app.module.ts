import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { HttpModule } from '@angular/http'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ApplyLeave } from '../pages/leave/apply-leave';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InvoicePage } from '../pages/invoice/invoice';
import { TransportOverviewPage } from '../pages/transportoverview/transportoverview';
import { EmailComposer } from '@ionic-native/email-composer';
import { File } from '@ionic-native/file';
import { Dropbox } from '../providers/dropbox/dropbox';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { DataProvider } from '../providers/data/data';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MyFilesPage } from '../pages/my-files/my-files';
import { InAppBrowser } from '@ionic-native/in-app-browser';

var firebaseConfig = {
  apiKey: "AIzaSyBl7eQs9iH4hYjRX6mWC-6y8T8zspnjGh0",
  authDomain: "sonic-glazing-206502.firebaseapp.com",
  databaseURL: "https://sonic-glazing-206502.firebaseio.com",
  projectId: "sonic-glazing-206502",
  storageBucket: "sonic-glazing-206502.appspot.com",
  messagingSenderId: "870662456368"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ApplyLeave,
    InvoicePage,
    TransportOverviewPage,
    MyFilesPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ApplyLeave,
    InvoicePage,
    TransportOverviewPage,
    MyFilesPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Base64ToGallery,
    File,
    EmailComposer,
    HttpModule,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Dropbox,
    HttpClient,
    DataProvider,
    InAppBrowser
  ]
})
export class AppModule { }
