import React, {useState, useEffect} from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import HighscoreScreen from './screens/HighscoreScreen';

import Axios from 'axios';




const MainApp = ({ theme, navigation }) => {

  const HomeRoute = () => <HomeScreen navigation={navigation}/>;
  const HighscoreRoute = () => <HighscoreScreen/>;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'highscore', title: 'Highscore', focusedIcon: 'format-list-bulleted-square', unfocusedIcon: 'format-list-checkbox'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    highscore: HighscoreRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MainApp;