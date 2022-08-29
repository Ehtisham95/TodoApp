import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import PrefKeys from './pref-keys';

export const setUserData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(PrefKeys.USER_DATA, jsonValue);
  } catch (e) {
    alert(e);
  }
};

export const getUserData = async () => {
  try {
    console.log('GET USER DATA REACHED');
    let jsonValue = await AsyncStorage.getItem(PrefKeys.USER_DATA);
    return jsonValue != null
      ? JSON.parse(jsonValue)
      : {user: {}, loggedIn: false};
  } catch (e) {
    return {user: {}, loggedIn: false};
  }
};

export const signInWithNumber = async number => {
  if (number != null) {
    try {
      let respone = await auth().signInWithPhoneNumber(number);
      if (respone) {
        return respone;
      }
      return null;
    } catch (err) {
      return null;
    }
  } else {
    return null;
  }
};

export const signOut = async () => {
  let response = await auth().signOut();

  if (response) return true;
  else return false;
};
