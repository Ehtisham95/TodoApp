import React from 'react';
import type {Node} from 'react';
import {Text, View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/login/Login';
import Home from './src/screens/home/Home';
import OTP from './src/screens/otp/OTP';
import Routes from './src/utils/Routes';
import {ThemeProvider} from 'styled-components';
import Theme from './src/themes/theme';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <ThemeProvider theme={Theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Routes.ROUTE_LOGIN}>
          <Stack.Screen
            name={Routes.ROUTE_LOGIN}
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Routes.ROUTE_OTP}
            component={OTP}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Routes.ROUTE_HOME}
            component={Home}
            options={{
              headerTintColor: Theme.colors.textColor,
              headerStyle: {backgroundColor: Theme.colors.primary},
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
