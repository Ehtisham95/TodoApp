import React from 'react';
import {propTypes} from './props';
import {TitleTextStyle} from './stylables';

const ScreenTitle = ({title}) => {
  return <TitleTextStyle>{title}</TitleTextStyle>;
};
ScreenTitle.propTypes = propTypes;

export default ScreenTitle;
