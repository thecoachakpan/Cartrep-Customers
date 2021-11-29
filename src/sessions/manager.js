import React, {Component} from 'react';

import {AsyncStorage} from 'react-native';

class Manager extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
    this.userdata = {};
  }


  // Get active session user_data

  getUserData(){
    return this.userdata;
  }

  //Set Logged User session

  async setUserSession(uid,fname,lname,email,phone,address,area,landmark,lastLogged){
    return await AsyncStorage.multiSet([
      ['uid',uid],
      ['firstName',fname],
      ['lastName',lname],
      ['email',email],
      ['phone',phone],
      ['address',address],
      ['area',area],
      ['landmark',landmark],
      ['lastLogged',lastLogged],

    ]).then(()=>{
      this.loadUserSession();
      return true;
    }).catch((error)=>{
      return false;
    });
  }

  //Load Active User Session

  async loadUserSession(){
    var keys = ['uid','firstName','lastName','email','phone','address','area','landmark','lastLogged'];
    let userdata;
    return await AsyncStorage.multiGet(keys,(err,stores)=>{
      if(stores[0][1]!=undefined){
        userdata = {};
        for(var i in keys){
          userdata[keys[i]] = stores[i][1];
        }
      }
    }).then(()=>{
      if(userdata!=undefined){
        this.userdata = userdata;
        return userdata;
      }else{
        return false;
      }
    });
  }

  //Check Active User Session

  async hasUserSession(){
    return await this.loadUserSession();
  }


}

const manager = new Manager;

export default manager;
