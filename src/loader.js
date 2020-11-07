import React, {Component} from 'react';

import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

//Import Session Manager
import Session from './sessions/manager';

const sessionManager = new Session;


//SplashScreen
import Splash from './splash';

//Intro component to check application state
import AppAccess from './AppAccess.js';

//Import FortAwesome Icon Pack
import {library} from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

export default class Loader extends Component{
  constructor(props){
    super(props);
    this.state = {
      userLoggedIn:false,
      appReady:false,
      iconsLoaded:false,
    };
    library.add(fas,fab);
    this.checkUserSession();

  }
  //Set app ready state and hide splash screen
  setIconsLoadedState = ()=>{
    if(library.definitions == {}){
      setTimeout(()=>{
        this.setIconsLoadedState();
      },100);
    }else{
      this.setState({
        iconsLoaded:true,
      });
      /*setTimeout(()=>{
        this.setReadyState();
      },8000);*/
    }
  }

  setReadyState = ()=>{
    this.setState({
      appReady:true
    });
  }

  checkUserSession = ()=>{
    if(sessionManager.hasUserSession()){
      this.setState({
        userLoggedIn:true,
      });
    }
    setTimeout(()=>{      
      this.setIconsLoadedState();
    },4000);
  }
//{<Intro setReadyState={()=>that.setReadyState()}/>}
  render(){
    var that = this;
    return(
      <View>
        {((!this.state.appReady)&&(!this.state.iconsLoaded))&&<Splash/>}
        {((this.state.appReady)&&(this.state.iconsLoaded))&&<AppAccess userState={this.state.userLoggedIn}/>}
      </View>
    );
  }

}
