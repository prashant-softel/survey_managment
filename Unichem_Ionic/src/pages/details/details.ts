import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoaderView } from '../../providers/loaderview';
import { ConnectServer } from '../../providers/connectserver';
import { PopoverController } from 'ionic-angular';
import { DetailsPopOver } from '../details-pop-over/details-pop-over';
import { DoctorRemarks } from '../doctor-remarks/doctor-remarks';

/**
 * Generated class for the Details page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  templateUrl: 'details.html',
})
export class Details {
	surveyDetails : {}; 
	feedbackDetails : Array<{ID : number, surveyID: number, question : string, oneStar: number, twoStar: number, threeStar: number, fourStar: number, fiveStar: number, sum : number, avg : number}>;
  
  doctorRatings : Array<{}>; 

	constructor(public navCtrl: NavController, 
				    public navParams: NavParams,
		        private loaderView : LoaderView,
		        private connectServer: ConnectServer,
            public popoverCtrl: PopoverController) 
		  {
	  	this.surveyDetails = navParams.get("details");
	  	this.feedbackDetails = [];
      this.doctorRatings = [];
      this.doctorRatings = [];
    }

	ionViewDidLoad() {
		console.log('ionViewDidLoad Details');

		this.getDetails();
	}

	getDetails(){ 
	var obj = [];
      obj['isActive'] = this.surveyDetails['isActive'];
      obj['surveyID'] = this.surveyDetails['ID'];
      obj['bool_questions'] = true;
      obj['bool_ratings'] = true;
      obj['bool_doctors'] = true;

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
                                  var tempDetails = resolve['response']['message'][0]['question'];

                                  for(var iCnt = 0; iCnt < Object.keys(tempDetails).length; iCnt++){  
                                      this.feedbackDetails.push(tempDetails[iCnt]);

                                                                           
                                      var temp2 = tempDetails[iCnt]['feedback'];
                                      
                                      this.feedbackDetails[iCnt]['oneStar'] = 0;
                                      this.feedbackDetails[iCnt]['twoStar'] = 0;
                                      this.feedbackDetails[iCnt]['threeStar'] = 0;
                                      this.feedbackDetails[iCnt]['fourStar'] = 0;
                                      this.feedbackDetails[iCnt]['fiveStar'] = 0;


                                            this.doctorRatings[iCnt] = new Array();
                                            var count2 =-1;
                                      for(var iCount= Object.keys(temp2).length-1; iCount >=0; iCount--){

                                      			if(temp2[iCount]['rating']==1)
                                      			{   this.feedbackDetails[iCnt]['oneStar']=temp2[iCount]['COUNT'];  }

                                      			if(temp2[iCount]['rating']==2)
                                      			{   this.feedbackDetails[iCnt]['twoStar']=temp2[iCount]['COUNT'];  }

                                      			if(temp2[iCount]['rating']==3)
                                      			{   this.feedbackDetails[iCnt]['threeStar']=temp2[iCount]['COUNT'];  }

                                      			if(temp2[iCount]['rating']==4)
                                      			{   this.feedbackDetails[iCnt]['fourStar']=temp2[iCount]['COUNT'];  }

                                      			if(temp2[iCount]['rating']==5)
                                      			{   this.feedbackDetails[iCnt]['fiveStar']=temp2[iCount]['COUNT'];  }

                                            var temp3 = temp2[iCount]['doctor'];
                                            

                                            for(var i = 0; i < Object.keys(temp3).length ; i++)
                                              {
                                                count2++;
                                                this.doctorRatings[iCnt][count2] = new Array();
                                                this.doctorRatings[iCnt][count2]=temp3[i];
                                                //console.log("this.doctorRatings["+iCnt+"]["+count2+"][remarks] = "+this.doctorRatings[iCnt][count2]['remarks'])
                                              }
                                                                                         
                                          }
                              this.feedbackDetails[iCnt]['sum']= this.feedbackDetails[iCnt]['oneStar'] + this.feedbackDetails[iCnt]['twoStar'] + this.feedbackDetails[iCnt]['threeStar'] + this.feedbackDetails[iCnt]['fourStar'] + this.feedbackDetails[iCnt]['fiveStar'];

                              
                              var avg = ((1*this.feedbackDetails[iCnt]['oneStar'] + 2*this.feedbackDetails[iCnt]['twoStar'] +  3*this.feedbackDetails[iCnt]['threeStar'] + 4*this.feedbackDetails[iCnt]['fourStar'] + 5*this.feedbackDetails[iCnt]['fiveStar'])/this.feedbackDetails[iCnt]['sum']).toFixed(1);
                              this.feedbackDetails[iCnt]['avg'] = +avg;

                                  if(isNaN(this.feedbackDetails[iCnt]['avg'])){
                                  this.feedbackDetails[iCnt]['avg']=0;
                                  } 
                                 
                           }
                        }
                    } 
                } 
    );
	}

	 onClick(i,ndx){
   this.navCtrl.push(DetailsPopOver, {surveyDetails : this.surveyDetails, feedbackDetails : i, doctorRatings : this.doctorRatings[ndx]});
   }

   remarkClick(){
    this.navCtrl.push(DoctorRemarks, {surveyDetails : this.surveyDetails, doctorRatings : this.doctorRatings });
   }
}
