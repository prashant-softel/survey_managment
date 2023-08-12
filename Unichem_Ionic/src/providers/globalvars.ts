import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class GlobalVars {
  
  HAS_LOGGED_IN = 'hasLoggedIn';
  USER_TOKEN = "";
  USER_NAME = "";
  USER_ROLE = "2";    // 1 is for Managers & 2 is for MRs
  MENU_ARR = [];
  
  DEVICE_ID = "";

  constructor(public events: Events, public storage: Storage) {
 this.MENU_ARR= [];
    
  } 

  login(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    //this.setUserName(username);
    //this.events.publish('user:login');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  }

  setUserDetails(userToken, userName) {
    var obj = {"USER_TOKEN" : userToken, "USER_NAME" : userName};
    this.storage.set('userDetails', obj);

    this.USER_TOKEN = userToken;
    this.USER_NAME = userName;

  }

  getUserDetails() {
    return this.storage.get('userDetails').then((value) => {
      return value;
    });
  }

  clearStorage() {
      this.storage.clear();
      this.HAS_LOGGED_IN = 'hasLoggedIn';
      this.USER_TOKEN = "";
      this.USER_NAME = "";
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  setRole(role){
  this.USER_ROLE = role;
  console.log("Role : "+this.USER_ROLE)
  }

}
