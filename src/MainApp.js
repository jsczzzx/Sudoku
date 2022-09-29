import React, {useState, useEffect} from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import HighscoreScreen from './screens/HighscoreScreen';
import StatisticsScreen from './screens/StatisticsScreen';

import Axios from 'axios';




const MainApp = ({ theme, navigation }) => {

  const HomeRoute = () => <HomeScreen navigation={navigation}/>;
  const HighscoreRoute = () => <HighscoreScreen/>;
  const StatisticsRoute = () => <StatisticsScreen/>;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'highscore', title: 'Highscore', focusedIcon: 'format-list-bulleted-square', unfocusedIcon: 'format-list-checkbox'},
    { key: 'statistics', title: 'Statistics', focusedIcon: 'chart-bar', unfocusedIcon: 'chart-bar-stacked' }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    highscore: HighscoreRoute,
    statistics: StatisticsRoute,
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