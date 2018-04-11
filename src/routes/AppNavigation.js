import React from 'react';
import {StackNavigator,DrawerNavigator} from 'react-navigation'
import Signup from './Signup';
import Login from './Login';
import Products from './Products';
import CheckToken from './CheckToken';
import NewProduct from './NewProduct';
import EditProduct from './EditProduct';
import Gifts from './GiftScreen'
import Details from './Details'
import Booked from './Booked'

const AppNavigator = StackNavigator ({
  login: {
    screen: Login,
    headerMode: 'none',
       header: null,  
       navigationOptions: {
        header: null,
    }  
  },
  signup: {
    screen: Signup,
    headerMode: 'none',
       header: null,  
       navigationOptions: {
        header: null,
    }  
  },
  booking: {
    screen: Gifts,
    headerMode: 'none',
       header: null,  
       navigationOptions: {
        header: null,
    }  
  },
  details: {
    screen: Details,
    headerMode: 'none',
    header: null,  
    navigationOptions: {
     header: null,
 }  
  },
  booked: {
    screen: Booked,
    headerMode: 'none',
    header: null,  
    navigationOptions: {
     header: null,
 }  
  },
  Check: {
    screen: CheckToken,
    headerMode: 'none',
    header: null,
    navigationOptions: {
        header: null
    },
  },
  },
  {
    initialRouteName: 'Check',
  },
  {
    headerMode: 'screen',
  },
);
export default class AppNavigation extends React.Component {
    render() {
      return <AppNavigator />;
    }
  }