import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
  padding: 0 30px;
`;

export const DeliveriesList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Profile = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Avatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

export const NameContainer = styled.View`
  margin-left: -30px;
`;

export const Title = styled.Text`
  font-size: 12px;
  color: #666666;
  text-align: left;
`;

export const Name = styled.Text`
  font-size: 22px;
  color: #444444;
  text-align: left;
`;

export const LabelContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.Text`
  color: #444444;
  font-size: 22px;
  text-align: left;
  font-weight: bold;
`;

export const Options = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Option = styled.Text`
  color: ${(props) => (props.active ? '#7D40E7' : '#999999')};
  font-weight: bold;
  font-size: 14px;
  margin-left: 15px;
  border-color: #7d40e7;
  border-bottom-width: ${(props) => (props.active ? '2px' : '0px')};
`;
