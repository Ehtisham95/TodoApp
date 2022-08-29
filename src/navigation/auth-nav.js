import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Routes from './routes';
import React from 'react';
import Login from '../screens/login/login';

const Stack = createNativeStackNavigator();

export const AuthNav = () => {
  return (
    <Stack.Navigator>
      <>
        <Stack.Screen name={Routes.ROUTE_LOGIN} component={Login} />
      </>
    </Stack.Navigator>
  );
};
