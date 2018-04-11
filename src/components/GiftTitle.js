import React, { Component } from 'react';
import {  View, Text,ImageBackground,TouchableOpacity } from 'react-native';
import { Ionicons,Feather, FontAwesome,MaterialCommunityIcons} from '@expo/vector-icons';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import styles from './styles/GiftStyles'
import { TOKEN_KEY, USER_ID,USER_EMAIL,USER_NAME } from '../constants';
export default class Gift1 extends Component {
  
  render() {
    return (
        <View style={styles.container}>
             <View style={styles.BodyGift}>
                 <Text style={styles.giftTitle}>Welcome To BarberShop</Text>
                 <Text>You received 20 gift cards from your friend </Text>
                 <Text style={{color: '#a29bfe'}}>Patrick Coela!</Text>
             </View>
      </View>
    );
  }
}
