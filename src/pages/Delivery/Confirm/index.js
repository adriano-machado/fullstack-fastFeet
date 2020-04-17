import React, { useMemo, useState } from 'react';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Background from '~/components/Background';
import api from '~/services/api';

import { Container, SignatureImage, SubmitButton, ImageIcon } from './styles';

export default function Confirm({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  return (
    <Background>
      <Container>
        <SignatureImage
          source={{
            uri: 'https://api.adorable.io/avatars/285/abott@adorable.png',
          }}
        />
        <ImageIcon>
          <Icon name="camera" color="#FFF" size={30} />
        </ImageIcon>
        <SubmitButton>Enviar</SubmitButton>
      </Container>
    </Background>
  );
}
