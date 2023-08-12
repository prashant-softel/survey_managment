import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { AddSurvey } from '../pages/add-survey/add-survey';
import { Feedback } from '../pages/feedback/feedback';
import { Home } from '../pages/home/home';
import { Thanks } from '../pages/thanks/thanks';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Login } from '../pages/login/login';
import { Summary } from '../pages/summary/summary';
import { Survey } from '../pages/survey/survey';
import { Surveylist } from '../pages/surveylist/surveylist';
import { Details } from '../pages/details/details';
import { DetailsPopOver } from '../pages/details-pop-over/details-pop-over';
import { DoctorRemarks } from '../pages/doctor-remarks/doctor-remarks';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Ionic2RatingModule } from 'ionic2-rating';

import { GlobalVars } from '../providers/globalvars';
import { ConnectServer } from '../providers/connectserver';
import { LoaderView } from '../providers/loaderview';

@NgModule({
  declarations: [
    MyApp,
    AddSurvey,
    Feedback,
    Home,
    Thanks,
    Login,
    Dashboard,
    Summary,
    Survey,
    Surveylist,
    Details,
    DetailsPopOver,
    DoctorRemarks
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Feedback,
    Home,
    Thanks,
    Login,
    Dashboard,
    Summary,
    Survey,
    Surveylist,
    Details,
    DetailsPopOver,
    DoctorRemarks,
    AddSurvey
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GlobalVars, 
    ConnectServer, 
    LoaderView,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
