import React, { useState, useRef } from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Background from '~/components/Background';
import api from '~/services/api';

import { Container, CardInput, InputProblem, SubmitButton } from './styles';

export default function CreateProblem({ navigation }) {
  const refInput = useRef();
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);

  const deliveryman_id = useSelector((state) => state.user.profile.id);
  const delivery_id = useSelector((state) => state.delivery.delivery.id);

  async function handleSubmit() {
    if (!description) return;

    setLoading(true);
    await api.post(`/delivery/${delivery_id}/problems`, {
      deliveryman_id,
      description,
    });
    setLoading(false);
    navigation.navigate('Details');
  }

  return (
    <Background fixed>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />

      <Container>
        <CardInput>
          <InputProblem
            blurOnSubmit
            enablesReturnKeyAutomatically
            ref={refInput}
            multiline
            autoCorrect
            autoCapitalize="sentences"
            placeholder="Inclua aqui o problema que ocorreu na entrega."
            onSubmitEditing={handleSubmit}
            value={description}
            onChangeText={setDescription}
          />
        </CardInput>
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Enviar
        </SubmitButton>
      </Container>
    </Background>
  );
}

CreateProblem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
