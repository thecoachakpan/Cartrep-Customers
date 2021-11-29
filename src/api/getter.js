import React, {Component} from 'react';

import axios from 'axios';

import {NativeEventEmitter} from 'react-native';
import qs from 'qs';

import sessionManager from '../sessions/manager';

const baseUrl = "https://cartrep.com/app/client/";

class App extends Component{
  constructor(props){
    super(props);
    this.state = {

    };
    this.eventMaster = new NativeEventEmitter();

  }

  componentDidMount(){

  }

  componentWillUnmount(){
    for(var i in this.eventListeners){
      this.eventListeners[i].remove();
    }
  }

  async pingServer(){
    return await axios.post(baseUrl+'pinger.php',qs.stringify({

    })).then((response)=>{
      return true;
    }).catch((error)=>{
      return false;
    });
  }


  async getUser(uid){
    return await axios.post(baseUrl+'getUser.php',qs.stringify({
      uid:uid,
    })).then((response)=>{

      if(response.data.error!=1){
        var user  = response.data.userdata;
        return sessionManager.setUserSession(user.uid,user.first_name,user.last_name,user.email,user.phone,user.address,user.area,user.landmark,'').then(()=>{
          return response.data.userdata;
        });;
      }
    }).catch((error)=>{

    });
  }

  async getOrder(oid){
    return await axios.post(baseUrl+'getOrder.php',qs.stringify({
      orderId:oid,
    })).then((response)=>{
      if(response.data.error!=1){
        return response.data.order;
      }
    }).catch((error)=>{

    });
  }

  async getOrderHistory(uid){
    return await axios.post(baseUrl+'getOrderHistory.php',qs.stringify({
      uid:uid,
    })).then((response)=>{
      if(response.data.error!=1){
        for(var i in response.data.orders){
          response.data.orders[i]['key'] = response.data.orders[i].id;
        }
        return response.data.orders;
      }
    }).catch((error)=>{
      return false;
    });
  }

  async getSavedCards(uid){
    return await axios.post(baseUrl+'getSavedCards.php',qs.stringify({
      uid:uid,
    })).then((response)=>{
      if(response.data.error!=1){
        for(var i in response.data.cards){
          response.data.cards[i]['key'] = response.data.cards[i].id;
        }
        return response.data.cards;
      }
    }).catch((error)=>{
      return false;
    });
  }

}

const getter = new App;

export default getter;
