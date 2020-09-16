import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';
const Stack = createStackNavigator();

const AppStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Dashboard"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Dashboard" component={MainTabNavigator} />
  </Stack.Navigator>
);

export default AppStackNavigator;
