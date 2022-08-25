import styled from 'styled-components/native';

export const FabStyle = styled.TouchableOpacity.attrs(props => {})`
  height: 48px;
  padding-left: 16px;
  padding-right: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  background-color: ${props => props.color || 'black'};
`;

export const FabText = styled.Text`
  color: white;
  font-size: 16px;
`;
