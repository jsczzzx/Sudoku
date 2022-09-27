import React, { useState, useEffect, useRef, createRef, setState, useContext, createContext,AsyncStorage } from "react"
import { Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableHighlight } from 'react-native';
import Button from './Button';
import {IconButton} from 'react-native-paper';
import {withTheme} from 'react-native-paper'


const Grid = ({theme, vals, userName, mode}) => {

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

  const RoundButton = (props) => {
    return (
      <IconButton
        style={{
          width: '100%',
        }}
        icon={props.type}
        iconColor= {props.isDelete ? theme.colors.error : theme.colors.primary}
        size={40}
        onPress={props.onPress}
      />
    )
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

    return (
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
  
  const LargeGrid = () => {
    return (
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
      <Button mode="contained" onPress={()=>{}}>
        Submit
      </Button>
      </View>
    )
  }
  return (
    <LargeGrid/>
  );
}

export default withTheme(Grid);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },
  timerPart: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10
  },
  mainPart: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  subPart: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  subPart1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subPart2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  CellButton:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff9933',
    margin: 2,
    borderWidth: 1,
    height: 30,
    width: 30,
  },
  Circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    margin: 2,
    borderRadius: 15,
    backgroundColor: '#ff9933',
  }
});