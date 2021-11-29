import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions, BackHandler,Image, TextInput, ScrollView, KeyboardAvoidingView, FlatList, NativeEventEmitter} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import { WebView } from 'react-native-webview';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import BackgroundTimer from 'react-native-background-timer';

import sessionManager from '../../../sessions/manager';

import setter from '../../../api/setter';

import getter from '../../../api/getter';

const styles = StyleSheet.create({
  body:{
    width:wp('100%'),
    height:hp('100%'),
    backgroundColor:'#f5f5f5',
  },
  mainBody:{
    width:wp('100%'),
    height:hp('100%'),
    paddingTop:hp('2%'),
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
    marginRight:wp('7%'),
  },
  notifyIcon:{
    flexGrow:2,
    justifyContent:'center',
    alignItems:'center',
  },
  paymentCont:{
    width:wp('90%'),
    marginLeft:'auto',
    marginRight:'auto',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:hp('3%'),
  },
  paymentCard:{
    width:wp('85%'),
    paddingTop:hp('2%'),
    paddingBottom:hp('2%'),
    paddingLeft:wp('5%'),
    paddingRight:wp('5%'),
    backgroundColor:'white',
    marginTop:hp('3%'),
    display:'flex',
    flexDirection:'row',
    elevation:1,
    alignItems:'center',
  },
  cardText:{
    fontSize:wp('4.3%'),
    fontFamily:'Nunito-Regular',
    marginLeft:wp('3%'),
    color:'#707070',
  },
  cashText:{
    fontSize:wp('4.5%'),
    fontFamily:'Nunito-Regular',
    marginLeft:wp('3%'),
    color:'#707070',
  },
  subText:{
    fontSize:wp('3.8%'),
    fontFamily:'Nunito-Regular',
    color:'#707070',
  },
  formBox:{
    width:"95%",
    marginTop:hp('3%'),
  },
  label:{
    fontSize:wp('3.5%'),
    fontFamily:'Nunito-Regular',
    color:'#707070',
    marginBottom:hp('0.5%'),
  },
  formInput:{
    height:hp('6%'),
    fontFamily:'Nunito-Regular',
    fontSize:wp('4%'),
    backgroundColor:'white',
    borderColor:'#eeeeee',
    borderWidth:1,
    borderRadius:5,
    paddingLeft:wp('3%'),
    marginBottom:hp('2%'),
  },
  formInput2:{
    height:hp('6%'),
    maxHeight:hp('6%'),
    fontFamily:'Nunito-Regular',
    fontSize:wp('4%'),
    backgroundColor:'white',
    borderColor:'#eeeeee',
    borderWidth:1,
    borderRadius:5,
    paddingLeft:wp('3%'),
    flexGrow:1,
  },
  formRow:{
    display:'flex',
    flexDirection:'row',
    marginBottom:hp('2%'),
  },
  rowFormCont:{
    flexGrow:1,
  },
  ctnBtn:{
    borderRadius:30,
    width:wp('82%'),
    height:60,
    marginTop:hp('1%'),
    marginRight:'auto',
    marginLeft:'auto',
    justifyContent:'center',
    alignItems:'center',
    marginTop:hp('4%'),
  },
  btnText:{
    fontSize:wp('5%'),
    fontFamily:'Nunito-SemiBold',
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
    height:hp('80%'),
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
  ctnBtn1:{
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
  btnText1:{
    fontSize:wp('4.2%'),
    fontFamily:'Nunito-SemiBold',
    color:'#FF4800',
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
    paddingLeft:hp('1%'),
    paddingRight:hp('1%'),
  }
});
export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      order:this.props.route.params.order,
      savedCards:[],
      mode:'',
      cardModal:false,
      cardNo:'',
      expiry:'',
      cvv:'',
    };
    this.eventMaster = new NativeEventEmitter();
    this.eventListeners = [];
    this.webview;
  }

  keepOrderAlive(){
    BackgroundTimer.runBackgroundTimer(()=>{
      setter.keepOrderAlive(this.state.order.id).then(()=>{
      });
      getter.getOrder(this.state.order.id).then((data)=>{
        if(!data){
          alert('Ride has been cancelled');
          this.props.navigation.navigate('FindDeliveryService',{});
        }
      });
    },2000);
    /*this.keepAlive = setInterval(()=>{
      setter.keepOrderAlive(this.state.order.id).then(()=>{
      });
    },2000);*/
  }

  returnToIndex(){
    this.eventMaster.emit('appActivity',{state:1});
    setter.cancelOrder({oid:this.state.order.id}).then(()=>{
      this.eventMaster.emit('appActivity',{state:0});
      this.props.navigation.navigate('FindDeliveryService',{});
    });
  }

  componentDidMount(){
    //this.getSavedCards();
    this.keepOrderAlive();
    this.tQ = (new Date()).getTime();
    BackHandler.addEventListener('hardwareBackPress',()=>{
      return true;
    });
  }

  componentWillUnmount(){
    BackgroundTimer.stopBackgroundTimer();
    //clearInterval(this.keepOrderAlive);
  }


  cardInfo(item){
    return(
      <View style={styles.paymentCard}>
        <Image source={require('../../../assets/images/icons/mastercard.png')} style={{width:wp('7%'),height:wp('7%')}} resizeMode={"contain"}/>
        <Text style={styles.cashText}> ***** ***** ***** {item.card_no.substr(-5)} </Text>
        <Image source={require('../../../assets/images/icons/vector14.png')} style={{width:wp('3.5%'),height:wp('3.5%'),position:'absolute',right:wp('5%')}} resizeMode={"contain"}/>
      </View>
    );
  }

  getSavedCards(){
    getter.getSavedCards(sessionManager.getUserData().uid).then((data)=>{
      this.setState({savedCards:data});
      this.eventMaster.emit('appActivity',{state:0});
    });
  }

  continueProcess(){
    if(this.state.mode == ''){
      alert('Select a payment method first');
    }else{
      if(this.state.mode =='card'){
        if(this.state.cardModal!=true){
          this.setState({cardModal:true});
          this.eventMaster.emit('appActivity',{state:1});
        }

      }else if(this.state.mode =='cash'){
        var order = JSON.parse(JSON.stringify(this.state.order));
        order['mode'] = "cash";
        setter.submitOrderPayment(order).then(()=>{
          alert('Your order is in transit');
          this.props.navigation.navigate('FindDeliveryService',{});
        });
      }
    }
  }

  onMessage(data){
    var response = JSON.parse(data.nativeEvent.data);

    if(response.error == 0){
      alert('Your order is in transit');
      this.props.navigation.navigate('FindDeliveryService',{});
    }
    if(response.error == 1){
      alert(response.message);
    }
    if(response.error == 2){
      this.setState({cardModal:false});
    }
  }

  startPayment(){
    this.eventMaster.emit('appActivity',{state:0});
    var order = JSON.parse(JSON.stringify(this.state.order));
    order['mode'] = "card";
    var payerData = {email:sessionManager.getUserData().email,phone:sessionManager.getUserData().phone,firstName:sessionManager.getUserData().firstName,lastName:sessionManager.getUserData().lastName,order:order};
    this.webview.postMessage(JSON.stringify(payerData));
  }

  goBack(){
    this.props.navigation.goBack();
  }
