import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { signInSuccess, signFailure } from './actions';
import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `deliverymans/${id}`);

    yield put(signInSuccess(response.data));
    // history.push('/dashboard');
  } catch (err) {
    Alert.alert('Falha no login', 'Verfique o ID inserido');

    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
