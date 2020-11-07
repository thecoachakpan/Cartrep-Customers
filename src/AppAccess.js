import React, {Component} from 'react';

import { View, Text, Button, TouchableOpacity, Image, AsyncStorage} from 'react-native';

//import {AsyncStorage} from '@react-native-community';

//Globally Declared Styles For Screen Responsiveness
import GlobalStyles from './styles/globalStyles';

//Import Pre App Navigations
import IntroMainNav from './apps/intro/components/MainNavigator';

//Import main app interfaces
//import UserApp from './apps/user/index';


export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      userLoggedIn:this.props.userState,
    };

  }


  render(){
    return(
      <View>
        {(!this.state.userLoggedIn) && <IntroMainNav/>}
      </View>
    );
  }
}
