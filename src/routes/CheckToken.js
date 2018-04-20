import React from 'react';
import { AsyncStorage, Text,View,Image} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { MYTOKEN,USER_ID, USER_NAME } from '../constants';
import { ViewPagerAndroid } from 'react-native-gesture-handler';
const loadIcon=require("../Images/loading.gif")
export default class CheckToken extends React.Component {
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem(MYTOKEN);
    const userID = await AsyncStorage.getItem(USER_ID);
    const Username = await AsyncStorage.getItem(USER_NAME);
    if (!token && !userID) {
      this.props.navigation.navigate('login');
      return;
    } 
    this.props.navigation.navigate('booking',{userId:userID,Username:Username});
  };
  render() {
    return <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',}}><Image style={{width:80,height: 80}} source={loadIcon} /></View>;
  }
}

