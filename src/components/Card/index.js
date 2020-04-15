import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

export default function Card({ children, style, ...rest }) {
  return (
    <View
      style={[
        {
          shadowColor: '#0000001A',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
          backgroundColor: '#FFF',
          borderRadius: 4,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
};
