import React from 'react'
import {withTheme} from  'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

const StartScreen = ({ navigation }) => {
  return (
    <Background>
      <Logo />
      <Header>Super Sudoku !</Header>
      <Paragraph>
        Maybe the best Sudoku Game in Waltham
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Register')}
      >
        Sign Up
      </Button>
    </Background>
  )
}

export default withTheme(StartScreen);