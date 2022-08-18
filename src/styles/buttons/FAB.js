import styled from 'styled-components/native';
import {Button} from 'react-native';
import React from 'react';

const FabStyle = styled.TouchableOpacity.attrs(props => {})`
  height: 48px;
  padding-left: 16px;
  padding-right: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  background-color: green;
`;

const FabText = styled.Text`
  color: white;
  font-size: 16px;
`;

const FAB = ({title, onPress}) => {
  return (
    <FabStyle onPress={onPress} activeOpacity={0.5}>
      <FabText>{title}</FabText>
    </FabStyle>
  );
};

export default FAB;
