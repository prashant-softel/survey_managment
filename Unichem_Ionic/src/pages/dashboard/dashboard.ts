import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Survey } from '../survey/survey';

import { LoaderView } from '../../providers/loaderview';
import { ConnectServer } from '../../providers/connectserver'; 

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  templateUrl: 'dashboard.html',
})
export class Dashboard {

	particulars : Array<{ID: number, title: string, startDate: string, endDate: string}>;

  constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private loaderView : LoaderView,
        private connectServer: ConnectServer) {

  	this.particulars = []; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Dashboard');
    this.fetchSurvey();
  }

  fetchSurvey() {
      
      this.loaderView.showLoader('Verifying Details');

      var obj = [];
      obj['isActive'] = 0;
      obj['surveyID'] = 0;
      obj['bool_questions'] = true;
      obj['bool_ratings'] = false;
      obj['bool_doctors'] = false;
      
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
                                  var surveyDetails = resolve['response']['message'];

                                  for(var iCnt = 0; iCnt < Object.keys(surveyDetails).length; iCnt++)
                                  {
                                      this.particulars.push(surveyDetails[iCnt]);
                                  }     
                              }
                          } 
                      } 
    );
  }

  /*fetchSurvey1() {
      var objData = {ID : 1, title : 'What do you feel about the current development in medical field ?', startDate : '05 May, 2017', endDate : '20 May, 2017'};
      this.particulars.push(objData);

      objData = {ID : 2, title : 'What is your feedback about the medicine launched for curing diabeties ?', startDate : '01 May, 2017', endDate : '30 May, 2017'};
      this.particulars.push(objData);

      objData = {ID : 3, title : 'Effect of pollution on human beings', startDate : '15 Mar, 2017', endDate : '30 Jun, 2017'};
      this.particulars.push(objData);
    }*/

    viewSurvey(p) {
    	//alert(p.ID);
    	this.navCtrl.push(Survey, {details : p});
    }
}
