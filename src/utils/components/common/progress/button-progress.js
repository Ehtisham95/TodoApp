import React from 'react';
import * as Progress from 'react-native-progress';
import {propTypes} from './props';
import {ProgressBox} from './stylables';

const ButtonProgress = ({color}) => (
  <ProgressBox color={color}>
    <Progress.Circle size={30} indeterminate={true} color="white" />
  </ProgressBox>
);

ButtonProgress.propTypes = propTypes;

export default ButtonProgress;
