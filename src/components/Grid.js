import React, { useState, useEffect, useRef, createRef, setState, useContext, createContext,AsyncStorage } from "react"
import { Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableHighlight } from 'react-native';
import ValueProvider, {useValue} from './ValueContext';
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
  const [time, setTime] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [bestPerson, setBestPerson] = useState("Null");
  const [bestTime, setBestTime] = useState("NA");
  const [isFinished, setIsFinished] = useState(false);



  const update = (x, y, val) => {
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
        onPress={() => console.log('Pressed')}
      />
    )
  }

  const Cell = ({id0, id1, id2, id3}) => {
    const inputRef = React.createRef()
    const value = useValue();
    const vals = value.vals;
    const isRed = value.isRed;
    const update = value.update;
  
  
    let x = 3*id0+id2, y = 3*id1+id3;
    return (
      <TouchableHighlight onPress = {() => {
        let copy = [...isRed];
        copy[x][y]++;
        setIsRed(copy);
      }}>
  
      <View style={isRed[x][y] ? styles.CellRed : styles.CellBlue}>
        {vals[x][y] == "" ? 
        <Text/>
        : <Text style={{fontSize:22}}>{vals[3*id0+id2][3*id1+id3]}</Text>
        /*<TextInput
          ref={inputRef}
          style={{height: 28, width: 28, fontSize: 22, color: 'blue', textAlign: 'center'}}
          maxLength = {1}
          onChangeText = {(text) => {
            if ((text > 0 && text <= 9) || text == "") {
              update(x, y, text);
            } else {
              inputRef.current.clear()
            }
          }}
        > 
        </TextInput>
        : <Text style={{fontSize:22}}>{vals[3*id0+id2][3*id1+id3]}</Text>*/
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
      <View>
      <View style={styles.largeGrid}>
        <GridRow id={0}/>
        <GridRow id={1}/>
        <GridRow id={2}/>
      </View>
      <View style={{flexDirection:'row', justifyContent: 'center'}}>
        <RoundButton type='numeric-1-circle-outline'/>
        <RoundButton type='numeric-2-circle-outline'/>
        <RoundButton type='numeric-3-circle-outline'/>
        <RoundButton type='numeric-4-circle-outline'/>
        <RoundButton type='numeric-5-circle-outline'/>
      </View>
      <View style={{flexDirection:'row', justifyContent: 'center'}}>
        <RoundButton type='numeric-6-circle-outline'/>
        <RoundButton type='numeric-7-circle-outline'/>
        <RoundButton type='numeric-8-circle-outline'/>
        <RoundButton type='numeric-9-circle-outline'/>
        <RoundButton type='arrow-collapse-left' isDelete={true}/>
      </View>
      </View>
    )
  }



  return (

      <ValueProvider
        value={{vals, isRed, update}} >  
        <LargeGrid/>
      </ValueProvider>

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
  CellRed:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5B7B1',
    margin: 2,
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