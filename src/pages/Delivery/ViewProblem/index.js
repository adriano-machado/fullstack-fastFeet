import React, { useState, useCallback } from 'react';
import { Text, StatusBar, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import Background from '~/components/Background';
import api from '~/services/api';

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

  const [problems, setProblems] = useState([]);
  useFocusEffect(
    useCallback(() => {
      async function loadProblems() {
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
      }

      loadProblems();
    }, [delivery.id])
  );
  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Container>
        <Title>Encomenda {deliveryNumber}</Title>
        <ProblemsList
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
