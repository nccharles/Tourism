import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Constants} from 'expo'
import { graphql } from 'react-apollo';
import { Ionicons, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text,Image,ScrollView ,Animated,FlatList,StyleSheet, ActivityIndicator, TouchableOpacity,AsyncStorage} from 'react-native';
import gql from 'graphql-tag';
import styles from './Styles/BookedScreenStyle'
import { Colors } from '../Themes'
import { MYTOKEN, USER_ID, USER_EMAIL, USER_NAME } from '../constants';
import { Container, Header, Content, Card,Thumbnail,List,ListItem, CardItem,Body,Left,Button,Title, Icon, Right } from 'native-base';
HEADER_MAX_HEIGHT = 120
HEADER_MIN_HEIGHT = 70
PROFILE_IMAGE_MAX_HEIGHT = 80
PROFILE_IMAGE_MIN_HEIGHT = 40
class Booked extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading: false,
        data: [],
        refreshing: false,
        Username: this.props.navigation.state.params.Username,
        userId: this.props.navigation.state.params.userId,
        scrollY: new Animated.Value(0)
    };
}
  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    })
    const ProfileImageHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [PROFILE_IMAGE_MAX_HEIGHT,PROFILE_IMAGE_MIN_HEIGHT],
      extrapolate: 'clamp',
    })
    const ProfileImageMarginTop = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT - (PROFILE_IMAGE_MAX_HEIGHT /2), HEADER_MAX_HEIGHT + 5],
      extrapolate: 'clamp',
    })
    const headerZindex = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    })
    const headerTitleBottom= this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MAX_HEIGHT,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MAX_HEIGHT + 26],
      outputRange: [-20, -20, -20 , 0],
      extrapolate: 'clamp',
    }) 
    return (
      <View style={styles.container}>
          <Animated.View style={
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: Colors.fire,
          height: headerHeight,
          zIndex: headerZindex,
          alignItems: 'center',
        }
      }>
      <Animated.View style={{position: 'absolute', bottom: headerTitleBottom}}>
      <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>Your Booked BarberShop</Text></Animated.View>
      </Animated.View>
      <ScrollView style={{marginBottom:0}}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{nativeEvent:{contentOffset: {y: this.state.scrollY}}}]
      )}
      style={{flex: 1}}>
      <Animated.View style={
        {
          height: ProfileImageHeight,
          width: ProfileImageHeight,
          borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
          borderColor: '#FFF',
          borderWidth: 0,
          overflow: 'hidden',
          marginTop: ProfileImageMarginTop,
          marginLeft: 10,
         }
      }>
      {/* <Image style={styles.imageprofile} source={require('../Images/me.jpg')}/> */}
      </Animated.View>
      <View style={styles.BodyGift}>
                        <Text style={{ color: '#a29bfe' }}>Your Booked BarberShop</Text>
                    </View>
      <List
      containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
  >
      <FlatList
          data={this.props.data.allBookeds}
          renderItem={({ item }) => (
            <List>
            <ListItem>
              <Thumbnail square size={120} source={{ uri: item.bimage }} />
              <Body>
                <Text>{item.bname}</Text>
                <Text note>{`${item.bdate} Price: ${item.bprice} Rwf Booked By ${this.state.Username}`}</Text>
              </Body>
              <Right>
              <Button transparent>
              <Icon name="bookmark" />
            </Button>
              </Right>
            </ListItem>
         </List>
          )}
          keyExtractor={item => item.id}
          ListFooterComponent={this.renderFooter}
      />
  </List>

</ScrollView>
</View>
    );
  }
}
Booked.propType={
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    allBookeds: PropTypes.object,
  }).isRequired,
  }
const findBooked = gql`
query {
  allBookeds{
    bname
     bcity
        bdate
        bbackground
        bphone
        bprice
        bimage
  }
}
`
export default graphql(findBooked)(Booked);