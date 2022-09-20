import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, withTheme } from 'react-native-paper'

const Paragraph = (props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: 15,
      lineHeight: 21,
      textAlign: 'center',
      marginBottom: 12,
    },
  })
  return <Text style={styles.text} {...props} />
}

export default withTheme(Paragraph);
