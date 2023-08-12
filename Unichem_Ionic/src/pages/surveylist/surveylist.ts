import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Details } from '../details/details';
import { Survey } from '../survey/survey';

import { LoaderView } from '../../providers/loaderview';
import { ConnectServer } from '../../providers/connectserver';

/**
 * Generated class for the Surveylist page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  templateUrl: 'surveylist.html',
})
export class Surveylist {

	tab: string = "active";
	activeList : Array<{isActive: number ,ID: number, title: string, startDate: string, endDate: string, feedbackCount: any}>;
	completedList : Array<{isActive: number, ID: number, title: string, startDate: string, endDate: string, feedbackCount: any}>;


  constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private loaderView : LoaderView,
        private connectServer: ConnectServer) {

  	this.activeList = [];
  	this.completedList = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Surveylist');
    this.fetchSurvey();
  }

  fetchSurvey() {
      
      var obj = [];
      obj['isActive'] = 0;
      obj['surveyID'] = 0;
      obj['bool_questions'] = true;
      obj['bool_ratings'] = false;
      obj['bool_doctors'] = false;
            
     
       
      this.loaderView.showLoader('Loading');
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

                                  for(var iCnt = 0; iCnt < Object.keys(surveyDetails).length; iCnt++){
                                      surveyDetails[iCnt]['isActive'] = 0;
                                      this.activeList.push(surveyDetails[iCnt]);
                                      //console.log("Feedback count : "+surveyDetails[iCnt]['question']);

                                      /*for(var iCnt = 0; iCnt <  Object.keys(surveyDetails).length; iCnt++)
                                        {
                                      if(surveyDetails[iCnt]['status'] == 1)
                                      {
                                        this.activeList.push(surveyDetails[iCnt]);
                                      }
                                      else if(surveyDetails[iCnt]['status'] == 0)
                                      {
                                        this.completedList.push(surveyDetails[iCnt]);

                                      }    
                                  }*/
                                  }   
                              }
                          } 
                      } 
    );
    
    obj['isActive'] = 1;
    this.connectServer.getData("ViewSurveyServlet", obj).then(
          resolve => { 
                          //this.message = "";
                                  
                          if(resolve != null && resolve.hasOwnProperty('success'))
                          {
                              if(resolve['success'] == 0)
                              {
                                  //this.message = resolve['message'];                         
                              }
                              else if(resolve['success'] == 1)
                              {
                                  var surveyDetails = resolve['response']['message'];
                                  for(var iCnt = 0; iCnt <  Object.keys(surveyDetails).length; iCnt++){
                                    surveyDetails[iCnt]['isActive'] = 1;
                                    this.completedList.push(surveyDetails[iCnt]);
                                  }                                 
                              } 
                          } 
                      } 
    );
  }

  /*fetchSurvey1() {
      
      var objData = {id : 1, question : 'What do you feel about the current development in medical field ?', start : '05 May, 2017', end : '20 May, 2017', count : 50};
      this.activeList.push(objData);

      objData = {id : 2, question : 'What is your feedback about the medicine launched for curing diabeties ?', start : '01 May, 2017', end : '30 May, 2017', count : 32};
      this.activeList.push(objData);

      objData = {id : 3, question : 'Effect of pollution on human beings', start : '15 Mar, 2017', end : '30 Jun, 2017', count : 16};
      this.activeList.push(objData);

      objData = {id : 4, question : 'How was your experience regarding the seminar ?', start : '01 Apr, 2017', end : '05 Apr, 2017', count : 145};
      this.completedList.push(objData);

      objData = {id : 5, question : 'Your feedback regarding the quality of medicines', start : '15 Apr, 2017', end : '30 Apr, 2017', count : 98};
      this.completedList.push(objData);
    }*/


    viewSurveyDetails(p) {
    	//alert(p.id);
    	this.navCtrl.push(Details, {details : p});
    } 

    takeSurvey(p){
        this.navCtrl.push(Survey, {details : p});
    }

    viewResult(p){
        this.navCtrl.push(Details, {details : p});
    }

    userMgmt(){
    alert("work in progress");
    }
}
