import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image, TextInput, ScrollView} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


import sessionManager from '../../../sessions/manager';


import {
  DrawerContentScrollView,
  DrawerItemList,DrawerItem
} from '@react-navigation/drawer';


const styles = StyleSheet.create({
  body:{
    width:wp('80%'),
    height:hp('100%'),
    paddingBottom:hp('4%'),
  },
  drawerHeader:{
    width:'100%',
    height:hp('20%'),
    backgroundColor:'#FF4000',
    marginBottom:hp('2%'),
  },
  headerRow:{
    display:'flex',
    flexDirection:'row',
    marginTop:hp('5%'),
    alignItems:'center',
    marginLeft:wp('3%'),
  },
  imageCont:{

  },
  headerText:{
    marginLeft:wp('1%'),
  },
  nameText:{
    fontFamily:'Nunito-SemiBold',
    fontSize:wp('7%'),
    color:'white',
  },
  editText:{
    fontFamily:'Nunito-SemiBold',
    fontSize:wp('3.5%'),
    color:'white',
  }
});
export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }

  continueProcess(){
  }

/*
  <DrawerItem
      label="Payments"
      labelStyle={{marginLeft:-(wp('5%')),fontFamily:'Nunito-SemiBold',fontSize:wp('4.2%'),color:'#707070'}}
      onPress={() => this.props.navigation.navigate("PaymentsNavigator",{})}
      icon={({ focused, color, size }) => <FontAwesomeIcon icon={['fas','credit-card']} size={Math.floor(eval( wp('5%') ))} style={{color:'#707070'}}/>}
    />
*/
  render(){
    return(
        <ScrollView style={styles.body}>
          <View style={styles.drawerHeader}>
            <View style={styles.headerRow}>
              <TouchableOpacity style={styles.imageCont}>
              </TouchableOpacity>
              <View style={styles.headerText}>
                <Text style={styles.nameText}>Hi, {sessionManager.getUserData().firstName}</Text>
                <TouchableOpacity>
                  {false&&<Text style={styles.editText}> Edit</Text>}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <DrawerContentScrollView {...this.props}>
            <DrawerItem
              label="Home"
              labelStyle={{marginLeft:-(wp('5%')),fontFamily:'Nunito-SemiBold',fontSize:wp('4.2%'),color:'#707070'}}
              onPress={() => this.props.navigation.navigate("HomeNavigator",{})}
              icon={({ focused, color, size }) => <FontAwesomeIcon icon={['fas','home']} size={Math.floor(eval( wp('5%') ))} style={{color:'#707070'}}/>}
            />
            <DrawerItem
              label="Delivery History"
              labelStyle={{marginLeft:-(wp('5%')),fontFamily:'Nunito-SemiBold',fontSize:wp('4.2%'),color:'#707070'}}
              onPress={() => this.props.navigation.navigate("HistoryNavigator",{})}
              icon={({ focused, color, size }) => <FontAwesomeIcon icon={['fas','history']} size={Math.floor(eval( wp('5%') ))} style={{color:'#707070'}}/>}
            />
            <DrawerItem
              label="Settings"
              labelStyle={{marginLeft:-(wp('5%')),fontFamily:'Nunito-SemiBold',fontSize:wp('4.2%'),color:'#707070'}}
              onPress={() => this.props.navigation.navigate("SettingsNavigator",{})}
              icon={({ focused, color, size }) => <FontAwesomeIcon icon={['fas','cog']} size={Math.floor(eval( wp('5%') ))} style={{color:'#707070'}}/>}
            />
          </DrawerContentScrollView>
        </ScrollView>
    );
  }
}
