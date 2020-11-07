import React, {Component} from 'react';

import {AsyncStorage} from 'react-native';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      session_id:"",
      user_id:"",
    };
  }

  //Load Active User Session

  loadUserSession(){
    var keys = ['user_id'];
    let user_data;
    AsyncStorage.multiGet(keys,(err,stores)=>{
      if(stores[0][1]!=undefined){
        user_data = {};
        for(var i in keys){
          user_data[keys[i]] = stores[i][1];
        }
      }
    }).then(()=>{
      if(user_data!=undefined){
        this.setState(user_data);
      }
    });
  }

  //Check Active User Session

  hasUserSession(){
    if(this.state.user_id==""){
      return false;
    }
    return true;
  }


}
