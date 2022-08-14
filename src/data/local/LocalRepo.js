import React, {useDebugValue} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrefKeys from './PrefKeys';

export const setUserLoggedIn = async value => {
  try {
    await AsyncStorage.setItem(PrefKeys.IS_USER_LOGGED_IN, value);
  } catch (e) {}
};

export const getUserLoggedIn = async () => {
  const value = await AsyncStorage.getItem(PrefKeys.IS_USER_LOGGED_IN);
  return value;
};
