import React, {Component} from 'react';

import { View, Text, Button, TouchableOpacity, Image, AsyncStorage,StyleSheet, ActivityIndicator, NativeEventEmitter} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
//import {AsyncStorage} from '@react-native-community';

//Globally Declared Styles For Screen Responsiveness
import GlobalStyles from './styles/globalStyles';



//Import Pre App Navigations
import IntroMainNav from './apps/intro/components/MainNavigator';

//Import main app interfaces
import AppDrawerNav from './apps/user/components/DrawerNavigator';


import sessionManager from './sessions/manager';

import setter from './api/setter';

import getter from './api/getter';

//import UserApp from './apps/user/index';

const styles = StyleSheet.create({
  body:{
    width:wp('100%'),
    height:hp('100%'),
  },
  activityCont:{
    position:'absolute',
    width:wp('100%'),
    height:hp('100%'),
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent:'center'
  },
  errorCont:{
    position:'absolute',
    width:wp('100%'),
    height:hp('100%'),
    backgroundColor:'rgba(0,0,0,0.2)',
    justifyContent:'center'
  },
  modalCont:{
    position:'absolute',
    width:wp('100%'),
    height:hp('100%'),
    justifyContent:'center',
    alignItems:'center'
  },
  modalOverlay:{
    position:'absolute',
    width:'100%',
    height:'100%',
    backgroundColor:'#535D6B',
    opacity:0.3
  },
  modalBox:{
    width:wp('80'),
    backgroundColor:'white',
    borderRadius:wp('5%'),
    paddingTop:hp('1%'),
    paddingBottom:hp('1%'),
  },
  modalTitle:{
    width:'100%',
    borderBottomWidth:1,
    borderColor:'#CCCCCC',
    paddingTop:hp('1%'),
    paddingBottom:hp('1%'),
    justifyContent:'center',
    alignItems:'center',
  },
  modalTitleText:{
    fontSize:wp('5%'),
    fontFamily:'Nunito-Regular',
    color:'#00255E',
  },
  modalBody:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:hp('2%'),
    paddingBottom:hp('2%'),
    paddingLeft:hp('2%'),
    paddingRight:hp('2%'),
  },
  modalSubText:{
    fontSize:wp('4%'),
    fontFamily:'Nunito-SemiBold',
    color:'#707070',
  },
  modalBoldText:{
    fontSize:wp('4.3%'),
    fontFamily:'Nunito-SemiBold',
    color:'#00255E',
  },
  btnRow:{
    display:'flex',
    flexDirection:'row',
    marginTop:hp('3%'),
  },
  ctnBtn:{
    backgroundColor:'#FFFFFF',
    borderRadius:30,
    height:50,
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    flexGrow:1,
    marginRight:wp('4%'),
    borderColor:'#FF4800',
    borderWidth:1,
  },
  btnText:{
    fontSize:wp('4.2%'),
    fontFamily:'Nunito-SemiBold',
    color:'black',
  },
});

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      userLoggedIn:this.props.userState,
      activityIndicator:false,
      networkError:{state:false,func:'',funcData:{}},
      networkLoader:false,
    };
    this.eventMaster = new NativeEventEmitter();
    this.eventListeners = [];
    this.checkServerStatus;
  }

  componentDidMount(){
    this.eventListeners[0]=this.eventMaster.addListener('appActivity',(data)=>{
      if(data.state ==1){
        this.setState({activityIndicator:true});
      }else{
        this.setState({activityIndicator:false});
      }
    });
    this.eventListeners[1] = this.eventMaster.addListener('changeAppLoggedState',(data)=>{
      if(data.state == 1){
        this.setState({userLoggedIn:true});
      }else{
        this.setState({userLoggedIn:false});
      }

    });

    this.eventListeners[2] = this.eventMaster.addListener('networkError',(data)=>{
      this.setState({networkError:{state:true,func:data.func,funcData:data.funcData}});
    })

    this.checkServer();


  }

  componentWillUnmount(){
    for(var i in this.eventListeners){
      this.eventListeners[i].remove();
    }
  }

  checkServer(){
    this.checkServerStatus = setInterval(()=>{
      getter.pingServer().then((response)=>{
        if(!response){
          this.setState({networkError:{state:true,func:'checkServer',funcData:{}},networkLoader:true});
          clearInterval(this.checkServerStatus);
        }else{
          if(this.state.networkLoader == true){
            this.setState({activityIndicator:false,networkLoader:false});
          }
        }
      });
    },1000);
  }

  retryProcess(){
    var funct = this.state.networkError.func;
    if(funct!='checkServer'){
      this.eventMaster.emit('retryNetworkFunction',{funcName:funct,funcData:this.state.networkError.funcData});
      this.setState({networkError:{state:false,func:'',funcData:{}}});
    }else{
      this.setState({activityIndicator:true});
      this.checkServer();
      this.setState({networkError:{state:false,func:'',funcData:{}}});
    }
  }

  render(){
    return(
      <View style={styles.body}>
        {(!this.state.userLoggedIn) && <IntroMainNav/>}
        {(this.state.userLoggedIn) && <AppDrawerNav/>}
        {(this.state.activityIndicator) && <View style={styles.activityCont}>
            <ActivityIndicator size="large" color="#FF4800" />
          </View>}
        {(this.state.networkError.state) && <View style={styles.errorCont}>
        <View style={styles.modalCont}>
          <View style={styles.modalOverlay}></View>
          <View style={styles.modalBox}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}> Network Error </Text>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalBoldText}>Unable to connect to network</Text>
              <View style={styles.btnRow}>
                <TouchableOpacity activeOpacity={0.7} style={styles.ctnBtn} onPress={()=>this.retryProcess()}>
                  <Text style={styles.btnText}> Retry </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
          </View>}
      </View>
    );
  }
}
