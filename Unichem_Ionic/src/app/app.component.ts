import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { Login } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Surveylist } from '../pages/surveylist/surveylist';
import { Summary } from '../pages/summary/summary';
import { AddSurvey } from '../pages/add-survey/add-survey';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GlobalVars } from '../providers/globalvars';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = Login;
  pages: Array<{title: string, component: any}>;
  hideMR : number;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen, 
    public globalVars: GlobalVars
  ) {
    this.initializeApp();
    
    // set our app's pages
    
  /*  this.pages = [
      { title: 'Dashboard', component: Dashboard },
      { title: 'All Survey', component: Surveylist },
      { title: 'Summary', component: Summary }
      //,{ title: 'Add Survey', component: AddSurvey}
    ];
*/



    
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
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  logout() {
      this.globalVars.clearStorage();
      this.nav.setRoot(Login); 
  }
}
