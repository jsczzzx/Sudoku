import React, { useState, useEffect, useRef, createRef, setState } from "react"
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, AsyncStorage } from 'react-native';

import GameComponent from '../components/GameComponent';
import * as easyData from './easyData.json';
import Axios from 'axios'

import {withTheme} from  'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'


const url = "https://secure-earth-67171.herokuapp.com";



const GameScreen = ({theme}) => {
  var rand = 0 + Math.floor(Math.random() * (9 - 0 + 1));
  var data = [];
  const[sudokuData, setSudokuData] = useState("");

  const[isLoading, setIsLoading] = useState(true);




  let vals = easyData.sudokuList[0];
  const [isInput, setIsInput] = useState(false);
  const [userName, setUserName] = useState("");



  return (
    <Background>
      <GameComponent vals={easyData.sudokuList[0]} userName={userName} mode="easy"/>
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


