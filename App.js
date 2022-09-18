import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

const MainRoute = () => <Text>Music</Text>;

const StatisticsRoute = () => <Text>Recents</Text>;

const AccountRoute = () => <Text>Accounts</Text>;

const AboutRoute = () => <Text>Notifications</Text>;

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'main', title: 'Main', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'statistics', title: 'Statistics', focusedIcon: 'chart-bar', unfocusedIcon: 'chart-bar-stacked' },
    { key: 'account', title: 'Account', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
    { key: 'about', title: 'About', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    main: MainRoute,
    statistics: StatisticsRoute,
    account: AccountRoute,
    about: AboutRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MyComponent;