import styled from 'styled-components/native';
import {Controller} from 'react-hook-form';
import {TextInput} from 'react-native';
import React from 'react';
import {propTypes} from './props';

const RoundedTextInputStyle = styled.TextInput.attrs(props => {
  secureTextEntry: props.password ? true : false;
  placeholderTextColor: '#4e4e4e';
  placeholderText: props.placeholder;
  textContentType: 'telephoneNumber';
  multiline: props.multiline ? true : false;
  textAlignVertical: props.multiline ? 'top' : 'left';
})`
  color: black;
  align-self: center;
  margin-top: 8px;
  align-items: center;
  margin-bottom: 16px;
  font-size: 16px;
  width: 80%;
  height: ${props => (props.multiline ? '150px' : '48px')};
  border-radius: 8px;
  border-color: black;
  padding-left: 12px;
  padding-right: 12px;
  border-width: 1px;
`;

const RoundedtextInput = ({
  control,
  name,
  placeholder,
  multiline,
  password,
  required,
  initialValue,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{required: required ? true : false}}
      render={({field: {value, onChange, onBlur}}) => (
        <RoundedTextInputStyle
          placeholder={placeholder}
          multiline={multiline}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
        />
      )}
    />
  );
};

RoundedtextInput.propTypes = propTypes;

export default RoundedtextInput;
