import React from 'react';
import {FabStyle, FabText} from './stylables';
import PropTypes from 'prop-types';
import {propTypes} from './props';

const FAB = ({title, color, onPress}) => {
  return (
    <FabStyle onPress={onPress} color={color} activeOpacity={0.5}>
      <FabText>{title}</FabText>
    </FabStyle>
  );
};

FAB.propTypes = propTypes;

export default FAB;
