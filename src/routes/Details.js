import React, { Component } from 'react'
import { Card, Icon, PricingCard } from 'react-native-elements'
import { Colors } from '../Themes'
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import styles from './Styles/DetailsStyle'
import Separator from '../components/Separator'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { MYTOKEN, USER_ID, USER_EMAIL, USER_NAME } from '../constants';
class Details extends Component {


  constructor(props) {
    super(props)
    this.state = {
      name:'',
      city:'',
      email:'',
      phone:'',
      price:'',
      date:'2018-04-18',
      image: '',
      Username: this.props.navigation.state.params.Username,
      userId: this.props.navigation.state.params.userId,
      background: '',
      isSubmitting: false,
      errors: {},
    }

  }

//   componentDidMount = async () => {
//     this.setState({
//         Username: await AsyncStorage.getItem(USER_NAME),
//         userId: await AsyncStorage.getItem(USER_ID)
//     })
// }
  onPressPlace() {
    console.log('place')
  }

  onPressTel() {
    const {phone}= this.props.navigation.state.params
    Linking.openURL(`tel:${phone}`).catch(err => console.log('Error:', err))
    
  }

  onPressSms() {
    const {phone}= this.props.navigation.state.params
    Linking.openURL(`sms:${phone}`).catch(err => console.log('Error:', err))
  }

  onPressEmail() {
    const {email}= this.props.navigation.state.params
    Linking.openURL(`mailto:${email}?subject=subject&body=body`).catch(err =>
      console.log('Error:', err)
    )
  }
  renderHeader = () => {
    const {name,city,background,image}= this.props.navigation.state.params
    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={0}
          source={{
            uri: background,
          }}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{
                uri: image,
              }}
            />
            <Text style={styles.userNameText}>{name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  onPress={this.onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {city}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
    _submit = async () => {
      const {name,city,background,image, phone,userId,Username, price}= this.props.navigation.state.params 
      const { date} = this.state
          let response;
          try {
            response = await this.props.mutate({
              variables: {background,image,city,price,phone,userId,Username, name,date }
            });
            console.log(response)
          } catch (err) {
            console.log(err)
            this.setState({
              isSubmitting: false,
            });
            return;

          }
    this.props.navigation.navigate('booking',{userId: userId,Username: Username})
  }
  renderTel = () => {
    const {phone}= this.props.navigation.state.params
    return(
    
    <TouchableOpacity onPress={() => this.onPressTel()}>
      <View style={styles.Telcontainer}>
        <View style={styles.iconRow}>
          <Icon
            name="call"
            underlayColor="transparent"
            iconStyle={styles.telIcon}
            onPress={() => this.onPressTel()}
          />
        </View>
        <View style={styles.telRow}>
          <View style={styles.telNumberColumn}>
            <Text style={styles.telNumberText}>{phone}</Text>
          </View>
          <View style={styles.telNameColumn}>

            <Text style={styles.telNameText}>Mobile</Text>

          </View>
        </View>
        <View style={styles.smsRow}>
          <Icon
            name="textsms"
            underlayColor="transparent"
            iconStyle={styles.smsIcon}
            onPress={() => this.onPressSms()}
          />
        </View>
      </View>
    </TouchableOpacity>

  )}
  renderEmail = () => {
    const {email}= this.props.navigation.state.params
    return(
    <TouchableOpacity onPress={() => this.onPressEmail()}>
      <View style={styles.Telcontainer}>
        <View style={styles.iconRow}>
          <Icon
            name="email"
            underlayColor="transparent"
            iconStyle={styles.emailIcon}
            onPress={() => this.onPressEmail()}
          />

        </View>
        <View style={styles.emailRow}>
          <View style={styles.emailColumn}>
            <Text style={styles.emailText}>{email}</Text>
          </View>
          <View style={styles.emailNameColumn}>
            <Text style={styles.emailNameText}>Email</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )}

  render() {
    const {price}= this.props.navigation.state.params
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
            {this.renderTel()}
            {Separator()}
            {this.renderEmail()}
            <DatePicker
              style={{ width: 400 }}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2018-04-18"
              maxDate="2020-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 20,
                  top: 4,
                  marginLeft: 10
                },
                dateInput: {
                  marginLeft: 0
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ date: date }) }}
            />
          </Card>
          <PricingCard
            color={Colors.fire}
            title='Price'
            price={`${price}RWf`}
            info={['All the best']}
            button={{ title: 'BOOK NOW', icon: 'bookmark' }}
            onButtonPress={this._submit}
          />
        </View>
      </ScrollView>
    )
  }
}
const createBookedMutation = gql`
  mutation( $name: String!,$userId: ID!,$city: String!,$phone: String!,$price: String!,$date: String!,$background: String!,$image: String!) {
    createBooked(userId: $userId,bbackground: $background,bcity: $city,bdate: $date,bimage:$image,bname:$name,bphone:$phone,bprice:$price)
    {
      bbackground
      bcity
      bdate
      bimage
      bname
      bphone
      bprice
      user{
        name
        id
        email
      }
      
    }
  }
`;

export default graphql(createBookedMutation)(Details);
