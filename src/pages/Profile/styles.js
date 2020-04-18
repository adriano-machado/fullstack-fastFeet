import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
  padding-top: 60px;
  padding: 0px 30px;
`;

export const Profile = styled.View`
  margin-top: 20px;
`;

export const Avatar = styled.Image`
  align-self: center;
  height: 120px;
  width: 120px;
  border-radius: 60px;
  margin: 60px 0px 25px;
`;

export const Title = styled.Text`
  color: #666666;
  margin-top: 15px;
  font-size: 12px;
  text-align: left;
`;

export const Info = styled.Text`
  color: #444444;
  font-size: 22px;
  text-align: left;
`;

export const LogoutButton = styled(Button)`
  margin-top: 30px;
  background: #e74040;
`;
