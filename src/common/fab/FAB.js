import React from 'react';
import {FabStyle, FabText} from './stylables';

const FAB = ({title, onPress}) => {
  return (
    <FabStyle onPress={onPress} activeOpacity={0.5}>
      <FabText>{title}</FabText>
    </FabStyle>
  );
};

export default FAB;
