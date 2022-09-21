import React, { useState, useEffect, useRef, createRef, setState } from "react"
import { View, Text, StyleSheet, ImageBackground, Image, TextInput } from 'react-native';

import Grid from '../components/Grid';
import Timer from '../components/Timer';
import * as easyData from './easyData.json';
import Axios from 'axios'

import {withTheme} from  'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'


const url = "https://secure-earth-67171.herokuapp.com";



const GameScreen = () => {
  var rand = 0 + Math.floor(Math.random() * (9 - 0 + 1));
  var data = [];
  const[sudokuData, setSudokuData] = useState("");

  const[isLoading, setIsLoading] = useState(true);

  /*useEffect(() => {
    Axios.get(url+'/geteasy')
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
        data.push(line);
      }
      setSudokuData(data);
      setIsLoading(false);
    });
  },[])*/



  let vals = easyData.sudokuList[0];
  const [isInput, setIsInput] = useState(false);
  const [userName, setUserName] = useState("");
  const [time, setTime] = useState(0);


  const updateTime = (time) => {
    setTime(time);
  }


  return (
    <Background>
      <Timer updateTime={updateTime}/>
      <Grid vals={easyData.sudokuList[0]} userName={userName} mode="easy"/>
    </Background>
  );
  

}


export default withTheme(GameScreen);

const styles = StyleSheet.create({
  container: {
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


