import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Card from '~/components/Card';
import MyButton from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 20px;
`;
export const InfoCard = styled(Card)`
  margin-bottom: 10px;
  padding: 15px;
`;
export const CardTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #7d40e7;
  margin-left: 5px;
`;
export const InfoLabel = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #999999;
  text-transform: uppercase;
  margin-top: 10px;
`;
export const InfoValue = styled.Text`
  margin: 5px 0px;
  font-size: 14px;
  color: #666666;
  text-transform: ${(props) => (props.capitalize ? 'capitalize' : 'none')};
`;
export const DatesInfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonsContainer = styled(Card)`
  flex-direction: row;
  justify-content: space-between;
  background: #f8f9fd;
  margin-bottom: 10px;
`;

export const VerticalDivider = styled.View`
  width: 1px;
  background: #0000001a;
`;

export const Button = styled(RectButton)`
  width: 33.333%;
  border: 1px solid #0000001a;
  border-top-width: 0px;
  border-bottom-width: 0px;
  align-items: center;
  padding: 15px 25px;
  background: #f8f9fd;
`;

export const ConfirmButton = styled(MyButton)`
  background: #82bf18;
  margin-top: 15px;
`;

export const ButtonText = styled.Text`
  color: #999999;
  text-align: center;
  font-size: 12px;
  max-width: 60px;
`;
