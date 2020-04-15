import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const margin = screenHeight / 4;
export const Container = styled.View`
  margin-top: ${() => `${margin}px`};
  align-items: center;
`;

export const Message = styled.Text`
  margin-top: 10px
  font-size: 20px;
  text-align: center;
  color: #999999;
`;
