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
  apiKey: "AIzaSyA9QCeqaZeR-E5R46-Gt0x2zVnq7AYUN2E",
  authDomain: "api-project-328924746521.firebaseapp.com",
  databaseURL: "https://api-project-328924746521.firebaseio.com",
  projectId: "api-project-328924746521",
  storageBucket: "api-project-328924746521.appspot.com",
  messagingSenderId: "328924746521"
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
