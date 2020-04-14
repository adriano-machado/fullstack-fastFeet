import React, { useEffect, useState } from 'react';
import { StatusBar, Text } from 'react-native';
import PropTypes from 'prop-types';
import Background from '~/components/Background';
import { Container, ProvidersList, Provider, Avatar, Name } from './styles';
import api from '~/services/api';

export default function SelectProvider({ navigation }) {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('/providers');
      setProviders(response.data);
    }

    loadProviders();
  }, []);
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Text
        style={{ color: 'blue' }}
        onPress={() => navigation.navigate('Details')}
      >
        DASHBOARD IINITALPAGE
      </Text>
    </Container>
  );
}

SelectProvider.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
