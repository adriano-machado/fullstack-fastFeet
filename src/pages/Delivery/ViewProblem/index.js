import React, { useState, useCallback } from 'react';
import { Text, StatusBar, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Background from '~/components/Background';
import api from '~/services/api';

import { Container, HourList, Hour, Title } from './styles';

export default function ViewProblem() {
  const { delivery_id } = route.params;
  const [problems, setProblems] = useState([]);
  useFocusEffect(
    useCallback(() => {
      async function loadProblems() {
        const response = await api.get(`/delivery/problems/${delivery_id}`);
        setProblems(response.data);
      }

      loadProblems();
    }, [delivery_id])
  );
  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />

      <Container />
    </Background>
  );
}
