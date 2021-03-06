import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserPage } from '../pages/userpage/userpage';
import { SignupPage } from '../pages/signup/signup';

import { AuthService } from '../services/authservice';

import { NFC, Ndef } from '@ionic-native/nfc';
import { Hotspot } from '@ionic-native/hotspot';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserPage,
    SignupPage
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    NFC,
    Ndef,
    Hotspot,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
