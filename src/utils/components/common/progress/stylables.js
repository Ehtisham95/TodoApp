import styled from 'styled-components/native';

export const ProgressBox = styled.View`
  height: 48px;
  width: 80%;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  background-color: ${props => props.color || 'black'};
  align-self: center;
  margin-top: 32px;
`;
