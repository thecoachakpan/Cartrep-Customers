import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image, TextInput, ScrollView, KeyboardAvoidingView} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import { WebView } from 'react-native-webview';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const styles = StyleSheet.create({
  body:{
    width:wp('100%'),
    height:hp('100%'),
    paddingTop:hp('3%'),
    paddingBottom:hp('4%'),
    paddingLeft:wp('6%'),
    paddingRight:wp('6%'),
    backgroundColor:'#f5f5f5',
  },
  headerArea:{
    width:wp('90%'),
    height:hp('6%'),
    marginLeft:'auto',
    marginRight:'auto',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  headingText:{
    fontSize:wp('5.5%'),
    fontFamily:'Nunito-SemiBold',
    color:'#00255E',
    flexGrow:6,
    textAlign:'center',
  },
  notifyIcon:{
    flexGrow:2,
    justifyContent:'center',
    alignItems:'center',
  },
  subText:{
    fontSize:wp('4.3%'),
    fontFamily:'Nunito-Regular',
    color:'#707070',
    marginTop:5,
  },
  pageCont:{
    width:wp('90%'),
    height:hp('60%'),
    alignItems:'center',
  },
  subHeading:{
    fontSize:wp('4.5%'),
    fontFamily:'Nunito-Regular',
    color:'#707070',
    marginTop:5,
  },
  itemCard:{
    width:wp('87%'),
    paddingTop:hp('2%'),
    paddingBottom:hp('2%'),
    paddingLeft:wp('3.5%'),
    paddingRight:wp('3.5%'),
    backgroundColor:'white',
    marginTop:hp('2%'),
    elevation:2,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    borderRadius:4,
  },
  row:{
    display:'flex',
    flexDirection:'row',
  },
  supportCont:{
    marginTop:hp('2%'),
    justifyContent:'center',
    alignItems:'center',
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
    opacity:0.7
  },
  modalBox:{
    width:wp('90'),
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
    borderColor:'black',
    borderWidth:1,
  },
  btnText:{
    fontSize:wp('4.2%'),
    fontFamily:'Nunito-SemiBold',
    color:'black',
  },
  ctnBtn2:{
    backgroundColor:'#FF4800',
    borderRadius:30,
    height:50,
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    flexGrow:1,
    marginRight:wp('4%'),
  },
  btnText2:{
    fontSize:wp('4.2%'),
    fontFamily:'Nunito-SemiBold',
    color:'white',
  },
  touchArea:{
    paddingTop:hp('2%'),
    paddingBottom:hp('2%'),
    paddingLeft:hp('2%'),
    paddingRight:hp('2%'),
    marginLeft:-(hp('1.5%'))
  }
});
export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      terms:false,
    };
    this.webview;
  }

  continueProcess(){
    this.props.navigation.navigate('ConfirmRide',{});
  }

  goBack(){
    this.props.navigation.goBack();
  }

  render(){
    return(
        <SafeAreaView style={styles.body}>
          <View style={styles.headerArea}>
            <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()} style={styles.touchArea}>
              <Image source={require('../../../assets/images/icons/menu.png')} style={{width:wp('5%'),height:wp('5%')}} resizeMode={"contain"} />
            </TouchableOpacity>
            <Text style={styles.headingText}> Settings </Text>
            <TouchableOpacity style={styles.notifyIcon}>
              <Image source={require('../../../assets/images/icons/notify.png')} style={{width:'50%',height:'50%'}} resizeMode={"contain"} />
            </TouchableOpacity>
          </View>
            <View style={styles.pageCont}>
              <TouchableOpacity onPress={()=>{this.setState({terms:true})}}>
                <View style={styles.itemCard}>
                  <Text style={styles.subText}> Terms of use </Text>
                </View>
              </TouchableOpacity>

              <View style={styles.supportCont}>
                <Text style={{ ...styles.subHeading, ...{color:'#FF4800'}}}> Need Help? </Text>
                <View style={{...styles.row, ...{marginTop:hp('1%')}}}>
                  <Text style={styles.subText}> Contact Support : </Text>
                  <View>
                    <Text style={styles.subText}> cartrepng@gmail.com </Text>
                  </View>
                </View>
                {false&&<Text style={{ ...styles.subHeading, ...{color:'#FF4800'}}}> OR </Text>}
                {false&&<View style={{...styles.row, ...{marginTop:hp('1%')}}}>
                  <Text style={styles.subText}> Call: </Text>
                  <View>
                    <Text style={styles.subText}> +2349988776611 </Text>
                  </View>
                </View>}
              </View>
            </View>
            {this.state.terms&&<View style={styles.modalCont}>
              <View style={styles.modalOverlay}></View>
              <View style={styles.modalBox}>
                <View style={styles.modalTitle}>
                  <Text style={styles.modalTitleText}> Terms of use</Text>
                </View>
                <View style={styles.modalBody}>
                  <WebView
                  source={{
                    uri: 'https://cartrep.com'
                  }}
                  javaScriptEnabled={true}
                  ref={(webview)=>{this.webview = webview}}
                  style={{ height:hp('70%'),width:'100%'}}
                  />
                  <View style={styles.btnRow}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.ctnBtn2} onPress={()=>this.setState({terms:false})}>
                      <Text style={styles.btnText2}> Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>}
        </SafeAreaView>

    );
  }
}
