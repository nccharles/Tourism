import { StyleSheet,Dimensions } from 'react-native'
const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
  },
  bookButton: {
      backgroundColor: 'lightgrey',
      padding: 10,
      marginTop: 10,
      borderRadius: 4,
  },
  VoucherBody: {
    position: 'absolute',
    backgroundColor: "#a29bfe",
    marginTop: 180,
    marginLeft: 20,
    marginBottom: 20
  },
  timeHeader: {
      flexDirection: 'row',
      marginBottom: 40,
      justifyContent: 'space-between',
  },
  BodyPercent: {
      flexDirection: 'column',
      justifyContent: 'space-around',
  },
  TextPercent: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 40,
  },
  textHeader: {
      color: '#fff',
      fontSize: 20,
  },
  BodyGift: {
    alignItems: 'center',
  },
  giftTitle: {
    fontWeight: '900',
    fontSize: 30,
    justifyContent: 'center'
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },

})
