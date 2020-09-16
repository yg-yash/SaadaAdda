import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { navigationRef } from './NavigationService';
import AuthStackNavigator from 'app/navigation/AuthStackNavigator';
import AppStackNavigator from 'app/navigation/AppStackNavigator';

function App() {
  const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);
  return (
    <NavigationContainer ref={navigationRef}>
      {isLoggedIn ? <AppStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default App;
