import {Pressable, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import AppDivider from '../../styles/dividers/AppDivider';

const TodoListItemStyle = styled.View`
  margin: 16px;
`;

const TitleText = styled.Text.attrs(props => {})`
  color: black;
  font-size: 18px;
`;
const DescriptionText = styled.Text.attrs(props => {})`
  color: grey;
  font-size: 16px;
`;

const TodoListItem = ({item}) => {
  return (
    <TodoListItemStyle>
      <TitleText>{item.title ? item.title : '--'}</TitleText>
      <DescriptionText>
        {item.description ? item.description : '--'}
      </DescriptionText>
      <AppDivider />
    </TodoListItemStyle>
  );
};

export default TodoListItem;
