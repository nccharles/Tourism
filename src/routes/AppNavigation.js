import React from 'react';
import { StackNavigator,TabNavigator,DrawerNavigator, TabBarBottom,NavigationActions } from 'react-navigation';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../Themes'
import {SocialIcon} from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import Signup from './Signup';
import Login from './Login';
import Products from './Products';
import CheckToken from './CheckToken';
import NewProduct from './NewProduct';
import EditProduct from './EditProduct';
import Gifts from './GiftScreen'
import Details from './Details'
import Booked from './Booked'
const Tabbs =TabNavigator(
  {
    book: {
      screen: Gifts,
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
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'book') {
          iconName = `ios-bookmark${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'booked') {
          iconName = `ios-checkbox${focused ? '' : '-outline'}`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: Colors.fire,
      inactiveTintColor: Colors.windowTint,
      style: {
        backgroundColor: Colors.transparent
        },
    },
    animationEnabled: false,
    swipeEnabled: true,
  }
);
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
    screen: Tabbs,
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