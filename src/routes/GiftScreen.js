import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Constants} from 'expo'
import { View, Text, Image, ScrollView,Animated, FlatList, ActivityIndicator, TouchableOpacity, AsyncStorage } from 'react-native';
import { Ionicons, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { List, ListItem, SearchBar } from "react-native-elements";
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import styles from './Styles/GiftScreenStyle'
import { Colors } from '../Themes'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { MYTOKEN, USER_ID, USER_EMAIL, USER_NAME } from '../constants';
HEADER_MAX_HEIGHT = 120
HEADER_MIN_HEIGHT = 70
PROFILE_IMAGE_MAX_HEIGHT = 80
PROFILE_IMAGE_MIN_HEIGHT = 40
class GiftScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            error: null,
            refreshing: false,
            Username: this.props.navigation.state.params.Username,
            userId: this.props.navigation.state.params.userId,
            scrollY: new Animated.Value(0)
        };
    }

    // componentDidMount = async () => {
    //     this.setState({
    //         Username: await AsyncStorage.getItem(USER_NAME),
    //         userId: await AsyncStorage.getItem(USER_ID)
    //     })
    // }
    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    backgroundColor: Colors.fire,
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        )
    }
    ViewBarber(bname, bcity, bemail, bphone, bcell, bprice, bbackground, bimage, userId,Username) {
        this.props.navigation.navigate('details', {
            userId: userId,
            Username: Username,
            name: bname,
            city: bcity,
            email: bemail,
            phone: bphone,
            cell: bcell,
            price: bprice,
            background: bbackground,
            image: bimage,
        })
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
      <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>{this.state.Username}</Text></Animated.View>
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
      <Image style={styles.imageprofile} source={require('../Images/login1_mark.png')}/>
      </Animated.View>
                    <View style={styles.BodyGift}>
                        <Text style={styles.giftTitle}> {this.state.Username}</Text>
                        <Text>You received 3 gift cards from your friend </Text>
                        <Text style={{ color: '#a29bfe' }}>Patrick Coela!</Text>
                    </View>
                    <List
                        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
                    >
                        <FlatList
                            data={this.props.data.allBarberses}
                            renderItem={({ item }) => (
                                <Card>
                                    <CardItem>
                                        <Left>
                                            <Body>
                                                <Text style={{ fontWeight: '900' }}>{`${item.bname} -${item.bcity}`}</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Image source={{ uri: item.bimage }} style={{ height: 200, borderRadius: 0, width: null, flex: 1 }} />
                                    </CardItem>
                                    <CardItem style={styles.VoucherBody}>
                                        <TouchableOpacity activeOpacity={.5} onPress={this.ViewBarber.bind(this,
                                            item.bname,
                                            item.bcity,
                                            item.bemail,
                                            item.bphone,
                                            item.bcell,
                                            item.bprice,
                                            item.bbackground,
                                            item.bimage,
                                            this.state.userId,
                                            this.state.Username)}>
                                            <View style={styles.button}>
                                                <Text style={styles.buttonText}>Book now</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </CardItem>
                                </Card>
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

GiftScreen.propType = {
    data: PropTypes.shape({
        loading: PropTypes.bool,
        error: PropTypes.object,
        allBarberses: PropTypes.object,
    }).isRequired,
}
const findBarbers = gql`
    query{
        allBarberses{
            bcell
            bemail
            bname
            bcity
            bphone
            bprice
            bbackground
            bimage
          }
    }
`
export default graphql(findBarbers)(GiftScreen);
