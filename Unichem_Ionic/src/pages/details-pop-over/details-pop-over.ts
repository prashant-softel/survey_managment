import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailsPopOver page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  templateUrl: 'details-pop-over.html',
})
export class DetailsPopOver {
   feedbackDetails : {};
   doctorRatings : {};
   surveyDetails : {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.feedbackDetails = navParams.get("feedbackDetails");
	this.doctorRatings = navParams.get("doctorRatings");
  this.surveyDetails = navParams.get("surveyDetails");
	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPopOver');

  }

  share(){
  alert('share via mail?')
  }
}
