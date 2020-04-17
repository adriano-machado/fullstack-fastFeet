import { all, takeLatest } from 'redux-saga/effects';
import * as RootNavigation from '~/services/RootNavigation';

export function redirectToActiveDelivery() {
  return RootNavigation.navigate('Details');
}
export default all([
  takeLatest('@delivery/SET_ACTIVE_DELIVERY', redirectToActiveDelivery),
]);
