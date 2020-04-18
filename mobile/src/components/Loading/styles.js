import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const margin = screenHeight / 3;
export const Container = styled.View`
  margin-top: ${() => `${margin}px`};
`;
