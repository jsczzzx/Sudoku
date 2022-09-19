import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainApp from './src/MainApp';
import StartScreen from './src/screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';


const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{
          headerShown: false
        }}
      />      
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
