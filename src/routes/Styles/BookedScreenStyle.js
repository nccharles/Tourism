import { StyleSheet,Dimensions } from 'react-native'
const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  imageprofile: {
    flex: 1,
    width: null,
    height: null,
  },
  BodyGift: {
    alignItems: 'center',
  },
  giftTitle: {
    fontWeight: '900',
    fontSize: 30,
    justifyContent: 'center'
  },
})
