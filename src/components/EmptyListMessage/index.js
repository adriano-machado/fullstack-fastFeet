import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Message } from './styles';

export default function EmptyListMessage({ iconName, iconColor, children }) {
  return (
    <Container>
      <Icon size={50} name={iconName} color={iconColor} />
      <Message>{children}</Message>
    </Container>
  );
}

EmptyListMessage.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  children: PropTypes.string,
};

EmptyListMessage.defaultProps = {
  iconColor: '#7D40E7',
  children: '',
};
