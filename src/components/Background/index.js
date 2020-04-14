import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export default styled(LinearGradient).attrs({
  // start: { x: 1, y: 1 },
  // end: { x: 1, y: 1 },
  locations: [0.15, 0],
  colors: ['#7D40E7', '#FFF'],
})`
  flex: 1;
`;
