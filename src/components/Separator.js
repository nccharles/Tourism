import React from 'react'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  separatorOffset: {
    flex: 2,
    flexDirection: 'row',
  },
  separator: {
    flex: 8,
    flexDirection: 'row',
    borderColor: '#a29bfe',
    borderWidth: 0.8,
  },
})

const Separator = () => (
  <View style={styles.container}>
    <View style={styles.separatorOffset} />
    <View style={styles.separator} />
  </View>
)

export default Separator
