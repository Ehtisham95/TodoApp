import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login/login';
import Routes from './routes';
import Theme from '../utils/theme';
import React from 'react';
import AddTodo from '../screens/addtodo/add-todo';
import Home from '../screens/home/home';

const Stack = createNativeStackNavigator();

export const LoggedInNav = () => {
  return (
    <Stack.Navigator>
      <>
        <Stack.Screen name={Routes.ROUTE_HOME} component={Home} />
        <Stack.Screen name={Routes.ROUTE_TODO} component={AddTodo} />
      </>
    </Stack.Navigator>
  );
};
