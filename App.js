import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {Node} from 'react';
import React, {useEffect, useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import {getUserData, setUserData} from './src/data/AuthRepo';
import {loggedIn, loginSlice, loggedOut} from './src/redux/LoginSlice';
import {store} from './src/redux/store';
import Home from './src/screens/home/Home';
import Login from './src/screens/login/Login';
import Theme from './src/themes/theme';
import Routes from './src/utils/Routes';
import {Button} from 'react-native';
import {signOut} from './src/data/AuthRepo';

const Stack = createNativeStackNavigator();

const MyApp: () => Node = () => {
  const [authData, setAuthData] = useState({user: {}, loggedIn: false});
  const [initializing, setInitializing] = useState(true);
  const dispatch = useDispatch();

  store.subscribe(() => {
    setAuthData(store.getState().loginSlice);
  });

  //Connecting with Firebase
  const onAuthStateChanged = async userData => {
    const loggedInUser = await getUserData();

    if (loggedInUser.loggedIn == true) {
      dispatch(loggedIn(loggedInUser));
    } else {
      dispatch(loggedOut());
    }
    if (initializing) setInitializing(false);
  };

  const logOut = async () => {
    await setUserData({user: {}, loggedIn: false});
    dispatch(loggedOut());
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
          {authData.loggedIn == false ? (
            <>
              <Stack.Screen
                name={Routes.ROUTE_LOGIN}
                component={Login}
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
                  headerRight: () => (
                    <Button onPress={() => logOut(0)} title="Logout" />
                  ),
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
