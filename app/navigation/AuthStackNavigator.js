import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import LandingPage from 'app/screens/AuthScreens/LandingScreen/LandingScreen';
import SignInScreen from 'app/screens/AuthScreens/SignInScreen/SignInScreen';
import ForgetPassworScreen from 'app/screens/AuthScreens/ForgetPassword/ForgetPassword';
import SignUpScreen from 'app/screens/AuthScreens/SignUpScreen/SignUpScreen';
import OTPScreen from 'app/screens/AuthScreens/OTPScreen/OTPScreen';
import AppStackNavigator from './AppStackNavigator';
import ResetPassword from 'app/screens/AuthScreens/ResetPasswordScreen';

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,

        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Landing" component={LandingPage} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="Forget" component={ForgetPassworScreen} />
      <Stack.Screen name="Reset Password" component={ResetPassword} />
      <Stack.Screen name="App" component={AppStackNavigator} />
    </Stack.Navigator>
  );
}
