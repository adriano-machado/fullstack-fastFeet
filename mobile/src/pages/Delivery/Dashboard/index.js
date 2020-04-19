import React, { useState, useCallback } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '~/store/modules/auth/actions';
import DeliveryItem from '~/components/DeliveryItem';
import EmptyListMessage from '~/components/EmptyListMessage';
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
  const [loading, setLoading] = useState(true);
  const [hasMoreDelivery, setHasMoreDelivery] = useState(true);
  function handleToggleOption(option) {
    setLoading(true);
    setShowStartDelivery(option);
    setHasMoreDelivery(true);
    setPage(1)

  }

  function handleLogout() {
    dispatch(signOut());
  }

  function handleDisplayEmptyList() {
    if (loading) {
      return null;
    }
    if (showStartedDeliveries) {
      return (
        <EmptyListMessage iconName="truck-check">
          Muito bem! Você não tem nenhuma entrega pendente
        </EmptyListMessage>
      );
    }
    return (
      <EmptyListMessage iconName="emoticon-sad-outline">
        Parece que você ainda não tem nenhuma encomenda entregue!
      </EmptyListMessage>
    );
  }
  async function loadDeliveries(page = 1) {
    setLoading(true);

    const response = await api.get(
      `deliveryman/${profile.id}/${
        showStartedDeliveries ? 'deliveries' : 'completed-deliveries'
      }`,
      { params: { page } }
    );
    if (response.data.length < 20 ) {
      setHasMoreDelivery(false);
    }
    if (page >= 2) {
      setDeliveries([...deliveries, ...response.data]);
      console.tron.log([...deliveries, ...response.data]);
    } else {
      setDeliveries(response.data);
    }
    setLoading(false);
  }
  useFocusEffect(
    useCallback(() => {
      loadDeliveries(atualPage);
    }, [atualPage, profile.id, showStartedDeliveries])
  );
  function refreshList() {
    setPage(1);
    loadDeliveries();
  }
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
        getItemLayout={(data, index) => ({
          length: 211,
          offset: 211 * index,
          index,
        })}
        initialNumToRender={5}
        ListEmptyComponent={handleDisplayEmptyList}
        onRefresh={() => refreshList()}
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          if(hasMoreDelivery) {
            setPage(atualPage +1)
          }
        }}
        refreshing={loading}
        data={deliveries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <DeliveryItem data={item} index={index} />
        )}
      />
    </Container>
  );
}
