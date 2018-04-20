import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Font } from 'expo';
import { Ionicons, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { AsyncStorage, StyleSheet, Modal, Text, View, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import { Colors } from '../Themes/'
import styles from './Styles/SignupScreenStyle'
import TextField from '../components/TextField';
import { MYTOKEN, USER_ID,USER_EMAIL,USER_NAME } from '../constants';
const background = require("../Images/signup_bg.png");
const backIcon = require("../Images/back.png");
const personIcon = require("../Images/signup_person.png");
const lockIcon = require("../Images/signup_lock.png");
const emailIcon = require("../Images/signup_email.png");
const defaultState = {
  values: {
    name: '',
    email: '',
    password: '',
  },
  nameValidate: true,
  passwordValidate: true,
  emailValidate: true,
  errorText: '',
  isSubmitting: false,
};

class Signup extends React.Component {

  state = defaultState;

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
    if(this.state.values.name)
    {
      alph=/^[a-zA-Z ]+$/
    if(alph.test(this.state.values.name)){
      this.setState({
        nameValidate: true
      })
      console.log('correct name')
    }
    else{
      this.setState({
        nameValidate: false
      })
      console.warn('invalid')
    }
  
    }
    if(this.state.values.email)
    {
      valmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(valmail.test(this.state.values.email)){
      console.log('correct mail')
      this.setState({
        emailValidate: true
      })
    }
    else{
      console.warn('invalid')
      this.setState({
        emailValidate: false
      })
    }
  
    }
     if(this.state.values.password)
    {
      valpass=/^[a-zA-Z0-9]+$/
    if(valpass.test(this.state.values.password)){
      this.setState({
        passwordValidate: true
      })
      console.log('correct password')
    }
    else{
      this.setState({
        passwordValidate: false
      })
      console.warn('invalid')
    }
  
    }

  };
  submit = async () => {
    if (this.state.isSubmitting) {
      return;
    }
    if(!this.state.nameValidate||this.state.values.name=='')
    {
      this.setState({
        errorText:'Please correct name',
        nameValidate: false
      })
      return
    }
    if(!this.state.emailValidate||this.state.values.email=='')
    {
      this.setState({
        errorText:'Please correct Email',
        emailValidate: false
      })
      return
    }
    if(!this.state.passwordValidate||this.state.values.password=='')
    {
      this.setState({
        errorText:'Please correct password',
        passwordValidate: false
      })
      return
    }
    this.setState({ isSubmitting: true });
    let response;
    try {
      response = await this.props.mutate({
        variables: this.state.values,
      });
    } catch (err) {
      this.setState({
        errorText:'Email Already taken',
        isSubmitting: false,
      });
      return;
    }
    await AsyncStorage.setItem(USER_ID, response.data.createUser.id);
    await AsyncStorage.setItem(USER_NAME, response.data.createUser.name);
    await AsyncStorage.setItem(USER_EMAIL, response.data.createUser.email);
    this.setState(defaultState);
    this.props.navigation.navigate('booking',{userId:response.data.createUser.id,Username:response.data.createUser.name});
  };

  goToLoginPage = () => {
    this.props.navigation.navigate('login');
  };

  render() {
    const { errors, values: { name, email, password } } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground
          source={background}
          style={[styles.container, styles.bg]}
          resizeMode="cover"
        >
          <View style={styles.headerContainer}>

            <View style={styles.headerIconView}>
              <TouchableOpacity onPress={this.goToLoginPage} style={styles.headerBackButtonView}>
                <Image
                  source={backIcon}
                  style={styles.backButtonIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.headerTitleView}>
              <Text style={styles.titleViewText}>Sign Up</Text>
            </View>
            <View style={styles.signuperror}>
                <Text style={styles.redFont}>{this.state.errorText}</Text>
              </View>
          </View>
          <View style={styles.inputsContainer}>
            <View style={!this.state.nameValidate? styles.error:styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={personIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextField value={name} name="name"  onChangeText={this.onChangeText} />
            </View>
            <View style={!this.state.emailValidate? styles.error:styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={emailIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextField value={email} name="email" autoCapitalize onChangeText={this.onChangeText} />
            </View>
            <View style={!this.state.passwordValidate? styles.error:styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={lockIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextField
                value={password}
                name="password"
                autoCapitalize
                onChangeText={this.onChangeText}
                secureTextEntry
              />
            </View>
          </View>
          <View style={styles.footerContainer}>

            <TouchableOpacity onPress={this.submit}>
              <View style={styles.signup}>
                <Text style={styles.whiteFont}>Sign up</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress={this.goToLoginPage}>
              <View style={styles.signin}>
                <Text style={styles.greyFont}>Already have an account?<Text style={styles.whiteFont}> Sign In</Text></Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const signUpMutation = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    createUser(name: $name ,authProvider: { email: { email: $email, password: $password } }){
      id
      name
      email
      password
    }
  }
`;

export default graphql(signUpMutation)(Signup);
