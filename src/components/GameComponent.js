import React, { useState, useEffect, useRef, createRef, setState, useContext, createContext} from "react"
import { Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableHighlight } from 'react-native';
import Button from './Button';
import {withTheme} from 'react-native-paper'
import BackButton from './BackButton';
import RoundButton from './RoundButton';
import {Stopwatch} from 'react-native-stopwatch-timer';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios from 'axios';
import url from '../api/ServerApi';

const GameComponent = ({theme, vals, mode, navigation}) => {

  const [currentTime, setCurrentTime] = useState();
  const [isStopwatchStart, setIsStopwatchStart] = useState(true);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [time, setTime] = useState();



  let copy = new Array(9).fill("").map(() => new Array(9).fill(""));
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      copy[i][j] = vals[i][j];
    }
  }
  const [userVals, setUserVals] = useState(copy);

  let originRed = new Array(9).fill(0).map(() => new Array(9).fill(0));
  const [isRed, setIsRed] = useState(originRed);
  const [selectedX, setSelectedX] = useState(-1);
  const [selectedY, setSelectedY] = useState(-1);



  const update = (x, y, val) => {
    if (userVals[x][y] === "" && val === "")
      return;
    let originalVal = userVals[x][y];
    let copy = [...userVals];
    copy[x][y] = val;
    setUserVals(copy);
    let startX = 0, startY = 0;
    if (x <= 2 && y <= 2) {
      startX = 0; startY = 0;
    } else if (x <= 2 && y >= 3 && y <= 5) {
      startX = 0; startY = 3;
    } else if (x <= 2 && y >= 6) {
      startX = 0; startY = 6;
    } else if (x >= 3 && x <= 5 && y <= 2) {
      startX = 3; startY = 0;
    } else if (x >= 3 && x <= 5 && y >= 3 && y <= 5) {
      startX = 3; startY = 3;
    } else if (x >= 3 && x <= 5 && y >= 6) {
      startX = 3; startY = 6;
    } else if (x >= 6 && y <= 2) {
      startX = 6; startY = 0;
    } else if (x >= 6 && y >= 3 && y <= 5) {
      startX = 6; startY = 3;
    } else {
      startX = 6; startY = 6;
    }
    if (val != "") {
      let count = 0;
      for (var i = 0; i < 9; i++) {
        if (i != y && userVals[x][i] == userVals[x][y]) {
          let copy = [...isRed];
          copy[x][i]++;
          count++;
          setIsRed(copy);
        }
      }
      for (var i = 0; i < 9; i++) {
        if (i != x && userVals[i][y] == userVals[x][y]) {
          let copy = [...isRed];
          copy[i][y]++;
          count++;
          setIsRed(copy);
        }
      }
      for (var i = startX; i < startX + 3; i++) {
        for (var j = startY; j < startY + 3; j++) {
          if (i != x && j != y && userVals[i][j] == userVals[x][y]) {
            let copy = [...isRed];
            copy[i][j]++;
            count++;
            setIsRed(copy);
          }
        }
      }
      let copy = [...isRed];
      copy[x][y] += count;
      setIsRed(copy);
    } else {
      let copy = [...isRed];
      copy[x][y] = 0;
      setIsRed(copy);
      for (var i = 0; i < 9; i++) {
        if (i != y && userVals[x][i] == originalVal) {
          let copy = [...isRed];
          copy[x][i]--;
          setIsRed(copy);
        }
      }
      for (var i = 0; i < 9; i++) {
        if (i != x && userVals[i][y] == originalVal) {
          let copy = [...isRed];
          copy[i][y]--;
          setIsRed(copy);
        }
      }
      for (var i = startX; i < startX + 3; i++) {
        for (var j = startY; j < startY + 3; j++) {
          if (i != x && j != y && userVals[i][j] == originalVal) {
            let copy = [...isRed];
            copy[i][j]--;
            setIsRed(copy);
          }
        }
      }
    }
  }


  const Cell = ({id0, id1, id2, id3}) => {
  
    let x = 3*id0+id2, y = 3*id1+id3;
    let isSelected = selectedX==x && selectedY==y;
    let style = {};

    if (isRed[x][y] > 0 && isSelected)
      style = styles.CellRedSelected;
    if (isRed[x][y] == 0 && isSelected)
      style = styles.CellBlueSelected;
    if (isRed[x][y] > 0 && !isSelected)
      style = styles.CellRed;
    if (isRed[x][y] == 0 && !isSelected)
      style = styles.CellBlue;

    if (!isStopwatchStart)
      return (
        <View style={style}>
          <Text style={{fontSize:22}}>{""}</Text>
        </View>      
      )
    else return (
      vals[x][y] != ""
      ? 
      <View style={style}>
        <Text style={{fontSize:22}}>{vals[x][y]}</Text>
      </View>
      : 
      <TouchableHighlight onPress = {() => {
        setSelectedX(x);
        setSelectedY(y);
      }}>
      <View style={style}>
        {userVals[x][y] == "" 
        ? 
          <Text/>
        : 
        <Text style={{fontSize:22, color: 'blue'}}>
          {userVals[x][y]}
        </Text>

      }
        
      </View>  
      </TouchableHighlight>
  
    )
  }
  
  
  const Row = ({id0, id1, id2}) => {
    return (
      <View style={styles.Row}>
        <Cell id0={id0} id1={id1} id2={id2} id3={0}/>
        <Cell id0={id0} id1={id1} id2={id2} id3={1}/>
        <Cell id0={id0} id1={id1} id2={id2} id3={2}/>
      </View>
    )
  }
  
  
  const SmallGrid = ({id0, id1}) => {
    return (
      <View style={styles.smallGrid}>
        <Row id0={id0} id1={id1} id2={0}/>
        <Row id0={id0} id1={id1} id2={1}/>
        <Row id0={id0} id1={id1} id2={2}/>
      </View>
    )
  }
  
  const GridRow = ({id}) => {
    return (
      <View style={styles.gridRow}>
        <SmallGrid id0={id} id1={0}/>
        <SmallGrid id0={id} id1={1}/>
        <SmallGrid id0={id} id1={2}/>
      </View>
    )
  }
  

  return (
    <View>

      <View style={styles.timerPart}>
        <RoundButton type={'keyboard-backspace'}
          onPress={()=>{navigation.navigate('MainApp')}}
        />
        <Stopwatch
          laps
          start={isStopwatchStart}
          //To start
          reset={resetStopwatch}
          //To reset
          options={options}
          //options for the styling
          getTime={(time) => {
            setTime(time);
          }}
        />
        <RoundButton type={isStopwatchStart ?'pause-circle-outline':'play-circle-outline'}
          onPress = {()=>{
            setIsStopwatchStart(!isStopwatchStart);
            //setResetStopwatch(false);
            //setCurrentTime(time);
          }}
        />
      </View>

    <View style={{alignItems: 'center'}}>
      <View style={styles.largeGrid}>
        <GridRow id={0}/>
        <GridRow id={1}/>
        <GridRow id={2}/>
      </View>
      <View style={{flexDirection:'row', justifyContent: 'center'}}>
        <RoundButton type='numeric-1-circle-outline' 
          onPress = {()=>{
            update(selectedX, selectedY, "");
            update(selectedX, selectedY, 1);
          }}
        />
        <RoundButton type='numeric-2-circle-outline'
          onPress = {()=>{
            update(selectedX, selectedY, "");
            update(selectedX, selectedY, 2);
          }}
        />
        <RoundButton type='numeric-3-circle-outline'
          onPress = {()=>{
            update(selectedX, selectedY, "");
            update(selectedX, selectedY, 3);
          }}/>
        <RoundButton type='numeric-4-circle-outline'
          onPress = {()=>{
            update(selectedX, selectedY, "");
            update(selectedX, selectedY, 4);
          }}
        />
        <RoundButton type='numeric-5-circle-outline'
          onPress = {()=>{
            update(selectedX, selectedY, "");
            update(selectedX, selectedY, 5);
          }}
        />
      </View>
      <View style={{flexDirection:'row', justifyContent: 'center'}}>
      <RoundButton type='numeric-6-circle-outline' 
          onPress = {()=>{
            update(selectedX, selectedY, "");
            update(selectedX, selectedY, 6);
          }}
        />
        <RoundButton type='numeric-7-circle-outline'
          onPress = {()=>{
            update(selectedX, selectedY, "");
            update(selectedX, selectedY, 7);
          }}
        />
        <RoundButton type='numeric-8-circle-outline'
          onPress = {()=>{
            update(selectedX, selectedY, "");
            update(selectedX, selectedY, 8);
          }}
        />
        <RoundButton type='numeric-9-circle-outline'
          onPress = {()=>{
            update(selectedX, selectedY, "");
            update(selectedX, selectedY, 9);
          }}
        />
        <RoundButton type='arrow-collapse-left' isDelete={true}
          onPress = {()=>{
            update(selectedX, selectedY, "");
          }}
        />
      </View>
      <Button mode="contained" onPress={() => {
        let isValid = true;
        for (var i = 0; i < 9; i++) {
          for (var j = 0; j < 9; j++) {
            if (isRed[i][j] != 0 || userVals[i][j] == "") {
              isValid = false;
              break;
            }
          }
        }
        //isValid=false;
        if (isValid) {
          setIsStopwatchStart(false);
          let timeArray = time.split(':').map(Number);
          let timeInSeconds = 3600*timeArray[0]+60*timeArray[1]+timeArray[2];
          AsyncStorage.getItem("userId").then((resp) => {
            let data = {user_id: resp, time: timeInSeconds, mode: mode};
            Axios.post(url+"/scores", data).then((resp) => {
              alert("Nice! You finished in " + timeInSeconds + "s.");
              navigation.navigate('MainApp');
            })
          })   
        } else {
          alert("You haven't finished yet!");
        }
      }}>
        Submit
      </Button>
      </View>
    </View>
  );
}

export default withTheme(GameComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },
  timerPart: {
    flex: 0.5,
    flexDirection: 'row',
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  largeGrid:{
    borderWidth: 3
  },
  gridRow:{
    flexDirection: 'row'
  },
  smallGrid:{
    borderWidth: 1.5
  },
  Row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  CellBlue:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF2F8',
    margin: 2,
    height: 30,
    width: 30,
  },
  CellBlueSelected:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF2F8',
    margin: 2,
    borderWidth: 2,
    borderColor: 'red',
    height: 30,
    width: 30,
  },
  CellRed:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5B7B1',
    margin: 2,
    height: 30,
    width: 30,
  },
  CellRedSelected:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5B7B1',
    margin: 2,
    borderWidth: 2,
    borderColor: 'red',
    height: 30,
    width: 30,
  },

});

const options = {
  container: {
    backgroundColor: 'darkseagreen',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },
};