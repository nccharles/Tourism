import React, { Component } from 'react'
import { Card, Icon,PricingCard } from 'react-native-elements'
import {Colors} from '../Themes'
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

class Contact extends Component {


  constructor(props){
    super(props) 
    this.state ={
        TextName:'',  
        TextCity:'',
        TextEmail:'',
        TextPhone:'',
        TextCell: '',
        TextPrice: '',
        date:"2018-04-11"
        
    }
}
componentDidMount(){
  this.setState({
    TextName: this.props.navigation.state.params.name,
    TextCity: this.props.navigation.state.params.city,
    TextEmail: this.props.navigation.state.params.email,
    TextPhone: this.props.navigation.state.params.phone,
    TextCell: this.props.navigation.state.params.cell,
    TextPrice: this.props.navigation.state.params.price,
    TextLargePhoto: this.props.navigation.state.params.background,
    TextMediumPhoto: this.props.navigation.state.params.image,
  })
}


  onPressPlace () {
    console.log('place')
  }

  onPressTel(){
    Linking.openURL(`tel:${this.state.TextPhone}`).catch(err => console.log('Error:', err))
  }

  onPressSms () {
    Linking.openURL(`sms:${this.state.TextPhone}`).catch(err => console.log('Error:', err))
  }

  onPressEmail (){
    Linking.openURL(`mailto:${email}?subject=subject&body=body`).catch(err =>
      console.log('Error:', err)
    )
  }

  renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={0}
          source={{
            uri: this.state.TextLargePhoto,
          }}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{
                uri: this.state.TextMediumPhoto,
              }}
            />
            <Text style={styles.userNameText}>{this.state.TextName}</Text>
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
                  {this.state.TextCity}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
submit = () =>{
  this.props.navigation.navigate('booked')
}
  renderTel = () => (
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
          <Text style={styles.telNumberText}>{this.state.TextPhone}</Text>
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
      
  )
  renderEmail = () => (
  <TouchableOpacity onPress={() =>this.onPressEmail()}>
  <View style={styles.Telcontainer}>
    <View style={styles.iconRow}>
        <Icon
          name="email"
          underlayColor="transparent"
          iconStyle={styles.emailIcon}
          onPress={() =>this.onPressEmail()}
        />

    </View>
    <View style={styles.emailRow}>
      <View style={styles.emailColumn}>
        <Text style={styles.emailText}>{this.state.TextEmail}</Text>
      </View>
      <View style={styles.emailNameColumn}>
          <Text style={styles.emailNameText}>Email</Text>
      </View>
    </View>
  </View>
</TouchableOpacity>
  )

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
            {this.renderTel()}
            {Separator()}
            {this.renderEmail()}
            <DatePicker
        style={{width: 400}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2018-04-11"
        maxDate="2020-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 20,
            top: 4,
            marginLeft:10
          },
          dateInput: {
            marginLeft: 0
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
          </Card>
          <PricingCard
    color= {Colors.fire}
    title='Price'
    price={`${this.state.TextPrice}RWf`}
    info={['All the best']}
    button={{ title: 'BOOK NOW', icon: 'bookmark' }}
    onButtonPress={this.submit}
         />
  
        </View>
      </ScrollView>
    )
  }
}

export default Contact
