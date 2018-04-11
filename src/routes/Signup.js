import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Font } from 'expo';
import { Ionicons, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { AsyncStorage, StyleSheet, Modal, Text, View, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import { Colors } from '../Themes/'
import styles from './Styles/SignupScreenStyle'
import TextField from '../components/TextField';
import { TOKEN_KEY, USER_ID,USER_EMAIL,USER_NAME } from '../constants';
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
  errors: {},
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
  };

  submit = async () => {
    if (this.state.isSubmitting) {
      return;
    }

    this.setState({ isSubmitting: true });
    let response;
    try {
      response = await this.props.mutate({
        variables: this.state.values,
      });
    } catch (err) {
      this.setState({
        errors: {
          email: 'Already taken',
        },
        isSubmitting: false,
      });
      return;
    }
    await AsyncStorage.setItem(USER_ID, response.data.createUser.id);
    await AsyncStorage.setItem(USER_NAME, response.data.createUser.name);
    await AsyncStorage.setItem(USER_EMAIL, response.data.createUser.email);
    this.setState(defaultState);
    this.props.navigation.navigate('booking');
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

          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={personIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextField value={name} name="name" onChangeText={this.onChangeText} />
              {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={emailIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextField value={email} name="email" onChangeText={this.onChangeText} />
            </View>
            <View style={styles.inputContainer}>
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
