import React from 'react';
import {RoundedTouchableOpacity, TextButton} from './stylables';

export const RoundedButton = ({onPress, title, color}) => (
  <RoundedTouchableOpacity onPress={onPress} color={color} activeOpacity={0.5}>
    <TextButton>{title}</TextButton>
  </RoundedTouchableOpacity>
);
