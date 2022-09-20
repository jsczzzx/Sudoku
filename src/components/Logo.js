import React from 'react'
import { Image, StyleSheet } from 'react-native'
import {withTheme} from  'react-native-paper'

const Logo = () => {
  const styles = StyleSheet.create({
    image: {
      width: 110,
      height: 110,
      marginBottom: 8,
    },
  })
  return <Image source={require('../assets/logo.png')} style={styles.image} />
}

export default withTheme(Logo);