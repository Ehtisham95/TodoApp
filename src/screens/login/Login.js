import auth from '@react-native-firebase/auth';
import React, {Node, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {getUserData, setUserData, signInWithNumber} from '../../data/AuthRepo';
import {loginSlice} from '../../redux/LoginSlice';
import {RoundedButton} from '../../styles/buttons/RoundedButton';
import ButtonProgress from '../../styles/progress/ButtonProgress';
import {RoundedTextInput} from '../../styles/textinputs/RoundedTextInput';
import {ScreenTitle} from '../../styles/texts/ScreenTitle';

const StyledView = styled.View`
  background-color: white;
  flex: 1;
`;

const Login: () => Node = ({navigation}) => {
  const [inputFields, setInputFields] = useState({number: '', loading: false});
  const dispatch = useDispatch();

  //Sign in function
  async function signIn() {
    setInputFields({...inputFields, loading: true});
    const response = await signInWithNumber(inputFields.number);
    setInputFields({...inputFields, loading: false});
    if (response) {
      onAuthStateChanged(JSON.stringify(response));
    } else {
      Alert.alert('Error', 'Login Error!');
    }
  }
  //Connecting with Firebase
  const onAuthStateChanged = async userData => {
    await setUserData({
      user: userData != null ? userData : null,
      loggedIn: true,
    });
    const loggedInUser = await getUserData();
    dispatch(loginSlice.actions.loggedIn(loggedInUser));
  };

  if (!inputFields.loading) {
    return (
      <StyledView>
        <ScreenTitle title="Sign In" />
        <RoundedTextInput
          placeholder="Phone Number"
          onChangeText={num => setInputFields({...inputFields, number: num})}
          maxLength={14}
          value={inputFields.number}
        />
        <RoundedButton title="Login" onPress={() => signIn()} />
      </StyledView>
    );
  } else {
    return (
      <StyledView>
        <ScreenTitle title="Sign In" />
        <RoundedTextInput
          placeholder="Phone Number"
          maxLength={14}
          value={inputFields.number}
        />
        <ButtonProgress />
      </StyledView>
    );
  }
};

export default Login;
