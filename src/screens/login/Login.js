import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {Text, View, Button, TextInput, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import {RoundedTextInput} from '../../styles/textinputs/RoundedTextInput';
import {RoundedButton} from '../../styles/buttons/RoundedButton';
import {ScreenTitle} from '../../styles/texts/ScreenTitle';
import ButtonProgress from '../../styles/progress/ButtonProgress';
import auth from '@react-native-firebase/auth';
import Routes from '../../utils/Routes';
import {setUserLoggedIn} from '../../data/local/LocalRepo';

const StyledView = styled.View`
  background-color: white;
  flex: 1;
`;

const Login: () => Node = ({navigation}) => {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  //input fields
  const [inputFields, setInputFields] = useState({number: '', loading: false});

  //Connecting with Firebase
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  //OTP
  function signInWithPhoneNumber(inputFields) {
    setInputFields({inputFields: inputFields.number, loading: true});
    auth()
      .signInWithPhoneNumber(inputFields.number)
      .then(result => {
        setConfirm(result);
      })
      .catch(err => Alert.alert('Error', err.toString()));
  }

  function confirmCode() {
    confirm
      .confirm(code)
      .then(result => {
        setInputFields({inputFields: inputFields.number, loading: false});
        setUserLoggedIn(true);
      })
      .catch(err => {
        () => Alert.alert('Error');
      });
  }

  const onNumberChanged = num => {
    setInputFields({number: num});
  };

  useEffect(() => {
    if (confirm) navigation.navigate(Routes.ROUTE_OTP);
  }, confirm);

  if (initializing) return null;

  if (!user) {
    if (!inputFields.loading) {
      return (
        <StyledView>
          <ScreenTitle title="Sign In" />
          <RoundedTextInput
            placeholder="Phone Number"
            onChangeText={onNumberChanged}
            maxLength={14}
            value={inputFields.number}
          />
          <RoundedButton
            title="Login"
            onPress={() => signInWithPhoneNumber(inputFields)}
          />
        </StyledView>
      );
    } else {
      return (
        <StyledView>
          <ScreenTitle title="Sign In" />
          <RoundedTextInput
            placeholder="Phone Number"
            onChangeText={onNumberChanged}
            maxLength={14}
            value={inputFields.number}
          />
          <ButtonProgress />
        </StyledView>
      );
    }
  }
};
export default Login;
