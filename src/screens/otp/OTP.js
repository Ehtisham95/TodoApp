import React, {useState} from 'react';
import CardView from 'react-native-cardview';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {store} from '../../../App';
import {verifyCode} from '../../data/AuthRepo';
import {loginSlice} from '../../redux/LoginSlice';

const OTPViewBG = styled.View`
  align-items: center;
  justify-items: center;
`;

const OTP = () => {
  const [code, setCode] = useState();
  const dispatch = useDispatch();

  const confirmCode = () => {
    const isCodeValid = verifyCode(code);

    if (isCodeValid) {
      dispatch(loginSlice.actions.verified());
    } else {
      Alert.alert('Wrong Code!');
    }
  };

  return (
    <OTPViewBG>
      <ScreenTitle title="Sign In" />
      <CardView cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
        <RoundedTextInput
          placeholder="OTP Code"
          onChangeText={code => setCode(code)}
          maxLength={6}
          value={code}
        />
        <RoundedButton title="Verify" onPress={() => confirmCode()} />
      </CardView>
    </OTPViewBG>
  );
};

export default OTP;
