import React, {Component} from 'react';

import {StyleSheet, Text, TouchableOpacity, View, Dimensions from 'react-native';

const {height, width} = Dimensions.get("window");

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state ={
      active:'shop',
      hidden:false,
    }
  }
  setHomeTab(){
    this.setState({
      active:'home',
    });
  }
  switchTab(newTab){
    this.setState({
      active:newTab,
      hidden:this.state.hidden
    });
  }
  render(){
    var that =this;

    const styler = StyleSheet.create({
      tabNav:{
        width: '100%',
        borderTopWidth:1,
        borderColor: 'silver',
        maxHeight:8/100*height,
        display:(this.state.hidden === false ? 'flex' : 'none'),
      },
      tabItems:{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        paddingLeft: '3%',
        paddingRight: '3%',
      },
      textCont:{
        flexGrow: 1,
        paddingLeft: '4%',
        paddingRight: '4%',
        marginTop: '4%',
      }
    });
    return (
      <View style={styler.tabNav}>
        <View style={styler.tabItems}>
          <TouchableOpacity onPress={() => this.switchTab('shop')} style={styler.textCont}>
            <FontAwesomeIcon
            icon={['fas','store']}
            color={(this.state.active === 'shop' ? 'black': '#f5f5f5')}
            size={20}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.switchTab('search')} style={styler.textCont}>
            <FontAwesomeIcon
            icon={['fas','search']}
            color={(this.state.active === 'search' ? 'black': '#f5f5f5')}
            size={20}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.switchTab('gist')} style={styler.textCont}>
            <FontAwesomeIcon
            icon={['fas','comments']}
            color={(this.state.active === 'gist' ? 'black': '#f5f5f5')}
            size={20}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.switchTab('saved')} style={styler.textCont}>
            <FontAwesomeIcon
            icon={['fas','heart']}
            color={(this.state.active === 'saved' ? 'black': '#f5f5f5')}
            size={20}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.switchTab('bag')} style={styler.textCont}>
            <FontAwesomeIcon
            icon={['fas','shopping-bag']}
            color={(this.state.active === 'bag' ? 'black': '#f5f5f5')}
            size={20}
            />
          </TouchableOpacity>
        </View>
      </View>

    )
  }
}
