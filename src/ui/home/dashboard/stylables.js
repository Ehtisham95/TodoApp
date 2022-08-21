import styled from 'styled-components/native';

export const HomeBg = styled.View`
  flex: 1;
  height: 100%;
`;

export const HomeCenterBg = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const FabBg = styled.View`
  position: absolute;
  bottom: 24px;
  right: 24px;
`;

export const TodoListItemStyle = styled.View`
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

export const CheckBoxBg = styled.View`
  align-self: flex-end;
  justify-self: center;
  justify-content: center;
  position: absolute;
`;
