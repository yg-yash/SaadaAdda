import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import BookingScreen from 'app/screens/MainScreens/BookingScreen/BookingScreen';
import CouplesBooking from 'app/screens/MainScreens/BookingScreen/CouplesBooking';
import HomeScreen from 'app/screens/MainScreens/Dashboard/DashboardTabScreens/HomeScreen';
import CategoryItemScreen from 'app/screens/MainScreens/CategoryItem/CategoryItemScreen';
import CheckoutScreen from 'app/screens/MainScreens/CheckoutScreen/CheckoutScreen';
import OrderScreen from 'app/screens/MainScreens/BookingScreen/OrderDoneScreen';

const Stack = createStackNavigator();
const BookingNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
    <Stack.Screen name="Booking" component={BookingScreen} />
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="CategoryItem" component={CategoryItemScreen} />
    <Stack.Screen name="CouplesBooking" component={CouplesBooking} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
    <Stack.Screen name="Order" component={OrderScreen} />
  </Stack.Navigator>
);

export default BookingNavigator;
