import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',

  },
  bg: {
    paddingTop: 30,
    width: null,
    height: null
  },
  headerContainer: {
    flex: 1,
  },
  inputsContainer: {
    flex: 4,
    marginTop: 30,
  },
  footerContainer: {
    flex: 2
  },
  headerIconView: {
    marginLeft: 10,
    backgroundColor: 'transparent'
  },
  headerBackButtonView: {
    width: 25,
    height: 25,
  },
  backButtonIcon: {
    width: 25,
    height: 25
  },
  headerTitleView: {
    backgroundColor: 'transparent',
    marginTop: 25,
    marginLeft: 25,
  },
  titleViewText: {
    fontSize: 40,
    color: '#fff',
  },
  inputs: {
    paddingVertical: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent',
    flexDirection: 'row',
    height: 60,
  },
  error: {
    borderWidth: 1,
    borderBottomColor: 'red',
    borderColor: 'transparent',
    flexDirection: 'row',
    height: 60,
  },
  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    width: 30,
    height: 30,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  signup: {
    backgroundColor: '#a29bfe',
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  greyFont: {
    color: '#D8D8D8'
  },
  signuperror: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  redFont: {
    color: 'red'
  },
  
  whiteFont: {
    color: '#FFF'
  },
  loadingImage: {
    width: 40,
    height: 40
  }
})
