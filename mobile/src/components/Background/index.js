import LinearGradient from 'react-native-linear-gradient';
import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
export default styled(LinearGradient).attrs({
  locations: [0.11, 0],
  colors: ['#7D40E7', '#FFF'],
})`
  ${(props) =>
    props.fixed
      ? css`
          height: ${() => `${screenHeight}px`};
          width: 100%;
        `
      : css`
          flex: 1;
        `}
`;
