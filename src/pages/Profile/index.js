import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar, Dimensions } from 'react-native';
import { parseISO, format } from 'date-fns';
import Background from '~/components/Background';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';
import noAvatarImage from '~/assets/no-avatar.jpg';

import { Container, Avatar, Title, Info, LogoutButton } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  async function handleLogout() {
    dispatch(signOut());
  }
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  console.tron.log(windowHeight, windowWidth);
  console.tron.log(noAvatarImage);

  const registerDate = useMemo(() => {
    return format(parseISO(profile.created_at), 'dd/MM/yyyy');
  }, [profile]);
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      <Avatar
        source={
          !profile.avatar
            ? {
                uri: profile.avatar.url,
              }
            : noAvatarImage
        }
      />
      <Title>Nome completo</Title>
      <Info>{profile.name}</Info>
      <Title>Email</Title>
      <Info>{profile.email}</Info>
      <Title>Data de cadastro</Title>
      <Info>{registerDate}</Info>
      <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
    </Container>
  );
}
