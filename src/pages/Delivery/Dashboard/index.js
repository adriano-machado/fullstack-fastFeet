import React, { useState, useCallback } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '~/store/modules/auth/actions';
import DeliveryItem from '~/components/DeliveryItem';
import {
  Container,
  Profile,
  Avatar,
  Title,
  Name,
  NameContainer,
  LabelContainer,
  Label,
  Options,
  Option,
  DeliveriesList,
} from './styles';
import api from '~/services/api';

import noAvatarImage from '~/assets/no-avatar.jpg';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [deliveries, setDeliveries] = useState([]);
  const profile = useSelector((state) => state.user.profile);
  const [showStartedDeliveries, setShowStartDelivery] = useState(true);
  const [atualPage, setPage] = useState(1);
  function handleToggleOption(option) {
    setShowStartDelivery(option);
  }

  function handleLogout() {
    dispatch(signOut());
  }
  useFocusEffect(
    useCallback(() => {
      async function loadDeliveries() {
        const response = await api.get(
          `deliveryman/${profile.id}/${
            showStartedDeliveries ? 'deliveries' : 'completed-deliveries'
          }?page=${atualPage}`
        );
        setDeliveries(response.data);
      }

      loadDeliveries();
    }, [atualPage, profile.id, showStartedDeliveries])
  );
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Profile>
        <Avatar
          source={
            profile.avatar
              ? {
                  uri: profile.avatar.url,
                }
              : noAvatarImage
          }
        />

        <NameContainer>
          <Title>Bem vindo de volta,</Title>
          <Name>{profile.name}</Name>
        </NameContainer>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="exit-to-app" size={24} color="#E74040" />
        </TouchableOpacity>
      </Profile>
      <LabelContainer>
        <Label>Entregas</Label>
        <Options>
          <TouchableOpacity onPress={() => handleToggleOption(true)}>
            <Option active={showStartedDeliveries}>Pendentes</Option>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleToggleOption(false)}>
            <Option active={!showStartedDeliveries}>Entregues</Option>
          </TouchableOpacity>
        </Options>
      </LabelContainer>
      <DeliveriesList
        data={deliveries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <DeliveryItem data={item} index={index} />
        )}
      />
    </Container>
  );
}
