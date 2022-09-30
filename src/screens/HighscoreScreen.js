import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';
import {List, withTheme} from 'react-native-paper';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import url from '../api/ServerApi';

//importing library to use Stopwatch and Timer


const HighscoreScreen = ({theme}) => {

useEffect(() => {
  AsyncStorage.getItem("userId").then(resp => {
    let data = {user_id: parseInt(resp), mode: "easy"};
    Axios.post(url+"/score/get_top_by_id", data).then(resp => {
      //alert(JSON.stringify(resp));

    })
  })
}, []);

  return (
    <Background>
      <Header style={{fontSize:25}}>Highscore</Header>
      <View  style={{width:"100%", height:"85%"}}>

      <ScrollView style={{backgroundColor:'lightgrey'}}>
       

          <List.Item
            title="First Item"
            description="Item description"
            left={props => <List.Icon {...props} icon="folder" />}
          />
          <List.Item
            title="First Item"
            description="Item description"
            left={props => <List.Icon {...props} icon="folder" />}
          />
                    <List.Item
            title="First Item"
            description="Item description"
            left={props => <List.Icon {...props} icon="folder" />}
          />
          <List.Item
            title="First Item"
            description="Item description"
            left={props => <List.Icon {...props} icon="folder" />}
          />
 

          <List.Item
            title="First Item"
            description="Item description"
            left={props => <List.Icon {...props} icon="folder" />}
          /> 

      </ScrollView>
      <View style={{flexDirection:'row', justifyContent: 'space-around'}}>
      <Button 
          style={{backgroundColor: theme.colors.secondary, width: 100}}
          mode="contained" 
          onPress={()=> navigation.navigate('Game', { mode: 'hard' })}
        >
          Local
        </Button>
        <Button 
          style={{backgroundColor: theme.colors.secondary, width: 100}}
          mode="contained" 
          onPress={()=> navigation.navigate('Game', { mode: 'hard' })}
        >
          Global
        </Button>
      </View>
      </View>
      </Background>
  );
};

export default withTheme(HighscoreScreen);


