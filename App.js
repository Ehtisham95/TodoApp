import {NavigationContainer} from '@react-navigation/native';
import type {Node} from 'react';
import React from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import {AuthNav} from './src/navigation/AuthNav';
import {LoggedInNav} from './src/navigation/LoggedInNav';
import {store} from './src/redux/store';
import Theme from './src/themes/theme';

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <NavigationContainer>
          {authData.loggedIn == false ? <AuthNav /> : <LoggedInNav />}
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
