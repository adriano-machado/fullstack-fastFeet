import React, { useMemo } from 'react';
import { StatusBar, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Background from '~/components/Background';

import {
  Container,
  InfoCard,
  CardTitle,
  Title,
  InfoLabel,
  InfoValue,
  DatesInfoContainer,
  ButtonsContainer,
  Button,
  ButtonText,
  VerticalDivider,
  ConfirmButton,
} from './styles';

export default function Details({ navigation }) {
  const delivery = useSelector((state) => state.delivery.delivery);
  const address = useMemo(() => {
    const { recipient } = delivery;
    return `${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}, ${recipient.cep}`;
  }, [delivery]);

  const startDateFormated = useMemo(() => {
    if (delivery.start_date) {
      return format(parseISO(delivery.start_date), 'dd/MM/yyyy');
    }
    return '-- / -- / --  ';
  }, [delivery.start_date]);

  const endDateFormated = useMemo(() => {
    if (delivery.end_date) {
      return format(parseISO(delivery.end_date), 'dd/MM/yyyy');
    }
    return '-- / -- / --  ';
  }, [delivery.end_date]);

  function renderOptions() {
    if (delivery.end_date) {
      return null;
    }
    if (!delivery.start_date) {
      return <ConfirmButton>Retirar entrega</ConfirmButton>;
    }
    return (
      <ButtonsContainer>
        <Button onPress={() => navigation.navigate('CreateProblem')}>
          <Icon name="close-circle-outline" size={22} color="#E74040" />
          <ButtonText>Informar Problema</ButtonText>
        </Button>
        <VerticalDivider />
        <Button onPress={() => navigation.navigate('ViewProblem')}>
          <Icon name="information-outline" size={22} color="#E7BA40" />
          <ButtonText>Visualizar Problemas</ButtonText>
        </Button>
        <VerticalDivider />

        <Button onPress={() => navigation.navigate('Confirm')}>
          <Icon name="check-circle-outline" size={22} color="#7D40E7" />
          <ButtonText>Confirmar Entrega</ButtonText>
        </Button>
      </ButtonsContainer>
    );
  }

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />

      <Container>
        <>
          <InfoCard>
            <CardTitle>
              <Icon color="#7D40E7" name="truck" size={22} />
              <Title>Informações da entrega </Title>
            </CardTitle>
            <InfoLabel>Destinatário</InfoLabel>
            <InfoValue>{delivery.recipient.name}</InfoValue>
            <InfoLabel>Endereço de entrega</InfoLabel>
            <InfoValue>{address}</InfoValue>
            <InfoLabel>Produto</InfoLabel>
            <InfoValue>{delivery.product}</InfoValue>
          </InfoCard>
          <InfoCard>
            <CardTitle>
              <Icon color="#7D40E7" name="calendar" size={22} />
              <Title>Situação da entrega </Title>
            </CardTitle>
            <InfoLabel>Status</InfoLabel>
            <InfoValue capitalize>{delivery.status}</InfoValue>
            <DatesInfoContainer>
              <View>
                <InfoLabel>Data de retirada</InfoLabel>
                <InfoValue>{startDateFormated}</InfoValue>
              </View>
              <View>
                <InfoLabel>Data de entrega</InfoLabel>
                <InfoValue>{endDateFormated}</InfoValue>
              </View>
            </DatesInfoContainer>
          </InfoCard>
          {renderOptions()}
        </>
      </Container>
    </Background>
  );
}

Details.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
