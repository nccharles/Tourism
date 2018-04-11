import React from 'react';
import { AsyncStorage, Text,View,Image} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TOKEN_KEY,USER_ID, USER_NAME } from '../constants';
import { ViewPagerAndroid } from 'react-native-gesture-handler';
const loadIcon=require("../Images/loading.gif")
export default class CheckToken extends React.Component {
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    const userID = await AsyncStorage.getItem(USER_ID);
    if (!token && !userID) {
      this.props.navigation.navigate('signup');
      return;
    } 
    this.props.navigation.navigate('booking');
  };

  render() {
    return <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',}}><Image style={{width:80,height: 80}} source={loadIcon} /></View>;
  }
}

