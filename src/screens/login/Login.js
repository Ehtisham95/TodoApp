import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {Text, View, Button, TextInput, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import {RoundedTextInput} from '../../styles/textinputs/RoundedTextInput';
import {RoundedButton} from '../../styles/buttons/RoundedButton';
import {ScreenTitle} from '../../styles/texts/ScreenTitle';
import auth from '@react-native-firebase/auth';
import Routes from '../../utils/Routes';

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
  const [inputFields, setInputFields] = useState({number: ''});

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
  function signInWithPhoneNumber(phoneNumber) {
    auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(result => {
        setConfirm(confirmation);
      })
      .catch(err => {});
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {}
  }

  const onNumberChanged = num => {
    setInputFields({number: num});
  };

  useEffect(() => {
    if (confirm) navigation.navigate(Routes.ROUTE_OTP);
  }, confirm);

  if (!user) {
    return (
      <StyledView>
        <ScreenTitle title="Sign In" />
        <RoundedTextInput
          placeholder="Phone Number"
          onChangeText={onNumberChanged}
          maxLength={11}
          value={inputFields.number}
        />
        <RoundedButton
          title="Login"
          onPress={() => signInWithPhoneNumber(inputFields.number)}
        />
      </StyledView>
    );
  }
};
export default Login;
