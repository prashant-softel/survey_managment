import { Injectable } from '@angular/core';
//import { Http, RequestOptions, Headers } from '@angular/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { GlobalVars } from '../providers/globalvars';

@Injectable()
export class ConnectServer {
  
  serverURL: string;

  constructor(
    public http: Http,
    private globalVars : GlobalVars ) {

        //this.serverURL = "http://bizlofeedbackapp.com:8080/Mobile/";
        this.serverURL = "http://ec2-35-154-33-204.ap-south-1.compute.amazonaws.com:8080/Unichem_web/";
        //this.serverURL = "http://192.169.1.101:8089/Unichem_web/";
         //this.serverURL = "http://192.168.225.104:8089/Unichem_web/";
        
    }

  login(objData) {
      return new Promise(resolve => {
        
        objData['device'] = this.globalVars.DEVICE_ID;
        var sURL = this.serverURL + "Login" + this.generateQueryString(objData);
        
        this.http.get(sURL)
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
        }, error => {
            alert("We are unable to connect to our servers. Please try after some time.");
            var objResponse = [];
            objResponse['success'] = -1;
            resolve(objResponse);
            //console.log(JSON.stringify(error.json()));
        });
    });
  }

  getData(scriptName, objData) {
      return new Promise(resolve => {

        if(objData == null)
        {
          objData = [];
        }
        
        objData['token'] =  this.globalVars.USER_TOKEN;
                
        var sURL = this.serverURL + scriptName + this.generateQueryString(objData);
        this.http.get(sURL)
          .map(res => res.json())
          .subscribe(data => {
            //alert('Received : ' + data['success']);
            console.log(data);
            if(data['success'] == 498)
            {
                //alert(data['response']['message']);
                if(data['response']['message'] == 'Expired')
                {
                    //this.refreshToken(fileURL, objData);
                }
            }
            else
            {
                resolve(data);
            }
          }, error => {
            alert("We are unable to connect to our servers. Please try after some time.");
            var objResponse = [];
            objResponse['success'] = -1;
            resolve(objResponse);
            //console.log(JSON.stringify(error.json()));
          });
    });
  }

  postData() {
    this.http.post("https://httpbin.org/post", "firstname=Nic")
        .subscribe(data => {
            
        }, error => {
            console.log(JSON.stringify(error.json()));
        });
  } 

  generateQueryString(objData) {

    var sQueryString = "";
    if(Object.keys(objData).length > 0)
    {
      for(var i = 0; i < Object.keys(objData).length; i++)
      {
        var sData = (Object.keys(objData)[i] + '=' + objData[Object.keys(objData)[i]]);
        sQueryString += sData + '&';
      }
      sQueryString += "v=0.9.170504";

      if(sQueryString.length > 0)
      {
        sQueryString = "?" + sQueryString;
      }
    }

    return sQueryString;
  }

  

}
 