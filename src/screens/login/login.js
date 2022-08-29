import React, {Node, useContext, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {UserDataContext} from '../../navigation/app-nav';
import {loggedIn} from '../../redux/login/login-slice';
import {setUserData, signInWithNumber} from '../../repos/auth-repo';
import ButtonProgress from '../../utils/components/common/progress/button-progress';
import RoundedButton from '../../utils/components/common/roundedbutton/rounded-button';
import RoundedTextInput from '../../utils/components/common/roundedtextinput/rounded-text-input';
import ScreenTitle from '../../utils/components/common/screentitle/screen-title';
import {propTypes} from './props';
import {LoginBg} from './stylables';

const Login: () => Node = ({navigation}) => {
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: {
      number: '',
      loading: false,
    },
  });
  const dispatch = useDispatch();
  const userData = useContext(UserDataContext);

  useEffect(() => {
    navigation.setOptions(
      {
        headerShown: false,
      },
      [navigation],
    );
  });

  //Sign in function
  const signIn = async data => {
    setValue('loading', {loading: true});
    const response = await signInWithNumber(data.number);
    setValue('loading', false);
    if (response) {
      onAuthStateChanged();
    } else {
      Alert.alert('Error', 'Login Error!');
    }
  };

  //Connecting with Firebase
  const onAuthStateChanged = async () => {
    await setUserData({
      user: {id: getValues().number},
      loggedIn: true,
    });
    dispatch(loggedIn(userData));
  };

  let button;
  if (watch('loading') == false) {
    button = (
      <RoundedButton
        title="Login"
        color="green"
        onPress={handleSubmit(signIn)}
      />
    );
  } else {
    button = <ButtonProgress color="green" />;
  }

  return (
    <LoginBg>
      <ScreenTitle title="Sign In" />
      <RoundedTextInput
        name="number"
        control={control}
        placeholder="Phone Number e.g.+9203XXXXXXXXX"
        required
      />
      {button}
      {errors.number && alert('Number Cannot be empty')}
    </LoginBg>
  );
};

Login.propTypes = propTypes;

export default Login;
