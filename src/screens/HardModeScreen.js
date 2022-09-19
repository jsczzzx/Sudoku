import React, { useState, useEffect, useRef, createRef, setState } from "react"
import { Button, View, Text, StyleSheet, ImageBackground, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Grid from './Grid.js';
import * as easyData from '../data/easyData.json';
import Axios from 'axios'


const url = "https://secure-earth-67171.herokuapp.com";



function HardModeScreen() {
  var rand = 0 + Math.floor(Math.random() * (9 - 0 + 1));
  var data = [];
  const[sudokuData, setSudokuData] = useState("");

  const[isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Axios.get(url+'/gethard')
    .then((response) => {
      let sudokuStr = response.data;
      var count = 0;
      for (var i = 0; i < 9; i++) {
        let line = [];
        for (var j = 0; j < 9; j++) {
          let cur = sudokuStr.charAt(count);
          count++;
          if (cur == ".") {
            line.push("");
          } else {
            line.push(cur);
          }
        }
        //alert(line);
        data.push(line);
      }
      //alert(data);
      setSudokuData(data);
      setIsLoading(false);
      //alert(data);
    });
  },[])



  let vals = easyData.sudokuList[0];
  const [isInput, setIsInput] = useState(false);
  const [userName, setUserName] = useState("");

  if (isLoading) {
    return (
      <View></View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Grid vals={sudokuData} userName={userName} mode="hard"/>
      </View>
    );
  }
  

}


export default HardModeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});


