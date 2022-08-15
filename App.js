import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {Node} from 'react';
import React, {useEffect, useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import {getUserData, setUserData} from './src/data/AuthRepo';
import {loggedIn, loginSlice, verified} from './src/redux/LoginSlice';
import {store} from './src/redux/store';
import Home from './src/screens/home/Home';
import Login from './src/screens/login/Login';
import OTP from './src/screens/otp/OTP';
import Theme from './src/themes/theme';
import Routes from './src/utils/Routes';

const Stack = createNativeStackNavigator();

const MyApp: () => Node = () => {
  const [authData, setAuthData] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const dispatch = useDispatch();

  store.subscribe(() => {
    console.log('store data: ' + JSON.stringify(store.getState()));
    setAuthData(store.getState());
  });

  //Connecting with Firebase
  const onAuthStateChanged = userData => {
    console.log('user DATA: ' + userData);
    const loggedInUser = getUserData();
    const newUserData = {
      user: userData,
      isVerified:
        userData != null && loggedInUser != null
          ? loggedInUser.isVerified
          : false,
    };
    setUserData(loginSlice.actions.userData(newUserData));
    setAuthData(newUserData);
    if (!newUserData.isVerified) {
      dispatch(loggedIn());
    } else {
      dispatch(verified());
    }
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <ThemeProvider theme={Theme}>
      <NavigationContainer>
        <Stack.Navigator>
          {authData == null || !authData.isVerified ? (
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

const App = () => {
  return (
    <Provider store={store}>
      <MyApp />
    </Provider>
  );
};

export default App;
