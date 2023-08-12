import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DoctorRemarks page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  templateUrl: 'doctor-remarks.html',
})
export class DoctorRemarks {

  surveyDetails : {};
  doctorRatings : {};
  doctors : Array<{}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.surveyDetails = navParams.get("surveyDetails");
		this.doctorRatings = navParams.get("doctorRatings");
		this.doctors =[[]];
    this.fetchDetails();
  }

  ionViewDidLoad() { 
    console.log('ionViewDidLoad DoctorRemarks');
  }

  fetchDetails(){
     
     for(var j=0; j < Object.keys(this.doctorRatings[0]).length; j++){
        this.doctors[j]=[];
     }
    for(var i = 0; i < Object.keys(this.doctorRatings).length; i++){
    
    	for(var j=0; j < Object.keys(this.doctorRatings[i]).length; j++){
        this.doctors[j][i] = this.doctorRatings[i][j];

        //console.log(this.doctors[j][i]);//['name']+this.doctors[j][i]['rating']+this.doctors[j][i]['remarks'])
        //console.log(this.doctors)
      }
    }

    //console.log(this.doctors);
      
  }
  
  share(){
  alert('share via mail?')
  }

}
