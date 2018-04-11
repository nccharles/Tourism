import { StyleSheet,Platform} from 'react-native'
import { ApplicationStyles,Colors } from '../../Themes/'

export default  StyleSheet.create({
        cardContainer: {
          backgroundColor: '#FFF',
          borderWidth: 0,
          flex: 1,
          margin: 0,
          padding: 0,
        },
        container: {
          flex: 1,
        },
        emailContainer: {
          backgroundColor: '#FFF',
          flex: 1,
          paddingTop: 30,
        },
        headerBackgroundImage: {
          paddingBottom: 20,
          paddingTop: 35,
        },
        headerContainer: {},
        headerColumn: {
          backgroundColor: 'transparent',
          ...Platform.select({
            ios: {
              alignItems: 'center',
              elevation: 1,
              marginTop: -1,
            },
            android: {
              alignItems: 'center',
            },
          }),
        },
        placeIcon: {
          color: 'white',
          fontSize: 26,
        },
        scroll: {
          backgroundColor: '#FFF',
        },
        telContainer: {
          backgroundColor: '#FFF',
          flex: 1,
          paddingTop: 30,
        },
        userAddressRow: {
          alignItems: 'center',
          flexDirection: 'row',
        },
        userCityRow: {
          backgroundColor: 'transparent',
        },
        userCityText: {
          color: 'pink',
          fontSize: 15,
          fontWeight: '600',
          textAlign: 'center',
        },
        userImage: {
          borderColor: Colors.fire,
          borderRadius: 85,
          borderWidth: 0,
          height: 170,
          marginBottom: 15,
          width: 170,
        },
        userNameText: {
          color: '#FFF',
          fontSize: 22,
          fontWeight: 'bold',
          paddingBottom: 8,
          textAlign: 'center',
        },
        iconRow: {
          flex: 2,
          justifyContent: 'center',
        },
        smsIcon: {
          color: 'gray',
          fontSize: 30,
        },
        smsRow: {
          flex: 2,
          justifyContent: 'flex-start',
        },
        telIcon: {
          color: Colors.fire,
          fontSize: 30,
        },
        telNameColumn: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
        },
        telNameText: {
          color: 'gray',
          fontSize: 14,
          fontWeight: '200',
        },
        telNumberColumn: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginBottom: 5,
        },
        telNumberText: {
          fontSize: 16,
        },
        telRow: {
          flex: 6,
          flexDirection: 'column',
          justifyContent: 'center',
        },
        Telcontainer: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginBottom: 25,
        },
        emailColumn: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginBottom: 5,
        },
        emailIcon: {
          color: Colors.fire,
          fontSize: 30,
        },
        emailNameColumn: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
        },
        emailNameText: {
          color: Colors.fire,
          fontSize: 14,
          fontWeight: '200',
        },
        emailRow: {
          flex: 8,
          flexDirection: 'column',
          justifyContent: 'center',
        },
        emailText: {
          fontSize: 16,
        },
        iconRow: {
          flex: 2,
          justifyContent: 'center',
        },
        signup: {
            backgroundColor: Colors.fire,
            paddingVertical: 25,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 1,
          },
      })
