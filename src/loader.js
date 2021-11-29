import React, {Component} from 'react';

import {View, Text, Image, StyleSheet,StatusBar, Dimensions, NativeEventEmitter} from 'react-native';

//Import Session Manager
import sessionManager from './sessions/manager';


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
    this.eventMaster = new NativeEventEmitter();
    this.eventListener;
  }

  componentDidMount(){
    this.checkUserSession();
  }

  componentWillUnmount(){
    //this.eventListener.remove();
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
      setTimeout(()=>{
        this.setReadyState();
      },200);
    }
  }

  setReadyState = ()=>{
    this.setState({
      appReady:true
    });
  }

  async checkUserSession(){
    var stat = await sessionManager.hasUserSession();
    if(stat){
      this.setState({
        userLoggedIn:true,
      });
    }
    setTimeout(()=>{
      this.setIconsLoadedState();
    },200);
  }
//{<Intro setReadyState={()=>that.setReadyState()}/>}
  render(){
    var that = this;
    return(
      <View>
        <StatusBar backgroundColor="#FF4800" barStyle={"light-content"} />
        {((!this.state.appReady)&&(!this.state.iconsLoaded))&&<Splash/>}
        {((this.state.appReady)&&(this.state.iconsLoaded))&&<AppAccess userState={this.state.userLoggedIn}/>}
      </View>
    );
  }

}
