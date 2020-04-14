import React, { useState, useEffect } from 'react';
import { Text, StatusBar, View } from 'react-native';
import Background from '~/components/Background';
import api from '~/services/api';

import { Container, HourList, Hour, Title } from './styles';

export default function SelectDateTime({ route, navigation }) {
  return (
    <Background>
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />

        {/* <DateInput date={date} onChange={setDate} /> */}
        <View
          style={{
            backgroundColor: '#FFF',
            borderRadius: 4,
            height: 90,
            marginHorizontal: 10,
            // borderWidth: 1,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
          }}
        >
          <Text
            style={{ color: 'blue' }}
            onPress={() => navigation.navigate('Details')}
          >
            view problem
          </Text>
        </View>
      </Container>
    </Background>
  );
}