/*
<FlatList
  data={this.state.savedCards}
  renderItem={({item}) => this.cardInfo(item)}
/>

*/
  render(){
    return(
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.body}>
        <SafeAreaView style={styles.mainBody}>

          <View style={styles.headerArea}>
            <Text style={styles.headingText}>Payment Method</Text>
          </View>

            <View style={styles.paymentCont}>

              <Text style={styles.subText}> Select mode of payment</Text>
              <Text style={styles.subText}> Card information will not be saved.</Text>


              <TouchableOpacity onPress={()=>this.setState({mode:'card'})}>
                <View style={styles.paymentCard}>
                  <Image source={require('../../../assets/images/icons/mastercard.png')} style={{width:wp('7%'),height:wp('7%')}} resizeMode={"contain"}/>
                  <Text style={styles.cardText}> Credit / Debit Card </Text>
                  <Image source={(this.state.mode=='card')?require('../../../assets/images/icons/vector1.png'):require('../../../assets/images/icons/vector14.png')} style={{width:wp('3.5%'),height:wp('3.5%'),position:'absolute',right:wp('5%')}} resizeMode={"contain"}/>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this.setState({mode:'cash'})}>
                <View style={styles.paymentCard}>
                  <FontAwesomeIcon icon={['fas','money-bill']} style={{color:'#AAAAAA'}} size={Math.floor(eval( wp('5%') ))}/>
                  <Text style={styles.cashText}>Cash</Text>
                  <Image source={(this.state.mode=='cash')?require('../../../assets/images/icons/vector1.png'):require('../../../assets/images/icons/vector14.png')} style={{width:wp('3.5%'),height:wp('3.5%'),position:'absolute',right:wp('5%')}} resizeMode={"contain"}/>
                </View>
              </TouchableOpacity>


              <TouchableOpacity activeOpacity={((this.state.mode==''))?1:0.7} style={{...styles.ctnBtn, ...{backgroundColor:((this.state.mode==''))?'#EEEEEE':'#FF4800'}}} onPress={()=>this.continueProcess()}>
                <Text style={{...styles.btnText, ...{color:((this.state.mode==''))?'#707070':'#FFFFFF'} }}> Proceed</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7} style={{...styles.ctnBtn, ...{backgroundColor:'#FFFFFF',borderColor:'#FF4800',borderWidth:1}}} onPress={()=>this.returnToIndex()}>
                <Text style={{...styles.btnText, ...{color:'#000000'} }}> Cancel</Text>
              </TouchableOpacity>

            </View>
            {(this.state.cardModal)&&<View style={styles.modalCont}>
              <View style={styles.modalOverlay}></View>
              <View style={styles.modalBox}>
                <View style={styles.modalTitle}>
                  <Text style={styles.modalTitleText}> Pay for delivery</Text>
                </View>
                <View style={styles.modalBody}>
                  <WebView
                  source={{
                    uri: 'https://cartrep.com/app/webviews/payment.html?t='+this.tQ
                  }}
                  javaScriptEnabled={true}
                  onLoad={()=>this.startPayment()}
                  ref={(webview)=>{this.webview = webview}}
                  style={{ height:hp('70%'),width:'100%'}}
                  onMessage={(data)=>this.onMessage(data)}
                  />

                </View>
              </View>
            </View>}
        </SafeAreaView>
      </KeyboardAvoidingView>

    );
  }
}

