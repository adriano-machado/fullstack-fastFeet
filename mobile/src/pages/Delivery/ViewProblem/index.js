import React, { useState, useCallback } from 'react';
import { Text, StatusBar, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import Background from '~/components/Background';
import api from '~/services/api';
import Loading from '~/components/Loading';
import EmptyListMessage from '~/components/EmptyListMessage';

import {
  Container,
  ProblemsList,
  Problem,
  ProblemDescription,
  ProblemDate,
  Title,
} from './styles';

export default function ViewProblem() {
  const delivery = useSelector((state) => state.delivery.delivery);
  const deliveryNumber = useSelector((state) => state.delivery.deliveryNumber);

  const [loading, setLoading] = useState(true);

  const [problems, setProblems] = useState([]);
  useFocusEffect(
    useCallback(() => {
      async function loadProblems() {
        try {
          setLoading(true);
          const response = await api.get(`/delivery/problems/${delivery.id}`);

          setProblems(
            response.data.map((problem) => ({
              ...problem,
              formattedCreateDate: format(
                parseISO(problem.created_at),
                'dd/MM/yyyy'
              ),
            }))
          );
          setLoading(false);
        } catch (err) {
          console.tron.error(err);
          setLoading(false);
        }
      }

      loadProblems();
    }, [delivery.id])
  );

  function handleDisplayEmptyList() {
    if (loading) {
      return <Loading />;
    }
    return (
      <EmptyListMessage iconName="truck-check">
        Essa entrega não possui nenhum problema!
      </EmptyListMessage>
    );
  }
  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Container>
        <Title>Encomenda {deliveryNumber}</Title>
        <ProblemsList
          ListEmptyComponent={handleDisplayEmptyList}
          refreshing={loading}
          data={problems}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Problem>
              <>
                <ProblemDescription>{item.description}</ProblemDescription>
                <ProblemDate>{item.formattedCreateDate}</ProblemDate>
              </>
            </Problem>
          )}
        />
      </Container>
    </Background>
  );
}
