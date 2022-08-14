import React from 'react';
import {Button} from 'react-native';
import styled from 'styled-components/native';
import Theme from '../../themes/theme';
import * as Progress from 'react-native-progress';

const RoundedTouchableOpacity = styled.TouchableOpacity`
  height: 48px;
  width: 80%;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  background-color: black;
  align-self: center;
  margin-top: 32px;
`;

const TextButton = styled.Text`
  color: white;
  font-size: 16px;
`;

export const RoundedButton = ({onPress, title}) => (
  <RoundedTouchableOpacity onPress={onPress} activeOpacity={0.5}>
    <TextButton>{title}</TextButton>
  </RoundedTouchableOpacity>
);
