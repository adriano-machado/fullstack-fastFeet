import { all, takeLatest, call, put } from 'redux-saga/effects';
import * as RootNavigation from '~/services/RootNavigation';

export function redirectToActiveDelivery() {
  console.tron.log('to no saga');
  return RootNavigation.navigate('Details');
}
export default all([
  takeLatest('@delivery/SET_ACTIVE_DELIVERY', redirectToActiveDelivery),
]);
