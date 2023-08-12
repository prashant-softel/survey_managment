import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddSurvey page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  
  templateUrl: 'add-survey.html',
})
export class AddSurvey {
	insertSurvey : {};
	//insertSurvey : {title : string, description, startDate, endDate, createdBy}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.insertSurvey = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSurvey');
  }

}
