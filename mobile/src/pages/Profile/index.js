import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'react-native';
import { parseISO, format } from 'date-fns';
import { signOut } from '~/store/modules/auth/actions';
import noAvatarImage from '~/assets/no-avatar.jpg';

import { Container, Avatar, Title, Info, LogoutButton } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  function handleLogout() {
    dispatch(signOut());
  }

  const registerDate = useMemo(() => {
    return format(parseISO(profile.created_at), 'dd/MM/yyyy');
  }, [profile]);
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      <Avatar
        source={
          profile.avatar
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
