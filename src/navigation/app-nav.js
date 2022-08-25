import {NavigationContainer} from '@react-navigation/native';
import React, {createContext, Node, useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import {store} from '../redux/store';
import {getUserData} from '../repos/auth-repo';
import Theme from '../utils/theme';
import {AuthNav} from './auth-nav';
import {LoggedInNav} from './loggedin-nav';

export const UserDataContext = createContext();

const AppNav: () => Node = () => {
  const [userData, setData] = useState();

  store.subscribe(() => {
    if (
      userData != null &&
      store.getState().loginSlice.loggedIn != userData.loggedIn
    )
      getAuthData();
  });

  useEffect(() => {
    getAuthData();
  }, []);

  const getAuthData = async () => {
    const data = await getUserData();
    setData(data);
  };
  if (userData == null) return null;

  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <UserDataContext.Provider value={userData}>
          <NavigationContainer>
            {userData.loggedIn == false ? <AuthNav /> : <LoggedInNav />}
          </NavigationContainer>
        </UserDataContext.Provider>
      </ThemeProvider>
    </Provider>
  );
};

export default AppNav;