/*

<View style={styles.formBox}>
  {(this.state.cardNo!='')&&<Text style={styles.label}> Card Number</Text>}
  <TextInput style={styles.formInput} placeholder={"Card Number"} value={this.state.cardNo} onChangeText={(value)=>{this.setState({cardNo:value})}}/>

  <View style={styles.formRow}>
    <View style={styles.rowFormCont}>
      {((this.state.expiry!='')||(this.state.cvv!=''))&&<Text style={styles.label}>Expiry Date</Text>}
      <TextInput style={styles.formInput2} placeholder={"Expiry Date"} value={this.state.expiry} onChangeText={(value)=>{this.setState({expiry:value})}}/>
    </View>
    <View style={styles.rowFormCont}>
    {((this.state.expiry!='')||(this.state.cvv!=''))&&<Text style={{...styles.label,...{opacity:(this.state.cvv=="")?0:1}}}> CVV</Text>}
    <TextInput style={styles.formInput2} placeholder={"CVV"} value={this.state.cvv} onChangeText={(value)=>{this.setState({cvv:value})}}/>
    </View>


  </View>


</View>
<View style={styles.btnRow}>
  <TouchableOpacity activeOpacity={0.7} style={styles.ctnBtn1} onPress={()=>this.setState({cardModal:false,cardNo:'',expiry:'',cvv:''})}>
    <Text style={styles.btnText1}> Cancel </Text>
  </TouchableOpacity>
  <TouchableOpacity activeOpacity={0.7} style={styles.ctnBtn2} onPress={()=>{this.props.navigation.navigate('MakePayment')}}>
    <Text style={styles.btnText2}> Proceed </Text>
  </TouchableOpacity>
</View>
*/
