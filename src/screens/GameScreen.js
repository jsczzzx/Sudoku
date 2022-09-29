import React, { useState, useEffect, useRef, createRef, setState } from "react"
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, AsyncStorage } from 'react-native';
import GameComponent from '../components/GameComponent';
import {withTheme} from  'react-native-paper'
import Background from '../components/Background'
import {generate} from '../components/sudoku'

const GameScreen = ({theme, navigation, route}) => {
  const mode = route.params.mode;

  let data = [];
  let sudokuStr = mode==='easy'? generate("medium"):generate("insane");
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

  return (
    <Background>
      <GameComponent vals={data} navigation={navigation}/>
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


