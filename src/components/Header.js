import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, withTheme } from 'react-native-paper'

const Header = ({theme, children}) => {
  const styles = StyleSheet.create({
    header: {
      fontSize: 21,
      fontWeight: 'bold',
      color: theme.colors.primary,
      paddingVertical: 12,
    },
  })
  return (
    <Text style={styles.header}>
      {children}
    </Text>
  )
}

export default withTheme(Header);