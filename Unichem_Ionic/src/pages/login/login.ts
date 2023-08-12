import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { GlobalVars } from '../../providers/globalvars';
import { ConnectServer } from '../../providers/connectserver';
import { LoaderView } from '../../providers/loaderview';


import { Surveylist } from '../surveylist/surveylist';
import { Survey } from '../survey/survey';
import { Dashboard } from '../dashboard/dashboard';
import { Summary } from '../summary/summary';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  templateUrl: 'login.html',
})
export class Login {
	
  message : any;
	userData : {Email: string, Password: any};
	showLogin : any;

  	constructor(
            public navCtrl: NavController, 
            public navParams: NavParams,
            private globalVars: GlobalVars,
            private connectServer: ConnectServer,
            private loaderView : LoaderView,
            public toastCtrl: ToastController) {

  		  this.showLogin = true;
  		  this.userData = {Email : "", Password : ""};
  	}

    ionViewDidLoad() {
      //this.verifyToken();
    }

  	verifyToken() {

        this.loaderView.showLoader('Initializing App ...');

        this.globalVars.getUserDetails().then(
          value => {
                        if(value != null && value.hasOwnProperty('USER_TOKEN') && value.hasOwnProperty('USER_NAME'))
                        {
                            this.globalVars.setUserDetails(value.USER_TOKEN, value.USER_NAME);

                            var objdataRefresh = [];
                            objdataRefresh['token'] =  value.USER_TOKEN;
                            objdataRefresh['grant_type'] = "refresh_token";
                            objdataRefresh['device'] = this.globalVars.DEVICE_ID;

                            this.connectServer.login(objdataRefresh).then(
                                resolve => { 
                                                this.message = "";
                                                this.loaderView.dismissLoader();
                                                console.log(resolve);         
                                                if(resolve != null && resolve.hasOwnProperty('success'))
                                                {
                                                    if(resolve['success'] == 0)
                                                    {
                                                        this.message = resolve['message'];                         
                                                    }
                                                    else if(resolve['success'] == 1)
                                                    {
                                                      this.navCtrl.setRoot(Surveylist);
                                                    }
                                                } 
                                            }
                          );
                        }
                        else
                        {
                            this.loaderView.dismissLoader();
                            this.showLogin = true;
                        }
                    }
        );

    }

    reinitializeData() {
        
        this.loaderView.showLoader('Initializing App');

        this.globalVars.getUserDetails().then(
          value => {
                        this.loaderView.dismissLoader();
                        if(value != null && value.hasOwnProperty('USER_TOKEN') && value.hasOwnProperty('USER_NAME'))
                        {
                            this.globalVars.setUserDetails(value.USER_TOKEN, value.USER_NAME);
                            console.log("inlogin user role : "+this.globalVars.USER_ROLE)
                            if(this.globalVars.USER_ROLE=="1"){     
                            this.navCtrl.setRoot(Surveylist);
                            }
                            else{ 
                            this.goToSurvey();
                            }
                            this.showLogin = false;
                        }
                        else
                        {
                            this.showLogin = true;
                        }
                    }
        );
    }
    
    signin() {

        this.message = "";
        if(this.userData.Email.length == 0 || this.userData.Password.length == 0)
        {
            this.message = "Please enter Username and Password";
            //this.presentToast();
        }
        else
        {
            this.loaderView.showLoader('Verifying Details');
            //var serverResponse = [];

            //this.message = "Verifying Details. Please Wait ...";  
            this.connectServer.login(this.userData).then(
                resolve => { 
                                this.message = "";
                                this.loaderView.dismissLoader();
                                        
                                if(resolve != null && resolve.hasOwnProperty('success'))
                                {
                                    if(resolve['success'] == 0)
                                    {
                                        this.message = "Enter valid User ID and Password";

                                    }
                                    else if(resolve['success'] == 1)
                                    {
                                        this.globalVars.setUserDetails(resolve['response']['token'], resolve['response']['name']);
                                        if(resolve['response']['name']==="Devendra Morajkar")
                                        { this.globalVars.setRole(1);
                                        this.globalVars.MENU_ARR = [
                                        { title: 'All Survey', component: Surveylist },
                                          { title: 'Dashboard', component: Dashboard },
                                          { title: 'Summary', component: Summary }
                                           ];
                                         }
                                        else {
                                        this.globalVars.setRole(2);
                                        this.globalVars.MENU_ARR = [];
                                        }
                                        setTimeout(() => {
                                          this.loaderView.dismissLoader();
                                          this.reinitializeData();
                                        }, 2000);
                                        
                                    }
                                    
                                } 
                            } 
          );
        }
    }

    goToSurvey(){
    this.loaderView.showLoader('Verifying Details');

      var obj = [];
      obj['isActive'] = 0;
      obj['surveyID'] = 1;
      obj['bool_questions'] = true;
      obj['bool_ratings'] = false;
      obj['bool_doctors'] = false;
      var surveyDetails = {};
      
      
      this.connectServer.getData("ViewSurveyServlet", obj).then(
          resolve => { 
                          //this.message = "";
                          this.loaderView.dismissLoader();
                                  
                          if(resolve != null && resolve.hasOwnProperty('success'))
                          {
                              if(resolve['success'] == 0)
                              {
                                  //this.message = resolve['message'];                         
                              }
                              else if(resolve['success'] == 1)
                              {
                                  surveyDetails = resolve['response']['message'][0];  
                                  this.navCtrl.setRoot(Survey, {details : surveyDetails});   
                              }
                          } 
                      } 
    );
    
    }

   /* presentToast() {
    let toast = this.toastCtrl.create({
      message: this.message,
      duration: 3000
    });
    toast.present();
  }*/
}

