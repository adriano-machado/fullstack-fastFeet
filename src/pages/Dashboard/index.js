import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Background from '~/components/Background';
import Appointment from '~/components/Appointment';
import api from '~/services/api';

import { Container, Title, List } from './styles';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  async function loadAppointments() {
    const response = await api.get('appointments');
    setAppointments(response.data);
  }
  useFocusEffect(() => {
    loadAppointments();
  });

  async function handleCancel(id) {
    try {
      const response = await api.delete(`/appointments/${id}`);

      setAppointments(
        appointments.map((appointment) =>
          appointment.id === id
            ? { ...appointment, canceled_at: response.data.canceled_at }
            : appointment
        )
      );
    } catch (err) {
      Alert.alert(
        'Problemas para cancelar agendamento',
        'Houve um problema para cancelar o agendamento'
      );
    }
  }
  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}
