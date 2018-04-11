import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { AppLoading, Asset, Font } from 'expo';
import TextField from '../components/TextField';
import { TOKEN_KEY, USER_ID,USER_EMAIL,USER_NAME } from '../constants';
import { FontAwesome, Ionicons, Feather } from '@expo/vector-icons';
import { AsyncStorage, StatusBar, StyleSheet, Modal, Dimensions, ImageBackground, Text, TextInput, KeyboardAvoidingView, View, TouchableOpacity, Image } from 'react-native';
const { width, height } = Dimensions.get("window");
import styles from './Styles/LoginScreenStyle'
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return true
}
const defaultState = {
  values: {
    email: '',
    password: '',
  },
  errors: {},
  isSubmitting: false,
  isReady: false,
};

class Login extends React.Component {
  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      background = require("../Images/login1_bg.png"),
      loadIcon=require("../Images/loading.gif"),
      mark = require("../Images/login1_mark.png"),
      lockIcon = require("../Images/login1_lock.png"),
      personIcon = require("../Images/login1_person.png"),
    ]);

    const fontAssets = cacheFonts([FontAwesome.font]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }
  state = defaultState;

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  };
  renderButton(){
    if(this.state.isSubmitting){
      return  <Image style={styles.loadingImage} source={loadIcon} />

    }
    return (<Text style={styles.buttonText}>Login In</Text>)
  }
  submit = async () => {
    if (this.state.isSubmitting) {
      return;
    }

    this.setState({ isSubmitting: true });
    let response
    try{
      response = await this.props.mutate({
        variables: this.state.values,
      });
      const { user, token } = response.data.signinUser;
      await AsyncStorage.setItem(USER_ID, user.id);
      await AsyncStorage.setItem(USER_NAME, user.name);
      await AsyncStorage.setItem(USER_EMAIL, user.email);
      await AsyncStorage.setItem(TOKEN_KEY, token);
      this.setState(defaultState);
      this.props.navigation.navigate('booking');
    } catch(error){
      console.log(error)
      this.setState({
        isSubmitting: false,
      });
    }
  };

  goToSignup = () => {
    this.props.navigation.navigate('signup');
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    const { errors, values: { email, password } } = this.state;

    return (

      <View style={styles.container}>
        <StatusBar barStyle="light-content" hidden={false} />
        <ImageBackground source={background} style={styles.background} resizeMode="cover">

          <View style={styles.markWrap}>
            <Image source={mark} style={styles.mark} resizeMode="contain" />
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
              <TextField value={email} name="email" onChangeText={this.onChangeText} /></View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
              </View>
              {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                <TextField
                value={password}
                name="password"
                onChangeText={this.onChangeText}
                secureTextEntry
              /></View>
            <TouchableOpacity activeOpacity={.5}>
              <View>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5} onPress={this.submit}>
              <View style={styles.button}>
              {this.renderButton()}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Don't have an account?</Text>
              <TouchableOpacity activeOpacity={.5} onPress={this.goToSignup} >
                <View>
                  <Text style={styles.signupLinkText}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    signinUser(email: { email:$email, password: $password }){
      user{
        id
        name
        email
      }
      token
    }
  }
`;

export default graphql(loginMutation)(Login);
