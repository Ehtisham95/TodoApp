import React from 'react';
import {propTypes} from './props';
import {RoundedTouchableOpacity, TextButton} from './stylables';

const RoundedButton = ({onPress, title, color}) => (
  <RoundedTouchableOpacity onPress={onPress} color={color} activeOpacity={0.5}>
    <TextButton>{title}</TextButton>
  </RoundedTouchableOpacity>
);

RoundedButton.propTypes = propTypes;

export default RoundedButton;
