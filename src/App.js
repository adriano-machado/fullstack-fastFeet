import React from 'react';
import { useSelector } from 'react-redux';
import Routes from './routes';
import { navigationRef } from '~/services/RootNavigation';

// import { Container } from './styles';

export default function App() {
  const signed = useSelector((state) => state.auth.signed);
  return <Routes signed={signed} ref={navigationRef} />;
}
