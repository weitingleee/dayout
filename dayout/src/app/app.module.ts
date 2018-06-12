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
import {File} from '@ionic-native/file';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ApplyLeave,
    InvoicePage,
    TransportOverviewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ApplyLeave,
    InvoicePage,
    TransportOverviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Base64ToGallery,
    File,
    EmailComposer,
    HttpModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
