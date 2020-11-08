import React, {Component} from 'react';

import { View, Text, Button, TouchableOpacity, Image, AsyncStorage,StyleSheet,} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
//import {AsyncStorage} from '@react-native-community';

//Globally Declared Styles For Screen Responsiveness
import GlobalStyles from './styles/globalStyles';

//Import Pre App Navigations
import IntroMainNav from './apps/intro/components/MainNavigator';

//Import main app interfaces
//import UserApp from './apps/user/index';

const styles = StyleSheet.create({
  body:{
    width:wp('100%'),
    height:hp('100%'),
  },
});

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      userLoggedIn:this.props.userState,
    };

  }


  render(){
    return(
      <View style={styles.body}>
        {(!this.state.userLoggedIn) && <IntroMainNav/>}
      </View>
    );
  }
}
