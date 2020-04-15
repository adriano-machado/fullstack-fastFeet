import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '~/components/Card';

import {
  Container,
  Dot,
  Status,
  Line,
  Title,
  Label,
  DotContainer,
  StatusTextContainer,
  StatusText,
} from './styles';

export default function Appointment({ data, onCancel }) {
  return (
    <Container>
      <Title>
        <Icon name="truck" size={20} color="#7D40E7" />
        <Label>Encomenda #{data}</Label>
      </Title>
      <Status>
        <Line />
        <DotContainer>
          <Dot filled />
          <Dot filled />
          <Dot />
        </DotContainer>
      </Status>
      <StatusTextContainer>
        <StatusText align="center" justify>
          Aguardando retirada
        </StatusText>
        <StatusText align="center">Retirada</StatusText>
        <StatusText align="right">Entregue</StatusText>
      </StatusTextContainer>
    </Container>
  );
}
