import React, { useState, useEffect, useRef, createRef, setState, useContext, createContext } from "react"
import { Text, TextInput, View, StyleSheet, Button, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Timer from './Timer';
import ValueProvider, {useValue} from './ValueContext';
import Axios from 'axios';

const url = "https://secure-earth-67171.herokuapp.com";


const Cell = ({id0, id1, id2, id3}) => {
  const inputRef = React.createRef()
  const value = useValue();
  const vals = value.vals;
  const isRed = value.isRed;
  const update = value.update;


  let x = 3*id0+id2, y = 3*id1+id3;
  return (

    <View style={isRed[x][y] ? styles.CellRed : styles.CellBlue}>
      {vals[x][y] == "" ? 
      <TextInput
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
      : <Text style={{fontSize:22}}>{vals[3*id0+id2][3*id1+id3]}</Text>}
      
    </View>  
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
    <View style={styles.largeGrid}>
      <GridRow id={0}/>
      <GridRow id={1}/>
      <GridRow id={2}/>
    </View>
  )
}

const Grid = ({vals, userName, mode}) => {

  const storeData = async (value) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@sudoku_best');
      if (jsonValue == null) {
        await AsyncStorage.setItem('@sudoku_best', JSON.stringify(value));
        console.log('just stored ' + value);
      } else {
        var data = JSON.parse(jsonValue);
        //alert(data.userName);
        //alert(jsonValue);
        //alert(data.userName);
        //alert(value.userName);
        if (value.time <= data.time) {
          await AsyncStorage.setItem('@sudoku_best', JSON.stringify(value));
          console.log('just stored '+ jsonValue);
        }
        //const jsonValue = JSON.stringify(value)
      }

    } catch (e) {
      console.log("error in storeData ");
      console.dir(e);
      // saving error
    }
  }

  const storeData2 = async (value) => {
    try {
      let userName = value.userName;
      let timeText = value.timeText;
      const jsonValue = await AsyncStorage.getItem('@sudoku_scores');
      if (jsonValue == null) {
        var data = [{
          userName: userName,
          time: time,
          timeText: timeText
        }]      
        await AsyncStorage.setItem('@sudoku_scores', JSON.stringify(data));
        console.log('just stored ' + value);
      } else {
        var data = JSON.parse(jsonValue);
        var curData = {
          userName: userName,
          time: time,
          timeText: timeText
        };
        var newData = [...data, curData];
        await AsyncStorage.setItem('@sudoku_scores', JSON.stringify(newData));
        console.log('just stored '+ jsonValue);
        //const jsonValue = JSON.stringify(value)
      }

    } catch (e) {
      console.log("error in storeData ");
      console.dir(e);
      // saving error
    }
  }

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch(e) {
      console.dir(e);
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@sudoku_best');
      let data = null;
      if (jsonValue!=null) {
        data = JSON.parse(jsonValue);
        setBestPerson(data.userName);
        setBestTime(data.time);
        //alert(jsonValue);
        console.log('just set Info, Correct and Answered');
      } else {
        console.log('just read a null value from Storage');
      }
    } catch(e) {
      console.log("error in getData ");
      console.dir(e);
      // error reading value
    }
  }


/*useEffect(() => {
  clearAll();
},[])*/
  


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




  const updateTime = (time) => {
    setTime(time);
  }


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

  const updateSelected = (x, y) => {
    setCurX(x);
    setCurY(y);
  }


  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <View style={styles.timerPart}>
        {isFinished ? <Text>N/A</Text> : <Timer updateTime={updateTime}/>}
      </View>
      <View style={styles.mainPart}>
      <ValueProvider
        value={{vals, isRed, update}} >  
        <LargeGrid/>
      </ValueProvider>
      </View>
      <View style={styles.subPart}>
        <View style={styles.subPart1}>
          <Button color="blue" 
           title="SUBMIT" 
            onPress={() => {
              let isValid = true;
              for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                  if (isRed[i][j] != 0 || userVals[i][j] == "") {
                    isValid = false;
                    break;
                  }
                }
              }
              if (isValid) {
                alert("Congratulations!\nYou finish in " + time + " s!");
                setIsFinished(true);
                let timeText = (parseInt(time / 60) < 10 ? "0" + parseInt(time / 60) : parseInt(time % 60)) + ":" + ((time % 60) < 10 ? "0" + time % 60 : time % 60);
                AsyncStorage.getItem('@name')
                  .then((userName) => {
                    const data = {name:userName, time:time};
                    if (mode == "easy") {
                      Axios.post(url+'/submit',data);
                    } else if (mode == "hard") {
                      Axios.post(url+'/submithard',data);
                    }
                  })

                //storeData(theInfo);
                //storeData2(theInfo);
                //alert(JSON.stringify(theInfo));

              } else {
                alert("Failed");
              }
            }}>
          </Button>
        </View>



      </View>

    </KeyboardAvoidingView>
    //<LargeGrid vals={vals} userVals={userVals} setUserVals={setUserVals}/>
  );
}
//<Text>{userVals.toString()}</Text>
//<Text>{isRed.toString()}</Text>

export default Grid;


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