import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton, withTheme } from 'react-native-paper'

const Button = ({ theme, mode, style, ...props }) => {
  const styles = StyleSheet.create({
    button: {
      width: '100%',
      marginVertical: 10,
      paddingVertical: 2,
    },
    text: {
      fontWeight: 'bold',
      fontSize: 15,
      lineHeight: 26,
    },
  })
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    >
    </PaperButton>

  )
}

export default withTheme(Button);

