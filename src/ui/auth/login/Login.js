import React, {Node, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  getUserData,
  setUserData,
  signInWithNumber,
} from '../../../repos/AuthRepo';
import {loginSlice} from '../redux/LoginSlice';
import {RoundedButton} from '../../../common/buttons/roundedbutton/RoundedButton';
import ButtonProgress from '../../../common/progress/ButtonProgress';
import {RoundedTextInput} from '../../../common/roundedtextinput/RoundedTextInput';
import {ScreenTitle} from '../../../common/screentitle/ScreenTitle';
import {StyledView} from './stylables';

const Login: () => Node = ({navigation}) => {
  const [inputFields, setInputFields] = useState({number: '', loading: false});
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions(
      {
        headerShown: false,
      },
      [navigation],
    );
  });

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
