import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  KeyboardAvoidingView, 
  FlatList,
  Switch
} from 'react-native';
import {List, withTheme} from 'react-native-paper';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import RoundButton from '../components/RoundButton';
import url from '../api/ServerApi';

const HighscoreScreen = ({theme}) => {
  
  const [scores, setScores] = useState([]);
  const [userId, setUserId] = useState("sth");
  const [isHard, setIsHard] = useState(false);
  const [isLocal, setIsLocal] = useState(true);



  const getScores = (user_id, mode) => {
    let data = {user_id: user_id, mode: mode};
    Axios.post(url+"/score/get_top_by_id", data).then(resp => {
      setScores(resp.data);
    })
  }
  useEffect(() => {
    AsyncStorage.getItem("userId").then(resp => {
      setUserId(parseInt(resp));
      getScores(isLocal ? parseInt(resp) : -1, isHard ? "hard" : "easy");
    })
  }, [isHard, isLocal]);

  return (
    <Background>
      <Header style={{fontSize:25}}>Highscore</Header>
      <View style={{width:"100%",flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={{fontWeight:'bold', fontSize:'25', color:'darkseagreen'}}>Easy</Text>
          <Switch
            trackColor={{ false: "gainsboro", true: "gainsboro" }}
            thumbColor={isHard ? "crimson" : "darkseagreen"}
            ios_backgroundColor="white"
            onValueChange={()=>{setIsHard(!isHard)}}
            value={isHard}
          />
        <Text style={{fontWeight:'bold', fontSize:'25', color:'crimson'}}>Hard</Text>
      </View>

      <View  style={{width:"100%", height:"84%"}}>

        <ScrollView>
          <List.Section>
            {scores.map((item, index) => (
              <List.Item
                style={{
                  padding: 10,
                  backgroundColor: 'gainsboro',
                    borderRadius: 10,
                    marginVertical: 5,
                    borderWidth: 0,
                  }}
                  title={item.name+"  "+item.time+"s"}
                  description={item.created_at}
                  left={props => <List.Icon {...props}  icon={"numeric-"+(index+1)+"-circle"} />}
                  //left={props => <List.Icon {...props} icon={"numeric-"+(index+1)+"-circle"} />}

              />
            ))}

          </List.Section>


        </ScrollView>


      <View style={{flexDirection:'row', justifyContent: 'space-around'}}>
      <Button 
          style={{backgroundColor: isLocal ?  theme.colors.secondary : "gainsboro", width: 100}}
          mode="contained" 
          onPress={()=> {
            //setScores(114514);
            setIsLocal(true);
            //setIsLoading(!isLoading);
          }}
        >
          Local
        </Button>
        <Button 
          style={{backgroundColor: isLocal ? "gainsboro" : theme.colors.secondary, width: 100}}
          mode="contained" 
          onPress={()=> {
            setIsLocal(false);
          }}
        >
          Global
        </Button>
      </View>
      </View>
      </Background>
  );
};

export default withTheme(HighscoreScreen);


