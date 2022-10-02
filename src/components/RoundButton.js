import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton, IconButton, withTheme } from 'react-native-paper'

const RoundButton = ({theme, ...props}) => {
  return (
    <IconButton
      style={{
        width: '100%',
      }}
      icon={props.type}
      iconColor= {props.isDelete ? theme.colors.error : theme.colors.primary}
      size={props.size}
      onPress={props.onPress}
    />
  )
}

export default withTheme(RoundButton);

