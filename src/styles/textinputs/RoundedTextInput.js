import React from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

export const RoundedTextInput = styled.TextInput.attrs(props => {
  secureTextEntry: props.password ? true : false;
  placeholderTextColor: '#4e4e4e';
  placeholderText: props.placeholder;
  textContentType: 'telephoneNumber';
})`
  color: black;
  align-self: center;
  margin-top: 8px;
  margin-bottom: 16px;
  font-size: 16px;
  width: 80%;
  height: 48px;
  border-radius: 8px;
  border-color: black;
  padding-left: 12px;
  padding-right: 12px;
  border-width: 1px;
`;
