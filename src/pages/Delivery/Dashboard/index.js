import React, { useEffect, useState } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
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

export default function SelectProvider({ navigation }) {
  const [providers, setProviders] = useState([]);
  const profile = useSelector((state) => state.user.profile);
  const [showStartedDeliveries, setShowStartDelivery] = useState(true);
  function handleToggleOption(option) {
    setShowStartDelivery(option);
  }
  // useEffect(() => {
  //   async function loadProviders() {
  //     const response = await api.get('/providers');
  //     setProviders(response.data);
  //   }

  //   loadProviders();
  // }, []);
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Profile>
        <Avatar
          source={
            !profile.avatar
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
        <Icon name="exit-to-app" size={24} color="#E74040" />
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
        data={[1, 2, 3]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => <DeliveryItem data={item} />}
      />
    </Container>
  );
}

SelectProvider.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
