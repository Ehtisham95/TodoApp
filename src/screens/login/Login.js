import auth from '@react-native-firebase/auth';
import React, {Node, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {setUserData} from '../../data/AuthRepo';
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
  function signIn() {
    console.log('SignedIn Clicked');
    setInputFields({...inputFields, loading: true});
    if (inputFields.number != null && inputFields.number.length > 0) {
      auth()
        .signInWithPhoneNumber(inputFields.number)
        .then(result => {
          console.log('LOGIN SUCCESS!');
          onAuthStateChanged(JSON.stringify(result));
          setInputFields({...inputFields, loading: false});
        })
        .catch(err => {
          console.log('FIREBASE ERROR!');
          Alert.alert('Error', 'Firebase Login Error!');
          setInputFields({...inputFields, loading: false});
        });
    } else {
      console.log('Fields Empty');
      Alert.alert('Error', 'Login Error!');
      setInputFields({...inputFields, loading: false});
    }
  }
  //Connecting with Firebase
  const onAuthStateChanged = userData => {
    const newUserData = {
      user: userData,
      isVerified: false,
    };
    setUserData(newUserData);
    dispatch(loginSlice.actions.loggedIn());
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
