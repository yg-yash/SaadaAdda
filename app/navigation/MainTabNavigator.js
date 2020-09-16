import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookingNavigator from './BookingNavigator';
import { Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import ReservationScreen from 'app/screens/MainScreens/Reservations/ReservationScreen';
import ProfileScreen from 'app/screens/ProfileScreen/ProfileScreen';

const Tabs = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tabs.Navigator>
    <Tabs.Screen
      name="Home"
      options={{
        tabBarIcon: ({ color, focused, size }) => (
          <Icon
            type="materialicons"
            name="home"
            color={focused ? Colors.primaryGradient : '#999999'}
            size={size}
          />
        ),
      }}
      component={BookingNavigator}
    />

    <Tabs.Screen
      name="Reservations"
      options={{
        tabBarIcon: ({ color, focused, size }) => (
          <Icon
            type="materialicons"
            name="view-list"
            color={focused ? Colors.primaryGradient : '#999999'}
            size={size}
          />
        ),
      }}
      component={ReservationScreen}
    />
    <Tabs.Screen
      name="Profile"
      options={{
        tabBarIcon: ({ color, focused, size }) => (
          <Icon
            type="font-awesome"
            name="user"
            color={focused ? Colors.primaryGradient : '#999999'}
            size={size}
          />
        ),
      }}
      component={ProfileScreen}
    />
  </Tabs.Navigator>
);

export default MainTabNavigator;
