import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image, TextInput, ScrollView, KeyboardAvoidingView,NativeEventEmitter} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import sessionManager from '../../../sessions/manager';

import setter from '../../../api/setter';

import getter from '../../../api/getter';

const styles = StyleSheet.create({
  body:{
    width:wp('100%'),
    height:hp('100%'),
    maxHeight:hp('100%'),
    paddingTop:hp('2%'),
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
    fontFamily:'Nunito-Bold',
    color:'black',
    flexGrow:6,
    textAlign:'center',
    marginRight:wp('7%'),
  },
  subText:{
    fontSize:wp('3.5%'),
    fontFamily:'Nunito-Regular',
    color:'#707070',
    marginTop:10,
  },
  rideDetails:{
    width:wp('100%'),
    backgroundColor:'#9D0F0E',
    marginTop:hp('1.3%'),
    paddingLeft:wp('5.5%'),
    paddingTop:hp('2%'),
    minHeight:hp('90%'),
    paddingBottom:hp('15%'),
  },
  detailsHeading:{
    fontFamily:'Nunito-Bold',
    fontSize:wp('5.8%'),
    color:'white',
  },
  detailLabel:{
    fontFamily:'Nunito-Regular',
    color:'white',
    marginTop:hp('3%'),
    fontSize:wp('3.5%'),
  },
  detailInfo:{
    width:wp('87%'),
    paddingTop:hp('1%'),
    paddingBottom:hp('3%'),
    paddingLeft:wp('0.5%'),
    borderBottomWidth:0.5,
    borderColor:'white',
    display:'flex',
    flexDirection:'row',
    marginTop:hp('0.8%'),
  },
  detailText:{
    paddingLeft:wp('3%'),
  },
  detailMainText:{
    fontFamily:'Nunito-Regular',
    fontSize:wp('4.5%'),
    color:'white',
  },
  detailSubText:{
    fontFamily:'Nunito-Regular',
    fontSize:wp('3.2%'),
    color:'white',
  },
  bottomCont:{
    backgroundColor:'white',
    width:'100%',
    height:hp('15%'),
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    borderColor:'white',
    position:'absolute',
    bottom:hp('2%'),
    zIndex:5,
  },
  bottomRow:{
    display:'flex',
    flexDirection:'row',
  },
  bottomText:{
    flexGrow:1,
    height:'100%',
    justifyContent:'center',
    paddingLeft:wp('5%'),
    paddingTop:wp('2%'),
  },
  deliveryText:{
    color:'#707070',
    fontFamily:'Nunito-Regular',
    fontSize:wp('5%'),
  },
  price:{
    color:'#9D0F0E',
    fontFamily:'Nunito-Bold',
    fontSize:wp('6%'),
  },
  ctnBtn:{
    backgroundColor:'#9D0F0E',
    borderRadius:30,
    height:60,
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    flexGrow:1,
    marginRight:wp('4%'),
  },
  btnText:{
    fontSize:wp('5%'),
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
      price:this.props.route.params.deliver.price,
    };
    this.eventMaster = new NativeEventEmitter();

  }



  placeOrder(){
    this.eventMaster.emit('appActivity',{state:1});
    var order = this.props.route.params.deliver;
    order['uid'] = sessionManager.getUserData().uid;
    order['senderName'] = sessionManager.getUserData().firstName+" "+sessionManager.getUserData().lastName;
    order['senderPhone'] = sessionManager.getUserData().phone;
    order['senderAddress'] = sessionManager.getUserData().address;
    order['senderArea'] = sessionManager.getUserData().area;
    order['senderLandmark'] = sessionManager.getUserData().landmark;
    setter.openOrder(order).then((data)=>{
      this.eventMaster.emit('appActivity',{state:0});
      alert("Order has been sent");
      this.props.navigation.navigate('AwaitRideResponse',{orderId:data.orderId});
    });
  }


  goBack(){
    this.props.navigation.goBack();
  }

  render(){
    return(
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.body}>
        <SafeAreaView>
        <View style={styles.headerArea}>
        <TouchableOpacity onPress={()=>this.goBack()} style={styles.touchArea}>
          <FontAwesomeIcon icon={['fas','arrow-left']} size={wp('5%')}/>
        </TouchableOpacity>
          <Text style={styles.headingText}> Confirm Ride</Text>
        </View>
          <ScrollView style={{minHeight:hp('92%'),paddingBottom:hp('15%')}}>


            <View style={styles.rideDetails}>
              <Text style={styles.detailsHeading}>{this.props.route.params.deliver.orderCode}</Text>

              <Text style={styles.detailLabel}> Pickup </Text>
              <View style={styles.detailInfo}>
                <Image source={require('../../../assets/images/icons/vector12.png')} style={{width:wp('4%'),height:wp('4%'),marginTop:hp('0.4%')}} resizeMode={"contain"}/>
                <View style={styles.detailText}>
                  <Text style={styles.detailMainText}>{sessionManager.getUserData().address}</Text>
                  <Text style={styles.detailSubText}>{(sessionManager.getUserData().firstName+" "+sessionManager.getUserData().lastName)}</Text>
                </View>
              </View>

              <Text style={styles.detailLabel}> Dropoff </Text>
              <View style={styles.detailInfo}>
                <Image source={require('../../../assets/images/icons/vector22.png')} style={{width:wp('4%'),height:wp('4%'),marginTop:hp('0.4%')}} resizeMode={"contain"}/>
                <View style={styles.detailText}>
                  <Text style={styles.detailMainText}>{this.props.route.params.deliver.address}</Text>
                  <Text style={styles.detailSubText}>{this.props.route.params.deliver.name}</Text>
                </View>
              </View>

              <Text style={styles.detailLabel}> Item Category </Text>
              <View style={styles.detailInfo}>
                <Image source={require('../../../assets/images/icons/category.png')} style={{width:wp('4%'),height:wp('4%'),marginTop:hp('0.4%')}} resizeMode={"contain"}/>
                <View style={styles.detailText}>
                  <Text style={styles.detailMainText}>{this.props.route.params.deliver.category}</Text>
                </View>
              </View>

              <Text style={styles.detailLabel}>Total Delivery Time</Text>
              <View style={{...styles.detailInfo,...{borderBottomWidth:0}}}>
                <Image source={require('../../../assets/images/icons/clock.png')} style={{width:wp('4%'),height:wp('4%'),marginTop:hp('0.4%')}} resizeMode={"contain"}/>
                <View style={styles.detailText}>
                  <Text style={styles.detailMainText}>{(this.state.price==300)?"20 mins - 30 mins":"45 mins - 1 hour"}</Text>
                </View>
              </View>


            </View>



          </ScrollView>

        </SafeAreaView>
        <View style={styles.bottomCont}>
          <View style={styles.bottomRow}>

            <View style={styles.bottomText}>
              <Text style={styles.deliveryText}> Delivery Price</Text>
              <Text style={styles.price}> ₦{this.state.price}</Text>
            </View>

            <TouchableOpacity activeOpacity={0.7} style={styles.ctnBtn} onPress={()=>this.placeOrder()}>
              <Text style={styles.btnText}> Book Ride </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

    );
  }
}
