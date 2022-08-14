import React, {useEffect, useState} from 'react';
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
import auth from '@react-native-firebase/auth';
import {getUserLoggedIn} from './src/data/local/LocalRepo';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  const [signedIn, setSignedIn] = useState(
    getUserLoggedIn() == null ? getUserLoggedIn() : false,
  );

  return (
    <ThemeProvider theme={Theme}>
      <NavigationContainer>
        <Stack.Navigator>
          {signedIn ? (
            <>
              <Stack.Screen
                name={Routes.ROUTE_LOGIN}
                component={Login}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={Routes.ROUTE_OTP}
                component={OTP}
                options={{headerShown: false}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name={Routes.ROUTE_HOME}
                component={Home}
                options={{
                  headerTintColor: Theme.colors.textColor,
                  headerStyle: {backgroundColor: Theme.colors.primary},
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
