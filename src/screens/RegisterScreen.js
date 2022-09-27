import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text, withTheme} from 'react-native-paper'
import Axios from 'axios'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import url from '../api/ServerApi'

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


const RegisterScreen = ({ theme, navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_2, setPassword_2] = useState("");


  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
  });

  const onSignUpPressed = () => {
    if (name === "" || email === "" || password === "" || password_2 === "")
      alert("Please fill all required fields!");
    else if (password != password_2) {
      alert("Passwords don't match!");
      setPassword("");
      setPassword_2("");
    } else if (!validateEmail(email)) {
      alert("The email address is invalid!");
      setEmail("");
    } else {
      let data0 = {email: email};  
      Axios.post(url+"/user/get_by_email", data0).then (resp => {
        let respData = resp.data;
        if (respData != null) {
          alert("Email is already used!");
          setEmail("");
        } else {
          let data = {email: email, name: name, password: password};
          Axios.post(url+"/users", data).then (resp => {
            alert("Successfully Registered!");
            let respData = resp.data;
            AsyncStorage.setItem("userInfo", respData).then(() => {
              navigation.navigate('MainApp');
            })
          })
        }
      })
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name}
        onChangeText={(text) => setName(text)}
      />
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
      <TextInput
        label="Re-enter Password"
        returnKeyType="done"
        value={password_2}
        onChangeText={(text) => setPassword_2(text)}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
};

export default withTheme(RegisterScreen);