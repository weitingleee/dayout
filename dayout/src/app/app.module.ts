import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { HttpModule } from '@angular/http'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TransportPage } from '../pages/transport/transport';
import { ApplyLeave } from '../pages/leave/apply-leave';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InvoicePage } from '../pages/invoice/invoice';
import { TransportOverviewPage } from '../pages/transportoverview/transportoverview';
import { InvoiceOverviewPage } from '../pages/invoiceoverview/invoiceoverview';
import { EmailComposer } from '@ionic-native/email-composer';
import { File } from '@ionic-native/file';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { DataProvider } from '../providers/data/data';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MyFilesPage } from '../pages/my-files/my-files';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';


import { LocationSelectPage } from '../pages/location-select/location-select';
import { Connectivity } from '../providers/connectivity-service/connectivity-service';
import { GoogleMaps } from '../providers/google-maps/google-maps';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
 
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
    TransportPage,
    ApplyLeave,
    InvoicePage,
    TransportOverviewPage,
    MyFilesPage,
    InvoiceOverviewPage,
    LocationSelectPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TransportPage,
    ApplyLeave,
    InvoicePage,
    TransportOverviewPage,
    MyFilesPage,
    InvoiceOverviewPage,
    LocationSelectPage,
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
    HttpClient,
    DataProvider,
    InAppBrowser,
    SocialSharing
    Connectivity,
    GoogleMaps,
    Network,
    Geolocation
  ]
})
export class AppModule { }
