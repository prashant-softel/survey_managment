import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ConnectServer } from '../../providers/connectserver';
import { LoaderView } from '../../providers/loaderview';
/**
 * Generated class for the Summary page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  templateUrl: 'summary.html',
})
export class Summary {
	activeCount : number;
	completedCount : number;
	totalCount : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loaderView : LoaderView, private connectServer: ConnectServer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Summary');
    this.countSurvey();
  }

  countSurvey(){
   var obj = [];
      obj['isActive'] = 0;
      obj['surveyID'] = 0;
      obj['bool_questions'] = true;
      obj['bool_ratings'] = false;
      obj['bool_doctors'] = false;
            
      this.loaderView.showLoader('Loading');
      
      //this.message = "Verifying Details. Please Wait ...";  
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
                                  this.activeCount = Object.keys(surveyDetails).length;
                              }
                          } 
                      } 
    );
    obj['isActive'] = 1;
    this.connectServer.getData("ViewSurveyServlet", obj).then(
          resolve => { 
                         
                                  
                          if(resolve != null && resolve.hasOwnProperty('success'))
                          {
                              if(resolve['success'] == 0)
                              {
                                  //this.message = resolve['message'];                         
                              }
                              else if(resolve['success'] == 1)
                              {
                                  var surveyDetails = resolve['response']['message'];
                                  this.completedCount = Object.keys(surveyDetails).length;
                              }
                          } 
                      } 
    );
    obj['isActive'] = 2;
    this.connectServer.getData("ViewSurveyServlet", obj).then(
          resolve => { 
                         
                                  
                          if(resolve != null && resolve.hasOwnProperty('success'))
                          {
                              if(resolve['success'] == 0)
                              {
                                  //this.message = resolve['message'];                         
                              }
                              else if(resolve['success'] == 1)
                              {
                                  var surveyDetails = resolve['response']['message'];
                                  this.totalCount = Object.keys(surveyDetails).length;
                              }
                          } 
                      } 
    );
  }

}
