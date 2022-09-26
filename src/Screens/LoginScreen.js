import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, AsyncStorage } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import Axios from 'axios';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'

const url = "http://localhost:3000";

const LoginScreen = ({ theme, navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const styles = StyleSheet.create({
    forgotPassword: {
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    forgot: {
      fontSize: 13,
      color: theme.colors.secondary,
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
  })
  const onLoginPressed = () => {
    if (email === "" || password === "")
      alert("Please fill all required fields!");
    else {
      let data = {email: email};
      Axios.post(url+"/user/get_by_email", data).then (resp => {
        let respData = resp.data;
        if (respData == null)
          alert("Account doesn't exist!");
        else if (respData.password != password)
          alert("Wrong Password!");
        else
        AsyncStorage.setItem("userId", respData.id.toString()).then(() => {
          navigation.navigate('MainApp');
        })      
      })
    }
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Register')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

export default withTheme(LoginScreen);