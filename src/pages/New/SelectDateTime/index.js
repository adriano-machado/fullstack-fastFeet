import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Background from '~/components/Background';
import api from '~/services/api';

import { Container, HourList, Hour, Title } from './styles';

export default function SelectDateTime({ route, navigation }) {
  const { provider } = route.params;
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);
  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });
      setHours(response.data);
    }

    loadAvailable();
  }, [date]);
  function handleSelectHour(time) {
    navigation.navigate('Confirm', { provider, time });
  }
  return (
    <Background>
      <Container>
        {/* <DateInput date={date} onChange={setDate} /> */}
        <HourList
          data={hours}
          keyExtractor={(item) => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => {
                handleSelectHour(item.value);
              }}
              enabled={item.available}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}
