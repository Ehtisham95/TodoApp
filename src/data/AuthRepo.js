import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import PrefKeys from './PrefKeys';

export const setUserData = value => {
  let data = JSON.stringify(value);
  AsyncStorage.setItem(PrefKeys.USER_DATA, data)
    .then(result => {
      jsonValue != null ? JSON.parse(jsonValue) : null;
    })
    .catch(err => {});
};

export const getUserData = () => {
  AsyncStorage.getItem(PrefKeys.USER_DATA)
    .then(result => {
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    })
    .catch(err => {
      return null;
    });
};

export const signInWithNumber = number => {
  if (number != null && number.length > 0) {
    auth()
      .signInWithPhoneNumber(number)
      .then(result => {
        return true;
      })
      .catch(err => {
        return false;
      });
  } else {
    return true;
  }
};

export const verifyCode = code => {
  if (code != null && code.length > 6) {
    confirm
      .confirm(code)
      .then(result => {
        return true;
      })
      .catch(err => {
        return false;
      });
  } else {
    return false;
  }
};
