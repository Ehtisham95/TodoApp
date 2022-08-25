import styled from 'styled-components/native';

export const CheckBoxBg = styled.View`
  align-self: flex-end;
  justify-self: center;
  justify-content: center;
  position: absolute;
`;

export const TodoListItemStyle = styled.Pressable`
  margin-top: 12px;
  margin-right: 16px;
  margin-left: 16px;
`;

export const TitleText = styled.Text`
  color: black;
  font-size: 18px;
`;
export const DescriptionText = styled.Text.attrs(props => {})`
  text-align: ${props => props.align || 'left'};
  margin-top: ${props => props.topMargin || '0px'};
  margin-right: ${props => props.rightMargin || '0px'};
  color: grey;
  font-size: 14px;
`;
