import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export default styled(LinearGradient).attrs({
  locations: [0.15, 0],
  colors: ['#7D40E7', '#FFF'],
})`
  flex: 1;
`;
