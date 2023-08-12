import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Survey } from '../survey/survey';
import { Dashboard } from '../dashboard/dashboard';
import { Details } from '../details/details';
import { GlobalVars } from '../../providers/globalvars';
/**
 * Generated class for the Thanks page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  templateUrl: 'thanks.html',
})
export class Thanks {
	
	obj : {};
  doctorDetails : {};
   hideMR : number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public globalVars: GlobalVars) {
  
  this.obj = [];
  this.obj=navParams.get("surveyDetails"); 
  this.doctorDetails=navParams.get("doctorDetails");
  this.hideMR = 0;
    if(this.globalVars.USER_ROLE=="2"){     
      this.hideMR = 1;
    } 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Thanks');
  }

  gotoDashboard() {
  	this.navCtrl.setRoot(Dashboard);
  }
  gotoSurvey(){
    this.navCtrl.setRoot(Survey, {details : this.obj});
  }
  viewResults(){
  this.obj['isActive']=0;
  this.navCtrl.push(Details, {details : this.obj})
  }

}
