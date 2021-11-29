import React, {Component} from 'react';

import axios from 'axios';

import qs from 'qs';


const baseUrl = "https://cartrep.com/app/client/";
class App extends Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }

  async registerUser(uid,firstName,lastName,phone,email,address,area,landmark){
    return await axios.post(baseUrl+'registerUser.php',qs.stringify({
      uid:uid,
      fname:firstName,
      lname:lastName,
      phone:phone,
      email:email,
      address:address,
      area:area,
      landmark:landmark,
    })).then((response)=>{
      if(response.data.error!=1){
        return response.data;
      }
    }).catch((error)=>{

    });
  }


  async editProfile(data){
    return await axios.post(baseUrl+'editProfile.php',qs.stringify({
      uid:data.uid,
      fname:data.firstName,
      lname:data.lastName,
      address:data.address,
      area:data.area,
      landmark:data.landmark,
    })).then((response)=>{
      if(response.data.error!=1){
        return response.data;
      }
    }).catch((error)=>{

    });
  }


  async openOrder(data){
    return await axios.post(baseUrl+'openNewOrder.php',qs.stringify(data)).then((response)=>{
      if(response.data.error!=1){
        return response.data;
      }
    }).catch((error)=>{

    });
  }

  async addCard(data){
    return await axios.post(baseUrl+'addNewCard.php',qs.stringify(data)).then((response)=>{
      if(response.data.error!=1){
        return response.data;
      }
    }).catch((error)=>{

    });
  }


  async refreshOrderState(data){
    return await axios.post(baseUrl+'refreshOrderState.php',qs.stringify(data)).then((response)=>{
      if(response.data.error!=1){
        return response.data;
      }
    }).catch((error)=>{

    });
  }

  async keepOrderAlive(oid){
    return await axios.post(baseUrl+'keepOrderAlive.php',qs.stringify({oid:oid})).then((response)=>{
      if(response.data.error!=1){
        return response.data;
      }
    }).catch((error)=>{

    });
  }

  async cancelOrder(data){
    return await axios.post(baseUrl+'cancelOrder.php',qs.stringify(data)).then((response)=>{
      if(response.data.error!=1){
        return response.data;
      }
    }).catch((error)=>{

    });
  }

  async submitOrderPayment(data){
    return await axios.post(baseUrl+'submitOrderPayment.php',qs.stringify(data)).then((response)=>{
      if(response.data.error!=1){
        return response.data;
      }
    }).catch((error)=>{

    });
  }

}

const poster = new App;

export default poster;
