import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Feedback } from '../feedback/feedback';
import { LoaderView } from '../../providers/loaderview';
import { GlobalVars } from '../../providers/globalvars';
import { ConnectServer } from '../../providers/connectserver';
/**
 * Generated class for the Survey page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  templateUrl: 'survey.html',
})
export class Survey {
   message : any;
	userData: {Code : any};
  doctorDetails : {};
  surveyDetails : {};
  surveyID : number;
  doctorID : number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private globalVars: GlobalVars,
              private connectServer: ConnectServer,
              private loaderView : LoaderView) {

  	this.userData = {Code : ""}; 
    this.surveyDetails = navParams.get("details");
    this.doctorDetails = [];
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Survey');
  }

  fetchDetails() {
    this.message = "";
        if(this.userData.Code.length == 0)
        {
            this.message = "Please Enter Registration No.";
        }
         else
        {
            this.loaderView.showLoader('Verifying details');
            this.connectServer.getData('DoctorServlet/select' ,this.userData ).then(
                resolve => { 
                                this.message = "";
                                this.loaderView.dismissLoader();
                                        
                                if(resolve != null && resolve.hasOwnProperty('success'))
                                {
                                    if(resolve['success'] == 0)
                                    {
                                        this.message ="Enter Valid Registration No.";

                                    }
                                    else if(resolve['success'] == 1)
                                    {
                                        this.doctorDetails = resolve['response']['message'][0];
                                       
                                        this.doctorID = this.doctorDetails['ID'];
                                        this.surveyID = this.surveyDetails['ID'];
                                        var obj = [];
                                        obj['surveyid'] = this.surveyID;
                                        obj['doctorid'] = this.doctorID ;
                                        obj['question'] = "[]";
                                        obj['remarks'] = "";
                                        this.connectServer.getData("FeedbackServlet/check", obj).then(
                                        resolve => { 
                                                            console.log("in feedback servlet")      
                                                          if(resolve != null && resolve.hasOwnProperty('success'))
                                                          {
                                                             console.log("suCCess"+resolve['success'])
                                                              if(resolve['success'] == 0)
                                                              {
                                                                  //this.message = resolve['response']['message'];
                                                                  this.navCtrl.push(Feedback, {details : this.doctorDetails, surveyDetails : this.surveyDetails, showStar : 0});                     
                                                              }
                                                              else if(resolve['success'] == 1)
                                                              {
                                                                 //this.message = resolve['message'];

                                                                 this.navCtrl.push(Feedback, {details : this.doctorDetails, surveyDetails : this.surveyDetails, showStar : 1});
                                                              }
                                                          } 
                                                      } 
                                         ); 
                                    }
                                } 
                            }
                          );
            }	
  	}
}
