import React, {Node, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {getUserData, setUserData, signInWithNumber} from '../../data/AuthRepo';
import {loginSlice} from './LoginSlice';
import {RoundedButton} from '../../styles/buttons/RoundedButton';
import ButtonProgress from '../../styles/progress/ButtonProgress';
import {RoundedTextInput} from '../../styles/textinputs/RoundedTextInput';
import {ScreenTitle} from '../../styles/texts/ScreenTitle';
import {StyledView} from './stylables';

const Login: () => Node = ({navigation}) => {
  const [inputFields, setInputFields] = useState({number: '', loading: false});
  const dispatch = useDispatch();

  //Sign in function
  async function signIn() {
    setInputFields({...inputFields, loading: true});
    const response = await signInWithNumber(inputFields.number);
    setInputFields({...inputFields, loading: false});
    if (response) {
      onAuthStateChanged();
    } else {
      Alert.alert('Error', 'Login Error!');
    }
  }
  //Connecting with Firebase
  const onAuthStateChanged = async () => {
    await setUserData({
      user: {id: inputFields.number},
      loggedIn: true,
    });
    const loggedInUser = await getUserData();
    dispatch(loginSlice.actions.loggedIn(loggedInUser));
  };

  let button;

  if (!inputFields.loading) {
    button = (
      <RoundedButton title="Login" color="green" onPress={() => signIn()} />
    );
  } else {
    button = <ButtonProgress color="green" />;
  }

  return (
    <StyledView>
      <ScreenTitle title="Sign In" />
      <RoundedTextInput
        placeholder="Phone Number"
        onChangeText={num => setInputFields({...inputFields, number: num})}
        maxLength={14}
        value={inputFields.number}
      />
      {button}
    </StyledView>
  );
};

export default Login;
