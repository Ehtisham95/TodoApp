import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';

const TitleTextStyle = styled.Text`
  color: black;
  font-size: 32px;
  font-weight: 500;
  margin-top: 64px;
  margin-left: 16px;
  margin-bottom: 16px;
`;

export const ScreenTitle = props => (
  <TitleTextStyle>{props.title}</TitleTextStyle>
);
