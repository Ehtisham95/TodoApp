import React from 'react';
import * as Progress from 'react-native-progress';
import { ProgressBox } from './stylables';

export default ButtonProgress = ({color}) => (
  <ProgressBox color={color}>
    <Progress.Circle size={30} indeterminate={true} color="white" />
  </ProgressBox>ø
);
