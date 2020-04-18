import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { parseISO, format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setActiveDelivery } from '~/store/modules/delivery/actions';

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

export default function DeliveryItem({ data: delivery, index }) {
  const dispatch = useDispatch();
  const formattedDate = useMemo(
    () => format(parseISO(delivery.created_at), 'dd/MM/yyyy'),
    [delivery]
  );

  const deliveryNumber = useMemo(() => {
    const number = index + 1;
    if (number < 10) {
      return `0${number}`;
    }
    return number;
  }, [index]);

  return (
    <Container>
      <>
        <Title>
          <Icon name="truck" size={22} color="#7D40E7" />
          <DeliveryNumber>Encomenda #{deliveryNumber}</DeliveryNumber>
        </Title>
        <Status>
          <Line />
          <DotContainer>
            <DotItem alignLeft>
              <Dot filled />
              <DotText teste>Aguardando retirada</DotText>
            </DotItem>
            <DotItem>
              <Dot filled={!!delivery.start_date} />
              <DotText>Retirada</DotText>
            </DotItem>
            <DotItem alignRight>
              <Dot filled={!!delivery.end_date} />
              <DotText>Entregue</DotText>
            </DotItem>
          </DotContainer>
        </Status>
        <InfoContainer>
          <Info>
            <Label>Data</Label>
            <Value>{formattedDate}</Value>
          </Info>
          <Info>
            <Label>Cidade</Label>
            <Value>{delivery.recipient.city}</Value>
          </Info>
          <TouchableOpacity
            onPress={() => {
              dispatch(setActiveDelivery(delivery, deliveryNumber));
            }}
          >
            <DetailsLink>Ver detalhes</DetailsLink>
          </TouchableOpacity>
        </InfoContainer>
      </>
    </Container>
  );
}

DeliveryItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    created_at: PropTypes.string,
    recipient: PropTypes.shape({
      city: PropTypes.string,
    }),
    start_date: PropTypes.string,
    end_date: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
