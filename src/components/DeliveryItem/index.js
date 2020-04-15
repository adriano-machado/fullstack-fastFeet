import React, { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
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
  DeliveryNumber,
  DotContainer,
  DotItem,
  DotText,
  InfoContainer,
  Info,
  Label,
  Value,
  DetailsLink,
} from './styles';

export default function DeliveryItem({ data, onCancel }) {
  return (
    <Container>
      <Title>
        <Icon name="truck" size={22} color="#7D40E7" />
        <DeliveryNumber>Encomenda #{data}</DeliveryNumber>
      </Title>
      <Status>
        <Line />
        <DotContainer>
          <DotItem alignLeft>
            <Dot filled />
            <DotText teste>Aguardando retirada</DotText>
          </DotItem>
          <DotItem>
            <Dot filled />
            <DotText>Retirada</DotText>
          </DotItem>
          <DotItem alignRight>
            <Dot />
            <DotText>Entregue</DotText>
          </DotItem>
        </DotContainer>
      </Status>
      <InfoContainer>
        <Info>
          <Label>Data</Label>
          <Value>15/01/22</Value>
        </Info>
        <Info>
          <Label>Cidade</Label>
          <Value>Rio de janeiro</Value>
        </Info>
        <TouchableOpacity>
          <DetailsLink>Ver detalhes</DetailsLink>
        </TouchableOpacity>
      </InfoContainer>
    </Container>
  );
}
