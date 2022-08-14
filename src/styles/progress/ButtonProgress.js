import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import * as Progress from 'react-native-progress';

const ProgressBox = styled.View`
  height: 48px;
  width: 80%;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  background-color: black;
  align-self: center;
  margin-top: 32px;
`;
export default ButtonProgress = () => (
  <ProgressBox>
    <Progress.Circle size={30} indeterminate={true} color="white" />
  </ProgressBox>
);
