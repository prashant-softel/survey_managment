import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ConnectServer } from '../../providers/connectserver';
import { LoaderView } from '../../providers/loaderview';
import { Thanks } from '../thanks/thanks';
import { Survey } from '../survey/survey';
import { Surveylist } from '../surveylist/surveylist';
import { Dashboard } from '../dashboard/dashboard';
import { GlobalVars } from '../../providers/globalvars';

/**
 * Generated class for the Feedback page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  templateUrl: 'feedback.html',
})
export class Feedback {
    //details array is doctor's details
	  details : Array<{ID:number, regNo: number, degreeID: number, specializationID: number, name: string, location: string}>;
    surveyDetails : {};
    particulars : Array<{ID: number, question: string, rating: number}>;
    count : number = 0; 
    message : any;
    showStar : number;
    hideMR : number;
    remarks : any;
    
  	constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                private loaderView : LoaderView,
                private connectServer: ConnectServer,
                public globalVars: GlobalVars)
         {
       this.particulars = [];
      this.details = [];
      this.surveyDetails = [];
      this.surveyDetails = navParams.get("surveyDetails");
      this.details = navParams.get("details");
      this.showStar= navParams.get("showStar");
      this.remarks = "";
      this.hideMR = 0;
    if(this.globalVars.USER_ROLE=="2"){     
      this.hideMR = 1;
    }
      console.log(this.showStar)

  	}
    

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad Feedback');
      this.fetchSurvey();     
  	}

    fetchSurvey(){
      
      this.loaderView.showLoader('Loading');
      var obj = [];
      obj['isActive'] = 0;
      obj['surveyID'] = this.surveyDetails['ID'];
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
                                  var surveyQuestions = resolve['response']['message'][0]['question'];
                                  this.count = Object.keys(surveyQuestions).length;

                                 for(var iCnt = 0; iCnt < Object.keys(surveyQuestions).length; iCnt++)
                                  {
                                      var objData = {ID : surveyQuestions[iCnt]['ID'], question : surveyQuestions[iCnt]['question'], rating : 0};
                                       this.particulars.push(objData);
                                  }  
                              }
                          } 
                      } 
    );

    }

    /*fetchSurvey1() {
       var objData = {id : 1, question : 'This is question 1 of the survey. Please provide your ratings.', rating : 0};
      this.particulars.push(objData);

      objData = {id : 2, question : 'This is question 2 of the survey. Please provide your ratings.', rating : 0};
      this.particulars.push(objData);

      objData = {id : 3, question : 'This is question 3 of the survey. Please provide your ratings.', rating : 0};
      this.particulars.push(objData);
    }*/

  	submitFeedback() {
     var flag = 'true';
     var jsonStr : any = "";
       for(var iCnt = 0; iCnt < this.count; iCnt++)
          {
             if(this.particulars[iCnt]['rating'] == 0)
             {
             this.message = "Review All Questions!";
             flag = 'false';
             break;
             }
              if(jsonStr!=""){
                jsonStr+= ","
              }
          jsonStr += JSON.stringify(this.particulars[iCnt]);
          }

        if(flag == 'true'){  
        var obj = [];
        obj['surveyid'] = this.surveyDetails['ID'];
        obj['doctorid'] = this.details['ID'] ;
        obj['remarks'] = this.surveyDetails['remarks'];
        obj['question'] = "["+jsonStr+"]";

        this.connectServer.getData("FeedbackServlet/insert", obj).then(
        resolve => { 
                          //this.message = "";
                          //this.loaderView.dismissLoader();
                                  
                          if(resolve != null && resolve.hasOwnProperty('success'))
                          {
                              if(resolve['success'] == 0)
                              {
                                  this.message = resolve['response']['message']; 
                                                       
                              }
                              else if(resolve['success'] == 1)
                              {
                                 this.message = resolve['message'];
                                 console.log(obj['remarks']);
                                
                                 this.navCtrl.setRoot(Thanks,  {surveyDetails : this.surveyDetails, doctorDetails : this.details});
                              }
                          } 
                      } 
        
         );		      
        }
  	}

  	onModelChange(event) {
    }

    gotoSurveylist() {
    this.navCtrl.setRoot(Surveylist);
    }
    gotoSurvey(){
      this.navCtrl.setRoot(Survey, {details : this.surveyDetails});
    }
}